import ProfileCard from "@/src/components/modern/ProfileCard";
import StatsCard from "@/src/components/modern/StatsCard";
import ServiceCard from "@/src/components/modern/ServiceCard";
import EducationExperience from "@/src/components/modern/EducationExperience";
import WorkSection from "@/src/components/WorkSection";
import ContactSection from "@/src/components/ContactSection";
import { Layers, LayoutTemplate, SquareTerminal, Cloud } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-8 py-2 font-sans selection:bg-[#CCFF00] selection:text-black">
      {/* 1. HERO / BENTO GRID SECTION */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-12 md:mb-20 pt-4 md:pt-6">

        {/* Left Column: Profile Card */}
        <div className="lg:col-span-4 xl:col-span-3 h-[600px] lg:h-auto lg:sticky lg:top-8 self-start">
          <ProfileCard />
        </div>



        {/* Right Column: Main Content Area */}
        <div className="lg:col-span-8 xl:col-span-9 flex flex-col justify-start gap-20 lg:pl-10">

          {/* HERO CONTENT */}
          <div className="flex flex-col gap-6">
            {/* HEROTEXT: Student/Freelancer Focus */}
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <h1 className="text-5xl md:text-7xl xl:text-8xl font-bold tracking-tighter uppercase leading-[0.9] font-display text-white">
                  Designing. <br />
                  <span className="text-neutral-700">Developing.</span> <br />
                  <span className="text-[#FF5722]">Debugging.</span> <br />
                  <span className="text-[#CCFF00]">Delivering.</span>
                </h1>
              </div>

              <p className="text-gray-400 text-lg md:text-xl max-w-3xl mt-4 leading-relaxed font-light border-l-2 border-[#CCFF00] pl-6">
                A dedicated university student with a freelance track record. <br className="hidden md:block" />
                Bridging the gap between academic theory and real-world application. <br />
                Currently building AI-powered solutions and robust full-stack applications.
              </p>
            </div>

            {/* STATS */}
            <StatsCard />

            {/* TECHNICAL ARSENAL */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* AI */}
              <ServiceCard
                title="AI & Intelligent Agents"
                subtitle="Python, RAG, LLMs"
                icon={<Layers className="w-8 h-8" />}
                theme="green"
                delay={0.1}
                className="min-h-[200px]"
              />

              {/* Full Stack */}
              <ServiceCard
                title="Full-Stack Engineering"
                subtitle="Next.js, Node, React"
                icon={<LayoutTemplate className="w-8 h-8" />}
                theme="orange"
                delay={0.2}
                className="min-h-[200px]"
              />

              {/* DevOps / Ops */}
              <ServiceCard
                title="DevOps & Cloud"
                subtitle="Docker, AWS, CI/CD"
                icon={<Cloud className="w-8 h-8" />}
                theme="dark"
                delay={0.3}
                className="min-h-[200px]"
              />
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap gap-4 mt-4">
              <a href="#work" className="group flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-[#CCFF00] transition-all">
                View My Projects
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <a href="#contact" className="px-8 py-4 rounded-full font-bold border border-white/20 hover:border-[#FF5722] hover:text-[#FF5722] transition-colors">
                Hire Me as Intern
              </a>
            </div>
          </div>

          {/* 3. EDUCATION & EXPERIENCE */}
          <EducationExperience />

          {/* 4. SELECTED WORK */}
          <WorkSection />

          {/* 5. CONTACT */}
          <ContactSection />

        </div>
      </section >
    </div >
  );
}
