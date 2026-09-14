import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Username and password are required.' },
        { status: 400 }
      );
    }

    const validUsername = process.env.ADMIN_USERNAME || 'divinecode01';
    const validPassword = process.env.ADMIN_PASSWORD || '782274';

    if (username === validUsername && password === validPassword) {
      return NextResponse.json({
        success: true,
        token: `admin-${Date.now()}`,
        message: 'Admin authenticated successfully.',
      });
    }

    return NextResponse.json(
      { success: false, message: 'Invalid admin credentials.' },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || 'Server error' },
      { status: 500 }
    );
  }
}
