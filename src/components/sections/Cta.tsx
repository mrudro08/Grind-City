import Link from "next/link";
import { thisWeekend } from "@/data/events";
import { Section, Eyebrow, Pattern } from "@/components/ui/Primitives";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

function Door({ href, title, sub, tone }: { href: string; title: string; sub: string; tone: "dark" | "outline" }) {
  const dark = tone === "dark";
  return (
    <Link href={href} className={cn("cut group block p-[1.5px] lift", dark ? "bg-smoke" : "bg-ink")}>
      <span className={cn("cut flex items-center justify-between gap-6 px-8 py-8 lg:px-9 lg:py-9", dark ? "bg-ink text-white" : "bg-orange text-ink")}>
        <span>
          <span className="display block text-[clamp(22px,2.4vw,34px)] not-italic">{title}</span>
          <span className={cn("mt-2 block text-[14px]", dark ? "text-white/60" : "text-ink/70")}>{sub}</span>
        </span>
        <span className="text-[40px] leading-none transition-transform duration-500 group-hover:translate-x-2" aria-hidden>
          →
        </span>
      </span>
    </Link>
  );
}

export function Cta() {
  return (
    <Section tone="orange" className="text-ink">
      <Pattern kind="dots" className="left-0 top-0 h-full w-[46%] text-ink/[0.12]" />
      <div className="pointer-events-none absolute -right-[4%] top-0 hidden h-full w-[22%] gap-[6%] lg:flex" aria-hidden>
        <span className="slant block h-full w-[22%] bg-ink" />
        <span className="slant block h-full w-[22%] bg-bone" />
        <span className="slant block h-full w-[22%] bg-smoke" />
      </div>
      <div className="relative grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Eyebrow>Let&apos;s go</Eyebrow>
          <SplitReveal as="h2" className="display mt-8 text-[clamp(56px,9vw,128px)]">
            Ready to
            <br />
            <span className="text-white">shine?</span>
          </SplitReveal>
        </div>
        <Reveal stagger className="flex flex-col gap-5 lg:col-span-6">
          <Door href="/pop-up#this-weekend" title="Find this weekend's pop-up" sub={`Fri–Sun · ${thisWeekend.lot}, ${thisWeekend.area}`} tone="dark" />
          <Door href="/fleet#quote" title="Get a fleet quote" sub="Recurring washes at your yard" tone="outline" />
          <Link href="/employers" className="label mt-2 inline-flex items-center gap-2 text-[12px] text-ink hover:underline">
            Employers: plan an Employee Appreciation Day →
          </Link>
        </Reveal>
      </div>
    </Section>
  );
}
