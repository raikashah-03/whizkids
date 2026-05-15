"use client";
import Heading from "@/components/Headding";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eye, Heart, Target } from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";
import TopBottomShapeSection from "../ui/top-bottom-shape-section";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const cards = [
  {
    id: "mission",
    title: "Our",
    spanTitle: "Mission",
    description: "To cultivate a nurturing, inclusive, and joyful learning environment where every child feels valued, safe, and heard. We strive to empower young minds through play-based and experiential learning, ensuring that each child discovers their unique talents and builds a strong foundation for lifelong happiness.",
    icon: Target,
    bg: "bg-[#FFF6F0]", // Solid color to avoid transparency
    accent: "text-peach-strong",
    borderColor: "border-[#FF8A66]/30",
  },
  {
    id: "vision",
    title: "Our",
    spanTitle: "Vision",
    description: "To be a leading early childhood center that inspires the next generation of confident, compassionate, and resilient learners. We envision a vibrant community where children thrive, educators are passionate, and parents are active partners in the beautiful journey of their child's early development.",
    icon: Eye,
    bg: "bg-[#E4F3F7]", // Solid color
    accent: "text-skyblue-strong",
    borderColor: "border-[#29BFDF]/30",
  },
  {
    id: "values",
    title: "Our",
    spanTitle: "Values",
    description: "Respect, Empathy, and Integrity are at the heart of everything we do. We believe in building strong partnerships with parents and creating a safe space where curiosity is celebrated, kindness is practiced daily, and every child is encouraged to be their most authentic self.",
    icon: Heart,
    bg: "bg-[#EBDFFF]", // Solid color
    accent: "text-lavender-strong",
    borderColor: "border-[#9B5FFF]/30",
  }
];

const MissionVisionCards = (): React.JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current) return;

    cardRefs.current.forEach((card, index) => {
      const nextCard = cardRefs.current[index + 1];
      if (!card || !nextCard) return; // Last card doesn't scale down

      gsap.to(card, {
        scale: 0.92, // Scale down slightly to create depth
        transformOrigin: "top center",
        scrollTrigger: {
          trigger: nextCard,
          start: "top 75%", // Starts scaling down when the next card is 75% down the viewport
          end: `top 25%`, // Ends scaling when the next card is near its sticky point
          scrub: true,
        }
      });
    });

  }, { scope: containerRef });

  return (
    <TopBottomShapeSection>

      <div className="relative overflow-clip" ref={containerRef}>
        {/* Decorative Left and Right Shapes */}
        <div className="absolute top-1/4 left-5 md:left-10 w-20 h-20 md:w-24 md:h-24 opacity-60 animate-float pointer-events-none hidden sm:block">
          <Image src="/icons/cloud-1.png" alt="" fill className="object-contain" />
        </div>
        <div className="absolute bottom-1/4 left-10 md:left-20 w-12 h-12 md:w-16 md:h-16 opacity-90 animate-spin-slow pointer-events-none hidden sm:block">
          <Image src="/icons/blocks.png" alt="" fill className="object-contain" />
        </div>
        <div className="absolute top-1/3 right-5 md:right-10 w-16 h-16 md:w-20 md:h-20 opacity-80 animate-bob pointer-events-none hidden sm:block">
          <Image src="/icons/bus.png" alt="" fill className="object-contain" />
        </div>
        <div className="absolute bottom-1/3 right-10 md:right-20 w-20 h-20 md:w-24 md:h-24 opacity-50 animate-float-slow pointer-events-none hidden sm:block">
          <Image src="/icons/cloud-2.png" alt="" fill className="object-contain" />
        </div>

        <div className="container max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Heading headingText="What Drives" spanText="Us" className="justify-center!" />
            <p className="text-foreground/70 font-medium max-w-2xl mx-auto mt-6">
              Our foundation is built on strong principles that guide every interaction, lesson, and smile at Whizkids.
            </p>
          </div>

          <div className="flex flex-col items-center gap-8 pb-32">
            {cards.map((card, index) => (
              <div
                key={card.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={`sticky top-[15vh] w-full max-w-[600px] rounded-[2.5rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border ${card.borderColor} ${card.bg} transform-gpu`}
                style={{
                  zIndex: index,
                  // Slight offset for each card's sticky position to create a staggered stacked look
                  top: `calc(15vh + ${index * 15}px)`
                }}
              >
                <div className="flex flex-col items-center text-center gap-6">
                  <div className={`w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-full bg-white flex items-center justify-center shadow-sm ${card.accent}`}>
                    <card.icon className="w-8 h-8 md:w-10 md:h-10" />
                  </div>
                  <div className="flex flex-col items-center w-full">
                    <div className="mb-4">
                      <Heading
                        headingText={card.title}
                        spanText={card.spanTitle}
                        className="justify-center! scale-90 md:scale-100"
                      />
                    </div>
                    <p className="text-foreground/80 font-medium text-base md:text-lg leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TopBottomShapeSection>
  );
};

export default MissionVisionCards;
