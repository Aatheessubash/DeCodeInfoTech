import { createHash, timingSafeEqual } from 'node:crypto';
import { checkRateLimit } from '../../../../lib/rate-limit.js';
import { checkPayloadSize, getClientIp, verifySameOrigin } from '../../../../lib/security.js';

function matches(actual: string, expected: string) {
  const digest = (value: string) => createHash('sha256').update(value).digest();
  return timingSafeEqual(digest(actual), digest(expected));
}

// Maximum 5 login attempts per 15 minutes per IP to block brute-force attacks
const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

// This unlocks the browser-local editor. It does not create a server session.
export async function POST(request: Request) {
  if (!verifySameOrigin(request)) {
    return Response.json(
      { success: false, message: 'Cross-origin request forbidden.' },
      { status: 403 },
    );
  }

  if (!checkPayloadSize(request, 4 * 1024)) {
    return Response.json(
      { success: false, message: 'Request payload exceeds limit.' },
      { status: 413 },
    );
  }

  const clientIp = getClientIp(request);
  const rateLimit = checkRateLimit('admin-login', clientIp, MAX_LOGIN_ATTEMPTS, LOGIN_WINDOW_MS);

  if (!rateLimit.allowed) {
    return Response.json(
      {
        success: false,
        message: 'Too many failed login attempts. Please wait 15 minutes before trying again.',
      },
      {
        status: 429,
        headers: { 'Retry-After': String(rateLimit.resetSeconds) },
      },
    );
  }

  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  if (!username || !password) {
    return Response.json(
      { success: false, message: 'Admin access is not configured.' },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ success: false, message: 'Invalid JSON body.' }, { status: 400 });
  }
  if (
    !body ||
    typeof body !== 'object' ||
    !('username' in body) ||
    !('password' in body) ||
    typeof body.username !== 'string' ||
    typeof body.password !== 'string'
  ) {
    return Response.json(
      { success: false, message: 'Username and password are required.' },
      { status: 400 },
    );
  }
  const validUsername = matches(body.username, username);
  const validPassword = matches(body.password, password);
  if (!validUsername || !validPassword) {
    // Artificial timing delay on authentication failure to thwart brute-forcing
    await new Promise((resolve) => setTimeout(resolve, 250));
    return Response.json(
      { success: false, message: 'Invalid admin credentials.' },
      { status: 401 },
    );
  }
  return Response.json({ success: true });
}
