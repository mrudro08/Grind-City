import type { Metadata } from "next";
import { buildMetadata, JsonLd, breadcrumbLd } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/ui/Marquee";
import { Button } from "@/components/ui/Button";
import {
  AboutArt,
  Story,
  Values,
  Crew,
} from "@/components/sections/AboutSections";
import { Cta } from "@/components/sections/Cta";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("about", {
    title: "About — born in Grind City",
    description:
      "We're a Memphis crew that turned a hand wash into an experience. Not the car wash you drive to — the one that shows up, with the tunnel, the lounge and the games.",
    path: "/about",
    image: "/images/iso-memphis.webp",
  });
}

export default function AboutPage() {
  return (
    <>
      <Hero
        variant="dark"
        compact
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        line1="Born in"
        line2="Grind City."
        intro="We're a Memphis crew that turned a hand wash into an experience. Not the car wash you drive to — the one that shows up, with the tunnel, the lounge and the games."
        actions={
          <>
            <Button href="/pop-up#this-weekend" magnetic>
              This weekend&apos;s spot
            </Button>
            <Button href="#crew" variant="outline">
              Work with us
            </Button>
          </>
        }
        aside={<AboutArt />}
      />
      <Marquee />
      <Story />
      <Values />
      <div id="crew">
        <Crew />
      </div>
      <Cta />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
    </>
  );
}
