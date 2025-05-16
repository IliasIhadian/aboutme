// app/api/pageview/route.ts
import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unbekannt";
  const userAgent = req.headers.get("user-agent") || "unbekannt";


  console.log("📥 API aufgerufen");
  console.log("🔐 REACT_APP_GMAIL_APP_USER:", process.env.REACT_APP_GMAIL_APP_USER ? "gesetzt" : "leer");
  console.log("🔐 REACT_APP_GMAIL_APP_PASSWORD:", process.env.REACT_APP_GMAIL_APP_PASSWORD ? "gesetzt" : "leer");


  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.REACT_APP_GMAIL_APP_USER,
      pass: process.env.REACT_APP_GMAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: '"Page Tracker" <${process.env.REACT_APP_GMAIL_APP_USER}>',
    to: "i.ihadian@gmail.com",
    subject: "🖥️ Homepage geöffnet",
    text: `Die Homepage wurde aufgerufen.\n\nIP: ${ip}\nUser-Agent: ${userAgent}`,
  });

  return new Response("ok");
}
