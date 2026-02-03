"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Award } from "lucide-react";

export default function EducationExperience() {
    return (
        <section id="about" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* Education Column */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-[#CCFF00]">
                            <GraduationCap className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-bold font-display uppercase tracking-tight">Education</h2>
                    </div>

                    <div className="space-y-8 pl-4 border-l border-white/10">
                        {/* Degree */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative pl-8"
                        >
                            {/* Sleek Glowing Dot */}
                            <div className="absolute -left-[21.5px] top-1.5 w-3 h-3 rounded-full bg-[#CCFF00] shadow-[0_0_12px_#CCFF00]" />
                            <span className="text-sm text-neutral-500 font-mono mb-2 block">2022 - Present</span>
                            <h3 className="text-xl font-bold text-white mb-1">Bachelor of Information and Communication Technology (BICT)</h3>
                            <p className="text-neutral-400 mb-4">Faculty of Technology, University of Sri Jayawardenepura</p>
                            <p className="text-neutral-500 leading-relaxed text-sm">
                                Focusing on Advanced Algorithms, System Architecture, and AI. Building a strong foundation in computer science principles while applying them to real-world projects.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Experience Column */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-[#FF5722]">
                            <Briefcase className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-bold font-display uppercase tracking-tight">Experience</h2>
                    </div>

                    <div className="space-y-8 pl-4 border-l border-white/10">
                        {/* Freelance */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="relative pl-8"
                        >
                            <div className="absolute -left-[21.5px] top-1.5 w-3 h-3 rounded-full bg-[#FF5722] shadow-[0_0_12px_#FF5722]" />
                            <span className="text-sm text-neutral-500 font-mono mb-2 block">2022 - 2025</span>
                            <h3 className="text-xl font-bold text-white mb-1">Freelance Software Engineer</h3>
                            <p className="text-neutral-400 mb-4">Self-Employed / Various Clients</p>
                            <p className="text-neutral-500 leading-relaxed text-sm">
                                Delivered 50+ projects for around 15 clients worldwide. Specialized in full-stack web development, automation scripts, and custom AI integrations.
                                Managed entire project lifecycles from requirements gathering to deployment.
                            </p>
                        </motion.div>
                    </div>
                </div>

            </div>
            {/* SKILLS INFOGRAPH (Detailed 16-Tech Grid) */}
            <div className="mt-20 pt-12 border-t border-white/10">
                <h3 className="text-2xl font-bold font-display uppercase tracking-tight mb-12 flex items-center gap-3">
                    <Award className="w-6 h-6 text-[#CCFF00]" />
                    Technical Proficiency
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
                    {[
                        { name: "HTML5", slug: "html5", color: "#E34F26", width: "95%" },
                        { name: "CSS3", slug: "css", color: "#1572B6", width: "90%" },
                        { name: "JavaScript", slug: "javascript", color: "#F7DF1E", width: "95%" },
                        { name: "TypeScript", slug: "typescript", color: "#3178C6", width: "90%" },
                        { name: "React", slug: "react", color: "#61DAFB", width: "92%" },
                        { name: "Next.js", slug: "nextdotjs", color: "#ffffff", width: "90%" },
                        { name: "Node.js", slug: "nodedotjs", color: "#339933", width: "88%" },
                        { name: "Python", slug: "python", color: "#3776AB", width: "95%" },
                        { name: "FastAPI", slug: "fastapi", color: "#009688", width: "85%" },
                        { name: "PyTorch", slug: "pytorch", color: "#EE4C2C", width: "80%" },
                        { name: "PostgreSQL", slug: "postgresql", color: "#4169E1", width: "85%" },
                        { name: "MongoDB", slug: "mongodb", color: "#47A248", width: "82%" },
                        { name: "Docker", slug: "docker", color: "#2496ED", width: "85%" },
                        { name: "AWS", slug: "amazonaws", color: "#FF9900", width: "75%" },
                        { name: "CI / CD", slug: "githubactions", color: "#2088FF", width: "80%" }, // Using GitHub Actions as generic CI/CD icon
                        { name: "Linux", slug: "linux", color: "#FCC624", width: "85%" },
                    ].map((tech, index) => (
                        <div key={tech.name} className="flex items-center gap-4 group">
                            {/* Y-AXIS: Icon & Name */}
                            <div className="w-32 md:w-40 flex items-center gap-3 shrink-0">
                                <div className="w-8 h-8 rounded-lg bg-white/5 p-1.5 flex items-center justify-center border border-white/10 group-hover:border-[#CCFF00]/50 transition-colors">
                                    {/* Using Simple Icons CDN with fallback for AWS */}
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={tech.slug === "amazonaws"
                                            ? "https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/amazonaws.svg"
                                            : `https://cdn.simpleicons.org/${tech.slug}/${tech.color.replace('#', '')}`}
                                        alt={tech.name}
                                        className="w-full h-full object-contain"
                                        style={tech.slug === "amazonaws" ? { filter: "invert(1)" } : {}}
                                    />
                                </div>
                                <span className="text-sm font-medium text-neutral-300 group-hover:text-white transition-colors uppercase tracking-tight truncate">
                                    {tech.name}
                                </span>
                            </div>

                            {/* X-AXIS: Bar Graph (No Scale Text) */}
                            <div className="flex-1 h-10 flex items-center">
                                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: tech.width }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.2, delay: index * 0.05 }} // Staggered effect
                                        className="h-full rounded-full"
                                        style={{ backgroundColor: tech.color }} // Use brand color for the bar
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
