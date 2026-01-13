import { works } from "@/src/data/works";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

export async function generateStaticParams() {
    return works.map((work) => ({
        slug: work.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const work = works.find((w) => w.slug === slug);
    if (!work) return { title: "Project Not Found" };
    return {
        title: `${work.title} | Case Study`,
        description: work.description,
    };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const work = works.find((w) => w.slug === slug);

    if (!work) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                    <Link
                        href="/#work"
                        className="group flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Works</span>
                    </Link>
                    {work.liveUrl && (
                        <a
                            href={work.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black rounded-full font-medium transition-colors"
                        >
                            <span>View Live</span>
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <span className="text-emerald-400 font-mono text-sm tracking-widest uppercase">
                            {work.category}
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight">
                        {work.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mb-12">
                        {work.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {work.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-4 py-2 border border-white/10 rounded-full text-sm text-neutral-300 bg-white/5"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Project Image */}
            <section className="px-4 md:px-8 pb-20">
                <div className="max-w-7xl mx-auto">
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900">
                        <Image
                            src={work.image}
                            alt={work.title}
                            width={1920}
                            height={1080}
                            className="w-full h-auto"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                    </div>
                </div>
            </section>

            {/* Overview */}
            <section className="px-4 md:px-8 py-20 border-t border-white/10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-12">
                        <div>
                            <h2 className="text-sm font-mono text-emerald-400 uppercase tracking-widest mb-4">
                                Overview
                            </h2>
                        </div>
                        <div className="md:col-span-2">
                            <p className="text-xl text-neutral-300 leading-relaxed">
                                {work.overview}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Challenge & Solution */}
            <section className="px-4 md:px-8 py-20 bg-neutral-950">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-sm font-mono text-emerald-400 uppercase tracking-widest mb-6">
                            The Challenge
                        </h2>
                        <p className="text-lg text-neutral-300 leading-relaxed">
                            {work.challenge}
                        </p>
                    </div>
                    <div>
                        <h2 className="text-sm font-mono text-emerald-400 uppercase tracking-widest mb-6">
                            The Solution
                        </h2>
                        <p className="text-lg text-neutral-300 leading-relaxed">
                            {work.solution}
                        </p>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="px-4 md:px-8 py-20 border-t border-white/10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-12">
                        <div>
                            <h2 className="text-sm font-mono text-emerald-400 uppercase tracking-widest mb-4">
                                Key Features
                            </h2>
                        </div>
                        <div className="md:col-span-2">
                            <ul className="space-y-4">
                                {work.features.map((feature, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start gap-4 text-lg text-neutral-300"
                                    >
                                        <span className="text-emerald-400 font-mono text-sm mt-1">
                                            0{index + 1}
                                        </span>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="px-4 md:px-8 py-20 bg-neutral-950">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-sm font-mono text-emerald-400 uppercase tracking-widest mb-12 text-center">
                        Technologies Used
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {work.technologies.map((tech) => (
                            <span
                                key={tech}
                                className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white font-medium hover:bg-white/10 hover:border-white/20 transition-colors"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Results */}
            {work.results && (
                <section className="px-4 md:px-8 py-20 border-t border-white/10">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-3 gap-12">
                            <div>
                                <h2 className="text-sm font-mono text-emerald-400 uppercase tracking-widest mb-4">
                                    Results
                                </h2>
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-2xl md:text-3xl font-medium text-white leading-relaxed">
                                    {work.results}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Navigation Footer */}
            <section className="px-4 md:px-8 py-20 border-t border-white/10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <Link
                        href="/#work"
                        className="group flex items-center gap-3 text-xl text-neutral-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-2 transition-transform" />
                        <span>Back to All Works</span>
                    </Link>
                    <Link
                        href="/#contact"
                        className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-neutral-200 transition-colors"
                    >
                        Start a Project
                    </Link>
                </div>
            </section>
        </div>
    );
}
