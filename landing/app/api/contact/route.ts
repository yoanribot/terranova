import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

export const runtime = "nodejs";

const transportSendInBlue = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_LOGIN,
    pass: process.env.BREVO_SMTP_KEY,
  },
});

const contactSchema = z.object({
  name: z.string().min(1).max(32),
  lastname: z.string().min(1).max(50),
  phone: z.string().min(7).max(40),
  email: z.string().email().max(100),
  message: z.string().min(10).max(500),
  time: z.array(z.string()).optional(),
  day: z.array(z.string()).optional(),
});

const DEFAULT_RECIPIENTS = "y.ribot13@gmail.com";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function splitEmails(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function POST(request: NextRequest) {
  const payload = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { status: "ERROR", error: "Invalid payload" },
      { status: 400 },
    );
  }

  const { name, lastname, phone, email, message, time, day } = parsed.data;
  const fromAddress = email;
  const recipients = splitEmails(
    process.env.CONTACT_EMAIL || DEFAULT_RECIPIENTS,
  );

  if (!fromAddress || recipients.length === 0) {
    return NextResponse.json(
      { status: "ERROR", error: "Missing mail configuration" },
      { status: 500 },
    );
  }

  const safeName = escapeHtml(name);
  const safeLastname = escapeHtml(lastname);
  const safePhone = escapeHtml(phone);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
  const safeTime = (time ?? []).map(escapeHtml).join(", ") || "No indicado";
  const safeDay = (day ?? []).map(escapeHtml).join(", ") || "No indicado";

  const mail = {
    from: recipients[0], // Use the first recipient as the "from" address for better deliverability
    to: recipients,
    subject: "WEB Terranova - Nuevo mensaje de contacto",
    text: `Name: ${name} ${lastname}\nEmail: ${email}\nPhone: ${phone}\nHorarios: ${time?.join(", ") ?? "No indicado"}\nDias: ${day?.join(", ") ?? "No indicado"}\nMessage: ${message}`,
    html: `
      <p>Name: ${safeName} ${safeLastname}</p>
      <p>Email: ${safeEmail}</p>
      <p>Phone: ${safePhone}</p>
      <p>Horarios: ${safeTime}</p>
      <p>Dias: ${safeDay}</p>
      <p>Message: ${safeMessage}</p>
    `.trim(),
  };

  try {
    await transportSendInBlue.sendMail(mail);
    console.log("Contact sent");
    console.log("Mail content:", mail);

    return NextResponse.json({ status: "Message Sent" });
  } catch (error) {
    console.error("Contact email failed", error);

    return NextResponse.json(
      { status: "ERROR", error: "Failed to send" },
      { status: 500 },
    );
  }
}
