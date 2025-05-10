import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email") || "unknown";
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const userAgent = req.headers.get("user-agent") || "unknown";

  const logLine = `[${new Date().toISOString()}] ${email} - ${ip} - ${userAgent}\n`;

  const logPath = path.join(process.cwd(), "public", "open-tracking.log");
  fs.appendFileSync(logPath, logLine);

  const pixel = Buffer.from("R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==", "base64");

  return new Response(pixel, {
    status: 200,
    headers: {
      "Content-Type": "image/gif",
      "Content-Length": pixel.length.toString(),
    },
  });
}
