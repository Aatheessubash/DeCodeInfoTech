import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Validate an email address with a basic RFC-5322-like regex. */
const isValidEmail = (email) =>
  typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

/** Escape HTML special characters to prevent XSS in email bodies. */
const escapeHtml = (str = '') =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// ─── Transporter ─────────────────────────────────────────────────────────────

/** Create a Nodemailer transporter from environment variables. */
export const createTransporter = () => {
  const useServiceShorthand =
    process.env.SMTP_SERVICE === 'gmail' ||
    (!process.env.SMTP_HOST || process.env.SMTP_HOST.trim() === '');

  const transportConfig = useServiceShorthand
    ? {
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      }
    : {
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '465', 10),
        secure: process.env.SMTP_SECURE !== 'false', // default true
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      };

  return nodemailer.createTransport(transportConfig);
};

/** Shared MAIL_FROM string — consistent across all functions. */
const getMailFrom = () =>
  process.env.MAIL_FROM?.trim() ||
  `"DeCode InfoTech" <${process.env.SMTP_USER}>`;

/** Admin/company receiver email. Falls back to SMTP_USER if not configured. */
const getReceiverEmail = () => {
  const configured = process.env.CONTACT_RECEIVER_EMAIL?.trim();
  if (configured && configured !== 'your-inbox@example.com') return configured;
  return process.env.SMTP_USER;
};

// ─── sendContactEmail ─────────────────────────────────────────────────────────

/**
 * Fires two emails when a contact/proposal form is submitted:
 *  1. Admin notification (to the company inbox) with full proposal details.
 *  2. Auto-reply confirmation to the client.
 *
 * Returns { adminInfo, clientInfo, clientError? }
 */
