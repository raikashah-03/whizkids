import BuildingFoundation from "@/components/BuildingFoundation";
import FAQPage from "@/components/FAQPage";
import ProgramPage from "@/components/ProgramPage";
import SpecialTagline from "@/components/SpecialTagline";
import TestimonialSection from "@/components/TestimonialSection";
import WhyChoose from "@/components/WhyChoose";
import Image from "next/image";
import React from "react";

export default function Home(): React.JSX.Element {
  return (
    <div>
      <div className="h-screen"></div>
      <SpecialTagline />
      <WhyChoose />
      <BuildingFoundation />
      <div className="relative">
        {/* Floating Icons for Program & FAQ pages */}
        <div className="absolute top-20 left-4 md:left-12 w-16 h-16 md:w-24 md:h-24 pointer-events-none animate-float z-20">
          <Image src="/icons/funfact-shape-1.png" alt="" fill className="object-contain" />
        </div>
        <div className="absolute top-1/3 right-4 md:right-12 w-12 h-12 md:w-20 md:h-20 pointer-events-none animate-bob z-20">
          <Image src="/icons/bee.png" alt="" fill className="object-contain" />
        </div>
        <div className="absolute bottom-1/3 left-4 md:left-16 w-16 h-16 md:w-28 md:h-28 pointer-events-none animate-float z-20" style={{ animationDelay: '1s' }}>
          <Image src="/icons/parasuit.png" alt="" fill className="object-contain" />
        </div>
        <div className="absolute bottom-20 right-4 md:right-16 w-12 h-12 md:w-20 md:h-20 pointer-events-none animate-bob z-20" style={{ animationDelay: '2s' }}>
          <Image src="/icons/alphabets.png" alt="" fill className="object-contain" />
        </div>

        <ProgramPage />
        <TestimonialSection />
        <FAQPage />
      </div>

      <div className="h-screen"></div>
    </div>
  );
}
