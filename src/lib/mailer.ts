import nodemailer from 'nodemailer';
import { escapeHtml } from './html.js';

export type SmtpChannel = 'noreply' | 'contact' | 'careers';

export const getChannelCredentials = (channel: SmtpChannel = 'noreply') => {
  if (channel === 'careers' && process.env.CAREERS_PASSWORD) {
    return {
      user: process.env.CAREERS_EMAIL?.trim() || 'careers@decodeinfotech.in',
      pass: process.env.CAREERS_PASSWORD.trim().replace(/\s+/g, ''),
    };
  }
  if (channel === 'contact' && process.env.CONTACT_PASSWORD) {
    return {
      user: process.env.CONTACT_EMAIL?.trim() || 'contact@decodeinfotech.in',
      pass: process.env.CONTACT_PASSWORD.trim().replace(/\s+/g, ''),
    };
  }
  const user =
    process.env.NOREPLY_EMAIL?.trim() ||
    process.env.SMTP_USER?.trim() ||
    'noreply@decodeinfotech.in';
  const pass = (
    process.env.NOREPLY_PASSWORD ||
    process.env.SMTP_PASS ||
    ''
  ).trim().replace(/\s+/g, '');

  return { user, pass };
};

const hasSmtpCredentials = (channel?: SmtpChannel) => {
  if (channel) {
    const creds = getChannelCredentials(channel);
    return Boolean(creds.user && creds.pass);
  }
  return Boolean(
    (process.env.SMTP_USER && process.env.SMTP_PASS) ||
    (process.env.NOREPLY_EMAIL && process.env.NOREPLY_PASSWORD) ||
    (process.env.CONTACT_EMAIL && process.env.CONTACT_PASSWORD) ||
    (process.env.CAREERS_EMAIL && process.env.CAREERS_PASSWORD)
  );
};

export const createTransporter = (channel: SmtpChannel = 'noreply') => {
  if (!hasSmtpCredentials(channel)) {
    throw new Error('SMTP credentials are not configured.');
  }

  const creds = getChannelCredentials(channel);
  const useServiceShorthand =
    process.env.SMTP_SERVICE === 'gmail' ||
    !process.env.SMTP_HOST ||
    process.env.SMTP_HOST.trim() === '';

  const transportConfig = useServiceShorthand
    ? {
        service: 'gmail',
        auth: {
          user: creds.user,
          pass: creds.pass,
        },
      }
    : {
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '465', 10),
        secure: process.env.SMTP_SECURE !== 'false',
        auth: {
          user: creds.user,
          pass: creds.pass,
        },
      };

  return nodemailer.createTransport({
    ...transportConfig,
    connectionTimeout: 10000,
    socketTimeout: 15000,
  });
};

const getNoReplyFrom = () =>
  process.env.MAIL_FROM?.trim() ||
  `"DeCode InfoTech" <${process.env.NOREPLY_EMAIL || process.env.SMTP_USER || 'noreply@decodeinfotech.in'}>`;

const getContactReceiverEmail = () =>
  process.env.CONTACT_RECEIVER_EMAIL?.trim() ||
  process.env.CONTACT_EMAIL?.trim() ||
  process.env.ADMIN_RECEIVER_EMAIL?.trim() ||
  'contact@decodeinfotech.in';

const getCareersReceiverEmail = () =>
  process.env.CAREERS_RECEIVER_EMAIL?.trim() ||
  process.env.CAREERS_EMAIL?.trim() ||
  'careers@decodeinfotech.in';

const toText = (value: string) =>
  value
    .replace(/<[^>]*>/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

export type EmailAttachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
};

async function deliverMail(
  options: {
    from: string;
    to: string;
    replyTo?: string;
    subject: string;
    html: string;
    text: string;
    attachments?: EmailAttachment[];
  },
  channel: SmtpChannel = 'noreply'
) {
  if (!hasSmtpCredentials(channel) && process.env.NODE_ENV !== 'production') {
    console.info('[mail:preview]', {
      channel,
      to: options.to,
      replyTo: options.replyTo,
      subject: options.subject,
      text: options.text,
      attachments: options.attachments?.map((att) => ({
        filename: att.filename,
        bytes: att.content.length,
      })),
    });
    return { accepted: [options.to], preview: true };
  }

  const transporter = createTransporter(channel);
  return transporter.sendMail(options);
}

export type ContactLead = {
  name: string;
  email: string;
  phone: string;
  company?: string;
  projectType: string;
  message: string;
};

