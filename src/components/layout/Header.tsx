"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { nav, site } from "@/data/site";
import { cn } from "@/lib/cn";
import { registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { Logo } from "@/components/ui/Primitives";
import { Button } from "@/components/ui/Button";
import { useScramble } from "@/components/motion/useScramble";
import { getLenis } from "@/components/motion/SmoothScroll";

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  const { ref, onMouseEnter } = useScramble<HTMLSpanElement>();
  return (
    <Link
      href={href}
      onMouseEnter={onMouseEnter}
      aria-current={active ? "page" : undefined}
      className={cn("label group relative py-2 text-[13px] tracking-[0.12em] transition-colors hover:text-orange", active ? "text-orange" : "text-white")}
    >
      <span ref={ref} className="inline-block">
        {label}
      </span>
      <span className={cn("absolute -bottom-0.5 left-0 h-[2px] bg-orange transition-all duration-300", active ? "w-full" : "w-0 group-hover:w-full")} aria-hidden />
    </Link>
  );
}

/** Transparent header over heroes; gains a dark frosted bar once scrolled. Hides on scroll down, returns on scroll up. */
export function Header({ phone = site.phone, phoneHref = site.phoneHref }: { phone?: string; phoneHref?: string }) {
  const pathname = (usePathname() ?? "/").replace(/\/+$/, "") || "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const root = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  // Close the menu when the route changes (derived state, no effect needed)
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const lenis = getLenis();
    if (open) lenis?.stop();
    else lenis?.start();
    return () => {
      document.documentElement.style.overflow = "";
      getLenis()?.start();
    };
  }, [open]);

  useGSAP(
    () => {
      const gsap = registerGsap();
      const el = bar.current;
      if (!el) return;
      let last = 0;
      const onScroll = () => {
        const y = window.scrollY;
        setScrolled(y > 40);
        if (prefersReducedMotion() || open) return;
        if (y > last && y > 240) gsap.to(el, { yPercent: -100, duration: 0.5, ease: "power3.out", overwrite: "auto" });
        else gsap.to(el, { yPercent: 0, duration: 0.5, ease: "power3.out", overwrite: "auto" });
        last = y;
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener("scroll", onScroll);
    },
    { scope: root, dependencies: [open] },
  );

  useGSAP(
    () => {
      const gsap = registerGsap();
      const m = menu.current;
      if (!m) return;
      const items = m.querySelectorAll("[data-menu-item]");
      if (open) {
        if (bar.current) gsap.to(bar.current, { yPercent: 0, duration: 0.3, overwrite: "auto" });
        gsap.set(m, { pointerEvents: "auto" });
        gsap.to(m, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "power4.inOut" });
        gsap.fromTo(items, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.06, delay: 0.25, ease: "power4.out" });
      } else {
        gsap.to(m, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.5, ease: "power4.inOut", onComplete: () => gsap.set(m, { pointerEvents: "none" }) });
      }
    },
    { dependencies: [open] },
  );

  return (
    <header ref={root} className="fixed inset-x-0 top-0 z-50">
      {/* The bar (not the header) gets the hide/show transform so the fixed menu below stays viewport-relative. */}
      <div ref={bar} className={cn("relative z-[60] transition-colors duration-500", scrolled || open ? "bg-ink/85 backdrop-blur-md" : "bg-transparent")}>
        <div className="mx-auto flex h-[76px] w-full max-w-[1680px] items-center justify-between px-6 md:px-10 lg:px-[60px] 3xl:px-0 lg:h-[88px]">
          <Link href="/" aria-label="Grind City Detail — home" className="relative z-[60]">
            <Logo />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {nav.map((n) => (
              <NavLink key={n.href} {...n} active={pathname === n.href || pathname.startsWith(n.href + "/")} />
            ))}
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <a href={phoneHref} className="label text-[13px] tracking-[0.12em] text-white/80 transition-colors hover:text-orange">
              {phone}
            </a>
            <Button href="/pop-up#this-weekend" className="scale-[0.9] origin-right">
              Find a pop-up
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-[60] lg:hidden"
          >
            <span className="cut-xs block bg-orange-light p-px">
              <span className="cut-xs flex h-11 w-11 flex-col items-center justify-center gap-[5px] bg-orange">
                <span className={cn("block h-[2px] w-5 bg-white transition-transform duration-300", open && "translate-y-[7px] rotate-45")} />
                <span className={cn("block h-[2px] w-5 bg-white transition-opacity duration-300", open && "opacity-0")} />
                <span className={cn("block h-[2px] w-5 bg-white transition-transform duration-300", open && "-translate-y-[7px] -rotate-45")} />
              </span>
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={menu}
        className="pointer-events-none fixed inset-0 z-[55] flex flex-col bg-ink px-6 pb-10 pt-[108px] lg:hidden"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
        aria-hidden={!open}
      >
        <div className="pat-iso pointer-events-none absolute inset-0 text-white/[0.05]" aria-hidden />
        <nav aria-label="Mobile" className="relative flex flex-col">
          {nav.map((n, i) => (
            <div key={n.href} className="overflow-hidden border-b border-white/10">
              <Link
                data-menu-item
                href={n.href}
                className={cn("display flex items-center justify-between py-4 text-[44px]", pathname === n.href ? "text-orange" : "text-white")}
                tabIndex={open ? 0 : -1}
              >
                {n.label}
                <span className="label text-[11px] text-white/40">0{i + 1}</span>
              </Link>
            </div>
          ))}
        </nav>
        <div className="relative mt-auto flex flex-col gap-5">
          <div data-menu-item>
            <Button href="/pop-up#this-weekend" full>
              Find a pop-up
            </Button>
          </div>
          <div data-menu-item className="flex items-center justify-between">
            <a href={phoneHref} className="label text-[13px] text-white/80">
              {phone}
            </a>
            <span className="label text-[11px] text-white/40">Memphis, TN</span>
          </div>
        </div>
      </div>
    </header>
  );
}
