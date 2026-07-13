import sendMail from "@/lib/sendMail";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();

    // Basic validation
    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message are required" },
        { status: 400 }
      );
    }

    const htmlContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name || "Not provided"}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

    // 1. Send email to admin (whizkidsjayamahal@gmail.com)
    const result = await sendMail({
      subject: `New Message from ${name || email}`,
      to: "manikantadev254@gmail.com",
      replyTo: email,
      html: htmlContent,
    });

    console.log("sendMail admin result:", result);

    if (result.success) {
      console.log("Admin email sent successfully");

      // 2. Send confirmation/thank you email to the user
      const userHtmlContent = `
        <div style="font-family: 'Nunito', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e4f3f7; border-radius: 20px; background-color: #fbfbfb; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #FDA924; font-family: 'DynaPuff', sans-serif; margin: 0; font-size: 24px;">Thank You for Reaching Out!</h2>
          </div>
          <p>Dear ${name || "Parent"},</p>
          <p>We have successfully received your enquiry. Thank you for contacting <strong>Whizkids International Preschool Jayamahal</strong>.</p>
          <p>Our team is currently reviewing your message, and we will get in touch with you within the next <strong>24 hours</strong>.</p>
          <p style="margin-top: 24px;">If you have any urgent questions, feel free to reply directly to this email or contact us at <a href="mailto:whizkidsjayamahal@gmail.com" style="color: #29BFDF; text-decoration: none; font-weight: bold;">whizkidsjayamahal@gmail.com</a>.</p>
          <hr style="border: none; border-top: 1px solid #e4f3f7; margin: 25px 0;" />
          <p style="font-size: 0.9em; color: #666; line-height: 1.4;">
            Best regards,<br />
            <strong>Admissions Team</strong><br />
            <span style="color: #FDA924; font-weight: bold;">Whizkids International Preschool Jayamahal</span>
          </p>
        </div>
      `;

      try {
        await sendMail({
          subject: "We've received your enquiry - Whizkids Jayamahal",
          to: email,
          html: userHtmlContent,
        });
        console.log("Confirmation email sent to:", email);
      } catch (confirmError) {
        console.error("Failed to send user confirmation email:", confirmError);
      }

      return NextResponse.json({ message: "Email sent successfully" });
    } else {
      console.error("Email API failure:", result.error, (result as any).debugInfo);
      return NextResponse.json(
        { 
          error: "Failed to send email", 
          details: result.error,
          debug: (result as any).debugInfo 
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
