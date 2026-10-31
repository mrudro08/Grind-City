import Image from "next/image";
import { events, thisWeekend } from "@/data/events";
import { washPackages, addOns } from "@/data/content";
import { Section, SectionHeader, Pattern, Tag, Check } from "@/components/ui/Primitives";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { EventGrid } from "@/components/sections/EventGrid";
import { SignupForm } from "@/components/ui/SignupForm";
import { cn } from "@/lib/cn";

/* Hero aside: this weekend card */
export function WeekendCard() {
  const e = thisWeekend;
  return (
    <Card tone="glass" className="shadow-[0_40px_80px_-30px_rgba(0,0,0,.8)]">
      <div className="p-7 sm:p-8">
        <div className="flex items-center justify-between">
          <Tag hot>
            <span className="h-2 w-2 rounded-full bg-ink animate-pulse" aria-hidden /> Live this weekend
          </Tag>
          <span className="label text-[10px] text-white/50">{e.area}</span>
        </div>
        <p className="label mt-7 text-[11px] text-orange">Fri–Sun · {e.dateLabel}</p>
        <h2 className="display mt-2 text-[34px]">
          {e.lot}, <span className="text-orange">{e.area}</span>
        </h2>
        <p className="mt-3 text-[14px] text-white/65">{e.address}</p>
        <dl className="mt-6 grid grid-cols-3 gap-3 border-y border-white/10 py-5">
          {e.hours.map((h) => (
            <div key={h.day}>
              <dt className="label text-[10px] text-white/45">{h.day}</dt>
              <dd className="mt-1 text-[13px] font-semibold">{h.time}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6">
          <Button href={e.mapUrl} full>
            Get directions
          </Button>
        </div>
        <p className="label mt-7 text-[10px] text-white/50">Get a text + email before each pop-up</p>
        <div className="mt-3">
          <SignupForm compact />
        </div>
      </div>
    </Card>
  );
}

/* Mark your calendar */
export function Calendar() {
  return (
    <Section id="upcoming" tone="light">
      <Pattern kind="iso" className="left-0 top-0 h-full w-[46%] text-ink/[0.05]" />
      <Pattern kind="dots" className="right-0 top-0 h-[50%] w-[30%] text-ink/[0.08]" />
      <SectionHeader eyebrow="Upcoming pop-ups" line1="Mark your" line2="calendar." intro="We post every weekend 2+ weeks ahead. Tap “Remind me” and we'll text you the Thursday before." />
      <EventGrid events={events} />
    </Section>
  );
}

/* Pick your shine — wash menu */
export function Menu() {
  return (
    <Section id="menu" tone="black">
      <Pattern kind="stripes" className="left-0 top-0 h-full w-[30%] text-white/[0.04]" />
      <Pattern kind="mark" className="-right-[4%] top-[10%] h-[50%] w-[30%]" />
      <SectionHeader eyebrow="The menu" light line1="Pick your" line2="shine." intro="Every wash is by hand, in the tunnel, by our crew. Prices shown are starting points — final price by vehicle size." />
      <Reveal stagger className="grid gap-6 md:grid-cols-3 md:items-end">
        {washPackages.map((p) => (
          <Card key={p.id} tone={p.popular ? "light" : "dark"} stroke={p.popular ? "bg-orange" : undefined} lift className={cn(p.popular && "md:-translate-y-6")}>
            <div className="flex h-full flex-col p-8">
              <div className="flex items-center justify-between">
                <span className={cn("display text-[20px]", p.popular ? "text-orange" : "text-orange")}>{p.n}</span>
                {p.popular && <Tag hot>Most popular</Tag>}
              </div>
              <h3 className="display mt-6 text-[34px]">{p.name}</h3>
              <p className={cn("mt-2 text-[14px]", p.popular ? "text-smoke" : "text-white/60")}>{p.blurb}</p>
              <p className="mt-7 flex items-end gap-2">
                <span className={cn("label text-[10px] pb-2", p.popular ? "text-ink/50" : "text-white/40")}>from</span>
                <span className="display text-[56px] text-orange">{p.price}</span>
              </p>
              <ul className={cn("mt-6 flex flex-col gap-3 border-t pt-6 text-[14px] font-medium", p.popular ? "border-ink/10" : "border-white/10")}>
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <Check /> {f}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <Button href="#this-weekend" variant={p.popular ? "primary" : "outline"} full>
                  {p.popular ? "Find this weekend" : "Find a pop-up"}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </Reveal>
      <Reveal className="mt-10 flex flex-wrap items-center gap-3">
        <span className="label text-[11px] text-orange">Add-ons</span>
        {addOns.map((a) => (
          <span key={a} className="cut-xs bg-white/10 px-3 py-1.5 text-[13px] font-medium">
            {a}
          </span>
        ))}
      </Reveal>
    </Section>
  );
}

/* How a visit works — isometric */
const visit = [
  { n: "01", title: "Pull in", text: "Find this weekend's lot and follow the orange flags. Scan the QR at the tunnel to join the queue — or grab a slot online.", img: "/images/visit-pull-in.webp" },
  { n: "02", title: "Hang out", text: "Lounge under the tent, shoot for a free wash, or settle it on giant Connect 4. We text you when you're up.", img: "/images/visit-hang-out.webp" },
  { n: "03", title: "Shine", text: "Your car rolls out of the tunnel hand-washed and dried. Tap to pay, snap a pic, see you next weekend.", img: "/images/visit-shine.webp" },
];
const perks = [
  ["Walk-ups", "Always welcome"],
  ["Payment", "Card · tap to pay"],
  ["Rain", "We post updates by 8am"],
  ["Kids & pets", "Welcome in the lounge"],
];

export function HowAVisitWorks() {
  return (
    <Section tone="light">
      <Pattern kind="dots" className="left-0 bottom-0 h-[60%] w-[40%] text-ink/[0.08]" />
      <SectionHeader eyebrow="How a visit works" line1="Pull in. Hang out." line2="Shine." intro="No appointment, no waiting room. The whole visit happens in the lot — most people never want to leave." />
      <div className="grid gap-8 md:grid-cols-3">
        {visit.map((v, i) => (
          <div key={v.n} className="relative">
            {i < visit.length - 1 && <span className="slant absolute -right-5 top-[30%] hidden h-10 w-6 bg-orange md:block" aria-hidden />}
            <ImageReveal>
              <Card tone="light" lift>
                <div className="relative aspect-[4/3]">
                  <Image src={v.img} alt={v.title} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover" />
                  <span className="absolute left-5 top-5">
                    <Tag>{v.n}</Tag>
                  </span>
                </div>
              </Card>
            </ImageReveal>
            <Reveal className="mt-7">
              <h3 className="display text-[32px] text-ink">{v.title}</h3>
              <p className="mt-3 text-[15px] leading-[1.55] text-smoke">{v.text}</p>
            </Reveal>
          </div>
        ))}
      </div>
      <Reveal className="mt-16 grid grid-cols-2 gap-px bg-ink/10 md:grid-cols-4">
        {perks.map(([k, v]) => (
          <div key={k} className="flex flex-col gap-1 bg-bone p-5">
            <span className="label text-[10px] text-orange">{k}</span>
            <span className="text-[14px] font-semibold text-ink">{v}</span>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}
