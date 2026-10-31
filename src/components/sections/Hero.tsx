import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { Stars, Pattern } from "@/components/ui/Primitives";
import { site } from "@/data/site";

type Props = {
  image?: { src: string; alt: string; position?: string };
  crumbs?: { label: string; href?: string }[];
  eyebrow?: ReactNode;
  line1: string;
  line2: string;
  intro: string;
  actions?: ReactNode;
  bullets?: string[];
  proof?: boolean;
  aside?: ReactNode;
  /** 'image' = full-bleed photo with dark overlay; 'dark' = black with patterns and the aside as artwork */
  variant?: "image" | "dark";
  compact?: boolean;
};

/** Shared hero: full-bleed photo, left copy, right card (lead form or artwork). */
export function Hero({ image, crumbs, eyebrow, line1, line2, intro, actions, bullets, proof, aside, variant = "image", compact = false }: Props) {
  return (
    <section className={cn("relative overflow-hidden bg-ink text-white", compact ? "min-h-[72vh]" : "min-h-[100svh]")}>
      {variant === "image" && image && (
        <>
          <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="object-cover" style={{ objectPosition: image.position ?? "center" }} />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/20" aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" aria-hidden />
        </>
      )}
      {variant === "dark" && (
        <>
          <Pattern kind="iso" className="inset-0 text-white/[0.05]" />
          <Pattern kind="mark" className="-left-[6%] top-[8%] h-[70%] w-[32%]" />
        </>
      )}

      <div className={cn("relative mx-auto grid w-full max-w-[1680px] gap-12 px-6 pb-20 md:px-10 lg:px-[60px] 3xl:px-0 lg:grid-cols-12 lg:items-center lg:gap-10", compact ? "pt-[140px] lg:pt-[180px] lg:pb-[120px]" : "pt-[140px] lg:min-h-[100svh] lg:pt-[160px] lg:pb-[140px]")}>
        <div className={cn(aside ? (variant === "dark" ? "lg:col-span-6" : "lg:col-span-7") : "lg:col-span-8")}>
          {crumbs && (
            <Reveal effect="up" className="label mb-8 flex items-center gap-2 text-[11px] text-white/50">
              {crumbs.map((c, i) => (
                <span key={c.label} className="flex items-center gap-2">
                  {i > 0 && <span className="text-orange">/</span>}
                  {c.href ? (
                    <Link href={c.href} className="hover:text-orange">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-white/80">{c.label}</span>
                  )}
                </span>
              ))}
            </Reveal>
          )}
          {eyebrow && <Reveal effect="up" className="mb-7">{eyebrow}</Reveal>}
          <SplitReveal as="h1" immediate delay={0.1} className="display text-[clamp(44px,5.6vw,96px)]">
            {line1}
            <br />
            <span className="text-orange">{line2}</span>
          </SplitReveal>
          <Reveal delay={0.5} className="mt-8 max-w-[560px] text-[17px] leading-[1.6] text-white/80 lg:text-[19px]">
            <p>{intro}</p>
          </Reveal>
          {bullets && (
            <Reveal delay={0.6} className="mt-6 flex flex-wrap gap-x-7 gap-y-2 text-[14px] text-white/80">
              {bullets.map((b) => (
                <span key={b} className="flex items-center gap-2">
                  <span className="slant inline-block h-3.5 w-2.5 bg-orange" aria-hidden />
                  {b}
                </span>
              ))}
            </Reveal>
          )}
          {actions && (
            <Reveal delay={0.7} className="mt-10 flex flex-wrap gap-4">
              {actions}
            </Reveal>
          )}
          {proof && (
            <Reveal delay={0.85} className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-white/70">
              <span className="flex items-center gap-2">
                <Stars size="text-sm" />
                <strong className="text-white">{site.rating.value} on Google</strong>
              </span>
              <span className="hidden h-4 w-px bg-white/20 sm:block" aria-hidden />
              <span>12,000+ cars washed · {site.rating.count}+ reviews</span>
            </Reveal>
          )}
        </div>

        {aside && (
          <div className={cn(variant === "dark" ? "lg:col-span-6" : "lg:col-span-5 lg:col-start-8 xl:col-span-4 xl:col-start-9")}>
            <Reveal effect="up" delay={0.5}>
              {aside}
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
