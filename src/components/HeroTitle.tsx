"use client";

import { useCallback } from "react";

export default function HeroTitle({
  line1,
  line2,
  className,
  lineClassName,
  duration = 1000,
  gapClass = "",
}: {
  line1: string;
  line2: string;
  className?: string;
  lineClassName?: string;
  duration?: number; // ms
  gapClass?: string; // e.g., mt-2
}) {
  const onEnd = useCallback(() => {
    window.dispatchEvent(new CustomEvent("decrypt-finished"));
  }, []);

  const [firstWord, ...rest] = (line1 || "").split(" ");
  const secondWord = rest.join(" ");

  return (
    <div className={["leading-snug md:leading-none text-center", className ?? ""].join(" ")}
      aria-label={`${line1} ${line2}`}
    >
      {/* Desktop/Tablet: keep first line combined */}
      <div
        className={["tracking-smooth-expand whitespace-nowrap hidden md:block", lineClassName ?? ""].join(" ")}
        style={{
          animationDuration: `${duration}ms`,
          animationDelay: `0ms`,
          willChange: "letter-spacing, opacity",
        }}
      >
        {line1}
      </div>

      {/* Mobile: split first line into two lines */}
      {firstWord && (
        <div
          className={["tracking-smooth-expand whitespace-nowrap block md:hidden", lineClassName ?? ""].join(" ")}
          style={{
            animationDuration: `${duration}ms`,
            animationDelay: `0ms`,
            willChange: "letter-spacing, opacity",
          }}
        >
          {firstWord}
        </div>
      )}
      {secondWord && (
        <div
          className={["tracking-smooth-expand whitespace-nowrap block md:hidden", gapClass, lineClassName ?? ""].join(" ")}
          style={{
            animationDuration: `${duration}ms`,
            animationDelay: `0ms`,
            willChange: "letter-spacing, opacity",
          }}
        >
          {secondWord}
        </div>
      )}

      <div
        className={["tracking-smooth-expand whitespace-nowrap block", gapClass, lineClassName ?? ""].join(" ")}
        style={{
          animationDuration: `${duration}ms`,
          animationDelay: `0ms`,
          willChange: "letter-spacing, opacity",
        }}
        onAnimationEnd={onEnd}
      >
        {line2}
      </div>
    </div>
  );
}