export const sendContactEmail = async ({
  name,
  email,
  company = '',
  projectType = 'Web Application',
  message,
}) => {
  // ── Input validation ───────────────────────────────────────────────────────
  if (!name || String(name).trim() === '') throw new Error('Sender name is required.');
  if (!isValidEmail(email)) throw new Error(`Invalid or missing email address: "${email}"`);
  if (!message || String(message).trim() === '') throw new Error('Message body is required.');

  const safeName = escapeHtml(name.trim());
  const safeEmail = escapeHtml(email.trim());
  const safeCompany = escapeHtml(company?.trim() || 'N/A');
  const safeProjectType = escapeHtml(projectType || 'Web Application');
  const safeMessage = escapeHtml(message.trim());

  const transporter = createTransporter();
  const mailFrom = getMailFrom();
  const receiverEmail = getReceiverEmail();

  // ── 1. Admin notification email ────────────────────────────────────────────
  const adminMailOptions = {
    from: mailFrom,
    to: receiverEmail,
    replyTo: email.trim(),
    subject: `🚀 New Proposal from ${name.trim()} [${projectType}]`,
    text: [
      'New Project Proposal Details:',
      '-------------------------------------------',
      `Name:             ${name.trim()}`,
      `Email:            ${email.trim()}`,
      `Company:          ${company?.trim() || 'N/A'}`,
      `Project Category: ${projectType}`,
      '',
      'Project Overview & Goals:',
      message.trim(),
      '-------------------------------------------',
      'Sent via DeCode InfoTech Web Application',
    ].join('\n'),
    html: `
<div style="font-family:'Segoe UI',Arial,sans-serif;background:#0c0f1d;color:#e2e8f0;padding:30px;border-radius:12px;max-width:600px;margin:0 auto;border:1px solid rgba(255,255,255,0.1);">
  <div style="text-align:center;margin-bottom:25px;">
    <h2 style="color:#6366f1;margin:0;font-size:24px;font-weight:800;letter-spacing:-0.5px;">DeCode InfoTech</h2>
    <p style="color:#94a3b8;font-size:14px;margin-top:5px;">New Project Proposal Request</p>
  </div>
  <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:20px;margin-bottom:20px;">
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:8px 0;color:#94a3b8;width:35%;font-weight:600;">Client Name:</td><td style="padding:8px 0;color:#fff;font-weight:700;">${safeName}</td></tr>
      <tr><td style="padding:8px 0;color:#94a3b8;font-weight:600;">Email:</td><td style="padding:8px 0;color:#38bdf8;"><a href="mailto:${safeEmail}" style="color:#38bdf8;text-decoration:none;">${safeEmail}</a></td></tr>
      <tr><td style="padding:8px 0;color:#94a3b8;font-weight:600;">Company:</td><td style="padding:8px 0;color:#fff;">${safeCompany}</td></tr>
      <tr><td style="padding:8px 0;color:#94a3b8;font-weight:600;">Category:</td><td style="padding:8px 0;color:#a855f7;font-weight:700;">${safeProjectType}</td></tr>
    </table>
  </div>
  <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:20px;">
    <h4 style="color:#e2e8f0;margin:0 0 10px;font-size:15px;">Project Overview &amp; Goals:</h4>
    <p style="color:#cbd5e1;line-height:1.6;margin:0;white-space:pre-wrap;">${safeMessage}</p>
  </div>
  <div style="text-align:center;margin-top:25px;border-top:1px solid rgba(255,255,255,0.1);padding-top:15px;font-size:12px;color:#64748b;">
    Auto-generated by the DeCode InfoTech contact system.
  </div>
</div>`,
  };

  // ── 2. Auto-reply confirmation to client ───────────────────────────────────
  const clientMailOptions = {
    from: mailFrom,
    to: email.trim(),
    subject: `Thanks for contacting DeCode InfoTech! We'll reach out soon`,
    text: [
      `Hi ${name.trim()},`,
      '',
      'Thanks for contacting DeCode InfoTech! Our team will reach out to you soon.',
      '',
      `Request Category: ${projectType}`,
      `Your Message: ${message.trim()}`,
      '',
      'Best regards,',
      'DeCode InfoTech Team',
    ].join('\n'),
    html: `
<div style="font-family:'Segoe UI',Arial,sans-serif;background:#0c0f1d;color:#e2e8f0;padding:30px;border-radius:12px;max-width:600px;margin:0 auto;border:1px solid rgba(255,255,255,0.1);">
  <div style="text-align:center;margin-bottom:25px;">
    <h2 style="color:#6366f1;margin:0;font-size:24px;font-weight:800;">DeCode InfoTech</h2>
    <p style="color:#38bdf8;font-size:15px;font-weight:600;margin-top:5px;">Thanks for contacting DeCode InfoTech!</p>
  </div>
  <p style="color:#e2e8f0;font-size:16px;line-height:1.6;">Hi <strong>${safeName}</strong>,</p>
  <p style="color:#cbd5e1;line-height:1.6;font-size:15px;">
    Thanks for reaching out to <strong>DeCode InfoTech</strong>! Our team has received your proposal and will reach out to you soon.
  </p>
  <div style="background:rgba(99,102,241,0.08);border-left:4px solid #6366f1;padding:16px;border-radius:6px;margin:20px 0;">
    <p style="margin:0;color:#a5b4fc;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">Request Category: ${safeProjectType}</p>
    <p style="margin:8px 0 0;color:#e2e8f0;font-size:14px;line-height:1.5;white-space:pre-wrap;">${safeMessage}</p>
  </div>
  <div style="background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.2);padding:16px;border-radius:8px;margin:20px 0;text-align:center;">
    <p style="margin:0;color:#a5b4fc;font-size:14px;font-weight:600;">⚡ Expected Response Time: Within 24 Hours</p>
  </div>
  <p style="color:#94a3b8;font-size:14px;margin-top:25px;">Best regards,<br/><strong style="color:#fff;font-size:15px;">DeCode InfoTech Team</strong></p>
</div>`,
  };

  const adminInfo = await transporter.sendMail(adminMailOptions);

  let clientInfo = null;
  let clientError = null;
  try {
    clientInfo = await transporter.sendMail(clientMailOptions);
  } catch (err) {
    clientError = err.message;
    console.warn('[sendContactEmail] Auto-reply to client failed:', err.message);
  }

  return { adminInfo, clientInfo, clientError };
};

// ─── sendReplyEmail ───────────────────────────────────────────────────────────

/**
 * Send a standalone thank-you / follow-up reply to a specific person.
 * Optionally include a custom message from the team.
 */
