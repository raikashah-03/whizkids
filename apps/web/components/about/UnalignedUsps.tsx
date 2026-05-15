"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Re-using the CloudStat component from UspsSection
function CloudStat({ value, label, color, stopColor, className = "" }: { value: string; label: string; color: string; stopColor: string; className?: string }) {
  return (
    <div className={`usps-stat relative w-full max-w-[200px] aspect-1.5/1 flex flex-col items-center justify-center drop-shadow-sm ${className}`}>
      <svg
        className={`absolute inset-0 w-full h-full ${color} opacity-90`}
        viewBox="0 0 200 130"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`grad-about-${label}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor={stopColor} />
          </linearGradient>
        </defs>
        <path
          d="M140.2,95.5 C164.5,95.5 184,76 184,51.7 C184,29.9 166.5,12 144.8,11.2 C134.4,-2.4 114.7,-4 100,6.7 C87.3,-2.8 69.4,0 60.5,12 C44,9.5 28.5,20.8 26.3,37.3 C10.1,40.7 0,55.3 0,72 C0,91.3 15.7,107 35,107 L140.2,107 Z"
          fill={`url(#grad-about-${label})`}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeOpacity="0.4"
          strokeLinejoin="round"
          transform="translate(8, 10)"
        />
      </svg>
      <div className={`relative z-10 flex flex-col items-center gap-0 mt-4 ${color}`}>
        <span className="text-xs md:text-sm font-black uppercase tracking-widest opacity-80">
          {label}
        </span>
        <span className="text-3xl md:text-4xl font-black font-display tracking-tight">
          {value}
        </span>
      </div>
    </div>
  );
}

const UnalignedUsps = (): React.JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.from(".usps-stat", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "restart reverse restart reverse",
      },
      y: 50,
      opacity: 0,
      scale: 0.9,
      stagger: 0.15,
      duration: 0.8,
      ease: "back.out(1.5)",
    });
  }, { scope: containerRef });

  return (
    <section className="relative overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-4">
        {/* <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">
            Our <span className="text-primary italic">Impact</span> in Numbers
          </h2>
          <p className="max-w-xl text-foreground/70 font-medium">
            Over the years, Whizkids has grown into a trusted community, fostering a love for learning in every child that walks through our doors.
          </p>
        </div> */}

        {/* Unaligned Trendy Grid */}
        <div className="grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-4 md:gap-12 relative max-w-5xl mx-auto justify-items-center">
          <CloudStat
            value="1,000+"
            label="FAMILIES"
            color="text-lavender-strong"
            stopColor="#EBDCFF"
            className="md:-mt-10"
          />
          <CloudStat
            value="6+"
            label="YEARS"
            color="text-[#FF8A66]"
            stopColor="#FFE4E1"
            className="mt-10 md:mt-16"
          />
          <CloudStat
            value="12+"
            label="PROGRAMS"
            color="text-primary"
            stopColor="#FFF3C4"
            className="md:-mt-4"
          />
          <CloudStat
            value="100%"
            label="SAFE"
            color="text-skyblue-strong"
            stopColor="#E4F3F7"
            className="mt-10 md:mt-20"
          />
        </div>
      </div>
    </section>
  );
};

export default UnalignedUsps;
