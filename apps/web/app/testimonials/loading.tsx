import React from "react";

const TestimonialSkeleton = () => (
  <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex flex-col gap-6 animate-pulse">
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

export default function Loading() {
  return (
    <main className="min-h-screen">
      {/* Skeleton for Breadcrumb */}
      <div className="w-full bg-gray-50 h-[300px] animate-pulse" />

      <section className="py-20 md:py-32 container mx-auto px-4">
        {/* Skeleton Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {[...Array(6)].map((_, i) => (
            <TestimonialSkeleton key={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
