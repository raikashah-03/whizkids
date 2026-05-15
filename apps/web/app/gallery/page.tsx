import BreadCrumb from "@/components/BreadCrumb";
import CtaSection from "@/components/CtaSection";
import GallerySection from "@/components/GallerySection";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Our Gallery",
  description: "Explore our photo gallery to see moments from classrooms, outdoor adventures, creative activities, and exciting events at Whizkids International Preschool Jayamahal.",
  keywords: ["preschool gallery", "Whizkids classroom photos", "early education activities", "school events", "playgroup photos"],
  openGraph: {
    title: "A Glimpse into Whizkids | Our Photo Gallery",
    description: "See the magic that happens every day at Whizkids International Preschool Jayamahal — from creative classrooms to exciting outdoor adventures!",
    url: "https://whizkidsinternational.in/gallery",
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
    title: "A Glimpse into Whizkids | Our Photo Gallery",
    description: "See the magic that happens every day at Whizkids International Preschool Jayamahal — from creative classrooms to exciting outdoor adventures!",
    images: ["/images/home-page-screenshot.png"],
  },
};

const galleryPage = (): React.JSX.Element => {
  return (
    <div>
      <BreadCrumb
        heading={{
          main: "Our",
          span: "Gallery",
        }}
        description="Peek into the magic that happens every day — from creative classrooms to exciting outdoor adventures!"
        mainImage="/images/contact-banner.jpg"
        className="main-top-section"
      />

      <GallerySection />
      <CtaSection />
    </div>
  )
}

export default galleryPage