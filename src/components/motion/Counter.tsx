"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { registerGsap, prefersReducedMotion } from "@/lib/gsap";

type Props = { value: number; decimals?: number; suffix?: string; className?: string; barPct?: number };

/** Counts up from 0 when scrolled into view; optional orange progress bar fills in sync. */
export function Counter({ value, decimals = 0, suffix = "", className, barPct }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  useGSAP(
    () => {
      const gsap = registerGsap();
      const el = ref.current;
      if (!el) return;
      const obj = { v: 0 };
      const fmt = (n: number) => n.toFixed(decimals);
      if (prefersReducedMotion()) {
        el.textContent = fmt(value);
        if (bar.current && barPct) bar.current.style.width = `${barPct}%`;
        return;
      }
      el.textContent = fmt(0);
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      tl.to(obj, { v: value, duration: 1.4, ease: "power2.out", onUpdate: () => (el.textContent = fmt(obj.v)) });
      if (bar.current && barPct) tl.fromTo(bar.current, { width: "0%" }, { width: `${barPct}%`, duration: 1.4, ease: "power2.out" }, 0);
    },
    { scope: ref },
  );
  return (
    <>
      <span className={className}>
        <span ref={ref}>{value.toFixed(decimals)}</span>
        {suffix && <span className="text-orange">{suffix}</span>}
      </span>
      {barPct !== undefined && (
        <span className="mt-4 block h-1 w-full max-w-[300px] bg-ink/10">
          <span ref={bar} className="block h-full bg-orange" style={{ width: `${barPct}%` }} />
        </span>
      )}
    </>
  );
}
