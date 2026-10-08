import nodemailer from 'nodemailer';
import { escapeHtml } from './html.js';

const hasSmtpCredentials = () => Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);

export const createTransporter = () => {
  if (!hasSmtpCredentials()) {
    throw new Error('SMTP credentials are not configured.');
  }

  const useServiceShorthand =
    process.env.SMTP_SERVICE === 'gmail' ||
    !process.env.SMTP_HOST ||
    process.env.SMTP_HOST.trim() === '';

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
        secure: process.env.SMTP_SECURE !== 'false',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      };

  return nodemailer.createTransport({
    ...transportConfig,
    connectionTimeout: 10000,
    socketTimeout: 15000,
  });
};

const getMailFrom = () =>
  process.env.MAIL_FROM?.trim() ||
  `"DeCode InfoTech" <${process.env.SMTP_USER || 'contact@decodeinfotech.in'}>`;

const getAdminEmail = () =>
  process.env.ADMIN_RECEIVER_EMAIL?.trim() || process.env.SMTP_USER || 'contact@decodeinfotech.in';

const toText = (value: string) =>
  value
    .replace(/<[^>]*>/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

async function deliverMail(options: {
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
}) {
  if (!hasSmtpCredentials() && process.env.NODE_ENV !== 'production') {
    console.info('[mail:preview]', {
      to: options.to,
      replyTo: options.replyTo,
      subject: options.subject,
      text: options.text,
    });
    return { accepted: [options.to], preview: true };
  }

  const transporter = createTransporter();
  return transporter.sendMail(options);
}

type ContactLead = {
  name: string;
  email: string;
  phone: string;
  company?: string;
  projectType: string;
  message: string;
};

export async function sendContactEmail(lead: ContactLead) {
  const subject = `New Project Proposal: ${lead.projectType} from ${lead.name}`;
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #fafafa; border: 1px solid #eaeaea; border-radius: 12px;">
      <h2 style="color: #111; margin-bottom: 16px;">New Project Proposal Request</h2>
      <div style="background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #e5e5e5;">
        <p style="margin: 0 0 10px;"><strong>Client Name:</strong> ${escapeHtml(lead.name)}</p>
        <p style="margin: 0 0 10px;"><strong>Email:</strong> <a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a></p>
        <p style="margin: 0 0 10px;"><strong>Phone:</strong> <a href="tel:${escapeHtml(lead.phone)}">${escapeHtml(lead.phone)}</a></p>
        <p style="margin: 0 0 10px;"><strong>Company:</strong> ${escapeHtml(lead.company || 'Not Specified')}</p>
        <p style="margin: 0 0 10px;"><strong>Project Category:</strong> ${escapeHtml(lead.projectType)}</p>
        <p style="margin: 16px 0 6px;"><strong>Project Overview & Goals:</strong></p>
        <div style="background: #f9f9f9; padding: 14px; border-radius: 6px; color: #333; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(lead.message)}</div>
      </div>
      <p style="font-size: 12px; color: #888; margin-top: 20px; text-align: center;">Sent securely via DeCode InfoTech Web Portal</p>
    </div>
  `;

  return deliverMail({
    from: getMailFrom(),
    to: getAdminEmail(),
    replyTo: lead.email,
    subject,
    html,
    text: toText(`
      New Project Proposal Request

      Client Name: ${lead.name}
      Email: ${lead.email}
      Phone: ${lead.phone}
      Company: ${lead.company || 'Not Specified'}
      Project Category: ${lead.projectType}

      Project Overview & Goals:
      ${lead.message}
    `),
  });
}

type CareerApplication = {
  name: string;
  email: string;
  phone?: string;
  portfolio: string;
  experience?: string;
  coverLetter?: string;
  jobTitle: string;
};

export async function sendCareerEmail(app: CareerApplication) {
  const subject = `New Candidate Application: ${app.jobTitle} - ${app.name}`;
  const coverLetterHtml = app.coverLetter
    ? `
      <p style="margin: 16px 0 6px;"><strong>Cover Letter / Pitch:</strong></p>
      <div style="background: #f9f9f9; padding: 14px; border-radius: 6px; color: #333; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(app.coverLetter)}</div>
    `
    : '';
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #fafafa; border: 1px solid #eaeaea; border-radius: 12px;">
      <h2 style="color: #111; margin-bottom: 16px;">New Job Application Received</h2>
      <div style="background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #e5e5e5;">
        <p style="margin: 0 0 10px;"><strong>Position:</strong> ${escapeHtml(app.jobTitle)}</p>
        <p style="margin: 0 0 10px;"><strong>Candidate Name:</strong> ${escapeHtml(app.name)}</p>
        <p style="margin: 0 0 10px;"><strong>Email:</strong> <a href="mailto:${escapeHtml(app.email)}">${escapeHtml(app.email)}</a></p>
        <p style="margin: 0 0 10px;"><strong>Phone:</strong> ${escapeHtml(app.phone || 'Not specified')}</p>
        <p style="margin: 0 0 10px;"><strong>Portfolio / GitHub:</strong> <a href="${escapeHtml(app.portfolio)}" target="_blank">${escapeHtml(app.portfolio)}</a></p>
        <p style="margin: 0 0 10px;"><strong>Experience:</strong> ${escapeHtml(app.experience || 'Not specified')}</p>
        ${coverLetterHtml}
      </div>
      <p style="font-size: 12px; color: #888; margin-top: 20px; text-align: center;">Sent securely via DeCode InfoTech Careers</p>
    </div>
  `;

  return deliverMail({
    from: getMailFrom(),
    to: getAdminEmail(),
    replyTo: app.email,
    subject,
    html,
    text: toText(`
      New Job Application Received

      Position: ${app.jobTitle}
      Candidate Name: ${app.name}
      Email: ${app.email}
      Phone: ${app.phone || 'Not specified'}
      Portfolio / GitHub: ${app.portfolio}
      Experience: ${app.experience || 'Not specified'}

      Cover Letter / Pitch:
      ${app.coverLetter || 'Not specified'}
    `),
  });
}
