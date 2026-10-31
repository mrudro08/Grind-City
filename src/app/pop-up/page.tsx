import type { Metadata } from "next";
import { events } from "@/data/events";
import {
  buildMetadata,
  JsonLd,
  eventLd,
  serviceLd,
  breadcrumbLd,
} from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import {
  WeekendCard,
  Calendar,
  Menu,
  HowAVisitWorks,
} from "@/components/sections/PopupSections";
import { Marquee } from "@/components/ui/Marquee";
import { Button } from "@/components/ui/Button";
import { EmployerTeaser } from "@/components/sections/HomeSections";
import { FaqSection } from "@/components/sections/FaqSection";
import { Cta } from "@/components/sections/Cta";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("pop-up", {
    title: "Weekend car wash pop-ups in Memphis",
    description:
      "Weekend hand-wash pop-ups in high-traffic lots across Memphis — tunnel, lounge, shootout, Connect 4. No appointment, just pull in. See this weekend's lot and upcoming dates.",
    path: "/pop-up",
  });
}

export default function PopupPage() {
  return (
    <>
      <div id="this-weekend">
        <Hero
          image={{
            src: "/images/hero-home.webp",
            alt: "Grind City Detail pop-up tunnel at a Memphis parking lot",
            position: "center 40%",
          }}
          crumbs={[{ label: "Home", href: "/" }, { label: "Pop-Up" }]}
          line1="We pull up."
          line2="You shine."
          intro="Weekend hand-wash pop-ups in high-traffic lots across Memphis — tunnel, lounge, shootout, Connect 4. No appointment, just pull in. Booking for your team? See our employer pop-ups."
          actions={
            <>
              <Button href="#upcoming" magnetic>
                This weekend&apos;s spot
              </Button>
              <Button href="/employers" variant="outline">
                For employers
              </Button>
            </>
          }
          proof
          aside={<WeekendCard />}
        />
      </div>
      <Marquee />
      <Calendar />
      <Menu />
      <HowAVisitWorks />
      <EmployerTeaser />
      <FaqSection page="pop-up" />
      <Cta />
      <JsonLd
        data={[
          serviceLd(
            "Weekend car wash pop-ups",
            "Hand-wash pop-ups in Memphis parking lots every Friday to Sunday.",
            "/pop-up",
          ),
          ...events.map(eventLd),
        ]}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Pop-Up", path: "/pop-up" },
        ])}
      />
    </>
  );
}
