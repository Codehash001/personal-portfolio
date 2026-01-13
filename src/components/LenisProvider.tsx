"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      // Lower lerp => more smoothing (more inertia)
      lerp: 0.05,
      // Slower scroll animation duration (in seconds)
      duration: 2,
      // Give the wheel a gentle boost so long scrolls feel glidy
      wheelMultiplier: 1.5,
      // Keep touch close to native while still smooth
      touchMultiplier: 1.25,
    });

    // Handle anchor link clicks for smooth scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const targetElement = document.querySelector(href) as HTMLElement | null;
          if (targetElement) {
            lenis.scrollTo(targetElement, { duration: 2 });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);

    // Optional: add a class to html for CSS hooks
    document.documentElement.classList.add("lenis", "lenis-smooth");

    return () => {
      cancelAnimationFrame(id);
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };
  }, []);

  return <>{children}</>;
}
