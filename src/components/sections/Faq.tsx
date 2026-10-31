"use client";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import type { Faq as FaqItem } from "@/data/content";
import { registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/cn";

/** Accordion. Answers are always in the HTML (SEO); only height/opacity animate. */
export function FaqAccordion({ items, light = true }: { items: FaqItem[]; light?: boolean }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="flex flex-col">
      {items.map((f, i) => (
        <Row key={f.q} item={f} n={i + 1} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} light={light} />
      ))}
    </div>
  );
}

function Row({ item, n, open, onToggle, light }: { item: FaqItem; n: number; open: boolean; onToggle: () => void; light: boolean }) {
  const body = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const gsap = registerGsap();
      const el = body.current;
      if (!el) return;
      const reduced = prefersReducedMotion();
      const text = el.firstElementChild;
      gsap.to(el, { height: open ? "auto" : 0, opacity: open ? 1 : 0, duration: reduced ? 0 : 0.55, ease: "power3.inOut" });
      if (text && !reduced) gsap.fromTo(text, { y: open ? 12 : 0 }, { y: 0, duration: 0.55, ease: "power3.out" });
    },
    { dependencies: [open] },
  );
  const border = light ? "border-ink/10" : "border-white/10";
  return (
    <div className={cn("border-b", border, open && "border-orange/50")}>
      <h3>
        <button type="button" onClick={onToggle} aria-expanded={open} className="group flex w-full items-start gap-6 py-6 text-left">
          <span className={cn("label mt-1 w-7 text-[11px]", open ? "text-orange" : light ? "text-ink/40" : "text-white/40")}>{String(n).padStart(2, "0")}</span>
          <span className={cn("flex-1 text-[18px] font-bold leading-snug transition-colors group-hover:text-orange", light ? "text-ink" : "text-white")}>{item.q}</span>
          <span
            className={cn(
              "cut-xs relative flex h-8 w-8 shrink-0 items-center justify-center transition-[background-color,transform] duration-300 group-hover:scale-105",
              open ? "bg-orange text-ink" : light ? "bg-ink/5 text-ink group-hover:bg-ink/10" : "bg-white/10 text-white group-hover:bg-white/15",
            )}
            aria-hidden
          >
            <span className="absolute h-[2px] w-3.5 bg-current transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }} />
            <span className="absolute h-[2px] w-3.5 bg-current transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]" style={{ transform: open ? "rotate(180deg)" : "rotate(90deg)" }} />
          </span>
        </button>
      </h3>
      <div ref={body} className="h-0 overflow-hidden opacity-0" style={open ? { height: "auto", opacity: 1 } : undefined}>
        <p className={cn("max-w-[720px] pb-7 pl-[52px] text-[16px] leading-[1.6]", light ? "text-smoke" : "text-white/70")}>{item.a}</p>
      </div>
    </div>
  );
}
