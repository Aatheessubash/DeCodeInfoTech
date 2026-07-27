import { sendContactEmail } from '../sendMail.js';

export default async function handler(req, res) {
  // CORS Headers for Vercel Serverless Functions
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { name, email, company, projectType, message } = req.body || {};

  if (!name?.trim()) {
    return res.status(400).json({ success: false, message: 'Name is required.' });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ success: false, message: 'A valid email address is required.' });
  }
  if (!message?.trim()) {
    return res.status(400).json({ success: false, message: 'Message / project overview is required.' });
  }

  try {
    const result = await sendContactEmail({ name, email, company, projectType, message });

    return res.status(200).json({
      success: true,
      message: 'Proposal request submitted successfully! Check your inbox for confirmation.',
      adminMessageId: result.adminInfo?.messageId,
      clientReplySent: !!result.clientInfo,
      clientReplyError: result.clientError ?? null,
    });
  } catch (error) {
    console.error('Vercel Serverless api/contact error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send proposal email. Please try again later.',
      error: error.message,
    });
  }
}
