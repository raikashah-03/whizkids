import BreadCrumb from "@/components/BreadCrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sports",
  description: "Discover the sports and physical development programs we offer at Whizkids International Preschool Jayamahal.",
  keywords: ["kids sports", "physical education preschool", "sports for toddlers", "Whizkids sports"],
  openGraph: {
    title: "Sports | Physical Development at Whizkids",
    description: "Discover the sports and physical development programs we offer at Whizkids International Preschool Jayamahal.",
    url: "https://whizkidsinternational.in/sports",
    siteName: "Whizkids International Preschool",
    images: [
      {
        url: "/images/home-page-screenshot.png",
        width: 1200,
        height: 630,
        alt: "Whizkids International Preschool Jayamahal Sports",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sports | Physical Development at Whizkids",
    description: "Discover the sports and physical development programs we offer at Whizkids International Preschool Jayamahal.",
    images: ["/images/home-page-screenshot.png"],
  },
};

export default function SportsPage(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <BreadCrumb
        heading={{ main: "Sports" }}
        description="Discover the sports programs we offer at Whizkids."
        mainImage="/images/testimonials-hero.jpg"
      />

      <div className="flex-1 flex flex-col items-center justify-center py-32 px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">
          Coming Soon
        </h2>
        <p className="text-lg text-foreground/70 max-w-lg mx-auto">
          We are currently working hard to bring you our new Sports page. Check back soon for updates!
        </p>
      </div>
    </main>
  );
}
