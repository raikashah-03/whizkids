import BreadCrumb from "@/components/BreadCrumb";
import CtaSection from "@/components/CtaSection";
import SpecialtyCardSection from "@/components/specialty/SpecialtyCardSection";
import type { Metadata } from "next";

// We reuse program images as placeholders for the collages.
// You can replace these with real photos later.
import jrKgImg from "@/public/images/programs/jr-kg.jpg";
import nurseryImg from "@/public/images/programs/nursery.jpg";
import playgroupImg from "@/public/images/programs/playgroup.jpg";
import srKgImg from "@/public/images/programs/sr-kg.jpg";

export const metadata: Metadata = {
  title: "Our Specialty",
  description: "Explore the unique specialty programs at Whizkids International Preschool Jayamahal, including financial literacy, body safety, and healthy habits.",
  keywords: ["banking activity for kids", "body safety curriculum", "healthy habits preschool", "stranger danger awareness", "no-screen story time"],
  openGraph: {
    title: "Our Specialty | Unique Programs at Whizkids",
    description: "Discover the unique, holistic activities and lessons that make Whizkids International Preschool Jayamahal stand out.",
    url: "https://whizkidsinternational.in/our-specialty",
    siteName: "Whizkids International Preschool",
    images: [
      {
        url: "/images/home-page-screenshot.png",
        width: 1200,
        height: 630,
        alt: "Whizkids International Preschool Jayamahal Specialties",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Specialty | Unique Programs at Whizkids",
    description: "Discover the unique, holistic activities and lessons that make Whizkids International Preschool Jayamahal stand out.",
    images: ["/images/home-page-screenshot.png"],
  },
};

const specialties = [
  {
    id: "banking",
    title: "Banking (Buy & Sell)",
    description: "Financial literacy starts early! Through fun and engaging role-play, children learn the basics of buying, selling, and managing pretend money. This activity builds confidence, basic math skills, and an understanding of value in a playful marketplace setting.",
    features: [
      "Introduction to currency",
      "Basic counting and math",
      "Social interaction skills",
      "Decision making"
    ],
    images: [playgroupImg, nurseryImg, jrKgImg],
    bgColor: "bg-[#FDF3E5]",
    accentColor: "text-[#FDA924]",
    fillColor: "#FDA924",
  },
  {
    id: "good-touch",
    title: "Good Touch, Bad Touch",
    description: "Body safety is a critical part of our curriculum. We use sensitive, age-appropriate methods to teach children about personal boundaries, identifying safe adults, and understanding the difference between safe and unsafe physical contact.",
    features: [
      "Body autonomy awareness",
      "Identifying trusted adults",
      "Vocalizing boundaries",
      "Empowerment & confidence"
    ],
    images: [srKgImg, playgroupImg],
    bgColor: "bg-[#E4F3F7]",
    accentColor: "text-[#29BFDF]",
    fillColor: "#29BFDF",
  },
  {
    id: "stranger-activity",
    title: "Stranger Activity",
    description: "We equip our students with the knowledge to handle encounters with unfamiliar adults. Through guided scenarios and safe-play drills, children learn to recognize unsafe situations, know who to approach for help, and practice the 'No, Go, Tell' strategy.",
    features: [
      "Situational awareness",
      "Emergency responses",
      "Safe vs Unsafe adults",
      "Role-playing scenarios"
    ],
    images: [jrKgImg, srKgImg, nurseryImg],
    bgColor: "bg-[#EBDFFF]",
    accentColor: "text-[#9B5FFF]",
    fillColor: "#9B5FFF",
  },
  {
    id: "healthy-food",
    title: "Junk Food vs Healthy Food",
    description: "Developing healthy eating habits early is vital for growing bodies. Our interactive sorting games and taste-testing sessions help children visually distinguish between nutritious everyday foods and occasional treats.",
    features: [
      "Nutritional awareness",
      "Sorting and classifying",
      "Healthy habit building",
      "Food group exploration"
    ],
    images: [nurseryImg, jrKgImg],
    bgColor: "bg-[#FDE9E9]",
    accentColor: "text-[#FF4D8D]",
    fillColor: "#FF4D8D",
  },
  {
    id: "bedtime-stories",
    title: "No-Screen Bedtime Stories",
    description: "In a digital age, we emphasize the magic of physical books. Our storytelling sessions cultivate a love for reading, improve listening skills, and demonstrate to families the calming benefits of screen-free routines.",
    features: [
      "Enhanced imagination",
      "Vocabulary building",
      "Listening comprehension",
      "Routine establishment"
    ],
    images: [playgroupImg, srKgImg, nurseryImg],
    bgColor: "bg-[#FDF3E5]",
    accentColor: "text-[#FDA924]",
    fillColor: "#FDA924",
  },
  {
    id: "playdate",
    title: "Playdates",
    description: "Structured playdates are the cornerstone of social development. We facilitate group play sessions where children practice sharing, taking turns, conflict resolution, and collaborative creativity in a supervised, joyful environment.",
    features: [
      "Peer socialization",
      "Sharing and empathy",
      "Conflict resolution",
      "Collaborative play"
    ],
    images: [jrKgImg, nurseryImg],
    bgColor: "bg-[#E4F3F7]",
    accentColor: "text-[#29BFDF]",
    fillColor: "#29BFDF",
  }
];

export default function OurSpecialtyPage(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <BreadCrumb
        heading={{ main: "Our Specialty" }}
        description="Discover the unique, holistic activities and lessons that make Whizkids stand out."
        mainImage="/images/testimonials-hero.jpg"
      />

      <div className="flex flex-col">
        {specialties.map((specialty, index) => (
          <SpecialtyCardSection key={specialty.id} {...specialty} stage={index + 1} />
        ))}
      </div>

      <CtaSection />
    </main>
  );
}
