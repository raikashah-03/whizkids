import BreadCrumb from "@/components/BreadCrumb";
import CtaSection from "@/components/CtaSection";
import ActivitiesIntro from "@/components/activities/ActivitiesIntro";
import FestivalsSection from "@/components/activities/FestivalsSection";
import FieldTripsSection from "@/components/activities/FieldTripsSection";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Activities",
  description: "Explore the exciting activities at Whizkids International Preschool Jayamahal — from vibrant festival celebrations to hands-on field trips to supermarkets, hospitals, post offices, police stations and parks.",
  keywords: [
    "preschool activities bangalore",
    "festival celebrations preschool",
    "field trips for kids",
    "Whizkids activities",
    "experiential learning preschool",
    "kids cultural activities",
    "preschool field trip supermarket hospital",
  ],
  openGraph: {
    title: "Activities | Whizkids International Preschool Jayamahal",
    description: "Festivals, field trips, and enriching experiences that go beyond the classroom — discover how Whizkids makes every day an adventure.",
    url: "https://whizkidsinternational.in/activities",
    siteName: "Whizkids International Preschool",
    images: [
      {
        url: "/images/home-page-screenshot.png",
        width: 1200,
        height: 630,
        alt: "Whizkids International Preschool Jayamahal Activities",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Activities | Whizkids International Preschool Jayamahal",
    description: "Festivals, field trips, and enriching experiences that go beyond the classroom.",
    images: ["/images/home-page-screenshot.png"],
  },
};

export default function ActivitiesPage(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-background flex flex-col">

      {/* ── 1. Breadcrumb ── */}
      <BreadCrumb
        heading={{ main: "Activities &", span: "Experiences" }}
        description="From vibrant festival celebrations to real-world field trips — every activity at Whizkids is a purposeful adventure that shapes confident, curious, and well-rounded children."
        mainImage="/images/activities-hero.png"
      />

      {/* ── 2. Overview Intro ── */}
      <ActivitiesIntro />

      {/* ── 3. Festivals Section ── */}
      <FestivalsSection />

      {/* ── 4. Field Trips Section ── */}
      <FieldTripsSection />

      {/* ── CTA ── */}
      <CtaSection />

    </main>
  );
}
