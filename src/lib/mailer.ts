import nodemailer from 'nodemailer';
import { escapeHtml } from './html';

export const createTransporter = () => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
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
  `"DeCode InfoTech" <${process.env.SMTP_USER || 'contact@decodeinfotech.com'}>`;

const getAdminEmail = () =>
  process.env.ADMIN_RECEIVER_EMAIL?.trim() || process.env.SMTP_USER || 'contact@decodeinfotech.com';

export async function sendContactEmail(lead: {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  message: string;
}) {
  const transporter = createTransporter();
  const mailOptions = {
    from: getMailFrom(),
    to: getAdminEmail(),
    subject: `🚀 New Project Proposal: ${escapeHtml(lead.projectType)} from ${escapeHtml(lead.name)}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #fafafa; border: 1px solid #eaeaea; border-radius: 12px;">
        <h2 style="color: #111; margin-bottom: 16px;">New Project Proposal Request</h2>
        <div style="background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #e5e5e5;">
          <p style="margin: 0 0 10px;"><strong>Client Name:</strong> ${escapeHtml(lead.name)}</p>
          <p style="margin: 0 0 10px;"><strong>Email:</strong> <a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a></p>
          <p style="margin: 0 0 10px;"><strong>Company:</strong> ${escapeHtml(lead.company || 'Not Specified')}</p>
          <p style="margin: 0 0 10px;"><strong>Project Category:</strong> ${escapeHtml(lead.projectType)}</p>
          <p style="margin: 16px 0 6px;"><strong>Project Overview & Goals:</strong></p>
          <div style="background: #f9f9f9; padding: 14px; border-radius: 6px; color: #333; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(lead.message)}</div>
        </div>
        <p style="font-size: 12px; color: #888; margin-top: 20px; text-align: center;">Sent securely via DeCode InfoTech Web Portal</p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
}

export async function sendCareerEmail(app: {
  name: string;
  email: string;
  phone?: string;
  portfolio: string;
  experience?: string;
  coverLetter?: string;
  jobTitle: string;
}) {
  const transporter = createTransporter();
  const mailOptions = {
    from: getMailFrom(),
    to: getAdminEmail(),
    subject: `💼 New Candidate Application: ${escapeHtml(app.jobTitle)} - ${escapeHtml(app.name)}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #fafafa; border: 1px solid #eaeaea; border-radius: 12px;">
        <h2 style="color: #111; margin-bottom: 16px;">New Job Application Received</h2>
        <div style="background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #e5e5e5;">
          <p style="margin: 0 0 10px;"><strong>Position:</strong> ${escapeHtml(app.jobTitle)}</p>
          <p style="margin: 0 0 10px;"><strong>Candidate Name:</strong> ${escapeHtml(app.name)}</p>
          <p style="margin: 0 0 10px;"><strong>Email:</strong> <a href="mailto:${escapeHtml(app.email)}">${escapeHtml(app.email)}</a></p>
          <p style="margin: 0 0 10px;"><strong>Portfolio / GitHub:</strong> <a href="${escapeHtml(app.portfolio)}" target="_blank">${escapeHtml(app.portfolio)}</a></p>
          <p style="margin: 0 0 10px;"><strong>Experience:</strong> ${escapeHtml(app.experience || 'Not specified')}</p>
          ${
            app.coverLetter
              ? `
            <p style="margin: 16px 0 6px;"><strong>Cover Letter / Pitch:</strong></p>
            <div style="background: #f9f9f9; padding: 14px; border-radius: 6px; color: #333; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(app.coverLetter)}</div>
          `
              : ''
          }
        </div>
        <p style="font-size: 12px; color: #888; margin-top: 20px; text-align: center;">Sent securely via DeCode InfoTech Careers</p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
}
