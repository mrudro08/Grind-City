"use client";
import { useRef, type ElementType, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { registerGsap, prefersReducedMotion, DUR, STAGGER } from "@/lib/gsap";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** fade-blur (default) | up | none */
  effect?: "blur" | "up";
  delay?: number;
  /** animate direct children with a stagger instead of the wrapper */
  stagger?: boolean;
  start?: string;
};

/** Fade-in-blur reveal when the element scrolls into view. Content stays in the HTML for SEO. */
export function Reveal({ children, as: Tag = "div", className, effect = "blur", delay = 0, stagger = false, start = "top 85%" }: Props) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const gsap = registerGsap();
      const el = ref.current;
      if (!el) return;
      const targets = stagger ? Array.from(el.children) : [el];
      const reduced = prefersReducedMotion();
      const from = reduced
        ? { opacity: 0 }
        : effect === "blur"
          ? { opacity: 0, y: 24, filter: "blur(12px)" }
          : { opacity: 0, y: 32 };
      gsap.fromTo(targets, from, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: reduced ? 0.4 : DUR,
        delay,
        stagger: stagger ? STAGGER * 1.5 : 0,
        clearProps: "filter",
        scrollTrigger: { trigger: el, start, once: true },
      });
    },
    { scope: ref },
  );
  return (
    <Tag ref={ref} className={className} data-reveal>
      {children}
    </Tag>
  );
}
