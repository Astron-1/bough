import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

type ContactFormData = {
  name: string;
  email: string;
  company: string;
  city?: string;
  country?: string;
  phone?: string;
  message?: string;
};

type ResponseData = {
  success: boolean;
  message: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  const { name, email, company, city, country, phone, message } =
    req.body as ContactFormData;

  // Validate required fields
  if (!name || !email || !company) {
    console.log("Missing required fields:", {
      name,
      email,
      company,
      city,
      country,
      phone,
      message,
    });
    return res.status(400).json({
      success: false,
      message: "Please fill in all required fields",
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email address",
    });
  }

  // Log environment variables (without sensitive info)
  console.log("Email configuration:", {
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    secure: process.env.EMAIL_SERVER_SECURE,
    user: process.env.EMAIL_SERVER_USER ? "✓ Set" : "✗ Not set",
    pass: process.env.EMAIL_SERVER_PASSWORD ? "✓ Set" : "✗ Not set",
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO || process.env.EMAIL_FROM,
  });

  try {
    // Create a transporter
    console.log("Creating transporter...");
    console.log(process.env.EMAIL_SERVER_HOST);
    console.log(process.env.EMAIL_SERVER_PORT);
    console.log(process.env.EMAIL_SERVER_SECURE);
    console.log(process.env.EMAIL_SERVER_USER);
    console.log(process.env.EMAIL_SERVER_PASSWORD);

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST || "smtp.mailersend.net",
      port: Number(process.env.EMAIL_SERVER_PORT) || 587,
      secure: Boolean(process.env.EMAIL_SERVER_SECURE === "false"),
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD ,
      },
      tls: {
        minVersion: 'TLSv1.2',
        maxVersion: 'TLSv1.3'
      }
    });

    // Prepare email content
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO || "arpits.connect@gmail.com",
      subject: `Contact Form: ${name} from ${company}`,
      replyTo: email,
      text: `
Name: ${name}
Email: ${email}
Company: ${company}
${city ? `City: ${city}` : ""}
${country ? `Country: ${country}` : ""}
${phone ? `Phone: ${phone}` : ""}
${message ? `Message: ${message}` : ""}
      `.trim(),
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: Arial, sans-serif; color: #374151;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 20px 0; text-align: center; background-color: #ffffff;">
        <h1 style="margin: 0; color: #1f2937; font-size: 24px; font-weight: 600;">New Contact Inquiry</h1>
      </td>
    </tr>
  </table>
  
  <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
    <tr>
      <td style="padding: 24px;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">Name</p>
              <p style="margin: 4px 0 0; color: #111827; font-size: 16px;">${name}</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">Email</p>
              <p style="margin: 4px 0 0; color: #111827; font-size: 16px;">${email}</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">Company</p>
              <p style="margin: 4px 0 0; color: #111827; font-size: 16px;">${company}</p>
            </td>
          </tr>
          ${city ? `
          <tr>
            <td style="padding: 12px 0;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">City</p>
              <p style="margin: 4px 0 0; color: #111827; font-size: 16px;">${city}</p>
            </td>
          </tr>
          ` : ''}
          ${country ? `
          <tr>
            <td style="padding: 12px 0;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">Country</p>
              <p style="margin: 4px 0 0; color: #111827; font-size: 16px;">${country}</p>
            </td>
          </tr>
          ` : ''}
          ${phone ? `
          <tr>
            <td style="padding: 12px 0;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">Phone</p>
              <p style="margin: 4px 0 0; color: #111827; font-size: 16px;">${phone}</p>
            </td>
          </tr>
          ` : ''}
          ${message ? `
          <tr>
            <td style="padding: 12px 0;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">Message</p>
              <p style="margin: 4px 0 0; color: #111827; font-size: 16px; white-space: pre-wrap;">${message}</p>
            </td>
          </tr>
          ` : ''}
        </table>
      </td>
    </tr>
  </table>
  
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 24px; text-align: center;">
        <p style="margin: 0; color: #6b7280; font-size: 14px;">This is an automated message from your contact form.</p>
      </td>
    </tr>
  </table>
</body>
</html>
      `.trim(),
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);

    // Return success response
    res.status(200).json({
      success: true,
      message: "Thank you for your message. We will get back to you soon!",
    });
  } catch (error) {
    console.error("Error sending email:", error);

    // Return detailed error in development
    if (process.env.NODE_ENV !== "production") {
      return res.status(500).json({
        success: false,
        message:
          "There was a problem sending your message. Please try again later.",
        error: error instanceof Error ? String(error.message) : String(error),
      });
    }

    res.status(500).json({
      success: false,
      message:
        "There was a problem sending your message. Please try again later.",
    });
  }
}
