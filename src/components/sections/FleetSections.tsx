import Image from "next/image";
import { vehicles, fleetPlans, reviews } from "@/data/content";
import { site } from "@/data/site";
import { Section, SectionHeader, Pattern, Tag, Check, Stars } from "@/components/ui/Primitives";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { FleetQuoteForm } from "@/components/sections/FleetQuoteForm";
import { cn } from "@/lib/cn";

export function WeWash() {
  return (
    <Section tone="light">
      <Pattern kind="iso" className="right-0 top-0 h-[70%] w-[40%] text-ink/[0.05]" />
      <SectionHeader eyebrow="What we wash" line1="We wash what" line2="you run." intro="Mixed fleet? No problem. Exterior hand washes for everything that parks in your yard — no tents, no spectacle, just clean vehicles." />
      <Reveal stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {vehicles.map((v) => (
          <Card key={v.n} tone="light" lift>
            <div className="p-5">
              <div className="relative aspect-square overflow-hidden bg-bone">
                <Image src={v.img} alt={v.name} fill sizes="(min-width:1024px) 20vw, 50vw" className="object-cover" />
                <span className="absolute left-3 top-3">
                  <Tag hot>{v.n}</Tag>
                </span>
              </div>
              <h3 className="display mt-5 text-[22px] text-ink">{v.name}</h3>
              <p className="mt-1 text-[13px] text-ash">{v.blurb}</p>
            </div>
          </Card>
        ))}
      </Reveal>
    </Section>
  );
}

const how = [
  { n: "01", title: "Quote", text: "Tell us your vehicles, yard and frequency. Quote within 1 business day." },
  { n: "02", title: "Schedule", text: "Pick weekly, bi-weekly or monthly. We lock your wash day Mon–Thu." },
  { n: "03", title: "Wash + photo log", text: "Crew hand-washes every unit and logs before/after photos per vehicle.", hot: true },
  { n: "04", title: "One monthly invoice", text: "One invoice for the month, paid by ACH or autopay. Reports in your client portal." },
];

const logRows = [
  ["Unit 104", "Box truck · Bay 2", "Done"],
  ["Unit 112", "Box truck · Bay 2", "Done"],
  ["Van 07", "Cargo van", "Done"],
  ["Van 11", "Cargo van", "In progress"],
];

