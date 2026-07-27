import { createTransporter } from '../sendMail.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const transporter = createTransporter();
    await transporter.verify();
    return res.status(200).json({
      status: 'ok',
      smtpConnected: true,
      message: 'DeCode Vercel serverless & SMTP connection are healthy.',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      smtpConnected: false,
      error: error.message,
    });
  }
}
