import BreadCrumb from "@/components/BreadCrumb";
import type { Metadata } from "next";
import React from "react";

// Import new about components
import AboutHeroContent from "@/components/about/AboutHeroContent";
import MissionVisionCards from "@/components/about/MissionVisionCards";
import TeachingPhilosophy from "@/components/about/TeachingPhilosophy";
import UnalignedUsps from "@/components/about/UnalignedUsps";

// Import existing shared components
import CtaSection from "@/components/CtaSection";
import FAQPage from "@/components/FAQPage";
import TestimonialSection from "@/components/TestimonialSection";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about Whizkids International Preschool Jayamahal — our philosophy, our mission, and the dedicated educators committed to nurturing your child's early growth and discovery.",
  keywords: ["Whizkids story", "preschool philosophy", "early childhood educators", "nurturing environment", "Whizkids mission"],
  openGraph: {
    title: "About Whizkids | Our Journey and Philosophy",
    description: "Discover the heart of Whizkids, where we cultivate a love for learning through play and exploration.",
    url: "https://whizkidsinternational.in/about",
    siteName: "Whizkids International Preschool",
    images: [
      {
        url: "/images/home-page-screenshot.png",
        width: 1200,
        height: 630,
        alt: "Whizkids International Preschool Jayamahal",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Whizkids | Our Journey and Philosophy",
    description: "Discover the heart of Whizkids, where we cultivate a love for learning through play and exploration.",
    images: ["/images/home-page-screenshot.png"],
  },
};

const AboutPage = (): React.JSX.Element => {
  return (
    <main className="min-h-screen">
      <BreadCrumb
        heading={{
          main: "About",
          span: "Whizkids",
        }}
        description="We are committed to providing a safe, nurturing, and stimulating environment where every child can flourish and develop a lifelong love for learning."
        mainImage="/images/testimonials-hero.jpg"
      />

      {/* ── Main About Us Content ── */}
      <AboutHeroContent />

      {/* ── Unaligned Trendy USPs ── */}
      <UnalignedUsps />

      {/* ── Mission & Vision Stacking Cards ── */}
      <MissionVisionCards />

      {/* ── Mid Call to Action ── */}
      <div className="py-8">
        <CtaSection />
      </div>

      {/* ── Teaching Philosophy ── */}
      <TeachingPhilosophy />

      {/* ── FAQ Section ── */}
      <FAQPage />

      {/* ── Testimonials Section ── */}
      <TestimonialSection />

      {/* ── Final Call to Action ── */}
      <CtaSection />
    </main>
  );
};

export default AboutPage;