import { client } from "@/lib/sanity";
import { ArrowRight } from "lucide-react";
import { StaticImageData } from "next/image";
import Link from "next/link";
import Heading from "./Headding";
import TestimonialCarousel from "./TestimonialCarousel";

export interface Testimonial {
  _id: string;
  author: string;
  authorImage?: string | StaticImageData;
  message: string;
  stars: number;
}

const TestimonialSection = async (): Promise<React.JSX.Element> => {
  // Fetch top 10 most recent testimonials
  const testimonials: Testimonial[] = await client.fetch(
    `*[_type == "testimonial"] | order(_createdAt desc)[0...10]`,
    {},
    { next: { revalidate: 60 } } // Revalidate every minute
  );

  return (
    <section className="overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Heading Section */}
        <div className="text-center max-w-3xl mx-auto">
          <Heading
            headingText="What Parents Say"
            spanText="About us"
          />
          <p className="mt-4 text-gray-600 text-lg">
            Join the Whizkids family where every child&apos;s journey is celebrated.
            Hear from our wonderful parents who have seen their children bloom with us.
          </p>
        </div>

        {/* Carousel Component (Client) */}
        <TestimonialCarousel testimonials={testimonials} />

        {/* Supporting text and Action */}
        <div className="text-center space-y-6">
          <p className="text-gray-500 font-medium">
            Trusted by <span className="text-primary font-bold px-2 py-1 bg-primary/10 rounded-full">100+ happy families</span> across the region.
          </p>

          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 group"
          >
            View All Stories
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
