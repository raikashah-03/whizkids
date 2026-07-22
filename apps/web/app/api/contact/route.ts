import sendMail from "@/lib/sendMail";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, phone, message, subject: customSubject } = await req.json();

    // Basic validation
    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message are required" },
        { status: 400 }
      );
    }

    const emailTopic = customSubject || "General Inquiry";
    const adminRecipient = process.env.ADMIN_EMAIL || "whizkidsjayamahal@gmail.com";
    const formattedDate = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

    // ─── 1. Ultra-Clean Admin Notification Email ──────────────────────────────
    const adminHtmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Inquiry Notification</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222222; -webkit-font-smoothing: antialiased;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f6f8; padding: 24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 580px; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e1e4e8; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 24px 32px; background-color: #171717; text-align: left;">
              <div style="font-size: 18px; font-weight: 700; color: #ffffff; letter-spacing: -0.2px;">Whizkids International Preschool</div>
              <div style="font-size: 13px; color: #aaaaaa; margin-top: 4px;">New Website Lead Notification</div>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 32px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px; background-color: #f8f9fa; border-radius: 8px; border: 1px solid #e9ecef;">
                <tr>
                  <td style="padding: 16px;">
                    <div style="font-size: 12px; font-weight: 700; color: #6c757d; text-transform: uppercase; letter-spacing: 0.5px;">Inquiry Topic</div>
                    <div style="font-size: 15px; font-weight: 600; color: #171717; margin-top: 2px;">${emailTopic}</div>
                  </td>
                  <td align="right" style="padding: 16px; font-size: 12px; color: #6c757d;">
                    ${formattedDate}
                  </td>
                </tr>
              </table>

              <div style="font-size: 13px; font-weight: 700; color: #495057; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;">Contact Details</div>
              
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 14px; margin-bottom: 24px; line-height: 1.6;">
                <tr>
                  <td style="padding: 6px 0; color: #6c757d; width: 100px;">Full Name:</td>
                  <td style="padding: 6px 0; color: #171717; font-weight: 600;">${name || "Not provided"}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #6c757d;">Email:</td>
                  <td style="padding: 6px 0; color: #0969da; font-weight: 600;"><a href="mailto:${email}" style="color: #0969da; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #6c757d;">Phone:</td>
                  <td style="padding: 6px 0; color: #171717; font-weight: 600;">${phone ? `<a href="tel:${phone}" style="color: #171717; text-decoration: none;">${phone}</a>` : "Not provided"}</td>
                </tr>
              </table>

              <div style="font-size: 13px; font-weight: 700; color: #495057; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Message</div>
              <div style="padding: 16px; background-color: #f8f9fa; border-radius: 8px; border: 1px solid #e9ecef; font-size: 14px; line-height: 1.6; color: #212529; white-space: pre-wrap; margin-bottom: 28px;">${message}</div>

              <!-- Button -->
              <div style="text-align: center;">
                <a href="mailto:${email}" style="display: inline-block; padding: 12px 24px; background-color: #FDA924; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 14px; border-radius: 6px;">Reply to Parent</a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 16px 32px; background-color: #f8f9fa; border-top: 1px solid #e1e4e8; text-align: center; font-size: 12px; color: #6c757d;">
              Whizkids International Preschool Jayamahal • Automated Inquiry System
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    // Send admin notification email
    const adminResult = await sendMail({
      subject: `New Inquiry: ${name || email} (${emailTopic})`,
      to: adminRecipient,
      replyTo: email,
      html: adminHtmlContent,
    });

    console.log("Admin email send result:", adminResult);

    if (adminResult.success) {
      // ─── 2. Ultra-Clean Parent Confirmation Email (High Deliverability) ─────
      const userHtmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inquiry Confirmation</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222222; -webkit-font-smoothing: antialiased;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f6f8; padding: 24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 580px; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e1e4e8; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 28px 32px; background-color: #ffffff; border-bottom: 2px solid #FDA924;">
              <div style="font-size: 20px; font-weight: 800; color: #FDA924; letter-spacing: -0.3px;">Whizkids International Preschool</div>
              <div style="font-size: 13px; color: #6c757d; margin-top: 2px;">Jayamahal, Bengaluru</div>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 32px; font-size: 14px; line-height: 1.6; color: #333333;">
              <p style="margin: 0 0 16px 0; font-size: 15px; font-weight: 600;">Dear ${name || "Parent"},</p>
              
              <p style="margin: 0 0 16px 0;">
                Thank you for reaching out to <strong>Whizkids International Preschool Jayamahal</strong>. We have successfully received your message regarding <strong>${emailTopic}</strong>.
              </p>

              <p style="margin: 0 0 24px 0;">
                Our admissions team is reviewing your details and will get back to you within 24 hours.
              </p>

              <div style="background-color: #f8f9fa; border-radius: 8px; border: 1px solid #e9ecef; padding: 16px; margin-bottom: 24px;">
                <div style="font-size: 12px; font-weight: 700; color: #6c757d; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Submitted Details Summary</div>
                <div style="font-size: 13px; color: #495057; margin-bottom: 4px;"><strong>Email:</strong> ${email}</div>
                ${phone ? `<div style="font-size: 13px; color: #495057; margin-bottom: 4px;"><strong>Phone:</strong> ${phone}</div>` : ""}
                <div style="font-size: 13px; color: #495057; margin-top: 8px; padding-top: 8px; border-top: 1px solid #dee2e6; font-style: italic;">
                  "${message.length > 140 ? message.substring(0, 140) + "..." : message}"
                </div>
              </div>

              <p style="margin: 0 0 24px 0; color: #6c757d; font-size: 13px;">
                If you have any immediate questions or wish to schedule a school visit, please reply directly to this email or reach us at <strong>+91 9876543210</strong>.
              </p>

              <hr style="border: none; border-top: 1px solid #e1e4e8; margin: 24px 0;" />

              <p style="margin: 0; font-size: 13px; color: #495057; line-height: 1.5;">
                Warm regards,<br />
                <strong>Admissions Team</strong><br />
                Whizkids International Preschool Jayamahal
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 16px 32px; background-color: #f8f9fa; border-top: 1px solid #e1e4e8; text-align: center; font-size: 12px; color: #6c757d;">
              12/2, 1st main, Nandi Durga Rd, Jayamahal, Bengaluru, Karnataka 560046
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `;

      try {
        const userResult = await sendMail({
          subject: "Inquiry Confirmation - Whizkids International Preschool",
          to: email,
          replyTo: adminRecipient,
          html: userHtmlContent,
        });
        if (userResult.success) {
          console.log("Confirmation email sent to parent:", email);
        } else {
          console.error("❌ Failed to send confirmation email to parent:", userResult.error);
        }
      } catch (userErr) {
        console.error("User confirmation dispatch warning:", userErr);
      }

      return NextResponse.json({ message: "Email sent successfully" });
    } else {
      console.error("Resend API Failure:", adminResult.error);
      return NextResponse.json(
        { error: "Failed to send email", details: adminResult.error },
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
