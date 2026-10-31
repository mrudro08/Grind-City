import Image from "next/image";
import { employerSteps, payOptions } from "@/data/content";
import { site } from "@/data/site";
import { Section, SectionHeader, Pattern, Tag, Eyebrow } from "@/components/ui/Primitives";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { EmployerForm } from "@/components/sections/EmployerForm";
import { cn } from "@/lib/cn";

export function EmployerHow() {
  return (
    <Section id="how" tone="light">
      <Pattern kind="dots" className="right-0 top-0 h-[60%] w-[36%] text-ink/[0.08]" />
      <SectionHeader eyebrow="Employee Appreciation Day" line2="How it works." />
      <Reveal stagger className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {employerSteps.map((s) => (
          <Card key={s.n} tone="light" stroke={s.hot ? "bg-orange" : undefined} lift className="h-full">
            <div className="flex h-full flex-col p-5">
              <div className="relative aspect-[4/3] overflow-hidden bg-bone">
                <Image src={s.img} alt={`Step ${s.n}`} fill sizes="(min-width:1280px) 25vw, (min-width:768px) 50vw, 100vw" className="object-cover" />
              </div>
              <span className={cn("display mt-6 text-[40px]", s.hot ? "text-orange" : "text-ink/25")}>{s.n}</span>
              <p className="mt-2 text-[17px] font-bold leading-snug text-ink">{s.text}</p>
            </div>
          </Card>
        ))}
      </Reveal>
    </Section>
  );
}

const panels = [
  { eyebrow: "What your team gets", title: "A clean car without leaving work.", text: "No errand, no weekend line — and they drive home feeling like their company actually sees them. That's the part they remember.", img: "/images/emp-team-gets.webp" },
  { eyebrow: "What you get", title: "A perk people notice — and talk about.", text: "Most workplaces offer nothing like this. A team that feels appreciated, because you showed it instead of just saying it. And goodwill that costs you one day on your lot.", img: "/images/emp-you-get.webp" },
];

export function EmployerPanels() {
  return (
    <Section tone="black">
      <Pattern kind="stripes" className="right-0 top-0 h-full w-[30%] text-white/[0.04]" />
      <div className="grid gap-6 lg:grid-cols-2">
        {panels.map((p) => (
          <ImageReveal key={p.title}>
            <Card tone="dark" size="lg" lift>
              <div className="relative">
                <div className="relative aspect-[16/11]">
                  <Image src={p.img} alt={p.title} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-char via-transparent to-transparent" aria-hidden />
                </div>
                <div className="p-8 pt-2 lg:p-10 lg:pt-2">
                  <Eyebrow light>{p.eyebrow}</Eyebrow>
                  <h3 className="display mt-5 text-[clamp(30px,3vw,44px)]">{p.title}</h3>
                  <p className="mt-4 max-w-[560px] text-[15px] leading-[1.6] text-white/65">{p.text}</p>
                </div>
              </div>
            </Card>
          </ImageReveal>
        ))}
      </div>
    </Section>
  );
}

export function ThreeWays() {
  return (
    <Section id="pricing" tone="light">
      <Pattern kind="iso" className="left-0 top-0 h-full w-[40%] text-ink/[0.05]" />
      <SectionHeader eyebrow="Pricing" line1="Three ways to pay —" line2="your company chooses." />
      <Reveal stagger className="grid gap-6 md:grid-cols-3">
        {payOptions.map((p, i) => (
          <Card key={p.n} tone={i === 0 ? "dark" : "light"} stroke={i === 0 ? "bg-orange" : undefined} lift className="h-full">
            <div className="flex h-full flex-col p-8">
              <div className="flex items-center justify-between">
                <span className="display text-[20px] text-orange">{p.n}</span>
                {i === 0 && <Tag hot>Full experience</Tag>}
              </div>
              <h3 className="display mt-6 text-[30px]">{p.title}</h3>
              <p className={cn("mt-4 text-[15px] leading-[1.6]", i === 0 ? "text-white/70" : "text-smoke")}>{p.body}</p>
              <div className="mt-auto flex gap-2 pt-8">
                {(
                  [
                    ["wash", "Wash"],
                    ["lounge", "Lounge"],
                    ["games", "Games"],
                  ] as const
                ).map(([k, l]) => {
                  const on = p.includes[k];
                  return (
                    <span key={k} className={cn("label flex items-center gap-1.5 px-2.5 py-1.5 text-[10px]", on ? "bg-orange text-ink" : i === 0 ? "bg-white/10 text-white/40" : "bg-ink/5 text-ink/40")}>
                      {on ? "✓" : "–"} {l}
                    </span>
                  );
                })}
              </div>
            </div>
          </Card>
        ))}
      </Reveal>
      <Reveal className="mt-6">
        <Card tone="orange">
          <div className="flex flex-col gap-6 p-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="display text-[clamp(22px,2.4vw,32px)] not-italic">Booked pop-ups start with a 30-car minimum.</p>
              <p className="mt-1 text-[15px] text-ink/75">Pricing is quoted by team size — call us for your number.</p>
            </div>
            <Button href={site.phoneHref} variant="dark">
              Call {site.phone}
            </Button>
          </div>
        </Card>
      </Reveal>
    </Section>
  );
}

export function PickYourDate() {
  return (
    <Section id="book" tone="black">
      <Pattern kind="mark" className="-left-[6%] top-[20%] h-[60%] w-[30%]" />
      <Pattern kind="dots" className="right-0 bottom-0 h-[50%] w-[40%] text-white/[0.06]" />
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <Eyebrow light>Book your day</Eyebrow>
          <SplitReveal as="h2" className="display mt-8 text-[clamp(44px,5.6vw,80px)]">
            Pick your
            <br />
            <span className="text-orange">date.</span>
          </SplitReveal>
          <Reveal className="mt-6 max-w-[440px] text-lg text-white/70">
            <p>Call us to pick a date — or send your details and we&apos;ll call you back.</p>
          </Reveal>
          <Reveal className="mt-10">
            <Card tone="dark">
              <div className="flex flex-col gap-5 p-7 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="label text-[10px] text-orange">Call us</p>
                  <a href={site.phoneHref} className="display mt-1 block text-[clamp(26px,2.6vw,36px)] not-italic hover:text-orange">
                    {site.phone}
                  </a>
                </div>
                <Button href={site.phoneHref}>Call now</Button>
              </div>
            </Card>
            <p className="mt-4 text-[13px] text-white/45">Booked pop-ups start with a 30-car minimum.</p>
          </Reveal>
        </div>
        <Reveal effect="up" className="lg:col-span-7">
          <EmployerForm />
        </Reveal>
      </div>
    </Section>
  );
}
