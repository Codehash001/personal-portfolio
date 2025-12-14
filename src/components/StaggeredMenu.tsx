"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface MenuItem {
  label: string;
  ariaLabel?: string;
  link: string;
}

interface SocialItem {
  label: string;
  link: string;
}

interface StaggeredMenuProps {
  position?: "left" | "right";
  items: MenuItem[];
  socialItems?: SocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  changeMenuColorOnOpen?: boolean;
  colors?: [string, string];
  logoUrl?: string;
  accentColor?: string;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

const menuVariants = {
  closed: {
    clipPath: "circle(0% at calc(100% - 40px) 40px)",
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 40,
    },
  },
  open: {
    clipPath: "circle(150% at calc(100% - 40px) 40px)",
    transition: {
      type: "spring" as const,
      stiffness: 50,
      damping: 20,
    },
  },
};

const itemVariants = {
  closed: { opacity: 0, x: 50 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.3 + i * 0.1,
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

const socialVariants = {
  closed: { opacity: 0, y: 20 },
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5 + i * 0.08,
      duration: 0.3,
    },
  }),
};

export default function StaggeredMenu({
  position = "right",
  items,
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  menuButtonColor = "#fff",
  openMenuButtonColor = "#fff",
  changeMenuColorOnOpen = true,
  colors = ["#B19EEF", "#5227FF"],
  logoUrl,
  accentColor = "#ff6b6b",
  onMenuOpen,
  onMenuClose,
}: StaggeredMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      onMenuOpen?.();
    } else {
      document.body.style.overflow = "";
      onMenuClose?.();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, onMenuOpen, onMenuClose]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const buttonColor = changeMenuColorOnOpen
    ? isOpen
      ? openMenuButtonColor
      : menuButtonColor
    : menuButtonColor;

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="relative z-[60] flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <motion.span
          className="block w-6 h-0.5 rounded-full"
          style={{ backgroundColor: buttonColor }}
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 6 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="block w-6 h-0.5 rounded-full mt-1.5"
          style={{ backgroundColor: buttonColor }}
          animate={{
            opacity: isOpen ? 0 : 1,
            scaleX: isOpen ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="block w-6 h-0.5 rounded-full mt-1.5"
          style={{ backgroundColor: buttonColor }}
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? -6 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </button>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50"
            style={{
              background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`,
            }}
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="flex flex-col h-full px-8 py-6">
              {/* Header with Logo */}
              <div className="flex items-center justify-between">
                {logoUrl && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Image
                      src={logoUrl}
                      alt="Logo"
                      width={80}
                      height={40}
                      className="h-10 w-auto"
                    />
                  </motion.div>
                )}
              </div>

              {/* Menu Items - Centered */}
              <nav className="flex-1 flex flex-col justify-center items-center">
                <ul className="space-y-8">
                  {items.map((item, i) => (
                    <motion.li
                      key={item.link}
                      custom={i}
                      variants={itemVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      className="overflow-hidden"
                    >
                      <Link
                        href={item.link}
                        aria-label={item.ariaLabel}
                        onClick={() => setIsOpen(false)}
                        className="group flex items-baseline gap-4 text-5xl sm:text-6xl font-bold text-white hover:text-white/90 transition-colors"
                      >
                        {displayItemNumbering && (
                          <span
                            className="text-xs font-medium tracking-wider"
                            style={{ color: accentColor }}
                          >
                            0{i + 1}
                          </span>
                        )}
                        <span className="relative">
                          {item.label}
                          <motion.span
                            className="absolute left-0 -bottom-2 h-[3px] rounded-full"
                            style={{ backgroundColor: accentColor }}
                            initial={{ width: 0 }}
                            whileHover={{ width: "100%" }}
                            transition={{ duration: 0.3 }}
                          />
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Social Links */}
              {displaySocials && socialItems.length > 0 && (
                <motion.div 
                  className="pt-6 border-t border-white/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <ul className="flex justify-center gap-8">
                    {socialItems.map((social, i) => (
                      <motion.li
                        key={social.link}
                        custom={i}
                        variants={socialVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                      >
                        <a
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-white/50 hover:text-white transition-colors duration-300"
                        >
                          {social.label}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
