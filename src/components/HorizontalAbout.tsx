"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { GraduationCap, Briefcase, Code, Share2, Github, Linkedin, Mail } from "lucide-react";

// Custom X (Twitter) icon since Lucide doesn't have the new X logo
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const cards = [
  {
    id: 1,
    title: "Education",
    subtitle: "Bachelor of ICT",
    description: "Faculty of Technology, University of Sri Jayawardenepura.",
    date: "Undergraduate",
    icon: <GraduationCap className="w-8 h-8 text-blue-400" />,
    gradient: "from-blue-900/40 to-black",
    pattern: "bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0,transparent_70%)]",
  },
  {
    id: 2,
    title: "Experience",
    subtitle: "Freelance Developer",
    stats: "60+",
    statsLabel: "Projects Completed",
    description: "Specialized in web applications since 2022. Delivering quality on Fiverr.",
    icon: <Briefcase className="w-8 h-8 text-emerald-400" />,
    gradient: "from-emerald-900/40 to-black",
    pattern: "bg-[linear-gradient(45deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[length:20px_20px]",
  },
  {
    id: 3,
    title: "Tech Stack",
    description: "My arsenal for building digital masterpieces.",
    tags: ["Next.js", "React", "Node.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Supabase", "PostgreSQL", "LangChain"],
    icon: <Code className="w-8 h-8 text-orange-400" />,
    gradient: "from-orange-900/40 to-black",
    pattern: "bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.15),transparent_50%)]",
  },
  {
    id: 4,
    title: "Connect",
    description: "Let's build something amazing together.",
    links: [
      { icon: <Github className="w-6 h-6" />, label: "GitHub", href: "https://github.com/Codehash001" },
      { icon: <Linkedin className="w-6 h-6" />, label: "LinkedIn", href: "https://linkedin.com/in/hashintha" },
      { icon: <Mail className="w-6 h-6" />, label: "Email", href: "mailto:hashinthaun@gmail.com" },
      { icon: <XIcon className="w-6 h-6" />, label: "X", href: "https://x.com/hashintha" }
    ],
    icon: <Share2 className="w-8 h-8 text-purple-400" />,
    gradient: "from-purple-900/40 to-black",
    pattern: "bg-[conic-gradient(at_top_right,rgba(168,85,247,0.15),transparent)]",
  },
];

const allCards = [
  {
    id: 0,
    type: "header" as const,
    title: "About",
    titleSpan: "Me.",
    description: "I am Hashintha Nishsanka, a passionate developer who loves turning ideas into real, impactful digital products.",
  },
  ...cards,
];

