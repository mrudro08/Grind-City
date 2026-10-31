"use client";
import { useRef, type ElementType, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { registerGsap, SplitText, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** play immediately (hero) instead of on scroll */
  immediate?: boolean;
};

/** Masked line reveal for display headlines. Lines slide up from inside overflow-hidden wrappers. */
export function SplitReveal({ children, as: Tag = "h2", className, delay = 0, immediate = false }: Props) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const gsap = registerGsap();
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion()) {
        gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.4, delay, scrollTrigger: immediate ? undefined : { trigger: el, start: "top 85%", once: true } });
        return;
      }
      const split = SplitText.create(el, { type: "lines", linesClass: "split-line", mask: "lines" });
      gsap.from(split.lines, {
        yPercent: 110,
        duration: 1,
        ease: "power4.out",
        stagger: 0.09,
        delay,
        scrollTrigger: immediate ? undefined : { trigger: el, start: "top 85%", once: true },
        onComplete: () => split.revert(),
      });
    },
    { scope: ref },
  );
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
