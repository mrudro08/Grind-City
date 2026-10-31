"use client";
import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/cn";

/** Clip-path wipe + slight scale reveal for images/cards. Wrap the image container. */
export function ImageReveal({ children, className, parallax = 0 }: { children: ReactNode; className?: string; parallax?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const gsap = registerGsap();
      const el = ref.current;
      if (!el) return;
      const inner = el.firstElementChild as HTMLElement | null;
      if (prefersReducedMotion()) {
        gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.4, scrollTrigger: { trigger: el, start: "top 85%", once: true } });
        return;
      }
      gsap.fromTo(
        el,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power4.inOut", scrollTrigger: { trigger: el, start: "top 85%", once: true } },
      );
      if (inner) {
        gsap.fromTo(inner, { scale: 1.12 }, { scale: 1, duration: 1.4, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
        if (parallax) {
          gsap.to(inner, { yPercent: parallax, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
        }
      }
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className={cn("will-change-[clip-path]", className)}>
      {children}
    </div>
  );
}