export default function HorizontalAbout() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % allCards.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + allCards.length) % allCards.length);
  };

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x < -50) {
      nextCard();
    } else if (info.offset.x > 50) {
      prevCard();
    }
  };

  return (
    <>
      {/* Mobile Swipeable View */}
      <section id="about" className="md:hidden h-screen bg-black px-4 relative z-10 flex flex-col justify-between py-20">
        {/* Card Container */}
        <div className="flex-1 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="flex items-center justify-center cursor-grab active:cursor-grabbing"
            >
              {currentIndex === 0 ? (
                // Header Card for Mobile
                <div className="relative h-[450px] w-full max-w-[320px] flex flex-col justify-center px-6 py-8 overflow-hidden rounded-[2rem] bg-neutral-900 border border-white/10">
                  <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-neutral-800 rounded-tl-2xl opacity-50" />
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-neutral-800 rounded-br-2xl opacity-50" />
                  <h3 className="font-sans text-5xl font-bold text-white tracking-tighter leading-none">
                    About <br />
                    <span className="text-neutral-600">Me.</span>
                  </h3>
                  <p className="mt-6 text-neutral-400 text-lg leading-relaxed">
                    I am <span className="text-white font-semibold">Hashintha</span>, a passionate developer who loves turning ideas into real, impactful digital products.
                  </p>
                  <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                </div>
              ) : (
                // Feature Card for Mobile
                <MobileCard card={allCards[currentIndex] as typeof cards[0]} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Dots - at bottom with gap */}
        <div className="flex justify-center gap-2">
          {allCards.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentIndex ? "bg-white w-6" : "bg-white/30"
                }`}
              aria-label={`Go to card ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Desktop Horizontal Scroll View */}
      <section ref={targetRef} className="relative h-[300vh] bg-black hidden md:block">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-8 p-8 md:gap-16 md:p-32 pl-16">

            {/* Header Card */}
            <div className="group relative h-[450px] w-[320px] md:h-[550px] md:w-[500px] shrink-0 overflow-hidden flex flex-col justify-center">
              <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-neutral-800 rounded-tl-3xl opacity-50" />
              <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-neutral-800 rounded-br-3xl opacity-50" />

              <h3 className="font-sans text-5xl md:text-8xl font-bold text-white tracking-tighter leading-none relative z-10">
                About <br />
                <span className="text-neutral-600">Me.</span>
              </h3>
              <p className="mt-8 text-neutral-400 text-xl md:text-2xl max-w-[400px] leading-relaxed relative z-10">
                I am <span className="text-white font-semibold">Hashintha Nishsanka</span>, a passionate developer who loves turning ideas into real, impactful digital products.
              </p>

              {/* Decorative background blur */}
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            </div>

            {/* Feature Cards */}
            {cards.map((card) => (
              <motion.div
                key={card.id}
                className={`group relative h-[450px] w-[320px] md:h-[550px] md:w-[450px] shrink-0 overflow-hidden rounded-[2.5rem] bg-neutral-900 border border-white/10`}
                whileHover={{ y: -10, transition: { duration: 0.4, ease: "easeOut" } }}
              >
                {/* Background Gradients & Patterns */}
                <div className={`absolute inset-0 bg-gradient-to-b ${card.gradient} opacity-60 transition-opacity duration-500 group-hover:opacity-100`} />
                <div className={`absolute inset-0 ${card.pattern} opacity-50`} />

                {/* Floating Orb */}
                <motion.div
                  className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full blur-[80px]"
                />

                <div className="relative z-10 flex h-full flex-col p-8 md:p-10">
                  {/* Header: Icon + Title */}
                  <div className="flex items-start justify-between mb-auto">
                    <div className="p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                      {card.icon}
                    </div>
                    {card.date && (
                      <span className="px-3 py-1 text-xs font-mono text-neutral-400 border border-white/10 rounded-full bg-black/20 uppercase tracking-widest">
                        {card.date}
                      </span>
                    )}
                  </div>

                  {/* Content Body */}
                  <div className="space-y-4">
                    {card.stats && (
                      <div className="mb-2">
                        <span className="block text-7xl font-bold text-white tracking-tighter tabular-nums bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent">
                          {card.stats}
                        </span>
                        <span className="text-sm font-medium text-emerald-400 uppercase tracking-wider">{card.statsLabel}</span>
                      </div>
                    )}

                    <div>
                      <h4 className="font-sans text-3xl font-bold text-white mb-1">{card.title}</h4>
                      {card.subtitle && <p className="text-neutral-400 text-sm font-mono mb-2">{card.subtitle}</p>}
                    </div>

                    <p className="text-lg text-neutral-300 leading-relaxed font-light">
                      {card.description}
                    </p>

                    {/* Tags for Skills */}
                    {card.tags && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {card.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 text-sm bg-white/5 border border-white/10 rounded-lg text-neutral-300 group-hover:bg-white/10 group-hover:text-white transition-colors">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Social Links */}
                    {card.links && (
                      <div className="flex gap-4 mt-6">
                        {card.links.map((link, i) => (
                          <a key={i} href={link.href} className="p-3 bg-white/5 hover:bg-white/20 rounded-full transition-colors border border-white/10 group-hover:border-white/30 text-white">
                            {link.icon}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

          </motion.div>
        </div>
      </section>
    </>
  );
}

// Mobile Card Component
function MobileCard({ card }: { card: typeof cards[0] }) {
  return (
    <div
      className={`relative h-[450px] w-full max-w-[320px] overflow-hidden rounded-[2rem] bg-neutral-900 border border-white/10`}
    >
      <div className={`absolute inset-0 bg-gradient-to-b ${card.gradient} opacity-60`} />
      <div className={`absolute inset-0 ${card.pattern} opacity-50`} />
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full blur-[80px]" />

      <div className="relative z-10 flex h-full flex-col p-8">
        <div className="flex items-start justify-between mb-auto">
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
            {card.icon}
          </div>
          {card.date && (
            <span className="px-3 py-1 text-xs font-mono text-neutral-400 border border-white/10 rounded-full bg-black/20 uppercase tracking-widest">
              {card.date}
            </span>
          )}
        </div>

        <div className="space-y-4">
          {card.stats && (
            <div className="mb-2">
              <span className="block text-6xl font-bold text-white tracking-tighter tabular-nums bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent">
                {card.stats}
              </span>
              <span className="text-sm font-medium text-emerald-400 uppercase tracking-wider">{card.statsLabel}</span>
            </div>
          )}

          <div>
            <h4 className="font-sans text-2xl font-bold text-white mb-1">{card.title}</h4>
            {card.subtitle && <p className="text-neutral-400 text-sm font-mono mb-2">{card.subtitle}</p>}
          </div>

          <p className="text-base text-neutral-300 leading-relaxed font-light">
            {card.description}
          </p>

          {card.tags && (
            <div className="flex flex-wrap gap-2 mt-3">
              {card.tags.map(tag => (
                <span key={tag} className="px-3 py-1 text-sm bg-white/5 border border-white/10 rounded-lg text-neutral-300">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {card.links && (
            <div className="flex gap-3 mt-4">
              {card.links.map((link, i) => (
                <a key={i} href={link.href} className="p-3 bg-white/5 hover:bg-white/20 rounded-full transition-colors border border-white/10 text-white">
                  {link.icon}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
