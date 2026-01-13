"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { works } from "@/src/data/works";

function ProjectCard({ work, index }: { work: typeof works[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

    // Parallax values
    const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]); // Image moves slower
    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);  // Text moves slightly faster/opposing

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

    return (
        <motion.div
            ref={ref}
            style={{ opacity, scale }}
            className={`group flex flex-col md:flex-row gap-8 md:gap-32 items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
        >
            {/* Image Container */}
            <div className="w-full md:w-3/5 relative overflow-hidden rounded-lg bg-neutral-900 border border-white/10 group-hover:border-white/20 transition-colors">
                {/* Image Content */}
                <div className="relative w-full group-hover:scale-[1.02] transition-transform duration-700">
                    <Image
                        src={work.image}
                        alt={work.title}
                        width={1200}
                        height={800}
                        className="w-full h-auto"
                        sizes="(max-width: 768px) 100vw, 60vw"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

                {/* Overlay Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-24 h-24 rounded-full bg-white text-black flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-2xl">
                        <ArrowRight className="w-8 h-8 -rotate-45" />
                    </div>
                </div>
            </div>

            {/* Content */}
            <motion.div style={{ y: yText }} className="w-full md:w-2/5 px-4">
                <span className="text-emerald-400 font-mono text-sm tracking-widest uppercase mb-4 block">
                    {work.category}
                </span>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 group-hover:text-emerald-400 transition-colors">
                    {work.title}
                </h3>
                <p className="text-neutral-400 text-lg leading-relaxed mb-8">
                    {work.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                    {work.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-4 py-1.5 border border-white/10 rounded-full text-sm text-neutral-300 bg-white/5"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <Link
                    href={`/work/${work.slug}`}
                    className="flex items-center gap-2 text-white border-b border-white/30 pb-1 hover:border-white transition-colors group/btn text-lg"
                >
                    View Case Study
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
            </motion.div>
        </motion.div>
    );
}

export default function WorkSection() {
    return (
        <section id="work" className="relative min-h-screen bg-black py-48 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-32 px-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-6xl md:text-9xl font-bold text-white tracking-tighter mb-8"
                    >
                        Selected <br />
                        <span className="text-neutral-600">Works.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-neutral-400 text-2xl max-w-2xl"
                    >
                        A curated selection from over 60+ successful projects delivered to clients worldwide.
                    </motion.p>
                </div>

                <div className="flex flex-col gap-40">
                    {works.map((work, index) => (
                        <ProjectCard key={work.id} work={work} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
