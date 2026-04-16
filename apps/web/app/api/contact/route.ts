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

    const result = await sendMail({
      subject: `New Message from ${name || email}`,
      to: "manikantadev254@gmail.com",
      html: htmlContent,
    });

    console.log("sendMail result:", result);

    if (result.success) {
      console.log("Email API success");
      return NextResponse.json({ message: "Email sent successfully" });
    } else {
      console.error("Email API failure:", result.error);
      return NextResponse.json(
        { error: "Failed to send email", details: result.error },
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
