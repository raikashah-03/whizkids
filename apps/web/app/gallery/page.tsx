import React from "react";
import BreadCrumb from "@/components/BreadCrumb"
import GallerySection from "@/components/GallerySection"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gallery | WhizKids",
  description:
    "Explore our photo gallery to see moments from classrooms, outdoor adventures, creative activities, and exciting events at WhizKids.",
}

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