import { sendReplyEmail } from './sendMail.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const name = process.argv[2] || 'Valued Client';
const email = process.argv[3] || process.env.SMTP_USER;
const customMessage = process.argv[4] || '';

console.log(`Sending reply email to ${email}...`);

sendReplyEmail({
  name,
  email,
  customMessage,
})
  .then((info) => {
    console.log('--------------------------------------------------');
    console.log('✅ Reply email sent successfully!');
    console.log('Recipient:', email);
    console.log('Subject: Thanks for contacting DeCode InfoTech - Our team will reach out soon!');
    console.log('Message ID:', info.messageId);
    console.log('--------------------------------------------------');
  })
  .catch((err) => {
    console.error('❌ Failed to send reply email:', err.message);
  });
