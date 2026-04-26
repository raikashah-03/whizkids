import BreadCrumb from "@/components/BreadCrumb";
import TestimonialGrid from "@/components/TestimonialGrid";
import { Testimonial } from "@/components/TestimonialSection";
import { client } from "@/lib/sanity";
import React from "react";

const TestimonialsPage = async (): Promise<React.JSX.Element> => {
  // Fetch all testimonials
  const testimonials: Testimonial[] = await client.fetch(
    `*[_type == "testimonial"] | order(_createdAt desc)`,
    {},
    { next: { revalidate: 60 } }
  );

  return (
    <main className="min-h-screen">
      {/* ── Breadcrumb Section ── */}
      <BreadCrumb
        heading={{
          main: "Happy Parents,",
          span: "Happy Kids",
        }}
        description="We are proud to share the experiences of families who have trusted us with their children's early education and growth."
        mainImage="/images/testimonials-hero.jpg"
      />

      {/* ── Testimonials Grid ── */}
      <section className="py-20 md:py-32">
        <TestimonialGrid
          allTestimonials={testimonials}
        />
      </section>
    </main>
  );
};

export default TestimonialsPage;
