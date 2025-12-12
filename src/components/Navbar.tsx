"use client";

import Link from "next/link";
import { motion, easeOut } from "framer-motion";
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from "react";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
];

const logoVariants = {
  initial: { y: 24, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.6, ease: easeOut } },
};

const itemVariants = {
  initial: { y: -16, opacity: 0 },
  animate: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: 0.15 + i * 0.08, duration: 0.45, ease: easeOut },
  }),
};

export default function Navbar() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const onDone = () => setReady(true);
    window.addEventListener("decrypt-finished", onDone, { once: true });
    const t = setTimeout(() => setReady(true), 2000);
    return () => {
      window.removeEventListener("decrypt-finished", onDone);
      clearTimeout(t);
    };
  }, []);

  return (
    <header className="sticky z-50 w-full font-michroma">
      <div className="relative mx-auto w-full max-w-[1400px] px-4 md:px-6">
        <nav className="flex h-16 items-center justify-between text-foreground/90 ">
          {/* Logo (fade up) */}
          <motion.div
            variants={logoVariants}
            initial="initial"
            animate={ready ? "animate" : "initial"}
            className="font-michroma text-sm tracking-widest uppercase text-white"
          >
            <Link href="#home" className="select-none">
              {/* Replace with your logo image if needed */}
              <span>LOGO</span>
            </Link>
          </motion.div>

          {/* Nav items (drop in) */}
          <div className="flex items-center gap-2 md:gap-4">
            {navItems.map((item, i) => (
              <motion.div
                key={item.href}
                variants={itemVariants}
                custom={i}
                initial="initial"
                animate={ready ? "animate" : "initial"}
              >
                <Link
                  href={item.href}
                  className="px-2 py-1 text-sm text-white/80 hover:text-white transition-colors font-medium"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              variants={itemVariants}
              custom={navItems.length}
              initial="initial"
              animate={ready ? "animate" : "initial"}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="#contact"
                aria-label="Contact me"
                className="group relative inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-sm text-white/90 transition-all hover:border-white/40 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                {/* sheen */}
                <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
                  <span className="absolute -inset-1 -translate-x-full bg-gradient-to-r from-white/20 via-white/10 to-transparent opacity-0 transition-all duration-500 ease-out group-hover:translate-x-full group-hover:opacity-100" />
                </span>
                <span className="relative z-10 flex items-center gap-2">
                  <span>Contact Me</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </motion.div>
          </div>
        </nav>

        {/* Underline that grows from center */}
        <motion.div
          className="absolute left-0 right-0 -bottom-px h-px bg-white/20"
          initial={{ scaleX: 0 }}
          animate={ready ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.7, ease: easeOut }}
          style={{ transformOrigin: "center" }}
        />
      </div>
    </header>
  );
}
