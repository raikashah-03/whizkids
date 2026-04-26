"use client";

import React, { useState } from "react";
import OutlineButton from "./OutlineButton";
import TestimonialCard from "./TestimonialCard";
import { Testimonial } from "./TestimonialSection";

interface TestimonialGridProps {
  allTestimonials: Testimonial[];
}

const TestimonialGrid = ({ allTestimonials }: TestimonialGridProps): React.JSX.Element => {
  const [displayCount, setDisplayCount] = useState(10);
  const currentTestimonials = allTestimonials.slice(0, displayCount);
  const hasMore = displayCount < allTestimonials.length;

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 10);
  };

  // Helper to split testimonials into columns for masonry effect
  const getColumns = (count: number) => {
    const columns: Testimonial[][] = Array.from({ length: count }, () => []);
    currentTestimonials.forEach((item, index) => {
      columns[index % count]!.push(item);
    });
    return columns;
  };

  return (
    <div className="container mx-auto px-4">
      {/* Mobile: 1 Column */}
      <div className="md:hidden flex flex-col gap-3">
        {currentTestimonials.map((testimonial, idx) => (
          <div key={testimonial._id}>
            <TestimonialCard testimonial={testimonial} index={idx} />
          </div>
        ))}
      </div>

      {/* Tablet: 2 Columns */}
      <div className="hidden md:flex lg:hidden gap-8">
        {getColumns(2).map((col, colIdx) => (
          <div key={colIdx} className="flex-1 flex flex-col gap-8">
            {col.map((testimonial, idx) => (
              <TestimonialCard
                key={testimonial._id}
                testimonial={testimonial}
                index={idx * 2 + colIdx}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Desktop: 3 Columns */}
      <div className="hidden lg:flex gap-8 md:gap-12">
        {getColumns(3).map((col, colIdx) => (
          <div key={colIdx} className="flex-1 flex flex-col gap-12">
            {col.map((testimonial, idx) => (
              <TestimonialCard
                key={testimonial._id}
                testimonial={testimonial}
                index={idx * 3 + colIdx}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="mt-20 text-center">
          <OutlineButton
            text="Discover More Stories"
            onClick={handleLoadMore}
          />
        </div>
      )}

      {/* Empty State */}
      {allTestimonials.length === 0 && (
        <div className="text-center py-24 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
          <p className="text-gray-400 text-xl font-medium italic">Beautiful stories are on their way! ✨</p>
        </div>
      )}
    </div>
  );
};

export default TestimonialGrid;
