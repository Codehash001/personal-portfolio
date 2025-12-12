"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      // Lower lerp => more smoothing (more inertia)
      lerp: 0.06,
      // Give the wheel a gentle boost so long scrolls feel glidy
      wheelMultiplier: 1.75,
      // Keep touch close to native while still smooth
      touchMultiplier: 1.25,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);

    // Optional: add a class to html for CSS hooks
    document.documentElement.classList.add("lenis", "lenis-smooth");

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };
  }, []);

  return <>{children}</>;
}
