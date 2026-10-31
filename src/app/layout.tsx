import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/motion/Preloader";
import { PageTransition } from "@/components/motion/PageTransition";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import {
  JsonLd,
  localBusinessLd,
  rootMetadata,
  getSiteSettings,
} from "@/lib/seo";
import { site } from "@/data/site";

// Self-hosted Inter variable (opsz + wght axes) — no runtime request to Google Fonts.
const inter = localFont({
  src: [
    { path: "../fonts/inter-normal.woff2", weight: "100 900", style: "normal" },
    { path: "../fonts/inter-italic.woff2", weight: "100 900", style: "italic" },
  ],
  variable: "--font-inter",
  display: "swap",
});

// Title template, default description and verification tags come from Sanity siteSettings.
export async function generateMetadata(): Promise<Metadata> {
  return rootMetadata();
}

export const viewport: Viewport = {
  themeColor: "#0b0b0b",
  width: "device-width",
  initialScale: 1,
};

// Every page renders per request so the CSP nonce is unique; Sanity data is still cached (1h + webhook purge).
export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();
  const phone = settings?.phone ?? site.phone;
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-orange focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <Preloader />
        <PageTransition />
        <Header
          phone={phone}
          phoneHref={`tel:${phone.replace(/[^+\d]/g, "")}`}
        />
        <main id="main">{children}</main>
        <Footer settings={settings} />
        <JsonLd data={localBusinessLd(settings)} />
      </body>
    </html>
  );
}
