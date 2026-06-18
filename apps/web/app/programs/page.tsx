/**
 * Programs Page (Server Component)
 *
 * Pure server component — no client state, no "use client" directive.
 * Each section is its own focused component; interactive CTAs use
 * <InquireButton> which reads from the global InquiryModalContext.
 */

import BreadCrumb from "@/components/BreadCrumb";
import DaycareSection from "@/components/programs/DaycareSection";
import ProgramCardSection from "@/components/programs/ProgramCardSection";
import SummerCampSection from "@/components/programs/SummerCampSection";
import { Metadata } from "next";

// Asset imports (used by ProgramCardSection)
import CtaSection from "@/components/CtaSection";
import FAQPage from "@/components/FAQPage";
import jrKgImg from "@/public/images/programs/jr-kg.jpg";
import nurseryImg from "@/public/images/programs/nursery.jpg";
import playgroupImg from "@/public/images/programs/playgroup.jpg";
import srKgImg from "@/public/images/programs/sr-kg.jpg";

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Our Programs",
  description:
    "Discover our broad range of early childhood programs at Whizkids International Preschool Jayamahal — from Playgroup and Nursery to LKG and UKG.",
  keywords: [
    "Whizkids programs",
    "preschool curriculum",
    "playgroup",
    "nursery school",
    "kindergarten education",
    "child development",
  ],
  openGraph: {
    title: "Preschool Programs | Playgroup to Kindergarten",
    description: "Nurturing your child's natural curiosity through age-appropriate programs at Whizkids International Preschool Jayamahal.",
    url: "https://whizkidsinternational.in/programs",
    siteName: "Whizkids International Preschool",
    images: [
      {
        url: "/images/home-page-screenshot.png",
        width: 1200,
        height: 630,
        alt: "Whizkids International Preschool Jayamahal Programs",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Preschool Programs | Playgroup to Kindergarten",
    description: "Nurturing your child's natural curiosity through age-appropriate programs at Whizkids International Preschool Jayamahal.",
    images: ["/images/home-page-screenshot.png"],
  },
};

// ─── Static program data ──────────────────────────────────────────────────────

const programs = [
  {
    id: "playgroup",
    title: "Playgroup",
    age: "2 Years +",
    tagline: "Exploring the World Through Play",
    description:
      "Our Playgroup program focuses on settling, social interaction, sensory exploration, and early communication skills. Children learn through music, movement, storytelling, free play, art, and hands-on experiences that foster curiosity and confidence.",
    curriculum: [
      "Sensory development",
      "Auditory & rhythm development",
      "Language & early communication skills",
      "Fine motor skill development",
      "Physical (gross motor) development",
      "Environmental awareness & exploration",
      "Self-help skills & early independence",
    ],
    image: playgroupImg,
    mask: "/shapes/vector-shape-1-mask.svg",
    bgColor: "bg-[#FDF3E5]",
    accentColor: "text-[#FDA924]",
    fillColor: "#FDA924",
  },
  {
    id: "nursery",
    title: "Nursery",
    age: "3 Years +",
    tagline: "Learning Through Discovery",
    description:
      "The Nursery program supports children as they begin to express themselves, think independently, and engage more actively with the world around them.",
    curriculum: [
      "Language & communication skills",
      "Early literacy development",
      "Early numeracy & logical thinking",
      "Cognitive development",
      "Social & emotional development",
      "Creative expression & imagination",
      "Environmental awareness",
      "Life skills & independence",
    ],
    image: nurseryImg,
    mask: "/shapes/vector-shape-1-mask.svg",
    bgColor: "bg-[#E4F3F7]",
    accentColor: "text-[#29BFDF]",
    fillColor: "#29BFDF",
  },
  {
    id: "jr-kg",
    title: "Junior KG",
    age: "4 Years +",
    tagline: "Building Skills for Future Learning",
    description:
      "At this stage, children begin to think more independently, express themselves clearly, and understand the world around them with greater curiosity and confidence.",
    curriculum: [
      "Phonetic awareness & language development",
      "Communication & vocabulary building",
      "Numerical understanding & logical reasoning",
      "Cognitive & problem-solving skills",
      "Scientific thinking & exploration",
      "Social interaction & role play skills",
      "Environmental awareness & responsibility",
      "Life skills & growing independence",
    ],
    image: jrKgImg,
    mask: "/shapes/vector-shape-1-mask.svg",
    bgColor: "bg-[#EBDFFF]",
    accentColor: "text-[#9B5FFF]",
    fillColor: "#9B5FFF",
  },
  {
    id: "sr-kg",
    title: "Senior KG",
    age: "5 Years +",
    tagline: "School Readiness & Leadership Development",
    description:
      "At this stage, children are prepared for the transition to formal school, ready to listen, speak, think, and participate with confidence in a structured environment.",
    curriculum: [
      "Reading fluency & comprehension",
      "Creative writing & self-expression",
      "Advanced numeracy & problem-solving",
      "Logical thinking & inquiry skills",
      "Scientific exploration & analytical thinking",
      "Public speaking & communication skills",
      "Leadership & teamwork skills",
      "Independence & school readiness",
    ],
    image: srKgImg,
    mask: "/shapes/vector-shape-1-mask.svg",
    bgColor: "bg-[#FDE9E9]",
    accentColor: "text-[#FF4D8D]",
    fillColor: "#FF4D8D",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProgramsPage(): React.JSX.Element {
  return (
    <main className="min-h-screen">
      {/* Hero breadcrumb */}
      <BreadCrumb
        heading={{ main: "Nurturing", span: "Futures" }}
        description="Our thoughtfully crafted programs provide a rich, engaging, and age-appropriate learning journey for your child's early years."
        mainImage="/images/programs-hero.jpg"
      />

      {/* ── Academic programs ── */}
      <div className="flex flex-col">
        {programs.map((program, index) => (
          <ProgramCardSection key={program.id} {...program} stage={index + 1} />
        ))}
      </div>

      {/* ── Extended services ── */}
      <DaycareSection />
      <SummerCampSection />

      <FAQPage />
      <CtaSection />
    </main>
  );
}
