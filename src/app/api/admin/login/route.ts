import { createHash, timingSafeEqual } from 'node:crypto';

function matches(actual: string, expected: string) {
  const digest = (value: string) => createHash('sha256').update(value).digest();
  return timingSafeEqual(digest(actual), digest(expected));
}

// This unlocks the browser-local editor. It does not create a server session.
export async function POST(request: Request) {
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
    return Response.json(
      { success: false, message: 'Invalid admin credentials.' },
      { status: 401 },
    );
  }
  return Response.json({ success: true });
}
