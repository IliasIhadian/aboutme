import { NextRequest } from "next/server";
import nodemailer from "nodemailer";
import { secret } from '@aws-amplify/backend';
export const dynamic = 'force-dynamic'; // ← wichtig!


export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email") || "unbekannt";
  const ip = req.headers.get("x-forwarded-for") || "unbekannt";
  const userAgent = req.headers.get("user-agent") || "unbekannt";

  console.log("📥 API aufgerufen");

    console.log("🔐 GMAIL_APP_USER:", secret('GMAIL_APP_USER') ? "gesetzt" : "leer");
    console.log("🔐 GMAIL_APP_PASSWORD:", secret('GMAIL_APP_PASSWORD') ? "gesetzt" : "leer");

  // ✅ Mailer einrichten (mit AWS SES oder SMTP)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: secret('GMAIL_APP_USER'),
      pass: secret('GMAIL_APP_PASSWORD'),
    },
  });
  

  await transporter.sendMail({
    from: '"PixelTracker" <mail@ihadian.com>',
    to: "ilias@ihadian.com",
    subject: `📩 Pixel geöffnet: ${email}`,
    text: `Das Pixel wurde geöffnet.\n\nEmpfänger: ${email}\nIP: ${ip}\nUser-Agent: ${userAgent}`,
  });

  // 1x1 transparent GIF zurückgeben
  const pixel = Buffer.from("R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==", "base64");

  return new Response(pixel, {
    status: 200,
    headers: {
      "Content-Type": "image/gif",
      "Content-Length": pixel.length.toString(),
    },
  });
}
