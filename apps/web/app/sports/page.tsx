import BreadCrumb from "@/components/BreadCrumb";
import CtaSection from "@/components/CtaSection";
import AnnualSportsDay from "@/components/sports/AnnualSportsDay";
import SportsIntro from "@/components/sports/SportsIntro";
import SportsProgramsSection from "@/components/sports/SportsProgramsSection";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sports",
  description: "Discover the sports and physical development programs we offer at Whizkids International Preschool Jayamahal — Gymnastics, Taekwondo, Yoga, Football and our Annual Sports Day.",
  keywords: [
    "kids sports preschool",
    "gymnastics for toddlers",
    "taekwondo kids bangalore",
    "yoga for preschoolers",
    "football for kids",
    "physical education preschool",
    "Whizkids sports programs",
    "annual sports day preschool",
  ],
  openGraph: {
    title: "Sports Programs | Physical Development at Whizkids",
    description: "From Gymnastics and Taekwondo to Yoga and Football — discover how Whizkids International Preschool nurtures every child's physical potential.",
    url: "https://whizkidsinternational.in/sports",
    siteName: "Whizkids International Preschool",
    images: [
      {
        url: "/images/home-page-screenshot.png",
        width: 1200,
        height: 630,
        alt: "Whizkids International Preschool Jayamahal Sports Programs",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sports Programs | Physical Development at Whizkids",
    description: "From Gymnastics and Taekwondo to Yoga and Football — discover how Whizkids International Preschool nurtures every child's physical potential.",
    images: ["/images/home-page-screenshot.png"],
  },
};

export default function SportsPage(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-background flex flex-col">

      {/* ── 1. Breadcrumb ── */}
      <BreadCrumb
        heading={{ main: "Sports &", span: "Physical Development" }}
        description="From gymnastics to football, yoga to taekwondo — discover how we nurture every child's physical potential through joyful, structured sports programs."
        mainImage="/images/sports-coach.png"
      />

      {/* ── 2. Coach / Intro Section ── */}
      <SportsIntro />

      {/* ── 3–6. Sports Programs: Gymnastics, Taekwondo, Yoga, Football ── */}
      <SportsProgramsSection />

      {/* ── 7. Annual Sports Day ── */}
      <AnnualSportsDay />

      {/* ── CTA ── */}
      <CtaSection />

    </main>
  );
}