export const sendReplyEmail = async ({
  name = 'Valued Client',
  email,
  customMessage = '',
}) => {
  if (!isValidEmail(email)) {
    throw new Error(`Invalid or missing recipient email address: "${email}"`);
  }

  const safeName = escapeHtml(String(name).trim() || 'Valued Client');
  const safeCustomMessage = escapeHtml(String(customMessage).trim());

  const transporter = createTransporter();
  const mailFrom = getMailFrom();

  const replyMailOptions = {
    from: mailFrom,
    to: email.trim(),
    subject: `Thanks for contacting DeCode InfoTech!`,
    text: [
      `Hi ${String(name).trim()},`,
      '',
      'Thanks for contacting DeCode InfoTech! Our team will reach out to you soon.',
      ...(customMessage.trim() ? ['', `Note from our team: ${customMessage.trim()}`] : []),
      '',
      'Best regards,',
      'DeCode InfoTech Team',
    ].join('\n'),
    html: `
<div style="font-family:'Segoe UI',Arial,sans-serif;background:#0c0f1d;color:#e2e8f0;padding:30px;border-radius:12px;max-width:600px;margin:0 auto;border:1px solid rgba(255,255,255,0.1);">
  <div style="text-align:center;margin-bottom:25px;">
    <h2 style="color:#6366f1;margin:0;font-size:26px;font-weight:800;">DeCode InfoTech</h2>
    <p style="color:#38bdf8;font-size:16px;font-weight:600;margin-top:8px;">Thanks for contacting DeCode InfoTech!</p>
  </div>
  <p style="color:#e2e8f0;font-size:16px;line-height:1.6;">Hi <strong>${safeName}</strong>,</p>
  <p style="color:#cbd5e1;line-height:1.6;font-size:15px;">
    Thanks for contacting <strong>DeCode InfoTech</strong>! Our team has received your message and will reach out to you soon.
  </p>
  ${safeCustomMessage ? `
  <div style="background:rgba(255,255,255,0.05);border-left:4px solid #38bdf8;padding:15px;border-radius:4px;margin:20px 0;">
    <p style="margin:0 0 4px;color:#38bdf8;font-size:12px;font-weight:700;text-transform:uppercase;">Note from our team:</p>
    <p style="margin:0;color:#e2e8f0;font-size:14px;">${safeCustomMessage}</p>
  </div>` : ''}
  <div style="background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.2);padding:16px;border-radius:8px;margin:20px 0;text-align:center;">
    <p style="margin:0;color:#a5b4fc;font-size:14px;font-weight:600;">⚡ Expected Response Time: Within 24 Hours</p>
  </div>
  <p style="color:#94a3b8;font-size:14px;margin-top:25px;">Best regards,<br/><strong style="color:#fff;font-size:15px;">DeCode InfoTech Team</strong></p>
</div>`,
  };

  return transporter.sendMail(replyMailOptions);
};

// ─── Career Application Email ─────────────────────────────────────────

/**
 * Sends a notification email to the admin and an automated confirmation
 * to candidate applying for a job role.
 */
