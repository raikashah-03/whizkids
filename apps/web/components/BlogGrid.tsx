"use client";

import { fetchBlogsBatch } from "@/app/blogs/actions";
import React, { useState } from "react";
import BlogCard from "./BlogCard";
import { Blog } from "./BlogSection";
import OutlineButton from "./OutlineButton";

interface BlogGridProps {
  initialBlogs: Blog[];
  totalCount: number;
}

const BlogGrid = ({ initialBlogs, totalCount }: BlogGridProps): React.JSX.Element => {
  const [currentBlogs, setCurrentBlogs] = useState<Blog[]>(initialBlogs);
  const [isLoading, setIsLoading] = useState(false);
  const hasMore = currentBlogs.length < totalCount;

  const handleLoadMore = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    const start = currentBlogs.length;
    const end = start + 10;

    try {
      const nextBatch = await fetchBlogsBatch(start, end);
      if (nextBatch && nextBatch.length > 0) {
        setCurrentBlogs((prev) => [...prev, ...nextBatch]);
      }
    } catch (error) {
      console.error("Error loading more blogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const colorSchemes = [
    { bg: "#FDE9E9", text: "#D04141", pill: "#D04141" },
    { bg: "#E9FDEE", text: "#41D05C", pill: "#41D05C" },
    { bg: "#E9F2FD", text: "#4180D0", pill: "#4180D0" },
  ];

  // Loading Skeletons for pagination
  const SkeletonCard = () => (
    <div className="bg-white rounded-[3rem] p-8 shadow-sm border border-gray-100 flex flex-col gap-6 animate-pulse w-full h-[400px]">
      <div className="w-full h-48 bg-gray-100 rounded-[2.5rem]" />
      <div className="space-y-4 px-2">
        <div className="h-4 bg-gray-100 rounded w-1/4" />
        <div className="h-8 bg-gray-100 rounded w-full" />
        <div className="h-4 bg-gray-50 rounded w-2/3" />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-12">
      {currentBlogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {currentBlogs.map((blog, idx) => (
            <BlogCard
              key={blog._id}
              blog={blog}
              colorScheme={colorSchemes[idx % colorSchemes.length]}
            />
          ))}
          {isLoading && <SkeletonCard />}
        </div>
      ) : (
        <div className="text-center py-32 bg-white rounded-[3rem] shadow-sm border border-dashed border-gray-200">
          <h2 className="text-2xl font-bold text-gray-400 italic">No stories published yet. Stay tuned! ✨</h2>
        </div>
      )}

      {hasMore && !isLoading && (
        <div className="mt-12 text-center">
          <OutlineButton
            text="Discover More Stories"
            onClick={handleLoadMore}
          />
        </div>
      )}
    </div>
  );
};

export default BlogGrid;
