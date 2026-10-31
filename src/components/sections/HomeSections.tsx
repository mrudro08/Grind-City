import Image from "next/image";
import { services, experience, stats, payOptions } from "@/data/content";
import { site } from "@/data/site";
import { Section, SectionHeader, Pattern, Tag, Check, Eyebrow } from "@/components/ui/Primitives";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Counter } from "@/components/motion/Counter";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { cn } from "@/lib/cn";

/* ---------- 02 · One crew, three ways ---------- */
export function Services() {
  return (
    <Section tone="light">
      <Pattern kind="iso" className="right-0 top-0 h-[60%] w-[48%] text-ink/[0.06]" />
      <SectionHeader eyebrow="What we do" line1="One crew." line2="Three ways we show up." intro="Weekend pop-ups for everyone, an Employee Appreciation Day on your lot, or recurring washes at your fleet yard." />
      <Reveal stagger className="grid gap-6 md:grid-cols-3">
        {services.map((s) => (
          <Card key={s.n} tone="light" stroke={s.hot ? "bg-orange" : undefined} lift className="h-full">
            <div className="flex h-full flex-col p-7">
              <div className="flex items-center justify-between">
                <span className="display text-[22px] text-orange">{s.n}</span>
                {s.hot && <Tag hot>Workplaces</Tag>}
              </div>
              <div className="relative mt-5 aspect-[4/3] overflow-hidden bg-bone">
                <Image src={s.img} alt={s.title} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition-transform duration-700 hover:scale-105" />
              </div>
              <h3 className="display mt-7 text-[28px]">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-[1.55] text-smoke">{s.blurb}</p>
              <ul className="mt-5 flex flex-col gap-2.5 border-t border-ink/10 pt-5 text-[14px] font-medium">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-3">
                    <Check /> {b}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <Button href={s.href} variant={s.hot ? "primary" : "dark"}>
                  {s.cta}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </Reveal>
    </Section>
  );
}

/* ---------- 03 · The pop-up experience ---------- */
const steps = [
  { n: "01", title: "Pull in", text: "Find this weekend's lot, scan the QR and join the queue. No booking needed." },
  { n: "02", title: "Hang out", text: "Lounge, shootout, Connect 4 — we'll text you when your car's ready." },
  { n: "03", title: "Shine", text: "Tap to pay and roll out looking brand new. Grind hard. Shine harder.", hot: true },
];

function Tile({ item, big = false }: { item: (typeof experience)[number]; big?: boolean }) {
  return (
    <Card tone="dark" size="lg" lift className={cn("h-full", big && "md:row-span-2")}>
      <div className={cn("relative h-full", big ? "min-h-[420px] md:min-h-[640px]" : "min-h-[300px]")}>
        <Image src={item.img} alt={item.title} fill sizes={big ? "(min-width:768px) 50vw, 100vw" : "(min-width:768px) 25vw, 100vw"} className="object-cover transition-transform duration-700 hover:scale-105" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" aria-hidden />
        <div className="absolute left-6 top-6 flex gap-2">
          <Tag light>{item.n}</Tag>
          {item.tag && <Tag hot={item.hot} light={!item.hot}>{item.tag}</Tag>}
        </div>
        <div className="absolute inset-x-0 bottom-0 p-7">
          <h3 className={cn("display", big ? "text-[clamp(32px,3.4vw,52px)]" : "text-[26px]")}>{item.title}</h3>
          <p className="mt-2 max-w-[460px] text-[14px] text-white/70">{item.blurb}</p>
        </div>
      </div>
    </Card>
  );
}

export function Experience() {
  const [tunnel, ...rest] = experience;
  return (
    <Section tone="black">
      <Pattern kind="stripes" className="left-0 top-0 h-full w-[30%] text-white/[0.04]" />
      <Pattern kind="mark" className="-right-[4%] -top-[6%] h-[48%] w-[30%]" />
      <p className="display pointer-events-none absolute -bottom-[2%] right-0 select-none text-[clamp(120px,22vw,400px)] leading-[0.8] text-white/[0.03]" aria-hidden>
        SHINE
      </p>
      <SectionHeader eyebrow="The pop-up experience" light line1="More than" line2="a wash.">
        <p className="text-lg leading-[1.55] text-white/70">Pull in, hang out, shine. It&apos;s the hoops, the lounge and the music — a car wash that feels like the best part of your week.</p>
        <Button href="/pop-up" variant="outline" className="self-start">
          See this weekend
        </Button>
      </SectionHeader>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="md:col-span-2 lg:row-span-2">
          <ImageReveal className="h-full">
            <Tile item={tunnel} big />
          </ImageReveal>
        </div>
        <div className="md:col-span-2">
          <ImageReveal className="h-full">
            <Tile item={rest[0]} />
          </ImageReveal>
        </div>
        {rest.slice(1).map((it) => (
          <ImageReveal key={it.n} className="h-full">
            <Tile item={it} />
          </ImageReveal>
        ))}
      </div>

      <div className="mt-20">
        <Eyebrow light>How a visit works</Eyebrow>
        <Reveal stagger className="mt-8 grid gap-5 md:grid-cols-3">
          {steps.map((s) => (
            <Card key={s.n} tone={s.hot ? "orange" : "dark"} lift>
              <div className="p-7">
                <span className={cn("display text-[48px]", s.hot ? "text-ink" : "text-orange")}>{s.n}</span>
                <h3 className="display mt-5 text-[28px]">{s.title}</h3>
                <p className={cn("mt-3 text-[15px] leading-[1.55]", s.hot ? "text-ink/75" : "text-white/65")}>{s.text}</p>
              </div>
            </Card>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------- 04 · By the numbers ---------- */
export function Stats({ light = true }: { light?: boolean }) {
  return (
    <Section tone={light ? "light" : "dark"}>
      <Pattern kind="dots" className={cn("left-0 top-0 h-[60%] w-[36%]", light ? "text-ink/[0.09]" : "text-white/[0.06]")} />
      <Pattern kind="iso" className={cn("left-0 top-0 h-full w-[56%]", light ? "text-ink/[0.045]" : "text-white/[0.04]")} />
      <div className="pointer-events-none absolute -right-[4%] top-0 hidden h-full w-[16%] gap-[8%] lg:flex" aria-hidden>
        <span className="slant block h-full w-[24%] bg-orange" />
        <span className={cn("slant block h-full w-[24%]", light ? "bg-ink" : "bg-white")} />
        <span className="slant block h-full w-[24%] bg-orange" />
      </div>
      <SectionHeader eyebrow="By the numbers" light={!light} line1="Memphis keeps" line2="showing up." intro="Every weekend lot, every office parking lot, every fleet yard — it adds up. Here's the scoreboard." />
      <Reveal stagger className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <Counter value={s.value} decimals={s.decimals ?? 0} suffix={s.suffix} barPct={s.pct} className={cn("display block text-[clamp(64px,7vw,112px)]", light ? "text-ink" : "text-white")} />
            <p className="label mt-5 text-[11px] tracking-[0.14em]">{s.label}</p>
            <p className={cn("mt-1 text-[14px]", light ? "text-ash" : "text-white/50")}>{s.sub}</p>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}

/* ---------- 06 · For employers (teaser) ---------- */
export function EmployerTeaser() {
  return (
    <Section tone="light">
      <Pattern kind="dots" className="right-0 bottom-0 h-[60%] w-[40%] text-ink/[0.08]" />
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <ImageReveal className="lg:col-span-6" parallax={-6}>
          <Card tone="light" size="lg">
            <div className="relative aspect-[5/4]">
              <Image src="/images/iso-employer.webp" alt="Isometric view of the wash pod set up at a workplace parking lot" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
              <div className="absolute left-6 top-6">
                <Tag>On your lot</Tag>
              </div>
            </div>
          </Card>
        </ImageReveal>
        <div className="lg:col-span-6 lg:pl-6">
          <Eyebrow>For employers</Eyebrow>
          <SplitReveal as="h2" className="display mt-8 text-[clamp(40px,4.4vw,72px)] text-ink">
            We bring the
            <br />
            <span className="text-orange">experience to you.</span>
          </SplitReveal>
          <Reveal className="mt-7 max-w-[560px] text-lg leading-[1.55] text-smoke">
            <p>Grind City Detail brings the pod to your workplace — the branded wash tunnel, the lounge, the games — for an Employee Appreciation Day your people will actually remember.</p>
          </Reveal>
          <Reveal stagger className="mt-9 flex flex-col divide-y divide-ink/10 border-y border-ink/10">
            {payOptions.map((p) => (
              <div key={p.n} className="flex items-start gap-5 py-4">
                <span className="display pt-0.5 text-[18px] text-orange">{p.n}</span>
                <div>
                  <span className="display text-[20px] text-ink">{p.title}</span>
                  <span className="ml-3 text-[14px] text-smoke">{p.body.split(". ")[0].replace(/\.$/, "")}.</span>
                </div>
              </div>
            ))}
          </Reveal>
          <Reveal className="mt-5 text-[14px] text-ash">
            <p>Booked pop-ups start with a 30-car minimum. Pricing is quoted by team size — call us for your number.</p>
          </Reveal>
          <Reveal className="mt-9 flex flex-wrap gap-4">
            <Button href="/employers">Plan your appreciation day</Button>
            <Button href={site.phoneHref} variant="outline-dark">
              Call {site.phone}
            </Button>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
