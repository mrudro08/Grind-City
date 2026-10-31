import type { Metadata } from "next";
import { buildMetadata, JsonLd, serviceLd, breadcrumbLd } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/ui/Marquee";
import { Button } from "@/components/ui/Button";
import { FleetQuoteForm } from "@/components/sections/FleetQuoteForm";
import {
  WeWash,
  HowItWorks,
  Plans,
  BuiltFor,
  FleetQuote,
  QuoteSection,
} from "@/components/sections/FleetSections";
import { FaqSection } from "@/components/sections/FaqSection";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("fleet", {
    title: "Fleet washing in Memphis — recurring, on your schedule",
    description:
      "Recurring exterior hand washes for box trucks, vans, pickups and equipment at your Memphis yard. Weekly, bi-weekly or monthly, with a photo log and one monthly invoice.",
    path: "/fleet",
    image: "/images/hero-fleet.webp",
  });
}

export default function FleetPage() {
  return (
    <>
      <Hero
        image={{
          src: "/images/hero-fleet.webp",
          alt: "Grind City Detail crew hand-washing a row of fleet vans at a yard",
          position: "center 35%",
        }}
        crumbs={[{ label: "Home", href: "/" }, { label: "Fleet" }]}
        line1="Your fleet."
        line2="Clean on schedule."
        intro="Recurring exterior hand washes for box trucks, vans, pickups and equipment. We show up Mon–Thu on your schedule, log every vehicle with photos, and send one invoice a month."
        bullets={["Insured", "Photo log every wash", "Monthly invoicing · ACH"]}
        actions={
          <>
            <Button href="#quote" magnetic>
              Get my fleet quote
            </Button>
            <Button href="#how" variant="outline">
              How it works
            </Button>
          </>
        }
        aside={<FleetQuoteForm compact />}
      />
      <Marquee />
      <WeWash />
      <HowItWorks />
      <Plans />
      <BuiltFor />
      <FleetQuote />
      <FaqSection
        page="fleet"
        eyebrow="Fleet FAQ"
        line1="Questions"
        line2="we get a lot."
        intro="Still have questions? Call or text and a crew lead will walk you through it."
        tone="dark"
      />
      <QuoteSection />
      <JsonLd
        data={serviceLd(
          "Fleet washing",
          "Recurring exterior hand washes for commercial fleets at your yard in Memphis.",
          "/fleet",
        )}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Fleet", path: "/fleet" },
        ])}
      />
    </>
  );
}
