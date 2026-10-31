import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { timingSafeEqual } from "node:crypto";
import { env } from "@/env";
import { REVALIDATE_TAG } from "@/sanity/client";

export const runtime = "nodejs";

/**
 * Sanity webhook target. Configure in sanity.io/manage → API → Webhooks:
 *   URL: https://<site>/api/revalidate?secret=<SANITY_REVALIDATE_SECRET>   Trigger: create/update/delete
 * Purges every cached Sanity query so SEO edits go live within seconds.
 */
export async function POST(req: Request) {
  const secret = env.SANITY_REVALIDATE_SECRET;
  const given = new URL(req.url).searchParams.get("secret") ?? "";
  if (!secret || given.length !== secret.length || !timingSafeEqual(Buffer.from(given), Buffer.from(secret))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  let body: { _type?: string; slug?: { current?: string } } = {};
  try {
    body = await req.json();
  } catch {}
  revalidateTag(REVALIDATE_TAG, "max");
  if (body._type) revalidateTag(body._type, "max");
  if (body._type === "page" && body.slug?.current) revalidateTag(`page:${body.slug.current}`, "max");
  return NextResponse.json({ ok: true, revalidated: true, now: Date.now() });
}
