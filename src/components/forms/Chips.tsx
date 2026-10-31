"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type Props = { label: string; options: string[]; value: string; onChange: (v: string) => void; className?: string };

/** Single-select chip group with a sliding orange highlight (radiogroup semantics). */
export function Chips({ label, options, value, onChange, className }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLSpanElement>(null);
  useGSAP(
    () => {
      const gsap = registerGsap();
      const active = root.current?.querySelector<HTMLElement>('[aria-checked="true"]');
      if (!active || !pill.current) return;
      gsap.to(pill.current, { x: active.offsetLeft, y: active.offsetTop, width: active.offsetWidth, height: active.offsetHeight, duration: prefersReducedMotion() ? 0 : 0.4, ease: "power3.out", opacity: 1 });
    },
    { dependencies: [value, options.length] },
  );
  return (
    <div className={className}>
      <p className="label mb-2 text-[10px] text-white/50">{label}</p>
      <div ref={root} role="radiogroup" aria-label={label} className="relative flex flex-wrap gap-2">
        <span ref={pill} className="cut-xs pointer-events-none absolute left-0 top-0 bg-orange opacity-0" aria-hidden />
        {options.map((o) => (
          <button
            key={o}
            type="button"
            role="radio"
            aria-checked={value === o}
            onClick={() => onChange(o)}
            className={cn("cut-xs relative p-px transition-colors duration-300", value === o ? "bg-transparent" : "bg-white/20 hover:bg-white/50")}
          >
            <span className={cn("cut-xs label relative block px-4 py-2.5 text-[11px] transition-colors duration-300", value === o ? "bg-transparent text-ink" : "bg-ink text-white")}>{o}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
