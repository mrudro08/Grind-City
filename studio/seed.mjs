// Seeds the dataset with the site's current static content + one `page` doc per route.
// Usage: SANITY_STUDIO_PROJECT_ID=xxx SANITY_SEED_TOKEN=sk... node seed.mjs
import "dotenv/config";
import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? "2g5iq8c7";
const token = process.env.SANITY_SEED_TOKEN;
if (!token) {
  console.error("Set SANITY_SEED_TOKEN (an Editor token from sanity.io/manage → API → Tokens) in studio/.env");
  process.exit(1);
}
const client = createClient({ projectId, dataset: process.env.SANITY_STUDIO_DATASET ?? "production", apiVersion: "2026-10-01", token, useCdn: false });

const pages = [
  { slug: "home", title: "Home", metaTitle: "Grind City Detail — The car wash that shows up", metaDescription: "Memphis' mobile hand car wash. Weekend pop-ups across the city, Employee Appreciation Days at your workplace and recurring fleet washing at your yard.", keywords: ["car wash Memphis", "mobile car wash", "hand car wash", "pop-up car wash"] },
  { slug: "pop-up", title: "Pop-Up", metaTitle: "Weekend car wash pop-ups in Memphis", metaDescription: "Weekend hand-wash pop-ups in high-traffic lots across Memphis — tunnel, lounge, shootout, Connect 4. No appointment, just pull in.", keywords: ["weekend car wash Memphis", "pop-up car wash", "hand wash near me"] },
  { slug: "fleet", title: "Fleet", metaTitle: "Fleet washing in Memphis — recurring, on your schedule", metaDescription: "Recurring exterior hand washes for box trucks, vans, pickups and equipment at your Memphis yard. Weekly, bi-weekly or monthly, with a photo log and one monthly invoice.", keywords: ["fleet washing Memphis", "truck washing service", "commercial vehicle wash"] },
  { slug: "employers", title: "Employers", metaTitle: "Employee Appreciation Day — we bring the car wash to your workplace", metaDescription: "Grind City Detail brings the pod to your Memphis workplace — the branded wash tunnel, the lounge, the games — for an Employee Appreciation Day your people will remember.", keywords: ["employee appreciation day Memphis", "workplace car wash", "employee perks Memphis"] },
  { slug: "about", title: "About", metaTitle: "About — born in Grind City", metaDescription: "We're a Memphis crew that turned a hand wash into an experience. Not the car wash you drive to — the one that shows up." },
  { slug: "reviews", title: "Reviews", metaTitle: "Reviews — 4.9 stars, Memphis said it", metaDescription: "Weekend drivers, HR teams and fleet managers on Grind City Detail — Memphis' mobile hand car wash. 4.9 stars on Google." },
  { slug: "privacy", title: "Privacy", metaTitle: "Privacy & SMS terms", metaDescription: "How Grind City Detail handles your contact details and text alerts.", noIndex: true },
];

const tx = client.transaction();
tx.createIfNotExists({
  _id: "siteSettings",
  _type: "siteSettings",
  siteName: "Grind City Detail",
  tagline: "Grind hard. Shine harder.",
  description: "Memphis' mobile hand car wash. Weekend pop-ups across the city, Employee Appreciation Days at your workplace and recurring fleet washing at your yard.",
  phone: "(901) 555-0142",
  email: "hello@grindcitydetail.com",
  city: "Memphis",
  region: "TN",
  hours: { popups: "Fri–Sun: pop-ups", weekdays: "Mon–Thu: workplaces & fleets" },
  rating: { value: 4.9, count: 312 },
  social: { instagram: "https://instagram.com/grindcitydetail", tiktok: "https://tiktok.com/@grindcitydetail", facebook: "https://facebook.com/grindcitydetail" },
  titleTemplate: "%s · Grind City Detail",
  seo: { metaTitle: "Grind City Detail — The car wash that shows up", metaDescription: "Memphis' mobile hand car wash. Weekend pop-ups, Employee Appreciation Days and fleet washing.", keywords: ["car wash Memphis", "mobile detailing Memphis"] },
});
for (const p of pages) {
  const { slug, title, ...seo } = p;
  tx.createIfNotExists({ _id: `page-${slug}`, _type: "page", title, slug: { _type: "slug", current: slug }, seo });
}
const res = await tx.commit();
console.log(`Seeded ${res.results.length} documents. Open the Studio → Pages (SEO) to edit.`);
