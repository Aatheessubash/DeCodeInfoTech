import { NextResponse } from 'next/server';
import { sendCareerEmail } from '@/lib/mailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, portfolio, experience, coverLetter, jobTitle } = body;

    if (!name || !email || !portfolio) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and portfolio are required.' },
        { status: 400 }
      );
    }

    try {
      await sendCareerEmail({
        name,
        email,
        phone,
        portfolio,
        experience,
        coverLetter,
        jobTitle: jobTitle || 'General Application',
      });
    } catch (mailError) {
      console.warn('Mail dispatch warning:', mailError);
    }

    return NextResponse.json({
      success: true,
      message: 'Candidate application submitted successfully.',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || 'Server error' },
      { status: 500 }
    );
  }
}
