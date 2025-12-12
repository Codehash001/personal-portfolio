"use client";

import { motion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function BlobCursor() {
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  const [visible, setVisible] = useState(false);

  // Smooth spring for trailing effect
  const x = useSpring(-9999, { stiffness: 120, damping: 20, mass: 0.4 });
  const y = useSpring(-9999, { stiffness: 120, damping: 20, mass: 0.4 });
  const opacity = useSpring(0, { stiffness: 140, damping: 22, mass: 0.4 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    const onScroll = () => {
      const inHero = window.scrollY < window.innerHeight * 0.95;
      setVisible(inHero);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    x.set(pos.x);
    y.set(pos.y);
  }, [pos.x, pos.y, x, y]);

  useEffect(() => {
    opacity.set(visible ? 1 : 0);
  }, [visible, opacity]);

  const size = 80; // diameter in px (adjust as desired)

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-10 hidden md:block"
      style={{ translateX: x, translateY: y, opacity }}
    >
      {/* Center the blob around the cursor */}
      <div
        className="relative"
        style={{ transform: `translate(${0}px, ${0}px)` }}
      >
        <div
          className="rounded-full backdrop-blur-sm bg-black/20 shadow-[0_0_120px_60px_rgba(255,255,255,0.06)]"
          style={{ width: size, height: size }}
        />
      </div>
    </motion.div>
  );
}