export async function sendContactEmail(lead: ContactLead) {
  const contactReceiver = getContactReceiverEmail();
  const noreplySender = getNoReplyFrom();

  const adminSubject = `New Project Proposal: ${lead.projectType} from ${lead.name}`;
  const adminHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; background: #0c1017; border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; color: #f1f5f9;">
      <div style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 16px; margin-bottom: 20px;">
        <h2 style="color: #ffffff; margin: 0 0 6px; font-size: 20px; font-weight: 700;">New Project Proposal Request</h2>
        <p style="color: #94a3b8; margin: 0; font-size: 13px;">Received via DeCode InfoTech Web Portal</p>
      </div>

      <div style="background: rgba(255,255,255,0.03); padding: 20px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.08);">
        <p style="margin: 0 0 10px; font-size: 14px;"><strong style="color: #cbd5e1;">Client Name:</strong> <span style="color: #ffffff; font-weight: 600;">${escapeHtml(lead.name)}</span></p>
        <p style="margin: 0 0 10px; font-size: 14px;"><strong style="color: #cbd5e1;">Email:</strong> <a href="mailto:${escapeHtml(lead.email)}" style="color: #38bdf8; text-decoration: none;">${escapeHtml(lead.email)}</a></p>
        <p style="margin: 0 0 10px; font-size: 14px;"><strong style="color: #cbd5e1;">Phone:</strong> <a href="tel:${escapeHtml(lead.phone)}" style="color: #38bdf8; text-decoration: none;">${escapeHtml(lead.phone)}</a></p>
        <p style="margin: 0 0 10px; font-size: 14px;"><strong style="color: #cbd5e1;">Company:</strong> ${escapeHtml(lead.company || 'Not Specified')}</p>
        <p style="margin: 0 0 14px; font-size: 14px;"><strong style="color: #cbd5e1;">Project Category:</strong> <span style="background: rgba(56,189,248,0.15); color: #38bdf8; padding: 3px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;">${escapeHtml(lead.projectType)}</span></p>
        
        <p style="margin: 16px 0 8px; font-size: 14px; font-weight: 600; color: #cbd5e1;">Project Overview & Goals:</p>
        <div style="background: #06090e; padding: 14px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.06); color: #e2e8f0; line-height: 1.6; white-space: pre-wrap; font-size: 14px;">${escapeHtml(lead.message)}</div>
      </div>

      <p style="font-size: 12px; color: #64748b; margin-top: 20px; text-align: center;">Direct replies to this message will go to ${escapeHtml(lead.name)} (${escapeHtml(lead.email)}).</p>
    </div>
  `;

  // 1. Deliver proposal notification to internal team (contact@decodeinfotech.in)
  const notificationResult = await deliverMail(
    {
      from: `"DeCode InfoTech Notifications" <${getChannelCredentials('noreply').user}>`,
      to: contactReceiver,
      replyTo: `${lead.name} <${lead.email}>`,
      subject: adminSubject,
      html: adminHtml,
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
    },
    'noreply'
  );

  // 2. Deliver automated confirmation to the client from noreply@decodeinfotech.in
  const replySubject = `Thank you for contacting DeCode InfoTech — We received your project proposal`;
  const replyHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; background: #0c1017; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; color: #f1f5f9;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #ffffff; font-size: 24px; font-weight: 800; margin: 0 0 6px; letter-spacing: -0.02em;">DeCode InfoTech</h1>
        <p style="color: #94a3b8; font-size: 13px; margin: 0;">Imagine it. Build it. Decode the future.</p>
      </div>

      <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 24px; margin: 20px 0;">
        <p style="font-size: 16px; line-height: 1.6; color: #ffffff; margin: 0 0 14px;">Hi <strong>${escapeHtml(lead.name)}</strong>,</p>
        <p style="font-size: 14px; line-height: 1.7; color: #cbd5e1; margin: 0 0 16px;">
          Thank you for reaching out to <strong>DeCode InfoTech</strong>. We have received your project proposal for <strong>${escapeHtml(lead.projectType)}</strong>.
        </p>
        <div style="background: rgba(56,189,248,0.08); border: 1px solid rgba(56,189,248,0.25); border-radius: 8px; padding: 14px; margin: 18px 0; text-align: center;">
          <p style="margin: 0; color: #38bdf8; font-size: 13px; font-weight: 600;">⚡ Expected Response Time: Within 24 Hours</p>
        </div>
        <p style="font-size: 14px; line-height: 1.7; color: #94a3b8; margin: 0;">
          Our technical architects and product consultants are reviewing your requirements and will reach out to you with next steps.
        </p>
      </div>

      <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 18px; margin-top: 24px; text-align: center; color: #64748b; font-size: 12px; line-height: 1.6;">
        <p style="margin: 0 0 4px;">DeCode InfoTech • Software & Web Development Company</p>
        <p style="margin: 0 0 4px;">For urgent inquiries, email <a href="mailto:${escapeHtml(contactReceiver)}" style="color: #38bdf8; text-decoration: none;">${escapeHtml(contactReceiver)}</a></p>
        <p style="margin: 0;"><a href="https://decodeinfotech.in" style="color: #94a3b8; text-decoration: none;">decodeinfotech.in</a></p>
      </div>
    </div>
  `;

  try {
    await deliverMail(
      {
        from: noreplySender,
        to: lead.email,
        replyTo: `"DeCode InfoTech" <${contactReceiver}>`,
        subject: replySubject,
        html: replyHtml,
        text: toText(`
          Hi ${lead.name},

          Thank you for reaching out to DeCode InfoTech. We have received your project proposal for ${lead.projectType}.

          ⚡ Expected Response Time: Within 24 Hours

          Our technical architects and product consultants are reviewing your requirements and will reach out to you with next steps.

          Best regards,
          The DeCode InfoTech Team
          https://decodeinfotech.in
        `),
      },
      'noreply'
    );
  } catch (replyError) {
    console.warn('[mail:contact-auto-reply-failed]', replyError instanceof Error ? replyError.message : replyError);
  }

  return notificationResult;
}

