import type { Metadata } from "next";
import BreadCrumb from "@/components/BreadCrumb";
import CtaSection from "@/components/CtaSection";
import JapanesePhilosophyIntro from "@/components/curriculum/JapanesePhilosophyIntro";
import CurriculumPillars from "@/components/curriculum/CurriculumPillars";
import CurriculumOutcomes from "@/components/curriculum/CurriculumOutcomes";

export const metadata: Metadata = {
  title: "Curriculum Approach | Japanese Philosophy | Whizkids Jayamahal",
  description:
    "Explore the Japanese educational philosophy curriculum at Whizkids International Preschool Jayamahal — Ikigai, Omoiyari, Kaizen, Shizen, Hataraki, Wabi-Sabi, and Ma.",
  keywords: [
    "preschool curriculum",
    "Japanese educational philosophy preschool",
    "play-based learning Jayamahal",
    "Ikigai preschool",
    "Omoiyari empathy teaching",
    "Kaizen learning",
    "Wabi-Sabi child resilience",
    "holistic early learning Bangalore"
  ],
  openGraph: {
    title: "Curriculum Approach | Japanese Philosophy at Whizkids Jayamahal",
    description:
      "Play-based. Purposeful. Built on Japanese philosophy. Designed for how children really grow at Whizkids International Preschool Jayamahal.",
    url: "https://whizkidsinternational.in/curriculum",
    siteName: "Whizkids International Preschool",
    images: [
      {
        url: "/images/home-page-screenshot.png",
        width: 1200,
        height: 630,
        alt: "Whizkids International Preschool Japanese Curriculum",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Curriculum Approach | Whizkids International Preschool",
    description:
      "Discover how Japanese philosophy shapes joyful, confident, and empathetic early learning at Whizkids Jayamahal.",
    images: ["/images/home-page-screenshot.png"],
  },
};

export default function CurriculumPage(): React.JSX.Element {
  // Schema.org structured data for SEO
  const curriculumSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    "name": "Whizkids Japanese Philosophy Preschool Curriculum",
    "description": "A play-based, purposeful early learning curriculum inspired by Japanese educational philosophy focusing on Ikigai, Omoiyari, Kaizen, Shizen, Hataraki, Wabi-Sabi, and Ma.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Whizkids International Preschool Jayamahal",
      "sameAs": "https://whizkidsinternational.in"
    },
    "hasCourse": [
      {
        "@type": "Course",
        "name": "Ikigai — Finding Joy in Learning",
        "description": "Pottery, storytelling, sports, role-play, Little Shopkeepers banking, and no-screen bedtime stories."
      },
      {
        "@type": "Course",
        "name": "Omoiyari — Understanding Others' Feelings",
        "description": "Good touch & bad touch awareness, stranger safety, and parent-child playdates."
      },
      {
        "@type": "Course",
        "name": "Kaizen — Small Steps, Big Growth",
        "description": "Phonics, numbers, and practice-based motor activities focusing on progress over perfection."
      },
      {
        "@type": "Course",
        "name": "Shizen — Learning from the Real World",
        "description": "Field trips to police stations, hospitals, parks, supermarkets, and nature exploration."
      },
      {
        "@type": "Course",
        "name": "Hataraki — Learning by Doing",
        "description": "Clean-up routines, self-help habits, and active child participation."
      },
      {
        "@type": "Course",
        "name": "Wabi-Sabi — Effort Over Results",
        "description": "Resilience-building art and pottery creating a safe space to fail and try again."
      },
      {
        "@type": "Course",
        "name": "Ma — The Power of Pause",
        "description": "Balanced play and rest routines with calm transitions and quiet storytelling."
      }
    ]
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* SEO Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(curriculumSchema) }}
      />

      {/* Hero Breadcrumb Banner */}
      <BreadCrumb
        heading={{ main: "Our Curriculum", span: "Approach" }}
        description={"Play-based. Purposeful. Built on Japanese philosophy.\nInspired by Japanese philosophy. Designed for how children really grow."}
        mainImage="/images/child-playing-legos.png"
      />

      {/* Philosophical Manifesto, Parallax Quote & Comparison */}
      <JapanesePhilosophyIntro />

      {/* The 7 Educational Pillars Showcase */}
      <CurriculumPillars />

      {/* Holistic Outcomes ("What This Really Means for Your Child") */}
      <CurriculumOutcomes />

      {/* Lead Generation CTA Section */}
      <CtaSection />
    </main>
  );
}
