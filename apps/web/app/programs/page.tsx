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
  title: "Our Programs | Whizkids Learning Center",
  description:
    "Discover our broad range of early childhood programs — from Playgroup and Nursery to LKG and UKG. Each program is designed to nurture your child's natural curiosity and build a strong foundation.",
  keywords: [
    "Whizkids programs",
    "preschool curriculum",
    "playgroup",
    "nursery school",
    "kindergarten education",
    "child development",
  ],
};

// ─── Static program data ──────────────────────────────────────────────────────

const programs = [
  {
    id: "playgroup",
    title: "Play Group",
    age: "2 Years +",
    description:
      "The Playgroup Program at Whizkids focuses on happy learning evolving in the school environment. We concentrate on the wholesome development of the child by conducting age–appropriate activities. Our Monthly theme includes an engaging package of hands-on activities blended with STEM-based learning.",
    curriculum: [
      "Pre-writing skills",
      "Cognitive development",
      "Social and emotional learning",
      "Gross and fine motor skills",
      "Language and communication skills",
      "Exploring the world through themes",
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
    description:
      "The Nursery Program is designed to foster a child's natural curiosity and build a strong foundation for future learning. We introduce structured learning while maintaining a playful and supportive atmosphere. Children explore language, numbers, and creative arts through interactive sessions.",
    curriculum: [
      "Introduction to phonics",
      "Number recognition and counting",
      "Creative expression through art",
      "Self-care and independence",
      "Group activities and sharing",
      "Music and movement",
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
    description:
      "The Junior KG Program prepares children for formal schooling by developing essential academic and social skills. Our curriculum focuses on language proficiency, mathematical concepts, and environmental awareness, all delivered through engaging and hands-on experiences.",
    curriculum: [
      "Phonics and early reading",
      "Basic addition and subtraction",
      "Exploring nature and science",
      "Creative problem solving",
      "Teamwork and collaboration",
      "Structured physical play",
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
    description:
      "The Senior KG Program is the final step in our preschool journey, ensuring children are fully equipped for primary school. We emphasize advanced literacy and numeracy, critical thinking, and social responsibility, fostering a love for lifelong learning.",
    curriculum: [
      "Independent reading and writing skills",
      "Mathematical concepts",
      "Story Time",
      "Advance phonics skills",
      "Logical learning",
      "Problem solving skills",
      "Environmental awareness",
    ],
    image: srKgImg,
    mask: "/shapes/vector-shape-1-mask.svg",
    bgColor: "bg-[#FDE9E9]",
    accentColor: "text-[#FF4D8D]",
    fillColor: "#FF4D8D",
  },
] as const;

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
