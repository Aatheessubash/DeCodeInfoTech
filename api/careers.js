import { sendCareerEmail } from '../sendMail.js';

export default async function handler(req, res) {
  // CORS Headers
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

  const { name, email, phone, portfolio, jobTitle, coverLetter } = req.body || {};

  if (!name?.trim()) {
    return res.status(400).json({ success: false, message: 'Candidate name is required.' });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ success: false, message: 'A valid candidate email address is required.' });
  }

  try {
    const result = await sendCareerEmail({ name, email, phone, portfolio, jobTitle, coverLetter });

    return res.status(200).json({
      success: true,
      message: 'Job application submitted successfully! Confirmation email sent.',
      adminMessageId: result.adminInfo?.messageId,
      candidateReplySent: !!result.candidateInfo,
    });
  } catch (error) {
    console.error('api/careers error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process application email. Please try again later.',
      error: error.message,
    });
  }
}
