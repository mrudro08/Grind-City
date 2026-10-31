"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type Props = { title: string; accent: string; body: string; dark?: boolean; compact?: boolean; onReset?: () => void };

/** Animated success state: badge pops, check-mark draws, headline and body slide up. */
export function FormSuccess({ title, accent, body, dark = true, compact = false, onReset }: Props) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const gsap = registerGsap();
      const q = gsap.utils.selector(root);
      if (prefersReducedMotion()) {
        gsap.set(q("[data-in]"), { opacity: 1, y: 0 });
        gsap.set(q("[data-check]"), { strokeDashoffset: 0 });
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(q("[data-badge]"), { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" })
        .fromTo(q("[data-check]"), { strokeDashoffset: 48 }, { strokeDashoffset: 0, duration: 0.5, ease: "power2.inOut" }, "-=0.2")
        .fromTo(q("[data-in]"), { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 }, "-=0.3");
    },
    { scope: root },
  );
  return (
    <div ref={root} role="status" aria-live="polite" className={cn("flex flex-col items-center text-center", compact ? "py-6" : "py-10")}>
      <span data-badge className="cut-sm flex h-16 w-16 items-center justify-center bg-orange">
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="#0a0a0a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path data-check d="M5 12.5l4.5 4.5L19 7.5" strokeDasharray="48" strokeDashoffset="48" />
        </svg>
      </span>
      <p data-in className={cn("display mt-6", compact ? "text-[26px]" : "text-[32px]", dark ? "text-white" : "text-ink")}>
        {title} <span className="text-orange">{accent}</span>
      </p>
      <p data-in className={cn("mt-3 max-w-[320px] text-[14px] leading-[1.55]", dark ? "text-white/70" : "text-smoke")}>
        {body}
      </p>
      {onReset && (
        <button data-in type="button" onClick={onReset} className={cn("label mt-6 text-[11px] underline-offset-4 hover:underline", dark ? "text-white/60" : "text-ink/60")}>
          Send another
        </button>
      )}
    </div>
  );
}
