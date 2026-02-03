"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Work } from "@/src/data/works";

interface ProjectCardProps {
    work: Work;
    index: number;
    className?: string; // For grid spans
}

export default function ProjectCard({ work, index, className = "" }: ProjectCardProps) {
    const isFeatured = index === 0 || index === 3; // Example pattern: 1st and 4th are large
    const primaryColor = isFeatured ? "#CCFF00" : "#FF5722"; // Alternate colors for hierarchy

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`group relative rounded-3xl bg-neutral-900/50 border border-white/5 overflow-hidden hover:border-white/10 transition-colors ${className}`}
        >
            {/* Background Image (Full cover for featured, top for others) */}
            <div className={`absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105 ${isFeatured ? 'h-full' : 'h-[60%]'}`}>
                <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-end">
                {/* Top Tags (Visible on start for featured, or moved) */}
                <div className="absolute top-6 right-6 flex gap-2">
                    {/* Source Code Button (Icon Only) */}
                    {work.sourceUrl && (
                        <Link
                            href={work.sourceUrl}
                            target="_blank"
                            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                            title="View Source Code"
                        >
                            <Github className="w-5 h-5" />
                        </Link>
                    )}
                </div>

                <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                    {/* Category */}
                    <span
                        className="text-xs font-mono uppercase tracking-widest mb-3 block"
                        style={{ color: primaryColor }}
                    >
                        {work.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                        {work.title}
                    </h3>

                    {/* Description (Line clamped) */}
                    <p className="text-neutral-400 text-sm leading-relaxed mb-6 line-clamp-2 max-w-md">
                        {work.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        {work.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-neutral-300"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <Link
                            href={`/work/${work.slug}`}
                            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium text-sm hover:bg-[#CCFF00] transition-colors"
                        >
                            View Case Study
                            <ArrowUpRight className="w-4 h-4" />
                        </Link>

                        {/* Mobile Source Link (if not using icon) - Optional */}
                    </div>
                </div>
            </div>

            {/* Hover Glow Effect */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    boxShadow: `inset 0 0 100px ${primaryColor}20`, // low opacity glow
                }}
            />
        </motion.div>
    );
}
