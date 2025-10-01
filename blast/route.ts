import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";
import { requireAdmin } from "@/lib/auth";

const client = twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!);

function isAllowedOrigin(req: NextRequest) {
  const allow = (process.env.ALLOW_SMS_ORIGINS || "").split(",").map(s => s.trim());
  const origin = req.headers.get("origin") || "";
  return !origin || allow.includes(origin);
}

function toE164Haiti(raw: string) {
  const digits = raw.replace(/[^\d]/g, "");
  if (digits.length === 8) return `+509${digits}`;
  if (digits.startsWith("509") && digits.length === 11) return `+${digits}`;
  if (digits.startsWith("00")) return `+${digits.slice(2)}`;
  if (digits.startsWith("+509") && digits.length === 12) return digits;
  return "";
}

async function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

export async function POST(req: NextRequest) {
  if (!isAllowedOrigin(req)) return NextResponse.json({ error: "Origin not allowed" }, { status: 403 });

  // *** ADMIN CHECK ***
  const cookie = req.cookies.get("bss_admin")?.value;
  const ok = await requireAdmin(cookie);
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { numbers, message, throttleMs = 1200 } = await req.json();
    if (!Array.isArray(numbers) || !message) {
      return NextResponse.json({ error: "Provide { numbers: string[], message: string }" }, { status: 400 });
    }

    const cleaned = Array.from(new Set(numbers.map(toE164Haiti).filter(Boolean)));
    if (!cleaned.length) return NextResponse.json({ error: "No valid +509 numbers" }, { status: 400 });

    const results: Array<{ to: string; sid?: string; status?: string; error?: string }> = [];
    for (const to of cleaned) {
      const params: any = { to, body: message };
      if (process.env.TWILIO_MESSAGING_SERVICE_SID) params.messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
      else params.from = process.env.TWILIO_FROM;

      try {
        const msg = await client.messages.create(params);
        results.push({ to, sid: msg.sid, status: msg.status });
      } catch (e: any) {
        results.push({ to, error: e?.message || "send_failed" });
      }
      await sleep(throttleMs);
    }

    return NextResponse.json({
      count_submitted: numbers.length,
      count_sent: results.filter(r => r.sid).length,
      results
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "blast_failed" }, { status: 500 });
  }
}