export type CareerApplication = {
  name: string;
  email: string;
  phone?: string;
  portfolio: string;
  experience?: string;
  coverLetter?: string;
  jobTitle: string;
  resume?: {
    name: string;
    type: string;
    size: number;
    base64: string;
  };
};

export async function sendCareerEmail(app: CareerApplication) {
  const careersReceiver = getCareersReceiverEmail();
  const noreplySender = `"DeCode InfoTech Careers" <${getChannelCredentials('noreply').user}>`;

  const coverLetterHtml = app.coverLetter
    ? `
      <p style="margin: 16px 0 6px; font-size: 14px; font-weight: 600; color: #cbd5e1;">Cover Letter / Pitch:</p>
      <div style="background: #06090e; padding: 14px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.06); color: #e2e8f0; line-height: 1.6; white-space: pre-wrap; font-size: 14px;">${escapeHtml(app.coverLetter)}</div>
    `
    : '';

  const resumeHtml = app.resume
    ? `
      <p style="margin: 0 0 10px; font-size: 14px;"><strong style="color: #cbd5e1;">Attached Resume:</strong> <span style="color: #38bdf8;">${escapeHtml(app.resume.name)}</span> (${(app.resume.size / 1024).toFixed(1)} KB)</p>
    `
    : '';

  const adminSubject = `New Candidate Application: ${app.jobTitle} - ${app.name}`;
  const adminHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; background: #0c1017; border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; color: #f1f5f9;">
      <div style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 16px; margin-bottom: 20px;">
        <h2 style="color: #ffffff; margin: 0 0 6px; font-size: 20px; font-weight: 700;">New Job Application Received</h2>
        <p style="color: #94a3b8; margin: 0; font-size: 13px;">Received via DeCode InfoTech Careers</p>
      </div>

      <div style="background: rgba(255,255,255,0.03); padding: 20px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.08);">
        <p style="margin: 0 0 10px; font-size: 14px;"><strong style="color: #cbd5e1;">Position Applied:</strong> <span style="background: rgba(168,85,247,0.15); color: #c084fc; padding: 3px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;">${escapeHtml(app.jobTitle)}</span></p>
        <p style="margin: 0 0 10px; font-size: 14px;"><strong style="color: #cbd5e1;">Candidate Name:</strong> <span style="color: #ffffff; font-weight: 600;">${escapeHtml(app.name)}</span></p>
        <p style="margin: 0 0 10px; font-size: 14px;"><strong style="color: #cbd5e1;">Email:</strong> <a href="mailto:${escapeHtml(app.email)}" style="color: #38bdf8; text-decoration: none;">${escapeHtml(app.email)}</a></p>
        <p style="margin: 0 0 10px; font-size: 14px;"><strong style="color: #cbd5e1;">Phone:</strong> <a href="tel:${escapeHtml(app.phone || '')}" style="color: #38bdf8; text-decoration: none;">${escapeHtml(app.phone || 'Not specified')}</a></p>
        <p style="margin: 0 0 10px; font-size: 14px;"><strong style="color: #cbd5e1;">Portfolio / GitHub:</strong> ${
          app.portfolio?.trim()
            ? `<a href="${escapeHtml(app.portfolio)}" target="_blank" style="color: #38bdf8; text-decoration: none;">${escapeHtml(app.portfolio)}</a>`
            : 'Not specified'
        }</p>
        <p style="margin: 0 0 10px; font-size: 14px;"><strong style="color: #cbd5e1;">Experience:</strong> ${escapeHtml(app.experience || 'Not specified')}</p>
        ${resumeHtml}
        ${coverLetterHtml}
      </div>

      <p style="font-size: 12px; color: #64748b; margin-top: 20px; text-align: center;">Direct replies to this message will go to ${escapeHtml(app.name)} (${escapeHtml(app.email)}).</p>
    </div>
  `;

  const attachments: EmailAttachment[] | undefined = app.resume
    ? [
        {
          filename: app.resume.name,
          content: Buffer.from(app.resume.base64, 'base64'),
          contentType: app.resume.type || 'application/octet-stream',
        },
      ]
    : undefined;

  // 1. Deliver application notification to internal careers team (careers@decodeinfotech.in)
  const notificationResult = await deliverMail(
    {
      from: noreplySender,
      to: careersReceiver,
      replyTo: `${app.name} <${app.email}>`,
      subject: adminSubject,
      html: adminHtml,
      text: toText(`
        New Job Application Received

        Position: ${app.jobTitle}
        Candidate Name: ${app.name}
        Email: ${app.email}
        Phone: ${app.phone || 'Not specified'}
        Portfolio / GitHub: ${app.portfolio}
        Experience: ${app.experience || 'Not specified'}
        Resume: ${app.resume ? `${app.resume.name} (${(app.resume.size / 1024).toFixed(1)} KB)` : 'Not attached'}

        Cover Letter / Pitch:
        ${app.coverLetter || 'Not specified'}
      `),
      attachments,
    },
    'noreply'
  );

  // 2. Deliver automated confirmation to the candidate from noreply@decodeinfotech.in
  const replySubject = `Application Received: ${app.jobTitle} at DeCode InfoTech`;
  const replyHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; background: #0c1017; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; color: #f1f5f9;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #ffffff; font-size: 24px; font-weight: 800; margin: 0 0 6px; letter-spacing: -0.02em;">DeCode InfoTech</h1>
        <p style="color: #c084fc; font-size: 13px; font-weight: 600; margin: 0;">Careers & Engineering</p>
      </div>

      <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 24px; margin: 20px 0;">
        <p style="font-size: 16px; line-height: 1.6; color: #ffffff; margin: 0 0 14px;">Hi <strong>${escapeHtml(app.name)}</strong>,</p>
        <p style="font-size: 14px; line-height: 1.7; color: #cbd5e1; margin: 0 0 16px;">
          Thank you for applying for the <strong>${escapeHtml(app.jobTitle)}</strong> position at <strong>DeCode InfoTech</strong>. We have received your application and resume.
        </p>
        <div style="background: rgba(168,85,247,0.08); border: 1px solid rgba(168,85,247,0.25); border-radius: 8px; padding: 14px; margin: 18px 0; text-align: center;">
          <p style="margin: 0; color: #c084fc; font-size: 13px; font-weight: 600;">⚡ Status: Application Under Review (Response within 48 Hours)</p>
        </div>
        <p style="font-size: 14px; line-height: 1.7; color: #94a3b8; margin: 0;">
          Our talent acquisition and engineering leads are evaluating your profile. If your skill set matches what we are looking for, our team will get in touch with you to schedule an introductory discussion.
        </p>
      </div>

      <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 18px; margin-top: 24px; text-align: center; color: #64748b; font-size: 12px; line-height: 1.6;">
        <p style="margin: 0 0 4px;">DeCode InfoTech Hiring Team</p>
        <p style="margin: 0 0 4px;">Questions about your application? Reach us at <a href="mailto:${escapeHtml(careersReceiver)}" style="color: #c084fc; text-decoration: none;">${escapeHtml(careersReceiver)}</a></p>
        <p style="margin: 0;"><a href="https://decodeinfotech.in/careers" style="color: #94a3b8; text-decoration: none;">decodeinfotech.in/careers</a></p>
      </div>
    </div>
  `;

  try {
    await deliverMail(
      {
        from: noreplySender,
        to: app.email,
        replyTo: `"DeCode InfoTech Careers" <${careersReceiver}>`,
        subject: replySubject,
        html: replyHtml,
        text: toText(`
          Hi ${app.name},

          Thank you for applying for the ${app.jobTitle} position at DeCode InfoTech. We have received your application and details.

          ⚡ Status: Application Under Review (Response within 48 Hours)

          Our talent acquisition and engineering leads are evaluating your profile. If your skill set matches what we are looking for, our team will get in touch with you to schedule an introductory discussion.

          Best regards,
          DeCode InfoTech Hiring Team
          https://decodeinfotech.in/careers
        `),
      },
      'noreply'
    );
  } catch (replyError) {
    console.warn('[mail:careers-auto-reply-failed]', replyError instanceof Error ? replyError.message : replyError);
  }

  return notificationResult;
}
