"use client";
import Heading from "@/components/Headding";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { LucideIcon } from "lucide-react";
import { Eye, Heart, Target } from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";
import TopBottomShapeSection from "../ui/top-bottom-shape-section";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CardItem {
  id: string;
  title: string;
  spanTitle: string;
  paragraphs?: string[];
  valuesList?: { title: string; text: string }[];
  icon: LucideIcon;
  bg: string;
  accent: string;
  borderColor: string;
}

const cards: CardItem[] = [
  {
    id: "mission",
    title: "Our",
    spanTitle: "Mission",
    paragraphs: [
      "At Whizkids International Preschool, Jayamahal, everything we do comes from a simple place: we want your child to feel happy, comfortable, and confident as they begin their learning journey.",
      "We create a positive and caring environment where children are encouraged to explore, ask questions, and grow at their own pace, without pressure. Because in these early years, feeling safe and understood matters more than anything else.",
      "Our focus is to gently build a strong foundation while helping each child discover their unique potential. We truly believe every child is different, and with the right care, attention, and encouragement, they begin to show you what they’re capable of, naturally, in their own time.",
      "And that’s what we’re here for, to support them and to give you the peace of mind that your child is in the right place."
    ],
    icon: Target,
    bg: "bg-[#FFF6F0]", // Solid color to avoid transparency
    accent: "text-peach-strong",
    borderColor: "border-[#FF8A66]/30",
  },
  {
    id: "vision",
    title: "Our",
    spanTitle: "Vision",
    paragraphs: [
      "At Whizkids International Preschool, Jayamahal, we see these early years as the time when children slowly start becoming themselves. How they feel, how they respond, how confident they are, it all begins here.",
      "So we keep things simple and gentle. We help them build confidence, pick up good habits, and understand values through small, everyday moments, not pressure. Learning happens in a way that feels easy and enjoyable for them.",
      "We gently support all aspects of your child’s growth—social, emotional, physical, and cognitive, so nothing important is missed.",
      "Because these early years aren’t just about learning, they’re about shaping who they are becoming."
    ],
    icon: Eye,
    bg: "bg-[#E4F3F7]", // Solid color
    accent: "text-skyblue-strong",
    borderColor: "border-[#29BFDF]/30",
  },
  {
    id: "values",
    title: "Our",
    spanTitle: "Values",
    valuesList: [
      {
        title: "We see the child, not just the age",
        text: "Every child has a unique potential. We take the time to understand who they are, and help them grow in their own way."
      },
      {
        title: "Care comes first",
        text: "Children open up when they feel safe and comfortable. We create a space where they feel at ease, every single day."
      },
      {
        title: "We grow the whole child",
        text: "We support their social, emotional, physical, and cognitive development because every part of their growth matters."
      },
      {
        title: "We don’t rush learning",
        text: "There’s no pressure. Children learn best when they enjoy the process and move at their own pace."
      },
      {
        title: "Parents are true partners",
        text: "We don’t just update you, we involve you. Through regular conversations, meetings, and shared moments, you stay a part of your child’s everyday journey."
      },
      {
        title: "We grow together",
        text: "When school and parents work together, children feel more secure, more understood, and more confident. That connection makes all the difference."
      }
    ],
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
                className={`sticky top-[15vh] w-full max-w-[850px] h-[500px] md:h-auto rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border ${card.borderColor} ${card.bg} transform-gpu`}
                style={{
                  zIndex: index,
                  // Slight offset for each card's sticky position to create a staggered stacked look
                  top: `calc(15vh + ${index * 15}px)`
                }}
              >
                <div className="flex flex-col items-center text-center gap-3 md:gap-6 h-full w-full">
                  <div className={`w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-full bg-white flex items-center justify-center shadow-sm ${card.accent}`}>
                    <card.icon className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <div className="mb-1 md:mb-4 shrink-0">
                    <Heading
                      headingText={card.title}
                      spanText={card.spanTitle}
                      className="justify-center! scale-90 md:scale-100"
                    />
                  </div>
                  <div className="flex-1 overflow-y-auto md:overflow-visible w-full pr-1 md:pr-0">
                    {card.paragraphs && (
                      <div className="flex flex-col gap-3 md:gap-4 text-foreground/80 font-medium text-sm md:text-base leading-relaxed text-center pb-2">
                        {card.paragraphs.map((para, i) => (
                          <p key={i}>{para}</p>
                        ))}
                      </div>
                    )}
                    {card.valuesList && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-left w-full pb-2">
                        {card.valuesList.map((val, i) => (
                          <div key={i} className="flex flex-col gap-1">
                            <p className="font-bold text-sm md:text-base text-foreground/90">
                              {val.title}
                            </p>
                            <p className="text-foreground/80 font-medium text-xs md:text-sm leading-relaxed">
                              {val.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
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
