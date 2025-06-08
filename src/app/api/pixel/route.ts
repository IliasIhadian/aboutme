import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic"; // ⬅️ wichtig für App Router

// Liste der IPs, die keine Email-Benachrichtigung auslösen sollen
const EXCLUDED_IPS = [
  "108.177",  // Beispiel IP - bitte durch deine eigenen IPs ersetzen
  "64.252"      // Beispiel IP - bitte durch deine eigenen IPs ersetzen
];

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email") || "unbekannt";
  const ip = req.headers.get("x-forwarded-for") || "unbekannt";
  const userAgent = req.headers.get("user-agent") || "unbekannt";

  console.log("📥 API aufgerufen");
  console.log("🔐 REACT_APP_GMAIL_APP_USER:", process.env.REACT_APP_GMAIL_APP_USER ? "gesetzt" : "leer");
  console.log("🔐 REACT_APP_GMAIL_APP_PASSWORD:", process.env.REACT_APP_GMAIL_APP_PASSWORD ? "gesetzt" : "leer");

  // Wenn ENV fehlt → sofort abbrechen
  if (!process.env.REACT_APP_GMAIL_APP_USER || !process.env.REACT_APP_GMAIL_APP_PASSWORD) {
    console.error("❌ GMAIL-Zugangsdaten fehlen!");
    return new Response("Server Error: Mail config fehlt", { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.REACT_APP_GMAIL_APP_USER,
      pass: process.env.REACT_APP_GMAIL_APP_PASSWORD,
    },
  });

  // Prüfe ob die IP in der Ausnahmeliste ist
  const isExcludedIP = EXCLUDED_IPS.includes(ip);
  
  if (!isExcludedIP) {
    try {
      await transporter.sendMail({
        from: `"EmailTracker" <${process.env.REACT_APP_GMAIL_APP_USER}>`,
        to: "ilias@ihadian.com",
        subject: `📩 Email geöffnet: ${email}`,
        text: `Email geöffnet!\n\nEmpfänger: ${email}\nIP: ${ip}\nUser-Agent: ${userAgent}`,
      });

      console.log("✅ Mail erfolgreich versendet");
    } catch (err) {
      console.error("❌ Fehler beim Mailversand:", err);
      return new Response("Fehler beim Mailversand", { status: 500 });
    }
  } else {
    console.log("🔒 Ausgeschlossene IP erkannt - keine Email gesendet");
  }

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
