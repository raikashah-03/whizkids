import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY || 're_FBsr4S1H_9Rj4SdqWqxn7ox4rDfBzpTPY';
const resend = new Resend(resendApiKey);

export async function sendMail({
  subject,
  html,
  to,
  replyTo,
}: {
  subject: string;
  html: string;
  to: string;
  replyTo?: string;
}) {
  console.log('--- Resend sendMail Execution ---');
  console.log('To:', to);

  const fromEmail = process.env.RESEND_FROM_EMAIL || 'contact@whizkidsinternationaljayamahal.com';
  const fromName = 'Whizkids International';

  try {
    const { data, error } = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: [to],
      subject: subject,
      replyTo: replyTo,
      html: html,
    });

    if (error) {
      console.error('❌ Resend API delivery error:', error);
      return { success: false, error: error.message };
    }

    console.log('✅ Resend email dispatched successfully ID:', data?.id);
    return { success: true, result: data };
  } catch (err) {
    console.error('❌ Resend SDK Exception:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

export default sendMail;
