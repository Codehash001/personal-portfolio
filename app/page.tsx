import CodeHoverCards from "@/src/components/lightswind/code-hover-cards";
import Navbar from "@/src/components/Navbar";
import HeroImage from "@/src/components/HeroImage";
import HeroTitle from "@/src/components/HeroTitle";
import NextSection from "@/src/components/NextSection";
import HorizontalAbout from "@/src/components/HorizontalAbout";
import WorkSection from "@/src/components/WorkSection";
import ContactSection from "@/src/components/ContactSection";

export default function Home() {
  return (
    <div className="w-screen min-h-screen bg-black text-white snap-y snap-proximity scroll-pt-16">
      <div className="fixed inset-0 z-30 h-16">
        <Navbar />
      </div>

      {/* Fixed hero layer below scrolling content */}
      <div className="fixed inset-0 z-0">
        <main id="home" className="w-full h-full p-0 m-0 relative">
          <CodeHoverCards
            className="bg-black text-white"
            cardClassName="w-full h-full"
            showBorder={false}
            columns={1}
            iconSize={0}
            fullScreen
            cardGap="0"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            aspectRatio={null as any}
            borderRadius={0}
            cards={[
              {
                id: "hero",
                content: (
                  <HeroTitle
                    line1="BEYOND THE"
                    line2="BROWSER"
                    duration={2400}
                    className="mt-8 md:-ml-6 px-4 overflow-hidden max-w-[100vw] font-sans text-white"
                    lineClassName="text-[11vw] md:text-[8vw] xl:text-[10vw] font-bold tracking-tight md:tracking-normal"
                    gapClass="block mt-1 md:mt-0"
                  />
                ),
              },
            ]}
          />
          <HeroImage />
        </main>
      </div>

      {/* Spacer in normal flow so nothing overlays the hero */}
      <div className="h-[100vh]" aria-hidden="true" />
      {/* Next section follows in normal flow */}
      <NextSection />
      <HorizontalAbout />
      <WorkSection />
      <ContactSection />
    </div>
  );
}
