# Grind City Detail — website

Next.js 16 (App Router) build of the Grind City Detail site, implemented from the **✅ Final Designs** page in Figma.
Built by Algostar.

## Stack

- **Next.js 16.4** · App Router · TypeScript · React 19
- **Tailwind CSS v4** (design tokens in `src/app/globals.css` → `@theme`)
- **GSAP 3.15** + `@gsap/react` (SplitText, ScrambleText, ScrollTrigger — all free in GSAP 3.13+)
- **Inter** variable font, self-hosted in `src/fonts/` via `next/font/local` (no Google Fonts request)
- **Sanity** for SEO + site settings now (Studio in `/studio`), static data layer in `src/data/` for the rest until the design is final
- **Lenis** smooth scroll, **zod** validation, strict **CSP** via `proxy.ts`

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
npm run lint
```

## Structure

```
src/
  app/
    layout.tsx           Inter font, Header/Footer, Preloader, PageTransition, LocalBusiness JSON-LD
    page.tsx             Home
    pop-up/  fleet/  employers/  about/  reviews/  privacy/
    api/lead/route.ts    Hardened lead intake → Sanity / webhook / Resend
    api/revalidate/      Sanity webhook → cache purge
    sitemap.ts robots.ts not-found.tsx
    globals.css          Tokens, .display/.eyebrow/.label type, corner-cut utilities, patterns
  data/
    site.ts              siteSettings (name, phone, email, hours, socials, rating, nav, footer)
    events.ts            popupEvent[] (+ thisWeekend / upcoming / areas)
    content.ts           reviews, washPackages, fleetPlans, vehicles, faqs, crew, stats, experience,
                         services, payOptions, employerSteps
  proxy.ts               CSP nonce + security headers (runs on every page request)
  env.ts                 zod-validated environment
  sanity/                client (cached fetch), GROQ queries, image URL builder, types
  lib/
    lead-schema.ts       zod schemas shared by forms and API
    rate-limit.ts        in-memory sliding window
    gsap.ts              registerGsap(), constants, prefersReducedMotion(), isDesktop()
    seo.ts               buildMetadata() (Sanity → fallback), rootMetadata(), JsonLd (nonce), schema.org helpers
    cn.ts
  components/
    forms/    useLeadForm (validation + status), Field errors, FormSuccess, FormError, Chips, Honeypot
    layout/   Header (transparent → frosted, hide on scroll, scramble nav, mobile menu), Footer
    ui/       Button, Field, Card, Primitives (Logo, Stripes, Eyebrow, Tag, Stars, Section,
              SectionHeader, Pattern), Marquee, SignupForm
    motion/   Reveal (fade-blur), SplitReveal (masked lines), ImageReveal (clip wipe + parallax),
              Counter, useScramble, Preloader, PageTransition
    sections/ Hero + all page sections (Home*, Popup*, Fleet*, Employer*, About*, ReviewsPage*),
              ThisWeekend, Reviews/ReviewCard/ReviewRail, Faq/FaqSection, Cta, forms
public/images/           28 optimised WebP assets exported from the Figma asset board
studio/                  Sanity Studio (schemas, desk structure, seed script) — separate package
```

## Design system notes

- **Corner cuts**: `.cut` (24px) / `.cut-sm` (12px) / `.cut-lg` (36px) / `.cut-xs` (8px) clip-path shapes.
  Strokes are drawn with `.cut-stroke` — an absolutely positioned overlay masked into a hollow
  chamfered frame, so outlined buttons/cards work over photos and transparent fills.
- **Type**: `.display` = Inter Black Italic, uppercase, −3% tracking, 0.96 line-height.
  `.eyebrow` / `.label` = bold caps with wide tracking.
- **Patterns**: `.pat-dots`, `.pat-stripes`, `.pat-iso` use `currentColor` — set opacity with a
  text colour class (e.g. `text-white/[0.05]`). `Pattern kind="mark"` is the faint 3-stripe brand mark.
- **Layout**: 1680px content width, 60px side padding ≥1024px (→ 120px margins at 1920), 24px on mobile.

## Motion

| Effect | Where |
|---|---|
| Preloader (stripes → wordmark → progress → orange wipe), once per session, ~1.5s | `motion/Preloader.tsx` |
| Route transition: orange slanted panel wipe on internal link clicks | `motion/PageTransition.tsx` |
| Fade-in-blur reveal on scroll (`Reveal`), staggered children | everywhere |
| Masked line reveal for display headlines (`SplitReveal`) | heroes, section headers |
| Clip-path image wipe + subtle parallax (`ImageReveal`) | cards / tiles |
| Count-up stats with progress bars (`Counter`) | Stats, About, Reviews |
| Scramble text on hover (nav links, button labels) · desktop only | `useScramble` |
| Button hover: fill sweep, arrow nudge, lift, optional magnetic pull | `ui/Button.tsx` |
| Marquee band loop, slows on hover | `ui/Marquee.tsx` |
| Header hides on scroll-down, returns on scroll-up | `layout/Header.tsx` |

All motion animates only `transform` / `opacity` / `filter` / `clip-path`, content is in the HTML before
JS runs, and `prefers-reduced-motion` collapses everything to simple fades.

## SEO

- One `<h1>` per page, semantic sections, `generateMetadata`-style `pageMeta()` per route
  (title template, description, canonical, OG/Twitter).
- `sitemap.xml`, `robots.txt`, `metadataBase` from `site.url`.
- JSON-LD: `AutoWash` LocalBusiness (global), `Event` per pop-up, `Service` per service page,
  `FAQPage` per FAQ block, `AggregateRating` + `Review` on /reviews.
- `next/image` with AVIF/WebP, hero image `priority`, self-hosted font with `display: swap`.

## Sanity (SEO + site settings — live now)

Every page's `<head>` is controlled from the Studio. Precedence for each field:
**Page → SEO** (Sanity) → **Site settings → Default SEO** (Sanity) → developer fallback in the page file.

Editable per page: meta title, meta description, keywords, OG/social title, OG description,
OG image (1200×630, hotspot-cropped), canonical URL, noindex, nofollow.
Editable site-wide: title template (`%s · Grind City Detail`), default SEO, Google Search Console
verification, business name/phone/email/hours/socials/rating (feeds the footer, header and the
LocalBusiness JSON-LD).

### Setup (one time, ~10 minutes)

Project ID **`2g5iq8c7`** is already wired into `.env.local`, `.env.example` and the Studio config.

1. Open the project at sanity.io/manage → `2g5iq8c7`. Make sure a dataset named **production** exists (Datasets → Create, public).
2. In the project: **API → CORS origins** add `http://localhost:3000` and the production domain.
   **API → Tokens**: create an *Editor* token (for seeding and for `/api/lead` to store leads).
