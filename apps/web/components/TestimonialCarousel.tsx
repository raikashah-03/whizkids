"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import TestimonialCard from "./TestimonialCard";
import { Testimonial } from "./TestimonialSection";

interface Props {
  testimonials: Testimonial[];
}

const TestimonialCarousel = ({ testimonials }: Props): React.JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Limit to 10 testimonials as requested earlier
  const displayTestimonials = useMemo(() => testimonials.slice(0, 10), [testimonials]);

  const moveStep = useCallback((newDirection: number) => {
    if (displayTestimonials.length === 0) return;
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + displayTestimonials.length) % displayTestimonials.length);
  }, [displayTestimonials.length]);

  // Auto-slide every 6 seconds
  useEffect(() => {
    if (displayTestimonials.length <= 1) return;
    const timer = setInterval(() => {
      moveStep(1);
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex, moveStep, displayTestimonials.length]);

  if (displayTestimonials.length === 0) return <></>;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      rotate: direction > 0 ? 5 : -5,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
      rotate: direction < 0 ? 2 : -2,
    }),
  };

  return (
    <div className="relative max-w-4xl mx-auto px-4 sm:px-8 py-8">
      {/* Container for the carousel with overflow protection */}
      <div className="relative rounded-[3rem]">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 200, damping: 25 },
              opacity: { duration: 0.3 },
              scale: { duration: 0.4 },
              rotate: { duration: 0.4 }
            }}
            className="w-full h-full"
          >
            <TestimonialCard
              testimonial={displayTestimonials[currentIndex]!}
              variant="plain"
              index={currentIndex}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modern Floating Navigation */}
      {displayTestimonials.length > 1 && (
        <>
          <div className="absolute top-1/2 -left-4 md:-left-8 -translate-y-1/2 z-10">
            <button
              onClick={() => moveStep(-1)}
              className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border border-primary/10 shadow-xl flex items-center justify-center text-gray-400 hover:text-primary transition-all active:scale-90 group"
              aria-label="Previous story"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 group-hover:-translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="absolute top-1/2 -right-4 md:-right-8 -translate-y-1/2 z-10">
            <button
              onClick={() => moveStep(1)}
              className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border border-primary/10 shadow-xl flex items-center justify-center text-gray-400 hover:text-primary transition-all active:scale-90 group"
              aria-label="Next story"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </>
      )}

      {/* Dots Indicator */}
      <div className="mt-8 flex justify-center gap-3">
        {displayTestimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > currentIndex ? 1 : -1);
              setCurrentIndex(i);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-8 bg-primary shadow-sm' : 'w-2 bg-gray-200 hover:bg-primary/30'}`}
            aria-label={`Go to story ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
