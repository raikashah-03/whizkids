"use client";

import { AWARDS } from "@/config/awards";
import Heading from "@/components/Headding";
import { ChevronLeft, ChevronRight, ArrowRight, Trophy } from "lucide-react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useCallback, useRef } from "react";

// Accent colors matching the brand identity of Whizkids
const ACCENTS = [
  { border: "group-hover:border-[#FDA924]/30", shadow: "group-hover:shadow-[0_20px_50px_rgba(253,169,36,0.12)]", bg: "bg-[#FDA924]/5", text: "text-[#FDA924]" },
  { border: "group-hover:border-[#29BFDF]/30", shadow: "group-hover:shadow-[0_20px_50px_rgba(41,191,223,0.12)]", bg: "bg-[#29BFDF]/5", text: "text-[#29BFDF]" },
  { border: "group-hover:border-[#9B5FFF]/30", shadow: "group-hover:shadow-[0_20px_50px_rgba(155,95,255,0.12)]", bg: "bg-[#9B5FFF]/5", text: "text-[#9B5FFF]" }
];

const AwardsSection = (): React.JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState(AWARDS.length);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const N = AWARDS.length;
  const extendedAwards = [...AWARDS, ...AWARDS, ...AWARDS];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCount(3);
      } else if (window.innerWidth >= 768) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = useCallback(() => {
    if (!isTransitioning) return;
    setCurrentIndex((prev) => prev + 1);
  }, [isTransitioning]);

  const prevSlide = useCallback(() => {
    if (!isTransitioning) return;
    setCurrentIndex((prev) => prev - 1);
  }, [isTransitioning]);

  // Infinite looping wrap-around logic executed invisibly when the animation finishes
  const handleAnimationComplete = () => {
    if (!isTransitioning) return;
    if (currentIndex >= 2 * N) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex - N);
    } else if (currentIndex < N) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex + N);
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
      const handle = requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
      return () => cancelAnimationFrame(handle);
    }
  }, [isTransitioning]);

  // Auto-swipe every 3 seconds, unless hovered
  useEffect(() => {
    if (isHovered || !isTransitioning) return;
    const timer = setInterval(nextSlide, 3000);
    return () => clearInterval(timer);
  }, [nextSlide, isHovered, isTransitioning]);

  const activeDotIndex = (currentIndex % N + N) % N;

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-[#FAFAFC] relative overflow-hidden">
      {/* Decorative background grid */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]">
        <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container relative z-10 max-w-6xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-sm font-black text-primary uppercase tracking-[0.2em] mb-2 block">
            Milestones of Excellence
          </span>
          <Heading headingText="Honors &" spanText="Recognition" className="justify-center!" />
          <p className="text-foreground/70 font-medium max-w-2xl mx-auto mt-4 text-sm md:text-base">
            We are honored to be recognized for our dedication to providing a world-class early learning experience.
          </p>
        </div>

        {/* Carousel Slider */}
        <div
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="overflow-hidden px-2 py-4">
            <motion.div
              className="flex -mx-4"
              animate={{
                x: `-${currentIndex * (100 / visibleCount)}%`,
              }}
              transition={
                isTransitioning
                  ? { type: "spring", stiffness: 120, damping: 18 }
                  : { duration: 0 }
              }
              onAnimationComplete={handleAnimationComplete}
            >
              {extendedAwards.map((award, index) => {
                const originalIndex = index % N;
                const accent = ACCENTS[originalIndex % ACCENTS.length] || ACCENTS[0]!;

                return (
                  <motion.div
                    key={`${award.id}-${index}`}
                    className="w-full md:w-1/2 lg:w-1/3 shrink-0 px-4"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.6, delay: originalIndex * 0.05 }}
                  >
                    <motion.div
                      className={`bg-white rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100/60 flex flex-col items-center text-center h-full group transition-all duration-500 hover:-translate-y-2 hover:border-transparent ${accent.border} ${accent.shadow}`}
                    >
                      {/* Trophy Image with Hover Celebration Effect */}
                      <div className="relative w-36 h-36 md:w-44 md:h-44 mb-6 flex items-center justify-center">
                        <motion.div
                          className={`absolute inset-0 rounded-full ${accent.bg} scale-110`}
                          whileHover={{ scale: 1.25 }}
                          transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        />
                        <motion.div
                          className="relative w-full h-full p-4 flex items-center justify-center"
                          whileHover={{
                            rotate: [0, -12, 12, -8, 8, 0],
                            scale: 1.08,
                          }}
                          transition={{ duration: 0.65 }}
                        >
                          <Image
                            src={award.image}
                            alt={award.title}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 144px, 176px"
                          />
                        </motion.div>
                      </div>

                      {/* Award Title */}
                      <h3 className="text-lg md:text-xl font-black text-gray-900 leading-tight flex-1 mb-6">
                        {award.title}
                      </h3>

                      {/* Know More CTA */}
                      <Link
                        href={`/awards#${award.id}`}
                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-50 group-hover:bg-primary text-gray-600 group-hover:text-white font-bold text-sm transition-all duration-300 active:scale-95 shadow-sm group-hover:shadow-[0_4px_16px_rgba(253,169,36,0.3)]`}
                      >
                        <span>Know More</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 -left-4 md:-left-8 -translate-y-1/2 z-10">
            <button
              onClick={prevSlide}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-gray-100 shadow-lg flex items-center justify-center text-gray-400 hover:text-primary transition-all active:scale-90"
              aria-label="Previous award"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

          <div className="absolute top-1/2 -right-4 md:-right-8 -translate-y-1/2 z-10">
            <button
              onClick={nextSlide}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-gray-100 shadow-lg flex items-center justify-center text-gray-400 hover:text-primary transition-all active:scale-90"
              aria-label="Next award"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>

        {/* Indicators */}
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: N }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (!isTransitioning) return;
                setCurrentIndex(N + idx);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === activeDotIndex ? "w-6 bg-primary" : "w-2 bg-gray-200"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Overall View Link */}
        <div className="mt-12 text-center">
          <Link
            href="/awards"
            className="inline-flex items-center gap-2 text-primary font-bold hover:underline group"
          >
            <span>View All Awards & Certificates</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
