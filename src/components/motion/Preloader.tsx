"use client";
import { useRef, useState, useSyncExternalStore } from "react";
import { useGSAP } from "@gsap/react";
import { registerGsap, prefersReducedMotion } from "@/lib/gsap";

const KEY = "gcd-preloaded";

/**
 * First-visit preloader (once per session, ≤1.5s):
 * stripes draw in → wordmark reveals → progress bar fills → orange slanted panel wipes up.
 */
const noop = () => () => {};
const firstVisit = () => {
  try {
    return !sessionStorage.getItem(KEY) && !prefersReducedMotion();
  } catch {
    return false;
  }
};

export function Preloader() {
  // Server renders nothing; client shows the loader only on the first visit of the session.
  const eligible = useSyncExternalStore(noop, firstVisit, () => false);
  const [done, setDone] = useState(false);
  const show = eligible && !done;
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!show || !root.current) return;
      document.documentElement.classList.add("is-loading");
      const gsap = registerGsap();
      const q = gsap.utils.selector(root);
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        onComplete: () => {
          document.documentElement.classList.remove("is-loading");
          try {
            sessionStorage.setItem(KEY, "1");
          } catch {}
          setDone(true);
          window.dispatchEvent(new Event("gcd:preloaded"));
        },
      });
      tl.fromTo(q("[data-stripe]"), { scaleY: 0, transformOrigin: "bottom" }, { scaleY: 1, duration: 0.5, stagger: 0.08 })
        .fromTo(q("[data-word]"), { yPercent: 110 }, { yPercent: 0, duration: 0.6, stagger: 0.08 }, "-=0.2")
        .fromTo(q("[data-bar]"), { scaleX: 0, transformOrigin: "left" }, { scaleX: 1, duration: 0.7, ease: "power2.inOut" }, "-=0.4")
        .to(q("[data-count]"), { textContent: 100, snap: { textContent: 1 }, duration: 0.7, ease: "power2.inOut" }, "<")
        .to(q("[data-content]"), { opacity: 0, duration: 0.2 })
        .to(q("[data-panel-orange]"), { yPercent: -100, duration: 0.6, ease: "power4.inOut" }, "-=0.05")
        .to(q("[data-panel-ink]"), { yPercent: -100, duration: 0.6, ease: "power4.inOut" }, "-=0.45");
    },
    { scope: root, dependencies: [show] },
  );

  if (!show) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[100]" aria-hidden>
      <div data-panel-ink className="absolute inset-0 bg-ink"><div className="pat-iso absolute inset-0 text-white/[0.05]" /></div>
      <div data-panel-orange className="absolute inset-0 bg-orange" style={{ clipPath: "polygon(0 6%, 100% 0, 100% 100%, 0 100%)" }} />
      <div data-content className="absolute inset-0 flex flex-col items-center justify-center gap-6">
        <div className="flex h-14 gap-2">
          <span data-stripe className="slant block w-5 bg-white" />
          <span data-stripe className="slant block w-5 bg-ink" />
          <span data-stripe className="slant block w-5 bg-white" />
        </div>
        <p className="display flex gap-3 overflow-hidden text-[clamp(36px,6vw,80px)] text-ink">
          <span data-word className="inline-block">
            Grind City
          </span>
          <span data-word className="inline-block text-white">
            Detail
          </span>
        </p>
        <div className="flex w-[min(60vw,420px)] items-center gap-4">
          <span className="block h-[3px] flex-1 bg-ink/20">
            <span data-bar className="block h-full bg-ink" />
          </span>
          <span className="label w-10 text-right text-[12px] text-ink">
            <span data-count>0</span>%
          </span>
        </div>
      </div>
    </div>
  );
}
