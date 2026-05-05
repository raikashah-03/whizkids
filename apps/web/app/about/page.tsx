import React from "react";
import BreadCrumb from "@/components/BreadCrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Whizkids Learning Center",
  description: "Learn more about Whizkids Learning Center — our philosophy, our mission, and the dedicated educators committed to nurturing your child's early growth and discovery.",
  keywords: ["Whizkids story", "preschool philosophy", "early childhood educators", "nurturing environment", "Whizkids mission"],
  openGraph: {
    title: "About Whizkids | Our Journey and Philosophy",
    description: "Discover the heart of Whizkids, where we cultivate a love for learning through play and exploration.",
    url: "https://whizkids.edu.in/about", // Update if domain changes
    siteName: "Whizkids",
    images: [
      {
        url: "/images/about-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Whizkids Learning Center - Our Campus",
      },
    ],
    locale: "en_IN",
    type: "website",
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
      
      {/* Rest of the sections will be designed by the user */}
      <section className="py-20 text-center container">
        <h2 className="text-2xl font-bold text-gray-300 italic">Sections Coming Soon... ✨</h2>
      </section>
    </main>
  );
};

export default AboutPage;