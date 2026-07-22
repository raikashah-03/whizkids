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
              We take physical development seriously because at this age, movement is how children build strength, balance, coordination, and confidence.
            </p>
            <p>
              It’s not an extra here — it’s part of everyday life. Whether they’re stretching, running, or trying something new, they’re constantly discovering what their bodies can do.
            </p>
            <p className="text-[#29BFDF] font-semibold pt-2 border-t border-foreground/5 max-w-lg mx-auto">
              To them, it feels like play. But as you explore further, you’ll see how each activity is thoughtfully designed to support their physical growth from the very start.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
