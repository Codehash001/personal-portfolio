"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Work } from "@/src/data/works";

interface MinimalProjectCardProps {
    work: Work;
    index: number;
}

export default function MinimalProjectCard({ work, index }: MinimalProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group flex flex-col gap-6"
        >
            {/* Image Container - Clean & Simple */}
            <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl bg-neutral-900 border border-white/5">
                <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Overlay on Hover (Very Subtle) */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
            </div>

            {/* Content - Text First Hierarchy */}
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#CCFF00]">
                        {work.category}
                    </span>

                    {/* Source Code Link (Icon) - Minimal */}
                    {work.sourceUrl && (
                        <Link
                            href={work.sourceUrl}
                            target="_blank"
                            className="text-neutral-500 hover:text-white transition-colors"
                            title="View Source Code"
                        >
                            <Github className="w-5 h-5" />
                        </Link>
                    )}
                </div>

                <h3 className="text-2xl font-bold text-white group-hover:text-[#CCFF00] transition-colors">
                    {work.title}
                </h3>

                <p className="text-neutral-400 text-sm leading-relaxed line-clamp-2">
                    {work.description}
                </p>

                {/* Minimal Tech Tags - Just text or very subtle border */}
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-neutral-500 font-mono mt-1">
                    {work.tags.slice(0, 4).map((tag, i) => (
                        <span key={tag}>
                            #{tag}
                        </span>
                    ))}
                </div>

                {/* View Project Action - Simple Link */}
                <Link
                    href={`/work/${work.slug}`}
                    className="inline-flex items-center gap-2 text-white mt-2 hover:gap-3 transition-all group/link w-fit"
                >
                    <span className="border-b border-white/30 pb-0.5 group-hover/link:border-white transition-colors">
                        View Case Study
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover/link:text-white transition-colors" />
                </Link>
            </div>
        </motion.div>
    );
}
