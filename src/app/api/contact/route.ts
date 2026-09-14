import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/mailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, projectType, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    try {
      await sendContactEmail({ name, email, company, projectType, message });
    } catch (mailError) {
      console.warn('Mail dispatch warning:', mailError);
    }

    return NextResponse.json({
      success: true,
      message: 'Proposal request received successfully.',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || 'Server error' },
      { status: 500 }
    );
  }
}
