import nodemailer from 'nodemailer';

async function sendMail({ subject, html, to, replyTo }: { subject: string; html: string; to: string; replyTo?: string }) {
  const host = process.env.SMTP_HOST || process.env.NEXT_PUBLIC_SERVER || process.env.NEXT_PUBLIC_SEVER;
  const port = process.env.SMTP_PORT || process.env.NEXT_PUBLIC_PORT;
  const user = process.env.SMTP_USER || process.env.NEXT_PUBLIC_USER;
  const pass = process.env.SMTP_PASSKEY || process.env.NEXT_PUBLIC_PASSKEY;

  console.log('--- sendMail Execution ---');
  console.log('To:', to);
  console.log('SMTP Host:', host || 'UNDEFINED (Nodemailer will fallback to localhost)');
  console.log('SMTP Port:', port || 'UNDEFINED (Nodemailer will fallback to 587)');
  console.log('SMTP User:', user || 'UNDEFINED');
  console.log('SMTP Passkey Length:', pass ? pass.length : 'UNDEFINED');

  const missingVars = [];
  if (!host) missingVars.push('SMTP_HOST/NEXT_PUBLIC_SERVER/NEXT_PUBLIC_SEVER');
  if (!port) missingVars.push('SMTP_PORT/NEXT_PUBLIC_PORT');
  if (!user) missingVars.push('SMTP_USER/NEXT_PUBLIC_USER');
  if (!pass) missingVars.push('SMTP_PASSKEY/NEXT_PUBLIC_PASSKEY');

  if (missingVars.length > 0) {
    console.warn('⚠️ SMTP WARNING: Missing environment variables:', missingVars.join(', '));
    console.warn('If you recently created or updated .env.local, please stop (Ctrl+C) and restart your dev server with: pnpm run dev');
  }

  try {
    const transporter = nodemailer.createTransport({
      host: host,
      port: Number(port),
      secure: port === '465',
      auth: {
        user: user,
        pass: pass,
      },
    });

    console.log('Verifying connection with SMTP server...');
    await transporter.verify();
    console.log('SMTP connection established and verified successfully!');

    const mailOptions = {
      from: '"Whizkids" <whizkidsjayamahal@gmail.com>',
      to: to,
      replyTo: replyTo,
      subject: subject,
      html: html,
    };

    console.log('Sending mail...');
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully. SMTP Response:', result.response);
    return { success: true, result };
  } catch (error) {
    console.error('Nodemailer Error encountered:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
      debugInfo: {
        host: host || null,
        port: port || null,
        user: user || null,
        hasPass: !!pass,
        missingVars,
        errorStack: error instanceof Error ? error.stack : undefined
      }
    };
  }
}

export default sendMail;
