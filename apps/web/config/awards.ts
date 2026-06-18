import { urlFor } from "@/lib/sanity";
import receivingImg from "@/public/images/awards/receiving.png";
import receiving2Img from "@/public/images/awards/receiving2.png";
import trophyImg from "@/public/images/awards/trophy.png";
import trophy2Img from "@/public/images/awards/trophy2.png";

export interface AwardItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  year: string;
  organization: string;
  image: any;
  receivingImage?: any;
}

export function mapSanityAward(award: any): AwardItem {
  return {
    id: award.slug?.current || award._id,
    title: award.title,
    tagline: award.tagline,
    description: award.description,
    year: award.year,
    organization: award.organization,
    image: award.image ? urlFor(award.image).url() : null,
    receivingImage: award.receivingImage ? urlFor(award.receivingImage).url() : null,
  };
}

export const AWARDS: AwardItem[] = [
  {
    id: "preschool-excellence",
    title: "Best Preschool in Bangalore (Jayamahal)",
    tagline: "Recognized for excellence in early childhood development and child-focused care.",
    description: "At the National Education Excellence Awards, Whizkids International Jayamahal was honored as the Best Preschool. This award celebrates our outstanding efforts in creating a nurturing environment where children are encouraged to grow, learn, and express themselves naturally and at their own pace.",
    year: "2025",
    organization: "National Education Excellence Awards",
    image: trophyImg,
    receivingImage: receivingImg,
  },
  {
    id: "innovative-curriculum",
    title: "Innovative Curriculum of the Year",
    tagline: "Awarded for outstanding integration of STEM-based learning and experiential play.",
    description: "The Global Education Forum presented Whizkids with the Curriculum Innovation Award. This recognition highlights our success in breaking away from traditional rigid methods, blending active hands-on exploration, sensory learning, and music-led discovery that engages the whole child.",
    year: "2026",
    organization: "Global Education Forum",
    image: trophy2Img,
    receivingImage: receiving2Img,
  },
  {
    id: "safety-excellence",
    title: "Safety & Hygiene Excellence Award",
    tagline: "Recognized for maintaining standard-setting safety protocols and clean learning spaces.",
    description: "Presented by the Child Safety Association, this award recognizes Whizkids' unwavering commitment to child safety. From complete childproofing and secure play spaces to our live CCTV parent-access program, we ensure every child is fully protected and parents feel complete peace of mind.",
    year: "2025",
    organization: "Child Safety Association India",
    image: trophy2Img,
    receivingImage: receivingImg,
  },
  {
    id: "outstanding-infrastructure",
    title: "Outstanding Preschool Infrastructure",
    tagline: "Awarded for child-friendly, welcoming, and inspiring architecture.",
    description: "Early Childhood Association India recognized Whizkids International preschool Jayamahal for outstanding design. This honor spotlights our clean, airy, bright activity rooms, dedicated sensory zones, safe outdoor playground, and ergonomic layouts customized for early childhood learning.",
    year: "2024",
    organization: "Early Childhood Association India",
    image: trophyImg,
    receivingImage: receiving2Img,
  },
  {
    id: "best-playgroup-program",
    title: "Best Playgroup Program Award",
    tagline: "Honored for excellence in sensory integration and early communication development.",
    description: "The Progressive Education Council presented this award for our high-impact Playgroup program. We were recognized for our age-appropriate sensory play environments, language building exercises, and structured activities that ease children into social learning settings.",
    year: "2025",
    organization: "Progressive Education Council",
    image: trophy2Img,
    receivingImage: receiving2Img,
  },
  {
    id: "parent-school-partnership",
    title: "Outstanding Parent-School Partnership",
    tagline: "Recognizing our collaborative model where parents are true educational partners.",
    description: "This recognition honors our transparency and parental engagement model. Through interactive meetings, joint progress reviews, and collaborative child development tracking, we ensure families are co-piloting their children's preschool journey.",
    year: "2026",
    organization: "Family & Child Education League",
    image: trophyImg,
    receivingImage: receivingImg,
  },
  {
    id: "phonics-excellence",
    title: "Excellence in Early Years Phonics Program",
    tagline: "Awarded for systematic synthetic phonics instruction leading to strong early literacy.",
    description: "Our phonics curriculum was recognized for its structural clarity and gamified approach. The Literacy Forum praised our use of rhythm, sounds, movement, and visual cards that help preschool students read fluently and build large vocabularies naturally.",
    year: "2024",
    organization: "Literacy Forum India",
    image: trophy2Img,
    receivingImage: receivingImg,
  },
  {
    id: "preschool-leadership",
    title: "Preschool Leadership Award",
    tagline: "Celebrating visionary leadership in early learning operations and pedagogy.",
    description: "Whizkids International Jayamahal received the Preschool Leadership Award for outstanding school management, rigorous caregiver training, and commitment to maintaining early education best practices across all curriculum stages.",
    year: "2025",
    organization: "National School Leaders Summit",
    image: trophyImg,
    receivingImage: receiving2Img,
  }
];
