"use client";

import { fetchTestimonialsBatch } from "@/app/testimonials/actions";
import { AnimatePresence, motion, Variants } from "framer-motion";
import React, { useState } from "react";
import OutlineButton from "./OutlineButton";
import TestimonialCard from "./TestimonialCard";
import { Testimonial } from "./TestimonialSection";

interface TestimonialGridProps {
  initialTestimonials: Testimonial[];
  totalCount: number;
}

const TestimonialGrid = ({ initialTestimonials, totalCount }: TestimonialGridProps): React.JSX.Element => {
  const [currentTestimonials, setCurrentTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [isLoading, setIsLoading] = useState(false);
  const hasMore = currentTestimonials.length < totalCount;

  const handleLoadMore = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    const start = currentTestimonials.length;
    const end = start + 10;

    try {
      const nextBatch = await fetchTestimonialsBatch(start, end);
      if (nextBatch && nextBatch.length > 0) {
        setCurrentTestimonials((prev) => [...prev, ...nextBatch]);
      }
    } catch (error) {
      console.error("Error loading more testimonials:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to split testimonials into columns for masonry effect
  const getColumns = (count: number) => {
    const columns: Testimonial[][] = Array.from({ length: count }, () => []);
    currentTestimonials.forEach((item, index) => {
      columns[index % count]!.push(item);
    });
    return columns;
  };

  // Loading Skeletons for pagination
  const SkeletonCard = () => (
    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex flex-col gap-6 animate-pulse w-full">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gray-100" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-100 rounded w-1/3" />
          <div className="h-3 bg-gray-50 rounded w-1/4" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-100 rounded w-full" />
        <div className="h-4 bg-gray-100 rounded w-full" />
        <div className="h-4 bg-gray-50 rounded w-2/3" />
      </div>
    </div>
  );

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="container mx-auto px-4">
      {/* Mobile: 1 Column */}
      <div className="md:hidden flex flex-col gap-6">
        <AnimatePresence>
          {currentTestimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial._id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <TestimonialCard testimonial={testimonial} index={idx} />
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && <SkeletonCard />}
      </div>

      {/* Tablet: 2 Columns */}
      <div className="hidden md:flex lg:hidden gap-8">
        {getColumns(2).map((col, colIdx) => (
          <div key={colIdx} className="flex-1 flex flex-col gap-8">
            <AnimatePresence>
              {col.map((testimonial, idx) => (
                <motion.div
                  key={testimonial._id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <TestimonialCard
                    testimonial={testimonial}
                    index={idx * 2 + colIdx}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && <SkeletonCard />}
          </div>
        ))}
      </div>

      {/* Desktop: 3 Columns */}
      <div className="hidden lg:flex gap-8 md:gap-12">
        {getColumns(3).map((col, colIdx) => (
          <div key={colIdx} className="flex-1 flex flex-col gap-12">
            <AnimatePresence>
              {col.map((testimonial, idx) => (
                <motion.div
                  key={testimonial._id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <TestimonialCard
                    key={testimonial._id}
                    testimonial={testimonial}
                    index={idx * 3 + colIdx}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && <SkeletonCard />}
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && !isLoading && (
        <div className="mt-20 text-center">
          <OutlineButton
            text="Discover More Stories"
            onClick={handleLoadMore}
          />
        </div>
      )}

      {/* Empty State */}
      {initialTestimonials.length === 0 && (
        <div className="text-center py-24 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
          <p className="text-gray-400 text-xl font-medium italic">Beautiful stories are on their way! ✨</p>
        </div>
      )}
    </div>
  );
};

export default TestimonialGrid;
