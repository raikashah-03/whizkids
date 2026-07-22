"use client";

import React from "react";
import { JAPANESE_PILLARS, JapanesePillar } from "@/config/curriculum";
import { CheckCircle2, Sparkles, Star } from "lucide-react";
import Heading from "@/components/Headding";
import { motion } from "framer-motion";
import Image from "next/image";

// Reusing rich images from public directory
import playgroupImg from "@/public/images/programs/playgroup.jpg";
import nurseryImg from "@/public/images/programs/nursery.jpg";
import jrKgImg from "@/public/images/programs/jr-kg.jpg";
import srKgImg from "@/public/images/programs/sr-kg.jpg";
import legoImg from "@/public/images/child-playing-legos.png";
import activitiesHero from "@/public/images/activities-hero.png";
import policeTrip from "@/public/images/activities-trip-police.png";

const PILLAR_IMAGES: Record<string, any[]> = {
  ikigai: [legoImg, playgroupImg],
  omoiyari: [nurseryImg, activitiesHero],
  kaizen: [jrKgImg, srKgImg],
  shizen: [policeTrip, playgroupImg],
  hataraki: [srKgImg, legoImg],
  "wabi-sabi": [nurseryImg, jrKgImg],
  ma: [playgroupImg, srKgImg]
};

function PillarCard({ pillar, index }: { pillar: JapanesePillar; index: number }): React.JSX.Element {
  const isEven = index % 2 === 0;
  const images = PILLAR_IMAGES[pillar.id] || [playgroupImg, nurseryImg];
  const IconComponent = pillar.icon;

  return (
    <section
      id={pillar.id}
      className={`py-12 sm:py-16 md:py-28 scroll-mt-24 ${pillar.bgColor} relative overflow-hidden transition-colors border-b border-gray-200/50`}
    >
      {/* Decorative background shape */}
      <div className="absolute top-10 right-10 pointer-events-none opacity-[0.04] select-none hidden md:block">
        <IconComponent className="w-64 h-64 text-foreground stroke-1" />
      </div>

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div
          className={`flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16 ${
            isEven ? "" : "lg:flex-row-reverse"
          }`}
        >
          {/* ── Text Content ── */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-4 sm:gap-6"
            >
              {/* Badge (Clean English Title + Icon) */}
              <div className="flex items-center gap-2.5">
                <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-1.5 rounded-full font-black text-xs md:text-sm ${pillar.badgeBg} ${pillar.badgeText} shadow-2xs border border-black/5`}>
                  <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{pillar.romaji} — {pillar.meaning}</span>
                </span>
              </div>

              {/* Title */}
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-foreground leading-tight font-display">
                  {pillar.romaji}
                </h2>
                <p className="text-base sm:text-lg md:text-xl font-bold text-foreground/80 mt-1 font-sans">
                  {pillar.tagline}
                </p>
              </div>

              {/* Quote box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-xs border border-gray-200/80 shadow-xs relative">
                <p className="text-xs sm:text-sm md:text-base font-bold text-foreground/90 italic leading-relaxed">
                  “{pillar.quote}”
                </p>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base md:text-lg text-foreground/85 leading-relaxed font-semibold">
                {pillar.description}
              </p>

              {/* How We Do It Box */}
              <div className="mt-1 sm:mt-2 flex flex-col gap-2.5 sm:gap-3 bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200/80">
                <h4 className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-foreground/60 flex items-center gap-2">
                  <Sparkles className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${pillar.accentColor}`} />
                  <span>How We Do It at WhizKids:</span>
                </h4>
                <div className="flex flex-col gap-2 sm:gap-2.5">
                  {pillar.howWeDoIt.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 sm:gap-3">
                      <CheckCircle2 className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5 ${pillar.accentColor}`} />
                      <span className="text-xs sm:text-sm md:text-base font-bold text-foreground/90">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Built Tags */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1 sm:mt-2">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-foreground/50 mr-1 sm:mr-2">
                  Skills Built:
                </span>
                {pillar.skillsBuilt.map((skill, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1 rounded-full text-[11px] sm:text-xs font-black ${pillar.badgeBg} ${pillar.badgeText} border border-black/5 shadow-2xs`}
                  >
                    {skill}
                  </span>
                ))}
              </div>

            </motion.div>
          </div>

          {/* ── Image Showcase Collage (Mobile-Optimized) ── */}
          <div className="w-full lg:w-1/2 mt-4 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative z-10 w-full aspect-square max-w-[320px] sm:max-w-[420px] lg:max-w-[460px] mx-auto"
            >
              {/* Main Image */}
              <div className="absolute top-0 left-0 w-[72%] h-[75%] rounded-2xl sm:rounded-[2.5rem] overflow-hidden shadow-xl border-2 sm:border-4 border-white hover:scale-105 transition-all duration-500 z-10 group">
                <Image
                  src={images[0]!}
                  alt={`${pillar.romaji} main activity`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 sm:p-4">
                  <span className="text-white text-[11px] sm:text-xs font-bold">{pillar.tagline}</span>
                </div>
              </div>

              {/* Secondary Overlay Image */}
              <div className="absolute bottom-0 right-0 w-[62%] h-[60%] rounded-2xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl border-4 sm:border-8 border-white hover:scale-105 transition-all duration-500 z-20 group">
                <Image
                  src={images[1]!}
                  alt={`${pillar.romaji} secondary activity`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 bg-white p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 flex items-center gap-1.5 sm:gap-2"
              >
                <Star className={`w-4 h-4 sm:w-5 sm:h-5 fill-current ${pillar.accentColor}`} />
                <span className="text-[11px] sm:text-xs font-black text-foreground font-display">{pillar.romaji}</span>
              </motion.div>

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CurriculumPillars(): React.JSX.Element {
  return (
    <div className="flex flex-col">
      <div className="py-12 sm:py-16 bg-white text-center relative overflow-hidden">
        
        {/* Floating Background Icons */}
        <div className="absolute top-6 left-10 pointer-events-none opacity-60 hidden sm:block">
          <Image src="/icons/bee.png" alt="" width={45} height={45} className="w-10 h-auto" />
        </div>
        <div className="absolute bottom-6 right-10 pointer-events-none opacity-60 hidden sm:block">
          <Image src="/icons/blocks.png" alt="" width={45} height={45} className="w-10 h-auto" />
        </div>

        <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-primary mb-1.5 block">
          Educational Approach
        </span>
        <Heading headingText="Our Curriculum" spanText="Pillars" className="justify-center!" />
        <p className="text-foreground/80 max-w-xl mx-auto mt-2 sm:mt-3 text-xs sm:text-sm md:text-base font-semibold px-4">
          Each pillar addresses a vital domain of early childhood growth — protecting curiosity, instilling resilience, and nurturing lifelong confidence.
        </p>
      </div>

      {JAPANESE_PILLARS.map((pillar, index) => (
        <PillarCard key={pillar.id} pillar={pillar} index={index} />
      ))}
    </div>
  );
}
