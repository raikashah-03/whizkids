import BreadCrumb from "@/components/BreadCrumb";
import CtaSection from "@/components/CtaSection";
import TestimonialGrid from "@/components/TestimonialGrid";
import { Testimonial } from "@/components/TestimonialSection";
import { client } from "@/lib/sanity";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "What Parents Say",
  description: "Read heartwarming stories and honest feedback from families in the Whizkids International Preschool Jayamahal community.",
  keywords: ["Whizkids reviews", "preschool testimonials", "parent feedback", "early education reviews", "Whizkids stories"],
  openGraph: {
    title: "Happy Parents, Happy Kids | Whizkids Testimonials",
    description: "Discover the experiences of families who have trusted Whizkids International Preschool Jayamahal with their children's growth.",
    url: "https://whizkidsinternational.in/testimonials",
    siteName: "Whizkids International Preschool",
    images: [
      {
        url: "/images/home-page-screenshot.png",
        width: 1200,
        height: 630,
        alt: "Whizkids International Preschool Jayamahal Testimonials",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Happy Parents, Happy Kids | Whizkids Testimonials",
    description: "Discover the experiences of families who have trusted Whizkids International Preschool Jayamahal with their children's growth.",
    images: ["/images/home-page-screenshot.png"],
  },
};

const TestimonialsPage = async (): Promise<React.JSX.Element> => {
  // Fetch initial batch (10) and total count for pagination
  const initialData: Testimonial[] = await client.fetch(
    `*[_type == "testimonial"] | order(_createdAt desc)[0...10]`,
    {},
    { next: { revalidate: 60 } }
  );

  const totalCount: number = await client.fetch(
    `count(*[_type == "testimonial"])`,
    {},
    { next: { revalidate: 3600 } }
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
          initialTestimonials={initialData}
          totalCount={totalCount}
        />
      </section>

      <CtaSection />
    </main>
  );
};

export default TestimonialsPage;
