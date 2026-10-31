"use client";
import { useCallback, useRef } from "react";
import { registerGsap, SCRAMBLE_CHARS, isDesktop, prefersReducedMotion } from "@/lib/gsap";

/**
 * Scramble-text hover for nav links and buttons.
 * Returns a ref for the text span and an onMouseEnter handler.
 * Width is locked so the layout never shifts while characters cycle.
 */
export function useScramble<T extends HTMLElement = HTMLSpanElement>() {
  const ref = useRef<T>(null);
  const busy = useRef(false);
  const original = useRef<string>("");

  const onMouseEnter = useCallback(() => {
    const el = ref.current;
    if (!el || busy.current || !isDesktop() || prefersReducedMotion()) return;
    const gsap = registerGsap();
    if (!original.current) original.current = el.textContent ?? "";
    const text = original.current;
    el.style.minWidth = `${el.getBoundingClientRect().width}px`;
    busy.current = true;
    gsap.to(el, {
      duration: 0.45,
      scrambleText: { text, chars: SCRAMBLE_CHARS, speed: 0.6, revealDelay: 0.05 },
      onComplete: () => {
        busy.current = false;
        el.textContent = text;
      },
    });
  }, []);

  return { ref, onMouseEnter };
}
