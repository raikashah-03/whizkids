import BreadCrumb from "@/components/BreadCrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Activities",
  description: "Explore the exciting activities and extracurricular programs we offer at Whizkids International Preschool Jayamahal.",
  keywords: ["preschool activities", "extracurricular programs", "kids learning activities", "Whizkids activities"],
  openGraph: {
    title: "Activities | Whizkids International Preschool Jayamahal",
    description: "Explore the exciting activities and extracurricular programs we offer for your child's holistic development.",
    url: "https://whizkidsinternational.in/activities",
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
    title: "Activities | Whizkids International Preschool Jayamahal",
    description: "Explore the exciting activities and extracurricular programs we offer for your child's holistic development.",
    images: ["/images/home-page-screenshot.png"],
  },
};

export default function ActivitiesPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <BreadCrumb
        heading={{ main: "Activities" }}
        description="Explore the exciting activities we offer at Whizkids."
        mainImage="/images/testimonials-hero.jpg"
      />

      <div className="flex-1 flex flex-col items-center justify-center py-32 px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">
          Coming Soon
        </h2>
        <p className="text-lg text-foreground/70 max-w-lg mx-auto">
          We are currently working hard to bring you our new Activities page. Check back soon for updates!
        </p>
      </div>
    </main>
  );
}
