import BreadCrumb from "@/components/BreadCrumb";
import ContactForm from "@/components/ContactForm";
import ContactInfo from "@/components/ContactInfo";
import MapEmbadding from "@/components/MapEmbadding";
import React from "react";


import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get in Touch",
  description: "We’d love to hear from you! Whether you have questions, want to schedule a visit, or are ready to enroll your child, our team at Whizkids International Preschool Jayamahal is here to help.",
  keywords: ["contact Whizkids", "preschool inquiry", "visit Whizkids", "school admission contact", "Whizkids location", "contact preschool", "enrollment inquiry"],
  openGraph: {
    title: "Connect with Whizkids | We're Here to Help",
    description: "Have questions about our programs or admissions? Reach out to Whizkids International Preschool Jayamahal today.",
    url: "https://whizkidsinternational.in/contact",
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
    title: "Connect with Whizkids | We're Here to Help",
    description: "Have questions about our programs or admissions? Reach out to Whizkids International Preschool Jayamahal today.",
    images: ["/images/home-page-screenshot.png"],
  },
  alternates: {
    canonical: "/contact",
  },
};

const contactPage = (): React.JSX.Element => {
  return (
    <div>
      <BreadCrumb heading={{
        main: "Contact",
        span: "Us"
      }}
        description="We’d love to hear from you! Whether you have questions, want to schedule a visit, or are ready to enroll your child, we’re here to help."
        mainImage="/images/contact-banner.jpg"
        className="main-top-section"
      />

      {/* ── ContactInfo + ContactForm side by side ── */}
      <section
        className="bg-linear-to-b from-white via-skyblue to-background py-12 md:py-16 overflow-visible"
        aria-label="Contact details and form"
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="md:-mt-[50px]">
              <ContactInfo />
            </div>
            <div className="md:mt-[40px]">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <MapEmbadding />
    </div>
  )
}

export default contactPage