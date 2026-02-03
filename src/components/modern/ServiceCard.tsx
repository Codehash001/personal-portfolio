"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ServiceCardProps {
    title: string;
    subtitle?: string; // Optional subtitle or list like "FRAMER, FIGMA..."
    icon: ReactNode;
    theme: "orange" | "green" | "dark";
    className?: string;
    delay?: number;
}

export default function ServiceCard({ title, subtitle, icon, theme, className = "", delay = 0 }: ServiceCardProps) {

    const themeStyles = {
        orange: "bg-[#FF5722] text-white",
        green: "bg-[#CCFF00] text-black",
        dark: "bg-[#171717] text-white border border-white/10"
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -5 }}
            className={`relative p-8 rounded-[32px] overflow-hidden flex flex-col justify-between min-h-[240px] ${themeStyles[theme]} ${className}`}
        >
            {/* Background Pattern/Wave (Simplified CSS/SVG) */}
            {theme === 'orange' && (
                <svg className="absolute bottom-0 left-0 w-full h-1/2 opacity-20 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 80 Q 25 50 50 80 T 100 80 L 100 100 L 0 100 Z" fill="white" />
                    <path d="M0 60 Q 30 90 60 60 T 120 60" fill="none" stroke="white" strokeWidth="1" />
                </svg>
            )}
            {theme === 'green' && (
                <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 0 L 20 100" stroke="black" strokeWidth="0.5" />
                    <path d="M20 0 L 40 100" stroke="black" strokeWidth="0.5" />
                    <path d="M40 0 L 60 100" stroke="black" strokeWidth="0.5" />
                    <path d="M60 0 L 80 100" stroke="black" strokeWidth="0.5" />
                    <path d="M80 0 L 100 100" stroke="black" strokeWidth="0.5" />
                    <path d="M0 20 L 100 40" stroke="black" strokeWidth="0.5" />
                    <path d="M0 40 L 100 60" stroke="black" strokeWidth="0.5" />
                    <path d="M0 60 L 100 80" stroke="black" strokeWidth="0.5" />
                </svg>
            )}
            {theme === 'dark' && (
                <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
                    <pattern id="dot-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="1" cy="1" r="1.5" fill="white" />
                    </pattern>
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#dot-pattern)" />
                </svg>
            )}

            <div className="mb-4 text-3xl">
                {icon}
            </div>

            <div className="z-10">
                <h3 className="text-2xl font-bold leading-tight uppercase tracking-tight">
                    {title}
                </h3>
                {subtitle && (
                    <p className="mt-2 text-sm font-medium opacity-80 uppercase tracking-wide">
                        {subtitle}
                    </p>
                )}
            </div>

            {/* Button/Arrow Icon in bottom right */}
            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
            </div>

        </motion.div>
    );
}
