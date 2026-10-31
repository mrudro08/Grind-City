import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/data/site";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("privacy", {
    title: "Privacy & SMS terms",
    description:
      "How Grind City Detail handles your contact details and text alerts.",
    path: "/privacy",
    noIndex: true,
  });
}

export default function PrivacyPage() {
  return (
    <section className="bg-bone text-ink">
      <div className="mx-auto w-full max-w-[880px] px-6 pb-32 pt-[160px] md:px-10">
        <p className="label text-[11px] text-orange">Legal</p>
        <h1 className="display mt-6 text-[clamp(40px,6vw,80px)]">
          Privacy &amp; SMS terms.
        </h1>
        <div className="mt-10 flex flex-col gap-5 text-[17px] leading-[1.65] text-smoke">
          <p>
            PLACEHOLDER — Client to supply final privacy policy. This page
            exists so the footer link and SMS opt-in copy have a destination
            before launch.
          </p>
          <p>
            By joining pop-up alerts you agree to receive recurring text
            messages and emails from {site.name} about upcoming pop-up
            locations. Message frequency varies. Msg &amp; data rates may apply.
            Reply STOP to cancel, HELP for help.
          </p>
          <p>
            Questions:{" "}
            <a
              href={`mailto:${site.email}`}
              className="font-semibold text-ink underline"
            >
              {site.email}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
