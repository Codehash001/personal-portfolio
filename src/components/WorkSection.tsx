"use client";

import { motion } from "framer-motion";
import { works } from "@/src/data/works";
import MinimalProjectCard from "./modern/MinimalProjectCard";

export default function WorkSection() {
    return (
        <section id="work" className="relative bg-black pt-10 pb-32 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8">
                            <span className="bg-[#CCFF00] text-black px-2 md:px-4 inline-block mr-2">Featured</span>
                            <span className="text-white">Works</span>
                        </h2>
                        <p className="text-neutral-400 text-lg max-w-xl">
                            A collection of my best projects, featuring diverse technologies and solving real-world problems.
                        </p>
                    </motion.div>
                </div>

                {/* MINIMAL GRID LAYOUT */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
                    {works.map((work, index) => (
                        <MinimalProjectCard
                            key={work.id}
                            work={work}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
