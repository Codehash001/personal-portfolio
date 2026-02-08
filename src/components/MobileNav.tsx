"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function MobileNav() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    const menuItems = [
        { label: "Home", href: "#" },
        { label: "About", href: "#about" },
        { label: "Works", href: "#work" },
        { label: "Contact", href: "#contact" },
    ];

    return (
        <>
            <motion.header
                variants={{
                    visible: { y: 0, opacity: 1 },
                    hidden: { y: -100, opacity: 0 },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="fixed top-4 right-4 z-50 md:hidden"
            >
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-3 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-white shadow-lg hover:bg-black/70 transition-all"
                    aria-label="Open Menu"
                >
                    <Menu size={24} />
                </button>
            </motion.header>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-6 right-6 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all"
                            aria-label="Close Menu"
                        >
                            <X size={24} />
                        </button>

                        <nav className="flex flex-col gap-8 text-center">
                            {menuItems.map((item, index) => (
                                <motion.a
                                    key={item.label}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="text-4xl font-bold text-white hover:text-[#CCFF00] transition-colors uppercase tracking-tight font-display"
                                >
                                    {item.label}
                                </motion.a>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
