import BlogSection from "@/components/BlogSection";
import BuildingFoundation from "@/components/BuildingFoundation";
import CtaSection from "@/components/CtaSection";
import FAQPage from "@/components/FAQPage";
import HeroBanner from "@/components/HeroBanner";
import ProgramPage from "@/components/ProgramPage";
import SpecialTagline from "@/components/SpecialTagline";
import TestimonialSection from "@/components/TestimonialSection";
import UspsSection from "@/components/UspsSection";
import WhyChoose from "@/components/WhyChoose";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Whizkids International Preschool Jayamahal | Best Preschool & Learning Center",
  description: "Join Whizkids International Preschool Jayamahal, where we blend creativity, play, and structured learning to build a strong foundation for your child's future.",
  keywords: [
    "best preschool near me",
    "early childhood education",
    "playgroup programs",
    "nursery and kindergarten",
    "Whizkids International Preschool Jayamahal",
    "child development center",
    "preschool in India",
  ],
  openGraph: {
    title: "Whizkids International Preschool Jayamahal | Where Every Child Blooms",
    description: "Explore our playful and nurturing environment designed for your child's early education journey.",
    url: "https://whizkidsinternational.in",
    siteName: "Whizkids International Preschool",
    images: [
      {
        url: "/images/home-page-screenshot.png",
        width: 1200,
        height: 630,
        alt: "Whizkids International Preschool Jayamahal - Kids Playing and Learning",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Whizkids International Preschool Jayamahal | Where Every Child Blooms",
    description: "Explore our playful and nurturing environment designed for your child's early education journey.",
    images: ["/images/home-page-screenshot.png"],
  },
};

export default function Home(): React.JSX.Element {
  return (
    <div>
      {/* ── Hero ── */}
      <HeroBanner />

      {/* ── USPs / Interactive Features ── */}
      <UspsSection />

      {/* ── Rest of the page ── */}
      <SpecialTagline />
      <WhyChoose />
      <BuildingFoundation />
      <ProgramPage />
      <TestimonialSection />
      <FAQPage />
      <BlogSection />

      {/* ── Final Call to Action ── */}
      <CtaSection />
    </div>
  );
}
