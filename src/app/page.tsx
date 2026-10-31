import type { Metadata } from "next";
import { site } from "@/data/site";
import { thisWeekend } from "@/data/events";
import { buildMetadata, JsonLd, eventLd } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { LeadCard } from "@/components/sections/LeadCard";
import { Marquee } from "@/components/ui/Marquee";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Primitives";
import {
  Services,
  Experience,
  Stats,
  EmployerTeaser,
} from "@/components/sections/HomeSections";
import { ThisWeekend } from "@/components/sections/ThisWeekend";
import { Reviews } from "@/components/sections/Reviews";
import { FaqSection } from "@/components/sections/FaqSection";
import { Cta } from "@/components/sections/Cta";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("home", {
    title: `${site.name} — The car wash that shows up`,
    description: site.description,
    path: "/",
  });
}

export default function HomePage() {
  return (
    <>
      <Hero
        image={{
          src: "/images/hero-home.webp",
          alt: "Grind City Detail's branded hand-wash tunnel at a weekend pop-up in Memphis",
          position: "center 40%",
        }}
        eyebrow={
          <Eyebrow light dot>
            Weekend car wash pop-ups · Memphis
          </Eyebrow>
        }
        line1="Grind hard."
        line2="That shows up."
        intro="The car wash that shows up. Weekend pop-ups across Memphis and recurring fleet washing at your yard."
        actions={
          <>
            <Button href="/pop-up#this-weekend" magnetic>
              This weekend&apos;s pop-up
            </Button>
            <Button href="/fleet#quote" variant="outline">
              Get a fleet quote
            </Button>
          </>
        }
        proof
        aside={<LeadCard />}
      />
      <Marquee />
      <Services />
      <Experience />
      <Stats />
      <ThisWeekend />
      <EmployerTeaser />
      <Reviews compact />
      <FaqSection page="home" />
      <Cta />
      <JsonLd data={eventLd(thisWeekend)} />
    </>
  );
}
