import { NextResponse } from 'next/server';
import { createTransporter } from '@/lib/mailer';

export async function GET() {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    return NextResponse.json({
      status: 'ok',
      smtpConnected: true,
      message: 'DeCode backend & SMTP connection are healthy.',
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 'ok',
      smtpConnected: false,
      note: 'SMTP not configured or offline',
      error: error?.message,
    });
  }
}
