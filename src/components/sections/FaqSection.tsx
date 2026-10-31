import { faqs } from "@/data/content";
import { site } from "@/data/site";
import { Section, SectionHeader, Pattern } from "@/components/ui/Primitives";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { FaqAccordion } from "@/components/sections/Faq";
import { JsonLd, faqLd } from "@/lib/seo";

type Props = { page: string; eyebrow?: string; line1?: string; line2?: string; intro?: string; tone?: "light" | "dark" };

export function FaqSection({ page, eyebrow = "Quick answers", line1 = "Good to", line2 = "know.", intro = "Everything people ask us at the tunnel. Anything else — just text us.", tone = "light" }: Props) {
  const items = faqs.filter((f) => f.pages.includes(page));
  const light = tone === "light";
  return (
    <Section id="faq" tone={light ? "light" : "dark"}>
      <Pattern kind="dots" className={light ? "right-0 top-0 h-full w-[36%] text-ink/[0.08]" : "right-0 top-0 h-full w-[36%] text-white/[0.06]"} />
      <Pattern kind="iso" className={light ? "left-0 top-0 h-full w-[40%] text-ink/[0.05]" : "left-0 top-0 h-full w-[40%] text-white/[0.04]"} />
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeader eyebrow={eyebrow} line1={line1} line2={line2} light={!light} />
          <Reveal className="-mt-8 lg:-mt-12">
            <p className={light ? "max-w-[460px] text-lg text-smoke" : "max-w-[460px] text-lg text-white/70"}>{intro}</p>
            <Card tone={light ? "dark" : "orange"} className="mt-10 max-w-[520px]">
              <div className="p-8">
                <p className={light ? "label text-[11px] text-orange" : "label text-[11px] text-ink/70"}>Still curious?</p>
                <p className="display mt-3 text-[clamp(26px,2.6vw,36px)] not-italic">
                  Call or text
                  <br />
                  {site.phone}
                </p>
                <div className="mt-6">
                  <Button href={site.phoneHref} variant={light ? "primary" : "dark"}>
                    Text us
                  </Button>
                </div>
              </div>
            </Card>
          </Reveal>
        </div>
        <Reveal effect="up" className="lg:col-span-7">
          <FaqAccordion items={items} light={light} />
        </Reveal>
      </div>
      <JsonLd data={faqLd(items)} />
    </Section>
  );
}