export const sendCareerEmail = async ({
  name,
  email,
  phone = '',
  portfolio = '',
  jobTitle = 'General Application',
  coverLetter = '',
}) => {
  if (!name || !String(name).trim()) {
    throw new Error('Name is required.');
  }
  if (!isValidEmail(email)) {
    throw new Error(`Invalid candidate email address: "${email}"`);
  }

  const safeName = escapeHtml(String(name).trim());
  const safeEmail = escapeHtml(String(email).trim());
  const safePhone = escapeHtml(String(phone).trim() || 'Not Provided');
  const safePortfolio = escapeHtml(String(portfolio).trim() || 'Not Provided');
  const safeJobTitle = escapeHtml(String(jobTitle).trim());
  const safeCoverLetter = escapeHtml(String(coverLetter).trim() || 'No cover letter provided.');

  const transporter = createTransporter();
  const mailFrom = getMailFrom();
  const adminRecipient = process.env.ADMIN_EMAIL || process.env.SMTP_USER;

  // 1) Admin Notification Email
  const adminMailOptions = {
    from: mailFrom,
    to: adminRecipient,
    replyTo: safeEmail,
    subject: `🚀 New Job Application: ${safeJobTitle} - ${safeName}`,
    text: [
      `New Job Application Received on DeCode Studio`,
      `------------------------------------------`,
      `Position Applied: ${safeJobTitle}`,
      `Candidate Name  : ${safeName}`,
      `Email           : ${safeEmail}`,
      `Phone           : ${safePhone}`,
      `Portfolio/GitHub: ${safePortfolio}`,
      ``,
      `Cover Letter / Pitch:`,
      `${safeCoverLetter}`,
    ].join('\n'),
    html: `
<div style="font-family:'Segoe UI',Arial,sans-serif;background:#F8FAFC;color:#0F172A;padding:30px;border-radius:16px;max-width:640px;margin:0 auto;border:1px solid #E2E8F0;">
  <div style="background:linear-gradient(135deg, #0A66C2 0%, #0284C7 100%);padding:20px;border-radius:12px;text-align:center;margin-bottom:24px;">
    <h2 style="color:#FFFFFF;margin:0;font-size:24px;font-weight:800;">DeCode Studio Careers</h2>
    <p style="color:#E0F2FE;font-size:15px;margin-top:6px;font-weight:600;">🚀 New Candidate Application Received</p>
  </div>
  <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
    <tr><td style="padding:10px;border-bottom:1px solid #E2E8F0;font-weight:700;color:#0284C7;">Position:</td><td style="padding:10px;border-bottom:1px solid #E2E8F0;font-weight:800;color:#0F172A;">${safeJobTitle}</td></tr>
    <tr><td style="padding:10px;border-bottom:1px solid #E2E8F0;font-weight:700;color:#475569;">Candidate Name:</td><td style="padding:10px;border-bottom:1px solid #E2E8F0;">${safeName}</td></tr>
    <tr><td style="padding:10px;border-bottom:1px solid #E2E8F0;font-weight:700;color:#475569;">Email:</td><td style="padding:10px;border-bottom:1px solid #E2E8F0;"><a href="mailto:${safeEmail}" style="color:#0A66C2;">${safeEmail}</a></td></tr>
    <tr><td style="padding:10px;border-bottom:1px solid #E2E8F0;font-weight:700;color:#475569;">Phone:</td><td style="padding:10px;border-bottom:1px solid #E2E8F0;">${safePhone}</td></tr>
    <tr><td style="padding:10px;border-bottom:1px solid #E2E8F0;font-weight:700;color:#475569;">Portfolio / GitHub:</td><td style="padding:10px;border-bottom:1px solid #E2E8F0;"><a href="${safePortfolio}" target="_blank" style="color:#0A66C2;">${safePortfolio}</a></td></tr>
  </table>
  <div style="background:#FFFFFF;border:1px solid #CBD5E1;border-radius:12px;padding:20px;margin-bottom:20px;">
    <h4 style="margin:0 0 10px 0;color:#0284C7;font-size:13px;text-transform:uppercase;letter-spacing:0.08em;">Cover Letter / Candidate Pitch:</h4>
    <p style="margin:0;color:#334155;line-height:1.6;font-size:14px;white-space:pre-wrap;">${safeCoverLetter}</p>
  </div>
</div>`,
  };

  const adminInfo = await transporter.sendMail(adminMailOptions);

  // 2) Candidate Confirmation Email
  const candidateMailOptions = {
    from: mailFrom,
    to: safeEmail,
    subject: `Application Received: ${safeJobTitle} at DeCode Studio`,
    text: [
      `Hi ${safeName},`,
      ``,
      `Thank you for applying for the ${safeJobTitle} position at DeCode Studio!`,
      `We have received your application and portfolio details. Our engineering leads will review your application and get back to you shortly.`,
      ``,
      `Best regards,`,
      `DeCode Studio Hiring Team`,
    ].join('\n'),
    html: `
<div style="font-family:'Segoe UI',Arial,sans-serif;background:#FFFFFF;color:#0F172A;padding:32px;border-radius:16px;max-width:600px;margin:0 auto;border:1px solid #E2E8F0;box-shadow:0 8px 30px rgba(15,23,42,0.06);">
  <div style="text-align:center;margin-bottom:24px;">
    <h2 style="color:#0A66C2;margin:0;font-size:26px;font-weight:800;">DeCode Studio</h2>
    <p style="color:#0284C7;font-size:16px;font-weight:700;margin-top:6px;">Application Confirmation</p>
  </div>
  <p style="font-size:16px;line-height:1.6;color:#0F172A;">Hi <strong>${safeName}</strong>,</p>
  <p style="font-size:15px;line-height:1.65;color:#475569;">
    Thank you for applying for the <strong>${safeJobTitle}</strong> position at <strong>DeCode Studio</strong>. We have received your application and details.
  </p>
  <div style="background:#F0F9FF;border:1px solid #BAE6FD;padding:16px;border-radius:12px;margin:20px 0;text-align:center;">
    <p style="margin:0;color:#0284C7;font-size:14px;font-weight:700;">⚡ Status: Application Under Review (Response within 48 hours)</p>
  </div>
  <p style="color:#64748B;font-size:14px;margin-top:28px;">
    Best regards,<br/><strong style="color:#0F172A;font-size:15px;">DeCode Studio Hiring Team</strong>
  </p>
</div>`,
  };

  let candidateInfo = null;
  let candidateError = null;
  try {
    candidateInfo = await transporter.sendMail(candidateMailOptions);
  } catch (err) {
    candidateError = err.message;
  }

  return { adminInfo, candidateInfo, candidateError };
};

// ─── CLI test runner ──────────────────────────────────────────────────────────
// Runs only when this file is called directly: `node sendMail.js`
const isDirectRun =
  process.argv[1] &&
  (process.argv[1].endsWith('sendMail.js') || process.argv[1].endsWith('sendMail'));

if (isDirectRun) {
  console.log('🧪 Sending test email via SMTP credentials from .env...');
  sendContactEmail({
    name: 'Test Client',
    email: process.env.SMTP_USER,
    company: 'DeCode Test',
    projectType: 'Web Application',
    message: 'This is a test email sent from the DeCode Nodemailer mail script.',
  })
    .then((res) => {
      console.log('✅ Test email sent successfully!');
      console.log('   Admin Email MessageID :', res.adminInfo.messageId);
      console.log('   Client Reply MessageID:', res.clientInfo?.messageId ?? `FAILED — ${res.clientError}`);
    })
    .catch((err) => {
      console.error('❌ Failed to send test email:', err.message);
      process.exit(1);
    });
}
