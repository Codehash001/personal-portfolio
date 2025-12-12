"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

export default function NextSection() {
  const words = useMemo(
    () => "Web development? That’s the bare minimum. I craft legacies in the digital age.".split(" "),
    []
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  } as const;

  const item = {
    hidden: { y: 24, opacity: 0, filter: "blur(6px)" },
    show: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  } as const;

  return (
    <motion.section
      className="relative z-10 w-screen h-screen bg-white text-black flex items-center justify-center snap-start pt-16 pointer-events-auto"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.h2
        className="px-6 text-center max-w-5xl font-sans text-3xl leading-tight md:text-6xl md:leading-tight font-semibold tracking-tight text-balance"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ amount: 0.6, once: false }}
      >
        {words.map((w, i) => (
          <motion.span
            key={i + w}
            variants={item}
            className="inline-block mx-1 md:mx-1.5 will-change-transform"
          >
            {w}
          </motion.span>
        ))}
      </motion.h2>
    </motion.section>
  );
}
