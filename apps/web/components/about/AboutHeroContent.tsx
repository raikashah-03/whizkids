import Heading from "@/components/Headding";
import Image from "next/image";
import React from "react";
import ParallaxImage from "./ParallaxImage";

const AboutHeroContent = (): React.JSX.Element => {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative Icons */}
      <div className="absolute top-50 left-[10%] w-16 h-16 opacity-60 animate-float pointer-events-none hidden lg:block">
        <Image src="/icons/alphabets.png" alt="" fill className="object-contain" />
      </div>
      <div className="absolute top-32 right-[8%] w-20 h-20 opacity-70 animate-float-slow pointer-events-none hidden lg:block">
        <Image src="/icons/parasuit.png" alt="" fill className="object-contain" />
      </div>

      {/* Decorative SVG Shapes */}
      <div className="absolute bottom-20 left-[15%] w-12 h-12 text-[#FFDE59] animate-spin-slow pointer-events-none hidden md:block">
        <svg viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0L61 39H100L68 62L80 100L50 76L20 100L32 62L0 39H39L50 0Z" />
        </svg>
      </div>
      <div className="absolute top-10 right-[25%] w-10 h-10 text-skyblue-strong opacity-50 animate-bob pointer-events-none hidden md:block">
        <svg viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="50" />
        </svg>
      </div>

      <div className="container max-w-5xl mx-auto text-center relative z-10 px-4 pt-10">
        <div className="w-fit mx-auto items-center justify-center px-3 py-1.5 bg-peach-light rounded-full text-peach-strong font-bold text-xs tracking-widest uppercase mb-6 shadow-sm">
          Welcome to Whizkids
        </div>

        <Heading
          headingText="Where Every Child"
          spanText="Blooms"
          className="justify-center! mb-8"
          beforeIcon='/shapes/left-heading-symbol.svg'
          afterIcon="/shapes/right-heading-symbol.svg"
        />

        <p className="text-base md:text-lg lg:text-xl text-foreground/80 font-medium leading-relaxed max-w-4xl mx-auto mb-12">
          At Whizkids International Jayamahal, we believe every child has a unique potential, and we take the time to notice and nurture it in our own gentle way. In a warm, safe, and happy environment, children learn through play, conversations, and everyday experiences, growing in confidence as they discover what they enjoy. We don’t believe in one path for all; whether a child grows into a doctor, artist, writer, singer, or sportsperson, we support who they are becoming, because all paths matter, while staying closely connected with parents every step of the way.
        </p>

        {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-gray-200/50">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-skyblue-light text-skyblue-strong flex items-center justify-center font-display text-xl mb-2">
              🌟
            </div>
            <h4 className="text-lg font-bold text-foreground">Playful Learning</h4>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-lavender-light text-lavender-strong flex items-center justify-center font-display text-xl mb-2">
              🎨
            </div>
            <h4 className="text-lg font-bold text-foreground">Creative Growth</h4>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-green-light text-green-strong flex items-center justify-center font-display text-xl mb-2">
              🌱
            </div>
            <h4 className="text-lg font-bold text-foreground">Safe Environment</h4>
          </div>
        </div> */}
        {/* ── Parallax Image Container ── */}
        <ParallaxImage />
      </div>
    </section>
  );
};

export default AboutHeroContent;
