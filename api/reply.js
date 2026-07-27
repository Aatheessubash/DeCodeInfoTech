import { sendReplyEmail } from '../sendMail.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  const validSecret = process.env.ADMIN_PASSWORD || '782274';

  if (token !== validSecret) {
    return res.status(403).json({ success: false, message: 'Forbidden: invalid or missing API token.' });
  }

  const { name, email, customMessage } = req.body || {};

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ success: false, message: 'A valid recipient email is required.' });
  }

  try {
    const info = await sendReplyEmail({ name, email, customMessage });
    return res.status(200).json({
      success: true,
      message: 'Reply email sent successfully!',
      messageId: info.messageId,
    });
  } catch (error) {
    console.error('Vercel Serverless api/reply error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send reply email.',
      error: error.message,
    });
  }
}
