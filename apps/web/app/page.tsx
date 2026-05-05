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
  title: "Whizkids - The Best Preschool & Learning Center for Your Child",
  description: "Join Whizkids Learning Center, where we blend creativity, play, and structured learning to build a strong foundation for your child's future. Explore our programs from Playgroup to Kindergarten.",
  keywords: [
    "best preschool near me",
    "early childhood education",
    "playgroup programs",
    "nursery and kindergarten",
    "Whizkids learning center",
    "child development center",
    "preschool in India",
  ],
  openGraph: {
    title: "Whizkids Learning Center | Where Every Child Blooms",
    description: "Explore our playful and nurturing environment designed for your child's early education journey.",
    url: "https://whizkids.edu.in",
    siteName: "Whizkids",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Whizkids Learning Center - Kids Playing and Learning",
      },
    ],
    locale: "en_IN",
    type: "website",
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
