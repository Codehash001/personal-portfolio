"use client";

import { useEffect, useRef, useState } from "react";

// Use a thinner character set to reduce visual width during scramble
const CHARS = "0123456789|/\\-+<>=:;[]()";

export default function DecryptTitle({
  text,
  duration = 1800,
  className,
}: {
  text: string;
  duration?: number; // ms
  className?: string;
}) {
  const [output, setOutput] = useState<string>("");
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    let frame = 0;
    const total = Math.max(1, Math.floor(duration / 16)); // ~60fps

    const tick = (t: number) => {
      if (startRef.current == null) startRef.current = t;
      const elapsed = t - startRef.current;
      const progress = Math.min(1, elapsed / duration);
      // Ease the reveal to feel slower and smoother
      const eased = Math.pow(progress, 1.35);
      const revealCount = Math.floor(eased * text.length);

      const head = text.slice(0, revealCount);
      const remaining = Math.max(0, text.length - revealCount);
      // Keep the visible scrambled tail short to avoid overflow
      const maxTail = 6; // cap the visible tail length
      const tailCount = Math.min(remaining, Math.max(0, Math.ceil((1 - eased) * maxTail)));
      const tail = Array.from({ length: tailCount }, () =>
        CHARS[Math.floor(Math.random() * CHARS.length)]
      ).join("");

      setOutput(head + tail);
      frame++;

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setOutput(text);
        // dispatch a global event so others can listen if needed
        window.dispatchEvent(new CustomEvent("decrypt-finished"));
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [text, duration]);

  return <h1 className={className}>{output}</h1>;
}
