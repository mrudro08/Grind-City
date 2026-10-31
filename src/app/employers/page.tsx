import type { Metadata } from "next";
import { site } from "@/data/site";
import { buildMetadata, JsonLd, serviceLd, breadcrumbLd } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/ui/Marquee";
import { Button } from "@/components/ui/Button";
import { EmployerForm } from "@/components/sections/EmployerForm";
import {
  EmployerHow,
  EmployerPanels,
  ThreeWays,
  PickYourDate,
} from "@/components/sections/EmployerSections";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("employers", {
    title:
      "Employee Appreciation Day — we bring the car wash to your workplace",
    description:
      "Grind City Detail brings the pod to your Memphis workplace — the branded wash tunnel, the lounge, the games — for an Employee Appreciation Day your people will remember. Three ways to pay, 30-car minimum.",
    path: "/employers",
    image: "/images/hero-employers.webp",
  });
}

export default function EmployersPage() {
  return (
    <>
      <Hero
        image={{
          src: "/images/hero-employers.webp",
          alt: "Grind City Detail's wash tunnel set up in an office parking lot",
          position: "center 45%",
        }}
        crumbs={[{ label: "Home", href: "/" }, { label: "Employers" }]}
        line1="We bring the"
        line2="experience to you."
        intro="Grind City Detail brings the pod to your workplace — the branded wash tunnel, the lounge, the games — for an Employee Appreciation Day your people will actually remember."
        actions={
          <>
            <Button href={site.phoneHref} magnetic>
              Call {site.phone}
            </Button>
            <Button href="#book" variant="outline">
              Request a date
            </Button>
          </>
        }
        aside={<EmployerForm compact />}
      />
      <Marquee />
      <EmployerHow />
      <EmployerPanels />
      <ThreeWays />
      <PickYourDate />
      <JsonLd
        data={serviceLd(
          "Employee Appreciation Day car wash",
          "On-site hand car wash experience for workplaces in Memphis — tunnel, lounge and games on your lot.",
          "/employers",
        )}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Employers", path: "/employers" },
        ])}
      />
    </>
  );
}