3. Studio: `cd studio` → paste the Editor token into `.env` as `SANITY_SEED_TOKEN`, then
   `npm install && npm run seed` creates the Site settings singleton and one Page document per
   route with today's copy, so nothing on the live site changes until an editor edits it.
4. `npm run dev` (Studio at http://localhost:3333) or `npm run deploy` → `https://grindcitydetail.sanity.studio`.
5. Next app: `.env.local` already has the project ID. On the server also set
   `SANITY_API_WRITE_TOKEN` (optional — saves leads into Sanity) and `SANITY_REVALIDATE_SECRET`.
6. Instant publish: **API → Webhooks** → URL `https://<domain>/api/revalidate?secret=<SANITY_REVALIDATE_SECRET>`,
   trigger on create/update/delete. Sanity data is otherwise cached for 1 hour.

If Sanity is unreachable or the dataset is empty the site renders from `src/data/` and the code
fallbacks: fetches time out after 2.5 s with no retries, and a circuit breaker skips Sanity for 60 s
after a failure, so an outage never slows a page.

The remaining content types (pop-up events, reviews, FAQs, packages, plans, crew, stats) are
already in the Studio schema and can be switched on once the design is final: replace each
`import … from "@/data/…"` with a `sanityFetch()` + GROQ query in the page (see `src/sanity/`).

## Security

- **Strict CSP** with a per-request nonce (`src/proxy.ts`): `script-src 'self' 'nonce-…' 'strict-dynamic'`,
  `object-src 'none'`, `frame-ancestors 'none'`, `base-uri 'self'`, `form-action 'self'`,
  `upgrade-insecure-requests`. Inline JSON-LD carries the nonce; nothing else inline runs.
  (`style-src 'unsafe-inline'` remains because GSAP/React set style attributes — no script risk.)
- **Headers** (`next.config.ts`): HSTS preload, `X-Frame-Options: DENY`, `nosniff`, Referrer-Policy,
  Permissions-Policy, COOP, no `X-Powered-By`; immutable caching for hashed assets, `no-store` for APIs.
- **/api/lead**: same-origin check → 8 KB body limit → per-IP rate limit (6/min) → JSON parse →
  honeypot → zod validation (shared with the client forms) → fan-out to Sanity / webhook / Resend.
  Generic responses, PII-free logs, 5 s timeouts on outbound calls.
- **/api/revalidate**: constant-time secret comparison.
- **Env validation** (`src/env.ts`, zod) fails the build on malformed config. Secrets never reach the client.
- All Sanity reads are server-only (`import "server-only"`); the write token is only used in the API route.

## Motion (all cases)

| Case | Behaviour |
|---|---|
| Loading | Preloader (once/session), orange route wipe, hero masked-line reveal, `Reveal` fade-blur on scroll |
| Scrolling | Lenis smooth scroll synced to GSAP ticker; eased anchor links with header offset; reduced-motion → native |
| Hover | Button fill sweep + arrow nudge + lift + scramble label (+ magnetic on key CTAs); card lift; nav underline; marquee slows |
| FAQ | Height/opacity ease with answer slide, plus→minus icon rotation, hover scale |
| Form fill | Field stroke/accent/label ease to orange on focus with 1 px lift; inline errors slide open + shake; button spinner & shimmer while sending; animated success (badge pop, check draw, text rise); chip groups with sliding highlight; tab underline slides |
| Reduced motion | Every effect collapses to a simple fade or no-op |

## Deploying (Node server)

`npm run build && npm start` on any Node 20+ host (Vercel, Hostinger Node.js app, VPS with PM2).
Set the environment variables from `.env.example`. Pages render per request (required for the CSP
nonce); Sanity reads are cached and purged by webhook, so hosting cost stays minimal.

## Placeholders to replace before launch

- All prices (`$00`) and any copy marked `PLACEHOLDER` in `src/data/content.ts`
- Phone / email / social URLs and the Google review links in `src/data/site.ts` and `/reviews`
- Lot names and addresses in `src/data/events.ts`
- Crew photos (About), client logos (Reviews strip), founding year (About)
- Privacy / SMS terms page copy
