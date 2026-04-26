"use server";

import { client } from "@/lib/sanity";
import { Blog } from "@/components/BlogSection";

export async function fetchBlogsBatch(start: number, end: number): Promise<Blog[]> {
  try {
    const data = await client.fetch<Blog[]>(
      `*[_type == "blog"] | order(_createdAt desc)[${start}...${end}] {
        _id,
        _createdAt,
        title,
        author,
        category,
        slug,
        blogsCardImage
      }`,
      {},
      { next: { revalidate: 60 } }
    );
    return data;
  } catch (error) {
    console.error("Failed to fetch blogs batch:", error);
    return [];
  }
}
