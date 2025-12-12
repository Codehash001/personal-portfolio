"use client";

import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const works = [
    {
        id: 1,
        title: "Nooma",
        category: "SaaS / Health",
        description: "Health and longevity tracker designed to optimize personal wellness journeys.",
        tags: ["SaaS", "Health Tech", "Analytics"],
        image: "/projects/nooma.png",
    },
    {
        id: 2,
        title: "DSG AI Agents",
        category: "AI Solution",
        description: "Multi-agent AI solution tailored for the Dental School Guide platform.",
        tags: ["AI Agents", "EduTech", "Automation"],
        image: "/projects/dsg.png",
    },
    {
        id: 3,
        title: "Virtu Network",
        category: "Frontend Development",
        description: "Responsive front-end interface for the Virtu Network web application.",
        tags: ["Frontend", "Web App", "UI/UX"],
        image: "/projects/virtu.png",
    },
    {
        id: 4,
        title: "Headshot",
        category: "Full Stack / E-Sports",
        description: "Comprehensive player registration platform for Headshot E-sports tournaments.",
        tags: ["Full Stack", "E-Sports", "Registration"],
        image: "/projects/headshot.png",
    },
    {
        id: 5,
        title: "Documaty",
        category: "AI Product",
        description: "AI agent that transforms complex documentation into clear, step-by-step guidance.",
        tags: ["AI", "Full Stack", "NLP"],
        image: "/projects/documaty.png",
    },
    {
        id: 6,
        title: "Inspira",
        category: "Web3 / GenAI",
        description: "Generative AI platform integrating custom Inspi Tokens and USDT for service payments.",
        tags: ["GenAI", "Web3", "Crypto", "Payment Integration"],
        image: "/projects/inspira.png",
    },
    {
        id: 7,
        title: "Beni Minting Dapp",
        category: "Blockchain",
        description: "Full-stack decentralized application and minting engine built with Solidity.",
        tags: ["Solidity", "DApp", "Full Stack", "Smart Contracts"],
        image: "/projects/beni.png",
    },
    {
        id: 8,
        title: "Fitness",
        category: "Frontend",
        description: "High-performance frontend implementation for a modern fitness lifestyle website.",
        tags: ["Frontend", "React", "Health"],
        image: "/projects/fitness.png",
    },
];

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
                <button className="flex items-center gap-2 text-white border-b border-white/30 pb-1 hover:border-white transition-colors group/btn text-lg">
                    View Case Study
                    <ExternalLink className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
            </motion.div>
        </motion.div>
    );
}

export default function WorkSection() {
    return (
        <section className="relative min-h-screen bg-black py-48 px-4 md:px-8">
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
                        A curated selection from over 70+ successful projects delivered to clients worldwide.
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
