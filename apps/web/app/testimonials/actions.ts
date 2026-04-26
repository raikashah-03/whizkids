"use server";

import { client } from "@/lib/sanity";
import { Testimonial } from "@/components/TestimonialSection";

export async function fetchTestimonialsBatch(start: number, end: number): Promise<Testimonial[]> {
  try {
    const data = await client.fetch<Testimonial[]>(
      `*[_type == "testimonial"] | order(_createdAt desc)[${start}...${end}]`,
      {},
      { next: { revalidate: 60 } }
    );
    return data;
  } catch (error) {
    console.error("Failed to fetch testimonials batch:", error);
    return [];
  }
}
