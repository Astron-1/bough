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
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: Boolean(process.env.EMAIL_SERVER_SECURE === "true"),
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    // Prepare email content
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO || process.env.EMAIL_FROM,
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
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Company:</strong> ${company}</p>
${city ? `<p><strong>City:</strong> ${city}</p>` : ""}
${country ? `<p><strong>Country:</strong> ${country}</p>` : ""}
${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
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
