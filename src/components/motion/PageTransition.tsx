"use client";
import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { getLenis } from "@/components/motion/SmoothScroll";

/**
 * Route transition: an orange slanted panel wipes up to cover the page on internal link clicks,
 * the route changes underneath, then the panel wipes away. Also re-runs the hero entrance by
 * dispatching `gcd:page-in`.
 */
export function PageTransition() {
  const panel = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const pending = useRef<string | null>(null);

  // Cover on click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (prefersReducedMotion()) return;
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || !href.startsWith("/") || href.startsWith("//") || a.target === "_blank") return;
      const [path] = href.split("#");
      if (path === pathname || path === "") return; // same page (anchor) — no wipe
      e.preventDefault();
      pending.current = href;
      const gsap = registerGsap();
      const el = panel.current!;
      gsap.set(el, { pointerEvents: "auto", visibility: "visible" });
      gsap.fromTo(el, { yPercent: 100 }, { yPercent: 0, duration: 0.55, ease: "power4.inOut", onComplete: () => router.push(href) });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname, router]);

  // Uncover when the new route has rendered
  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    if (!pending.current) return;
    pending.current = null;
    const gsap = registerGsap();
    gsap.to(el, {
      yPercent: -100,
      duration: 0.6,
      ease: "power4.inOut",
      delay: 0.1,
      onStart: () => window.dispatchEvent(new Event("gcd:page-in")),
      onComplete: () => gsap.set(el, { pointerEvents: "none", yPercent: 100, visibility: "hidden" }),
    });
  }, [pathname]);

  return (
    <div ref={panel} className="pointer-events-none fixed inset-x-0 -top-[10vh] z-[90] h-[120vh] bg-orange" style={{ transform: "translateY(100%)", visibility: "hidden", clipPath: "polygon(0 6%, 100% 0, 100% 100%, 0 100%)" }} aria-hidden>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="display text-[clamp(28px,4vw,56px)] text-ink">Grind hard. Shine harder.</span>
      </div>
    </div>
  );
}
