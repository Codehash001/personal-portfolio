"use client";

import Image from "next/image";
import { Globe, Linkedin, Mail, Github, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// Custom X (Twitter) icon
const XIcon = ({ className, size = 20, strokeWidth = 2 }: { className?: string; size?: number; strokeWidth?: number }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className={className}
        fill="currentColor"
    >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

export default function ProfileCard() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        { label: "Home", href: "#" },
        { label: "About", href: "#about" },
        { label: "Works", href: "#work" },
        { label: "Contact", href: "#contact" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="h-full w-full bg-white rounded-[24px] p-5 flex flex-col items-center justify-between text-black relative overflow-hidden"
        >
            {/* Decorative Orange Dash Line */}
            <svg className="absolute top-10 left-0 w-full h-full pointer-events-none opacity-50 z-0">
                <path d="M -10 50 Q 30 10 80 50 T 200 50" stroke="#FF5722" strokeWidth="2" fill="none" strokeDasharray="5,5" />
                <circle cx="80" cy="50" r="4" fill="#FF5722" />
            </svg>

            {/* Hamburger Menu Button */}
            <button
                onClick={() => setIsMenuOpen(true)}
                className="absolute top-3 left-3 z-20 p-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors"
                aria-label="Open Menu"
            >
                <Menu size={20} className="text-black" />
            </button>

            {/* MENU OVERLAY */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="absolute inset-0 z-50 bg-[#1a1a1a] flex flex-col items-center justify-center text-white"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="absolute top-5 left-5 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        >
                            <X size={20} className="text-white" />
                        </button>

                        <nav className="flex flex-col gap-6 text-center">
                            {menuItems.map((item, index) => (
                                <motion.a
                                    key={item.label}
                                    href={item.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 + 0.2 }}
                                    className="text-3xl font-bold font-display hover:text-[#CCFF00] transition-colors tracking-tight"
                                >
                                    {item.label}
                                </motion.a>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Image Container */}
            <div className="relative z-10 w-full aspect-square rounded-[24px] overflow-hidden mb-4 mt-8">
                <Image
                    src="/images/hero-image.png"
                    alt="Hashintha Nishsanka"
                    fill
                    className="object-cover object-top"
                />
            </div>

            {/* Text Content */}
            <div className="text-center z-10 w-full mt-2">
                <h2 className="text-3xl font-bold tracking-tight mb-1 font-display">
                    Hashintha<br />Nishsanka
                </h2>

                <div className="flex justify-center my-3">
                    <div className="px-4 py-1.5 rounded-full border border-black/10 bg-black/5 text-[10px] font-bold tracking-wide uppercase text-neutral-700">
                        UNDERGRADUATE
                    </div>
                </div>

                <p className="text-gray-500 text-sm font-medium leading-relaxed px-2">
                    Undergraduate student transforming complex problems into elegant code.
                    Passion for AI, Full-Stack, and building systems that scale.
                </p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-5 mt-5 z-10 text-[#FF5722]">
                <a href="https://github.com/Codehash001" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                    <Github size={20} strokeWidth={2} />
                </a>
                <a href="https://x.com/hashintha_?s=21" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                    <XIcon size={20} />
                </a>
                <a href="https://www.linkedin.com/in/hashintha-nishsanka-81a19a348" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                    <Linkedin size={20} strokeWidth={2} />
                </a>
                <a href="mailto:hashinthaun@gmail.com" className="hover:scale-110 transition-transform">
                    <Mail size={20} strokeWidth={2} />
                </a>
            </div>
        </motion.div>
    );
}
