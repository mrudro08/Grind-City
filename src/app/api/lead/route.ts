import { NextResponse } from "next/server";
import { z } from "zod";
import { env } from "@/env";
import { leadSchema, leadLabels } from "@/lib/lead-schema";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { writeClient } from "@/sanity/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 8 * 1024;

/**
 * Lead intake. Defence in depth:
 *   same-origin check → size limit → rate limit per IP → JSON parse → honeypot → zod validation
 * Then fan out to whichever sinks are configured (Sanity, webhook, email). Always answers
 * with a generic body so the endpoint leaks nothing about configuration.
 */
export async function POST(req: Request) {
  // 1. Same-origin only (browsers always send Origin on cross-site POSTs)
  const origin = req.headers.get("origin");
  const allowed = new Set([env.NEXT_PUBLIC_SITE_URL, process.env.NODE_ENV === "development" ? "http://localhost:3000" : ""].filter(Boolean));
  const host = req.headers.get("host");
  if (origin && !allowed.has(origin) && !(host && origin.endsWith(`//${host}`))) {
    return NextResponse.json({ ok: false }, { status: 403 });
  }

  // 2. Size limit
  const length = Number(req.headers.get("content-length") ?? 0);
  if (length > MAX_BYTES) return NextResponse.json({ ok: false }, { status: 413 });

  // 3. Rate limit
  const ip = clientIp(req);
  const rl = rateLimit(`lead:${ip}`, 6, 60_000);
  if (!rl.ok) return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429, headers: { "Retry-After": String(rl.retryAfter) } });

  // 4. Parse
  let raw: unknown;
  try {
    const text = await req.text();
    if (text.length > MAX_BYTES) return NextResponse.json({ ok: false }, { status: 413 });
    raw = JSON.parse(text);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // 5. Honeypot — pretend success so bots don't adapt
  if (raw && typeof raw === "object" && (raw as Record<string, unknown>).website) {
    return NextResponse.json({ ok: true });
  }

  // 6. Validate
  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Validation failed", issues: z.treeifyError(parsed.error) }, { status: 422 });
  }
  const lead = parsed.data;
  const { website: _hp, ...clean } = lead; // never persist the honeypot field
  void _hp;

  // 7. Fan out — failures are logged, never surfaced to the visitor
  const results = await Promise.allSettled([saveToSanity(clean), postWebhook(clean), sendEmail(clean)]);
  results.forEach((r, i) => {
    if (r.status === "rejected") console.error(`[lead] sink ${["sanity", "webhook", "email"][i]} failed:`, r.reason instanceof Error ? r.reason.message : r.reason);
  });
  console.info(`[lead] ${lead.type} received (ip ${ip.replace(/\.\d+$/, ".x")})`); // no PII in logs

  return NextResponse.json({ ok: true });
}

type Clean = Omit<z.infer<typeof leadSchema>, "website">;

async function saveToSanity(lead: Clean) {
  if (!writeClient) return;
  await writeClient.create({ _type: "lead", status: "new", receivedAt: new Date().toISOString(), ...lead });
}

async function postWebhook(lead: Clean) {
  if (!env.LEAD_WEBHOOK_URL) return;
  const res = await fetch(env.LEAD_WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead), signal: AbortSignal.timeout(5000) });
  if (!res.ok) throw new Error(`webhook ${res.status}`);
}

async function sendEmail(lead: Clean) {
  if (!env.RESEND_API_KEY || !env.LEAD_TO_EMAIL || !env.LEAD_FROM_EMAIL) return;
  const esc = (v: unknown) => String(v ?? "").replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" })[c]!);
  const rows = Object.entries(lead)
    .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#6a6a6a">${esc(k)}</td><td style="padding:6px 0"><strong>${esc(v)}</strong></td></tr>`)
    .join("");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: `Grind City Detail <${env.LEAD_FROM_EMAIL}>`,
      to: [env.LEAD_TO_EMAIL],
      reply_to: "email" in lead && lead.email ? lead.email : undefined,
      subject: `[GCD] ${leadLabels[lead.type]} — ${lead.name}`,
      html: `<table style="font:14px Inter,system-ui,sans-serif">${rows}</table>`,
    }),
    signal: AbortSignal.timeout(5000),
  });
  if (!res.ok) throw new Error(`resend ${res.status}`);
}
