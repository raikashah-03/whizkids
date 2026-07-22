"use client";

import { JAPANESE_PILLARS } from "@/config/curriculum";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

export default function PillarsNavigation(): React.JSX.Element {
  const [activeId, setActiveId] = useState<string>(JAPANESE_PILLARS[0]!.id);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      for (const pillar of JAPANESE_PILLARS) {
        const el = document.getElementById(pillar.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveId(pillar.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveId(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="sticky top-20 z-40 w-full bg-white/90 backdrop-blur-md border-y border-gray-200/80 shadow-xs py-3">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-2 md:gap-3 overflow-x-auto no-scrollbar py-1">
          <span className="text-xs font-black uppercase text-foreground/50 tracking-wider shrink-0 pr-2 hidden md:inline-block">
            Pillars:
          </span>
          {JAPANESE_PILLARS.map((pillar, idx) => {
            const isActive = activeId === pillar.id;
            return (
              <button
                key={pillar.id}
                onClick={() => scrollToSection(pillar.id)}
                className={`relative shrink-0 px-4 py-2 rounded-full text-xs md:text-sm font-bold transition-all duration-300 flex items-center gap-2 border ${isActive
                    ? "bg-foreground text-white border-foreground shadow-sm"
                    : "bg-gray-50 text-foreground/70 border-gray-200 hover:bg-gray-100 hover:text-foreground"
                  }`}
              >
                <span className={`text-[11px] px-1.5 py-0.5 rounded-md font-mono ${isActive ? "bg-white/20 text-white" : pillar.badgeBg + " " + pillar.badgeText
                  }`}>
                  0{idx + 1}
                </span>
                <span>{pillar.romaji}</span>
                {/* <span className="opacity-75 hidden sm:inline-block">({pillar.kanji})</span> */}

                {isActive && (
                  <motion.div
                    layoutId="pillarActiveIndicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
