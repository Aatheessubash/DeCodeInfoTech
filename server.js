import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { sendContactEmail, sendReplyEmail, createTransporter } from './sendMail.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// ─── CORS ─────────────────────────────────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST'],
}));
app.use(express.json({ limit: '20kb' })); // guard against large payloads

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Basic RFC-5322-like email validation. */
const isValidEmail = (email) =>
  typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

// ─── Naive rate-limiter (in-memory, per IP) ───────────────────────────────────
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5;            // max 5 requests per window

const rateLimit = (req, res, next) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const entry = rateLimitMap.get(ip) || { count: 0, windowStart: now };

  if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    entry.count = 0;
    entry.windowStart = now;
  }

  entry.count += 1;
  rateLimitMap.set(ip, entry);

  if (entry.count > RATE_LIMIT_MAX) {
    return res.status(429).json({
      success: false,
      message: 'Too many requests. Please wait a moment and try again.',
    });
  }

  next();
};

// ─── Routes ───────────────────────────────────────────────────────────────────

/** Health check – also verifies SMTP connection. */
app.get('/api/health', async (_req, res) => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    res.json({
      status: 'ok',
      smtpConnected: true,
      message: 'DeCode backend server & SMTP connection are healthy.',
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      smtpConnected: false,
      error: error.message,
    });
  }
});

/** Admin login — validates against .env credentials. */
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required.' });
  }

  const validUsername = process.env.ADMIN_USERNAME || 'divinecode01';
  const validPassword = process.env.ADMIN_PASSWORD || '782274';

  if (username === validUsername && password === validPassword) {
    return res.json({
      success: true,
      token: `admin-${Date.now()}`,
      message: 'Admin authenticated successfully.',
    });
  }

  return res.status(401).json({ success: false, message: 'Invalid admin credentials.' });
});

/**
 * Contact / Proposal form submission.
 * Fires admin notification + client auto-reply.
 */
app.post('/api/contact', rateLimit, async (req, res) => {
  const { name, email, company, projectType, message } = req.body || {};

  // Validate required fields
  if (!name?.trim()) {
    return res.status(400).json({ success: false, message: 'Name is required.' });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ success: false, message: 'A valid email address is required.' });
  }
  if (!message?.trim()) {
    return res.status(400).json({ success: false, message: 'Message / project overview is required.' });
  }

  try {
    const result = await sendContactEmail({ name, email, company, projectType, message });

    res.json({
      success: true,
      message: 'Proposal request submitted successfully! Check your inbox for a confirmation.',
      adminMessageId: result.adminInfo?.messageId,
      clientReplySent: !!result.clientInfo,
      clientReplyError: result.clientError ?? null,
    });
  } catch (error) {
    console.error('[/api/contact] Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to send proposal email. Please try again later.',
      error: error.message,
    });
  }
});

/**
 * Direct reply / thank-you email to a recipient.
 * Protected by a simple API secret to prevent abuse.
 */
app.post('/api/reply', rateLimit, async (req, res) => {
  // Require Authorization header: Bearer <ADMIN_PASSWORD>
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  const validSecret = process.env.ADMIN_PASSWORD || '782274';

  if (token !== validSecret) {
    return res.status(403).json({ success: false, message: 'Forbidden: invalid or missing API token.' });
  }

  const { name, email, customMessage } = req.body || {};

  if (!isValidEmail(email)) {
    return res.status(400).json({ success: false, message: 'A valid recipient email is required.' });
  }

  try {
    const info = await sendReplyEmail({ name, email, customMessage });
    res.json({
      success: true,
      message: 'Reply email sent successfully!',
      messageId: info.messageId,
    });
  } catch (error) {
    console.error('[/api/reply] Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to send reply email.',
      error: error.message,
    });
  }
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 DeCode Mail & API Server running at http://localhost:${PORT}`);
});
