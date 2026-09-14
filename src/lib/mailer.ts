import nodemailer from 'nodemailer';

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
        secure: process.env.SMTP_SECURE !== 'false',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      };

  return nodemailer.createTransport(transportConfig);
};

const getMailFrom = () =>
  process.env.MAIL_FROM?.trim() ||
  `"DeCode InfoTech" <${process.env.SMTP_USER || 'contact@decodeinfotech.com'}>`;

const getAdminEmail = () =>
  process.env.ADMIN_RECEIVER_EMAIL?.trim() ||
  process.env.SMTP_USER ||
  'contact@decodeinfotech.com';

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
    subject: `🚀 New Project Proposal: ${lead.projectType} from ${lead.name}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #fafafa; border: 1px solid #eaeaea; border-radius: 12px;">
        <h2 style="color: #111; margin-bottom: 16px;">New Project Proposal Request</h2>
        <div style="background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #e5e5e5;">
          <p style="margin: 0 0 10px;"><strong>Client Name:</strong> ${lead.name}</p>
          <p style="margin: 0 0 10px;"><strong>Email:</strong> <a href="mailto:${lead.email}">${lead.email}</a></p>
          <p style="margin: 0 0 10px;"><strong>Company:</strong> ${lead.company || 'Not Specified'}</p>
          <p style="margin: 0 0 10px;"><strong>Project Category:</strong> ${lead.projectType}</p>
          <p style="margin: 16px 0 6px;"><strong>Project Overview & Goals:</strong></p>
          <div style="background: #f9f9f9; padding: 14px; border-radius: 6px; color: #333; line-height: 1.6; white-space: pre-wrap;">${lead.message}</div>
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
    subject: `💼 New Candidate Application: ${app.jobTitle} - ${app.name}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #fafafa; border: 1px solid #eaeaea; border-radius: 12px;">
        <h2 style="color: #111; margin-bottom: 16px;">New Job Application Received</h2>
        <div style="background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #e5e5e5;">
          <p style="margin: 0 0 10px;"><strong>Position:</strong> ${app.jobTitle}</p>
          <p style="margin: 0 0 10px;"><strong>Candidate Name:</strong> ${app.name}</p>
          <p style="margin: 0 0 10px;"><strong>Email:</strong> <a href="mailto:${app.email}">${app.email}</a></p>
          <p style="margin: 0 0 10px;"><strong>Portfolio / GitHub:</strong> <a href="${app.portfolio}" target="_blank">${app.portfolio}</a></p>
          <p style="margin: 0 0 10px;"><strong>Experience:</strong> ${app.experience || 'Not specified'}</p>
          ${app.coverLetter ? `
            <p style="margin: 16px 0 6px;"><strong>Cover Letter / Pitch:</strong></p>
            <div style="background: #f9f9f9; padding: 14px; border-radius: 6px; color: #333; line-height: 1.6; white-space: pre-wrap;">${app.coverLetter}</div>
          ` : ''}
        </div>
        <p style="font-size: 12px; color: #888; margin-top: 20px; text-align: center;">Sent securely via DeCode InfoTech Careers</p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
}
