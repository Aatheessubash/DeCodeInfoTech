import { sendContactEmail } from '@/lib/mailer';
import { handleSubmission, parseContact } from '@/lib/submissions';

export async function POST(request: Request) {
  return handleSubmission(request, parseContact, sendContactEmail);
}
