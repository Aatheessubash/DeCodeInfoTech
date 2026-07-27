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
