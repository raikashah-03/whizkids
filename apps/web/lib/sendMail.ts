import nodemailer from 'nodemailer';

async function sendMail({ subject, html, to }: { subject: string; html: string; to: string }) {
  console.log('Attempting to send email to:', to);
  console.log('Using SMTP Host:', process.env.NEXT_PUBLIC_SEVER);
  console.log('Using SMTP Port:', process.env.NEXT_PUBLIC_PORT);
  console.log('Using SMTP User:', process.env.NEXT_PUBLIC_USER);

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.NEXT_PUBLIC_SEVER,
      port: Number(process.env.NEXT_PUBLIC_PORT),
      secure: process.env.NEXT_PUBLIC_PORT === '465',
      auth: {
        user: process.env.NEXT_PUBLIC_USER,
        pass: process.env.NEXT_PUBLIC_PASSKEY,
      },
    });

    const mailOptions = {
      from: '"Whizkids" <whizkidsjayamahal@gmail.com>', // Verified sender email
      to: to,
      subject: subject,
      html: html,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully. SMTP Response:', result.response);
    return { success: true, result };
  } catch (error) {
    console.error('Nodemailer Error:', error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}

export default sendMail;
