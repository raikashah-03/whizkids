import React from "react";
import BreadCrumb from "@/components/BreadCrumb"
import GallerySection from "@/components/GallerySection"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Gallery | Whizkids Learning Center",
  description: "Explore our photo gallery to see moments from classrooms, outdoor adventures, creative activities, and exciting events at Whizkids. See our happy learners in action!",
  keywords: ["preschool gallery", "Whizkids classroom photos", "early education activities", "school events", "playgroup photos"],
  openGraph: {
    title: "A Glimpse into Whizkids | Our Photo Gallery",
    description: "See the magic that happens every day at Whizkids — from creative classrooms to exciting outdoor adventures!",
    images: ["/images/contact-banner.jpg"],
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
    </div>
  )
}

export default galleryPage