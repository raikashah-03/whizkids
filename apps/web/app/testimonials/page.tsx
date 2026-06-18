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
  // Fetch initial batch (10) and total count for pagination (sorted in ascending order)
  const initialData: Testimonial[] = await client.fetch(
    `*[_type == "testimonial"] | order(_createdAt asc)[0...10]`,
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
        <div className="container mx-auto px-4 mb-12 flex justify-center">
          <a
            href="https://share.google/7wdrMav0FROaIjAgZ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white border-2 border-gray-200 hover:border-primary/30 text-gray-700 hover:text-primary font-bold text-base md:text-lg shadow-md hover:shadow-lg transition-all duration-300 active:scale-95"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                fill="#EA4335"
              />
            </svg>
            <span>Visit Our Google Reviews</span>
          </a>
        </div>

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
