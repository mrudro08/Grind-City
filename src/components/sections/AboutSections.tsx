import Image from "next/image";
import { crew, stats } from "@/data/content";
import { Section, SectionHeader, Pattern, Tag } from "@/components/ui/Primitives";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Counter } from "@/components/motion/Counter";
import { cn } from "@/lib/cn";

export function AboutArt() {
  return (
    <ImageReveal className="relative">
      <div className="relative aspect-square w-full">
        <Image src="/images/iso-memphis.webp" alt="Isometric illustration of the Grind City Detail pop-up beside the Memphis skyline and bridge" fill priority sizes="(min-width:1024px) 40vw, 100vw" className="object-contain" />
      </div>
    </ImageReveal>
  );
}

export function Story() {
  return (
    <Section tone="light">
      <Pattern kind="dots" className="left-0 top-0 h-[50%] w-[30%] text-ink/[0.08]" />
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow flex items-center gap-3 text-ink">
            <span className="h-[3px] w-7 bg-orange" /> Our story
          </p>
          <SplitReveal as="h2" className="display mt-8 text-[clamp(40px,5.2vw,72px)] text-ink">
            Grind hard.
            <br />
            <span className="text-orange">Shine harder.</span>
          </SplitReveal>
        </div>
        <Reveal stagger className="flex flex-col gap-5 text-[17px] leading-[1.65] text-smoke lg:col-span-6 lg:col-start-7">
          <p>Grind City Detail started with one idea: getting your car washed shouldn&apos;t cost you your Saturday.</p>
          <p>So we built a branded 40-ft hand-wash tunnel, packed a lounge tent and a few games, and took it to the people — weekend lots across Memphis, workplace parking lots and fleet yards.</p>
          <p>Every car is washed by hand by our uniformed crew. Every visit should feel less like an errand and more like the best part of your week.</p>
        </Reveal>
      </div>
      <Reveal stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card tone="dark" stroke="bg-orange">
          <div className="p-7">
            <p className="display text-[48px] text-orange">20XX</p>
            <p className="label mt-3 text-[10px] text-white/60">Founded in Memphis</p>
          </div>
        </Card>
        {stats.slice(0, 3).map((s) => (
          <Card key={s.label} tone="light">
            <div className="p-7">
              <Counter value={s.value} decimals={s.decimals ?? 0} suffix={s.suffix} className="display block text-[48px] text-ink" />
              <p className="label mt-3 text-[10px] text-ink/60">{s.label}</p>
            </div>
          </Card>
        ))}
      </Reveal>
    </Section>
  );
}

const values = [
  { n: "01", title: "Show up.", text: "We come to you — your lot, your workplace, your yard — on time, every time.", img: "/images/iso-popup.webp" },
  { n: "02", title: "Hand wash only.", text: "Real mitts, real crew, real attention. No brushes, no shortcuts.", img: "/images/iso-tunnel.webp" },
  { n: "03", title: "Make it a moment.", text: "Lounge, music, games. A wash you actually look forward to.", img: "/images/exp-lounge.webp" },
];

export function Values() {
  return (
    <Section tone="black">
      <Pattern kind="stripes" className="right-0 top-0 h-full w-[30%] text-white/[0.04]" />
      <Pattern kind="mark" className="-left-[6%] bottom-0 h-[50%] w-[30%]" />
      <SectionHeader eyebrow="What we stand for" light line1="The Grind" line2="City way." intro="Three things every crew member signs up for before they ever pick up a mitt." />
      <div className="grid gap-6 md:grid-cols-3">
        {values.map((v) => (
          <ImageReveal key={v.n}>
            <Card tone="dark" size="lg" lift className="h-full">
              <div className="relative aspect-[4/3]">
                <Image src={v.img} alt={v.title} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover" />
                <span className="absolute left-5 top-5">
                  <Tag light>{v.n}</Tag>
                </span>
              </div>
              <div className="p-7">
                <h3 className="display text-[28px]">{v.title}</h3>
                <p className="mt-3 text-[14px] leading-[1.55] text-white/65">{v.text}</p>
              </div>
            </Card>
          </ImageReveal>
        ))}
      </div>
    </Section>
  );
}

export function Crew() {
  return (
    <Section tone="light">
      <Pattern kind="iso" className="right-0 top-0 h-[60%] w-[40%] text-ink/[0.05]" />
      <SectionHeader eyebrow="The crew" line1="Meet the" line2="people behind the shine." intro="Uniformed, trained and insured. The same faces you see every weekend." />
      <Reveal stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {crew.map((c) => (
          <Card key={c.name} tone="light" lift>
            <div className="p-4">
              <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-gradient-to-b from-smoke to-ink">
                <div className="pat-iso absolute inset-0 text-white/[0.08]" aria-hidden />
                <span className="display relative text-[64px] text-white/20">
                  {c.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <span className="label absolute bottom-4 left-4 text-[9px] text-white/40">Crew photo</span>
              </div>
              <h3 className="display mt-5 text-[22px] text-ink">{c.name}</h3>
              <p className="mt-1 text-[13px] text-ash">{c.role}</p>
            </div>
          </Card>
        ))}
      </Reveal>
      <Reveal className="mt-20 flex flex-col gap-8 border-t border-ink/10 pt-14 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow flex items-center gap-3 text-ink">
            <span className="h-[3px] w-7 bg-orange" /> Now hiring
          </p>
          <h2 className="display mt-6 text-[clamp(40px,5vw,64px)] text-ink">
            Join
            <br />
            <span className="text-orange">the crew.</span>
          </h2>
        </div>
        <div className={cn("flex max-w-[420px] flex-col gap-5")}>
          <p className="text-lg leading-[1.55] text-smoke">Weekend shifts, weekday events and fleet routes. Hard work, good music, real pay.</p>
          <Button href="mailto:hello@grindcitydetail.com?subject=Crew%20application" variant="dark" className="self-start">
            See open roles
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
