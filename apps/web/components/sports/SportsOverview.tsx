"use client";

import Heading from "@/components/Headding";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import React, { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SportsOverview(): React.JSX.Element {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.from(textRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-16 md:py-20 overflow-hidden bg-background">
      {/* Background decoration */}
      <span aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#E4F3F7]/30 blur-3xl" />

      {/* Floating decorative icons */}
      <div className="absolute top-10 left-[15%] w-10 h-10 opacity-40 animate-float pointer-events-none hidden lg:block">
        <Image src="/icons/star.png" alt="" fill className="object-contain" />
      </div>
      <div className="absolute bottom-10 right-[15%] w-12 h-12 opacity-40 animate-bob pointer-events-none hidden lg:block">
        <Image src="/icons/cloud-1.png" alt="" fill className="object-contain" />
      </div>

      <div className="container max-w-4xl mx-auto px-4 relative z-10">
        <div ref={textRef} className="flex flex-col items-center text-center gap-6 md:gap-8">
          
          {/* Label pill */}
          <div className="w-fit px-4 py-1.5 bg-[#F1F8EB] rounded-full text-green-strong font-bold text-xs tracking-widest uppercase shadow-sm">
            Our Approach to Fitness
          </div>

          <Heading
            headingText="Why We Prioritize"
            spanText="Physical Development"
            className="justify-center!"
          />

          <div className="text-foreground/75 font-medium leading-relaxed text-sm md:text-base max-w-2xl mx-auto space-y-5">
            <p>
              We take physical development seriously because at this age, it’s not just about playtime. It’s how children build strength, balance, coordination, and the confidence to move through the world on their own.
            </p>
            <p>
              These early years matter. The more they move, the more secure, active, and confident they become, in their bodies and beyond.
            </p>
            
            {/* Highlighted key phrase */}
            <p className="text-lg md:text-xl font-bold font-display text-primary max-w-xl mx-auto py-2">
              “So movement isn’t an add-on here. It’s part of their everyday.”
            </p>

            <p>
              From yoga stretches to running on the field, from trying a gymnastics move to practicing taekwondo, they’re constantly exploring what their bodies can do. There are little stumbles, big smiles, and those quiet “I did it” moments.
            </p>
            <p>
              And slowly, you see the shift – better balance, more energy, growing confidence.
            </p>
            
            <p className="font-bold text-foreground/80">
              To them, it’s just fun.
            </p>
            
            <p className="text-[#29BFDF] font-semibold pt-2 border-t border-foreground/5 max-w-lg mx-auto">
              But as you explore further, you’ll see how each activity is thoughtfully designed to build your child’s strength, coordination, and overall physical potential from the very start.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