export function HowItWorks() {
  return (
    <Section id="how" tone="black">
      <Pattern kind="stripes" className="left-0 top-0 h-full w-[28%] text-white/[0.04]" />
      <SectionHeader eyebrow="How it works" light line1="Set it once." line2="We show up." />
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
        <Reveal stagger className="flex flex-col divide-y divide-white/10 lg:col-span-6">
          {how.map((s) => (
            <div key={s.n} className="flex gap-7 py-7">
              <span className={cn("cut-xs flex h-12 w-14 shrink-0 items-center justify-center display text-[18px]", s.hot ? "bg-orange text-ink" : "bg-white/10 text-orange")}>{s.n}</span>
              <div>
                <h3 className="display text-[26px]">{s.title}</h3>
                <p className="mt-2 max-w-[460px] text-[15px] leading-[1.55] text-white/65">{s.text}</p>
              </div>
            </div>
          ))}
        </Reveal>
        <ImageReveal className="lg:col-span-6">
          <Card tone="light" size="lg">
            <div className="p-7 sm:p-9">
              <div className="flex items-center justify-between">
                <div>
                  <p className="label text-[10px] text-orange">Client portal</p>
                  <p className="display mt-1 text-[22px] text-ink">Wash report · Week of Nov 2</p>
                </div>
                <span className="label hidden text-[10px] text-ink/50 sm:block">Download PDF ↓</span>
              </div>
              <div className="mt-7 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {[
                  ["24/24", "Vehicles washed"],
                  ["48", "Photos logged"],
                  ["Tue", "Next wash day"],
                  ["On track", "Monthly plan"],
                ].map(([v, l]) => (
                  <div key={l}>
                    <p className="display text-[28px] text-ink">{v}</p>
                    <p className="mt-1 text-[12px] text-ash">{l}</p>
                  </div>
                ))}
              </div>
              <ul className="mt-7 divide-y divide-ink/10 border-t border-ink/10">
                {logRows.map(([u, d, s]) => (
                  <li key={u} className="flex items-center gap-4 py-3.5">
                    <span className="flex gap-1" aria-hidden>
                      <span className="h-9 w-12 bg-ink/80" />
                      <span className="h-9 w-12 bg-orange/80" />
                    </span>
                    <span className="flex-1">
                      <span className="block text-[14px] font-bold text-ink">{u}</span>
                      <span className="block text-[12px] text-ash">{d}</span>
                    </span>
                    <span className={cn("label text-[10px] px-2.5 py-1", s === "Done" ? "bg-ink text-white" : "bg-orange text-ink")}>{s}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 flex items-center justify-between border-t border-ink/10 pt-5 text-[13px] text-ink">
                <span className="font-semibold">November invoice · $0,000.00</span>
                <span className="label text-[10px] text-orange">Autopay on</span>
              </p>
            </div>
          </Card>
        </ImageReveal>
      </div>
    </Section>
  );
}

export function Plans() {
  return (
    <Section id="plans" tone="light">
      <Pattern kind="dots" className="right-0 bottom-0 h-[60%] w-[40%] text-ink/[0.08]" />
      <SectionHeader eyebrow="Plans" line1="Pick your" line2="frequency." intro="Simple per-vehicle pricing. Volume rates for 25+ vehicles. No contracts longer than you want." />
      <Reveal stagger className="grid gap-6 md:grid-cols-3 md:items-end">
        {fleetPlans.map((p) => (
          <Card key={p.id} tone={p.popular ? "dark" : "light"} stroke={p.popular ? "bg-orange" : undefined} lift className={cn(p.popular && "md:-translate-y-6")}>
            <div className="flex h-full flex-col p-8">
              <div className="flex items-center justify-between">
                <h3 className="display text-[32px]">{p.name}</h3>
                {p.popular && <Tag hot>Most popular</Tag>}
              </div>
              <p className={cn("mt-2 text-[14px]", p.popular ? "text-white/60" : "text-smoke")}>{p.blurb}</p>
              <p className="mt-7 flex items-end gap-2">
                <span className={cn("label pb-2 text-[10px]", p.popular ? "text-white/40" : "text-ink/50")}>from</span>
                <span className="display text-[56px] text-orange">{p.price}</span>
                <span className={cn("pb-2 text-[12px]", p.popular ? "text-white/40" : "text-ink/50")}>/ vehicle</span>
              </p>
              <ul className={cn("mt-6 flex flex-col gap-3 border-t pt-6 text-[14px] font-medium", p.popular ? "border-white/10" : "border-ink/10")}>
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <Check /> {f}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <Button href="#quote" variant={p.popular ? "primary" : "outline-dark"} full>
                  Get a quote
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </Reveal>
    </Section>
  );
}

const why = [
  ["01", "Insured & vetted", "Certificates on file. Uniformed crew with background checks."],
  ["02", "Photo log", "Before/after photos for every unit, every wash, in your portal."],
  ["03", "One invoice", "One monthly invoice by ACH or autopay — no per-visit paperwork."],
  ["04", "Your schedule", "Mon–Thu, early or late, around your dispatch."],
  ["05", "No disruption", "Quiet, self-contained setup. No tents, no blocked lanes."],
  ["06", "One contact", "A dedicated crew lead who knows your yard."],
];
const checklist = ["Room to park units side by side", "Water access on site — or we bring it", "Area that's OK to get wet", "Vehicles parked & accessible on wash day", "Gate / site access instructions"];

export function BuiltFor() {
  return (
    <Section tone="black">
      <Pattern kind="mark" className="-left-[6%] bottom-0 h-[56%] w-[30%]" />
      <SectionHeader eyebrow="Why Grind City" light line1="Built for" line2="fleet managers." />
      <div className="grid gap-10 lg:grid-cols-12">
        <Reveal stagger className="grid gap-5 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-3">
          {why.map(([n, t, d]) => (
            <Card key={n} tone="dark" lift>
              <div className="p-6">
                <span className="display text-[18px] text-orange">{n}</span>
                <h3 className="display mt-4 text-[20px]">{t}</h3>
                <p className="mt-2 text-[13px] leading-[1.55] text-white/60">{d}</p>
              </div>
            </Card>
          ))}
        </Reveal>
        <Reveal className="lg:col-span-5">
          <Card tone="light" stroke="bg-orange">
            <div className="p-8">
              <p className="label text-[10px] text-orange">Yard checklist</p>
              <h3 className="display mt-2 text-[28px] text-ink">Is your yard wash-ready?</h3>
              <ul className="mt-6 flex flex-col gap-3">
                {checklist.map((c) => (
                  <li key={c} className="flex items-center gap-3 text-[14px] font-medium text-ink">
                    <span className="cut-xs flex h-6 w-6 items-center justify-center bg-orange text-[11px] text-ink" aria-hidden>
                      ✓
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[13px] text-ash">Not sure? Ask for a free yard walk-through before you commit.</p>
              <div className="mt-6">
                <Button href="#quote" variant="dark">
                  Book a yard walk-through
                </Button>
              </div>
            </div>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}

export function FleetQuote() {
  const r = reviews.find((x) => x.category === "fleet")!;
  return (
    <Section tone="light">
      <Reveal className="mx-auto max-w-[980px] text-center">
        <p className="label text-[11px] text-orange">From a fleet manager</p>
        <blockquote className="display mt-6 text-[clamp(26px,3.2vw,44px)] not-italic normal-case tracking-[-0.02em] text-ink">“{r.quote}”</blockquote>
        <div className="mt-8 flex items-center justify-center gap-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-orange text-[12px] font-bold text-ink">TW</span>
          <span className="text-left">
            <span className="block text-[15px] font-bold text-ink">{r.name}</span>
            <span className="block text-[13px] text-ash">{r.role}</span>
          </span>
          <Stars size="text-xs" />
        </div>
      </Reveal>
    </Section>
  );
}

export function QuoteSection() {
  return (
    <Section id="quote" tone="orange">
      <Pattern kind="dots" className="left-0 top-0 h-full w-[40%] text-ink/[0.12]" />
      <div className="pointer-events-none absolute -right-[4%] bottom-0 hidden h-[70%] w-[18%] gap-[8%] lg:flex" aria-hidden>
        <span className="slant block h-full w-[24%] bg-ink" />
        <span className="slant block h-full w-[24%] bg-bone" />
      </div>
      <div className="relative grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <p className="eyebrow flex items-center gap-3 text-ink">
            <span className="h-[3px] w-7 bg-ink" /> Fleet quote
          </p>
          <SplitReveal as="h2" className="display mt-8 text-[clamp(44px,5.6vw,80px)] text-ink">
            Get your
            <br />
            <span className="text-white">fleet quote.</span>
          </SplitReveal>
          <Reveal className="mt-6 max-w-[440px] text-lg text-ink/80">
            <p>Tell us what you run and where. You&apos;ll get a per-vehicle quote within 1 business day — no site visit needed to start.</p>
          </Reveal>
          <Reveal stagger className="mt-8 flex flex-col gap-3 text-[15px] font-semibold text-ink">
            {["Quote in 1 business day", "First wash within 2 weeks", "Cancel anytime"].map((b) => (
              <span key={b} className="flex items-center gap-3">
                <span className="slant inline-block h-4 w-2.5 bg-ink" aria-hidden /> {b}
              </span>
            ))}
          </Reveal>
          <Reveal className="mt-8 text-[14px] text-ink/70">
            <p>
              Prefer to talk?{" "}
              <a href={site.phoneHref} className="font-bold text-ink underline">
                {site.phone}
              </a>
            </p>
          </Reveal>
        </div>
        <Reveal effect="up" className="lg:col-span-7">
          <FleetQuoteForm />
        </Reveal>
      </div>
    </Section>
  );
}
