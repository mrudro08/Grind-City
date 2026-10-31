"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { registerGsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

let instance: Lenis | null = null;
/** Access the active Lenis instance (null on touch / reduced-motion / before mount). */
export const getLenis = () => instance;

/**
 * Lenis smooth scrolling driven by GSAP's ticker so ScrollTrigger and the scroll stay in sync.
 * Disabled for reduced-motion users; native scrolling is kept on touch devices (Lenis default).
 * In-page anchors (#faq, #quote…) are eased to with a header offset.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const gsap = registerGsap();
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: { offset: -88 },
    });
    instance = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      instance = null;
    };
  }, []);
  return null;
}
