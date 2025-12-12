"use client";

import { motion, easeOut } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HeroImage() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const onDone = () => setReady(true);
    window.addEventListener("decrypt-finished", onDone, { once: true });
    // Fallback in case event doesn't fire for some reason
    const t = setTimeout(() => setReady(true), 2000);
    return () => {
      window.removeEventListener("decrypt-finished", onDone);
      clearTimeout(t);
    };
  }, []);

  return (
    <motion.div
      className="pointer-events-none absolute bottom-2 md:bottom-[-2rem] left-1/2 -translate-x-1/2 z-30 transition-transform duration-500 ease-out scale-155 origin-bottom will-change-transform"
      initial={{ opacity: 0, y: 5 }}
      animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
      transition={{ duration: 0.45, ease: easeOut, delay: 0.05 }}
    >
      <Image
        src="/images/hero-image.png"
        alt="Hero"
        width={780}
        height={780}
        priority
        className="w-[95vw] md:w-[55vw] md:max-w-[720px] max-w-none h-auto"
      />
    </motion.div>
  );
}
