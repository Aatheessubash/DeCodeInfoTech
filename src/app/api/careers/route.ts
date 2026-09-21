import { sendCareerEmail } from '@/lib/mailer';
import { handleSubmission, parseCareer } from '@/lib/submissions';

export async function POST(request: Request) {
  return handleSubmission(request, parseCareer, sendCareerEmail);
}
