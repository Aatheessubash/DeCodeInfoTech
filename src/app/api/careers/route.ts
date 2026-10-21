import { sendCareerEmail } from '@/lib/mailer';
import { handleSubmission, parseCareer } from '@/lib/submissions';

export async function POST(request: Request) {
  return handleSubmission(request, parseCareer, sendCareerEmail, {
    maxBytes: 10 * 1024 * 1024,
    rateLimitBucket: 'career-form',
  });
}
