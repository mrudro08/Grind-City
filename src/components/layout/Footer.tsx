import Link from "next/link";
import { footerColumns, site as defaults } from "@/data/site";
import type { SiteSettings } from "@/sanity/types";
import { Logo } from "@/components/ui/Primitives";
import { SignupForm } from "@/components/ui/SignupForm";

/** Footer. Contact details come from Sanity siteSettings when present, otherwise src/data/site.ts. */
export function Footer({ settings }: { settings?: SiteSettings | null }) {
  const phone = settings?.phone ?? defaults.phone;
  const site = {
    ...defaults,
    name: settings?.siteName ?? defaults.name,
    description: settings?.description ?? defaults.description,
    phone,
    phoneHref: `tel:${phone.replace(/[^+\d]/g, "")}`,
    email: settings?.email ?? defaults.email,
    hours: { popups: settings?.hours?.popups ?? defaults.hours.popups, weekdays: settings?.hours?.weekdays ?? defaults.hours.weekdays },
    social: { ...defaults.social, ...Object.fromEntries(Object.entries(settings?.social ?? {}).filter(([, v]) => v)) },
  };
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="pat-dots pointer-events-none absolute inset-0 text-white/[0.12]" aria-hidden />
      <div className="relative mx-auto w-full max-w-[1680px] px-6 pt-20 md:px-10 lg:px-[60px] 3xl:px-0 lg:pt-[120px]">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo />
            <p className="display mt-8 text-[clamp(32px,4vw,56px)] leading-[0.96]">
              Grind hard.
              <br />
              <span className="text-orange">Shine harder.</span>
            </p>
            <p className="mt-6 max-w-[420px] text-white/60">{site.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-4">
            {footerColumns.map((c) => (
              <div key={c.title}>
                <p className="label text-[11px] tracking-[0.16em] text-orange">{c.title}</p>
                <ul className="mt-5 flex flex-col gap-3">
                  {c.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-[15px] text-white/75 transition-colors hover:text-orange">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3">
            <p className="label text-[11px] tracking-[0.16em] text-orange">Pop-up alerts</p>
            <p className="mt-5 text-[15px] text-white/75">Get a text when we announce the next lot. No spam, ever.</p>
            <div className="mt-5">
              <SignupForm compact />
            </div>
            <div className="mt-8 flex flex-col gap-2 text-[15px] text-white/75">
              <a href={site.phoneHref} className="hover:text-orange">
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="hover:text-orange">
                {site.email}
              </a>
              <span className="text-white/45">
                {site.hours.popups} · {site.hours.weekdays}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 py-7 text-[12px] text-white/45 sm:flex-row sm:items-center sm:justify-between lg:mt-24">
          <p>
            © {new Date().getFullYear()} {site.name}. Memphis, TN. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6">
            <a href={site.social.instagram} target="_blank" rel="noreferrer" className="label text-[11px] hover:text-orange">
              Instagram
            </a>
            <a href={site.social.tiktok} target="_blank" rel="noreferrer" className="label text-[11px] hover:text-orange">
              TikTok
            </a>
            <a href={site.social.facebook} target="_blank" rel="noreferrer" className="label text-[11px] hover:text-orange">
              Facebook
            </a>
            <Link href="/privacy" className="label text-[11px] hover:text-orange">
              Privacy
            </Link>
            <span className="label text-[11px] text-white/30">Site by Algostar</span>
          </div>
        </div>
      </div>

      <div className="fade-b relative select-none overflow-hidden" aria-hidden>
        <p className="display whitespace-nowrap text-center text-[clamp(72px,16vw,300px)] leading-[0.8] text-white/[0.04]">GRIND CITY</p>
      </div>
    </footer>
  );
}
