import type { LucideIcon } from 'lucide-react';
import { 
  Heart, 
  Sparkles, 
  TrendingUp, 
  Compass, 
  Hand, 
  ShieldCheck, 
  PauseCircle,
  Brain,
  Smile,
  MessageCircle,
  Users,
  Search
} from 'lucide-react';

export interface JapanesePillar {
  id: string;
  romaji: string;
  meaning: string;
  tagline: string;
  quote: string;
  description: string;
  approach: string;
  howWeDoIt: string[];
  skillsBuilt: string[];
  bgColor: string;
  borderColor: string;
  badgeBg: string;
  badgeText: string;
  accentColor: string;
  glowShadow: string;
  icon: LucideIcon;
}

export interface PhilosophyPromise {
  title: string;
  desc: string;
  color: string;
  bg: string;
}

export interface PhilosophyQuestion {
  question: string;
  answer: string;
}

export interface HolisticOutcome {
  title: string;
  desc: string;
  icon: LucideIcon;
  accent: string;
  bg: string;
}

export const JAPANESE_PILLARS: JapanesePillar[] = [
  {
    id: "ikigai",
    romaji: "IKIGAI",
    meaning: "Finding Joy in Learning",
    tagline: "Uncovering what makes your child light up",
    quote: "Think of Ikigai as what makes your child light up. That moment when they’re fully involved, curious, and happy doing something.",
    description: "At WhizKids Jayamahal, we don’t push children into one set path. We expose them to a vibrant spectrum of experiences so their innate passions naturally ignite.",
    approach: "We don't push children into one path. We expose them to many.",
    howWeDoIt: [
      "Pottery, storytelling, sports, and role-play",
      "Banking & selling activities (Little Shopkeepers)",
      "No-screen bedtime storytelling initiative"
    ],
    skillsBuilt: ["Cognitive", "Language", "Emotional expression"],
    bgColor: "bg-[#FDF3E5]",
    borderColor: "border-[#FDA924]/30",
    badgeBg: "bg-[#FDA924]/15",
    badgeText: "text-[#D98200]",
    accentColor: "text-[#FDA924]",
    glowShadow: "hover:shadow-[0_20px_50px_rgba(253,169,36,0.18)]",
    icon: Sparkles,
  },
  {
    id: "omoiyari",
    romaji: "OMOIYARI",
    meaning: "Understanding Others’ Feelings",
    tagline: "Nurturing genuine empathy & social warmth",
    quote: "Raising kind, aware children who don’t just think about themselves, but recognize and honor the feelings of everyone around them.",
    description: "Empathy isn’t an accident — it’s a core life skill. At WhizKids Jayamahal, we actively teach empathy through real-world social interaction and emotional awareness.",
    approach: "We actively teach empathy, not assume it will come on its own.",
    howWeDoIt: [
      "Good touch & bad touch awareness",
      "Stranger safety activities",
      "Playdates with parents (building emotional connection)",
      "Group play and sharing routines"
    ],
    skillsBuilt: ["Emotional", "Social", "Language"],
    bgColor: "bg-[#E4F3F7]",
    borderColor: "border-[#29BFDF]/30",
    badgeBg: "bg-[#29BFDF]/15",
    badgeText: "text-[#0099BA]",
    accentColor: "text-[#29BFDF]",
    glowShadow: "hover:shadow-[0_20px_50px_rgba(41,191,223,0.18)]",
    icon: Heart,
  },
  {
    id: "kaizen",
    romaji: "KAIZEN",
    meaning: "Small Steps, Big Growth",
    tagline: "Celebrating continuous progress over perfection",
    quote: "Children don’t learn overnight. They improve through small, repeated, joyful efforts every single day.",
    description: "Kaizen turns daily curiosity into lifelong capability. We focus on small incremental wins that construct unshakable self-confidence.",
    approach: "We focus on progress, not perfection.",
    howWeDoIt: [
      "Repetition through phonics, numbers, and motor activities",
      "Practice-based learning in daily routines",
      "Gradual independence building"
    ],
    skillsBuilt: ["Motor skills", "Cognitive development"],
    bgColor: "bg-[#F1F8EB]",
    borderColor: "border-[#3DD67A]/30",
    badgeBg: "bg-[#3DD67A]/15",
    badgeText: "text-[#1FA352]",
    accentColor: "text-[#3DD67A]",
    glowShadow: "hover:shadow-[0_20px_50px_rgba(61,214,122,0.18)]",
    icon: TrendingUp,
  },
  {
    id: "shizen",
    romaji: "SHIZEN",
    meaning: "Learning from the Real World",
    tagline: "Experiential immersion beyond classroom walls",
    quote: "Children learn best when they experience things firsthand — touch, see, feel, and explore in the real world.",
    description: "Concepts come alive when children step outside. We bring lessons to life through real community visits and immersive outdoor discovery.",
    approach: "We take learning beyond the classroom.",
    howWeDoIt: [
      "Field trips to police stations, hospitals, parks, and supermarkets",
      "Nature exploration and outdoor play",
      "Junk food vs healthy food: real-life learning"
    ],
    skillsBuilt: ["Physical", "Cognitive", "Environmental awareness"],
    bgColor: "bg-[#F4EEE5]",
    borderColor: "border-[#FF8C4B]/30",
    badgeBg: "bg-[#FF8C4B]/15",
    badgeText: "text-[#D95F1E]",
    accentColor: "text-[#FF8C4B]",
    glowShadow: "hover:shadow-[0_20px_50px_rgba(255,140,75,0.18)]",
    icon: Compass,
  },
  {
    id: "hataraki",
    romaji: "HATARAKI",
    meaning: "Learning by Doing",
    tagline: "Fostering early responsibility & autonomy",
    quote: "Children understand responsibility when they actually participate and do things themselves.",
    description: "True independence comes from practice. By involving children in real tasks, we instill early confidence, self-reliance, and pride in their actions.",
    approach: "We let children participate, not just observe.",
    howWeDoIt: [
      "Clean-up routines",
      "Self-help habits",
      "Role play like banking & selling"
    ],
    skillsBuilt: ["Physical", "Social", "Responsibility", "Motor skills"],
    bgColor: "bg-[#EBDFFF]",
    borderColor: "border-[#9B5FFF]/30",
    badgeBg: "bg-[#9B5FFF]/15",
    badgeText: "text-[#702ED4]",
    accentColor: "text-[#9B5FFF]",
    glowShadow: "hover:shadow-[0_20px_50px_rgba(155,95,255,0.18)]",
    icon: Hand,
  },
  {
    id: "wabi-sabi",
    romaji: "WABI-SABI",
    meaning: "It's Okay to Not Be Perfect",
    tagline: "Embracing mistakes as stepping stones to resilience",
    quote: "Mistakes aren’t failures — they are the most beautiful part of learning.",
    description: "We cultivate a safe, fearless environment where children feel completely secure to try, fail, laugh, and try again without judgment.",
    approach: "We create a space where children feel safe to try, fail, and try again.",
    howWeDoIt: [
      "Creative activities like pottery and art",
      "Encouraging effort over results",
      "Celebrating individuality"
    ],
    skillsBuilt: ["Emotional resilience", "Confidence"],
    bgColor: "bg-[#FDE9E9]",
    borderColor: "border-[#FF4D8D]/30",
    badgeBg: "bg-[#FF4D8D]/15",
    badgeText: "text-[#D61E5E]",
    accentColor: "text-[#FF4D8D]",
    glowShadow: "hover:shadow-[0_20px_50px_rgba(255,77,141,0.18)]",
    icon: ShieldCheck,
  },
  {
    id: "ma",
    romaji: "MA",
    meaning: "The Power of Pause",
    tagline: "Respecting space, quiet reflection & natural pacing",
    quote: "Children need space, quiet moments, and calm transitions — not constant rush or endless instruction.",
    description: "We don’t rush childhood. The concept of 'Ma' ensures every child has room to absorb, reflect, rest, and digest their daily experiences securely.",
    approach: "We don’t rush childhood.",
    howWeDoIt: [
      "Balanced routines (play, rest, quiet time)",
      "No-screen storytelling moments",
      "Calm transitions between activities"
    ],
    skillsBuilt: ["Emotional balance", "Attention", "Cognitive processing"],
    bgColor: "bg-[#E4F3F7]",
    borderColor: "border-[#29BFDF]/30",
    badgeBg: "bg-[#29BFDF]/15",
    badgeText: "text-[#0099BA]",
    accentColor: "text-[#29BFDF]",
    glowShadow: "hover:shadow-[0_20px_50px_rgba(41,191,223,0.18)]",
    icon: PauseCircle,
  }
];

export const PHILOSOPHY_PROMISES: PhilosophyPromise[] = [
  {
    title: "Stay Curious",
    desc: "Curiosity is protected instead of becoming hesitant.",
    color: "#FDA924",
    bg: "bg-[#FDF3E5]"
  },
  {
    title: "Express Without Fear",
    desc: "Children learn to share thoughts without fear of judgment.",
    color: "#29BFDF",
    bg: "bg-[#E4F3F7]"
  },
  {
    title: "Small Everyday Wins",
    desc: "Building confidence step-by-step through practice.",
    color: "#3DD67A",
    bg: "bg-[#F1F8EB]"
  },
  {
    title: "Become Independent",
    desc: "Empowering children to do things for themselves early.",
    color: "#9B5FFF",
    bg: "bg-[#EBDFFF]"
  }
];

export const PHILOSOPHY_QUESTIONS: PhilosophyQuestion[] = [
  {
    question: "Will they speak up?",
    answer: "Our open expression and supportive environment encourage every child to find their voice with pride."
  },
  {
    question: "Will they try again after failing?",
    answer: "Through Wabi-Sabi, mistakes are celebrated as progress, building emotional resilience from day one."
  },
  {
    question: "Will they feel confident in the real world?",
    answer: "With real-world visits, banking role-play, and safety awareness, children enter the world prepared."
  }
];

export const HOLISTIC_OUTCOMES: HolisticOutcome[] = [
  {
    title: "How to Think",
    desc: "Problem-solving, spatial awareness, and curious inquiry.",
    icon: Brain,
    accent: "text-[#FDA924]",
    bg: "bg-[#FDF3E5]"
  },
  {
    title: "How to Feel",
    desc: "Emotional regulation, self-awareness, and resilience.",
    icon: Smile,
    accent: "text-[#FF4D8D]",
    bg: "bg-[#FDE9E9]"
  },
  {
    title: "How to Express",
    desc: "Clear communication, art, storytelling, and body autonomy.",
    icon: MessageCircle,
    accent: "text-[#29BFDF]",
    bg: "bg-[#E4F3F7]"
  },
  {
    title: "How to Interact",
    desc: "Empathy, sharing, teamwork, and stranger/body safety.",
    icon: Users,
    accent: "text-[#9B5FFF]",
    bg: "bg-[#EBDFFF]"
  },
  {
    title: "How to Explore",
    desc: "Field trips, outdoor nature exploration, and hands-on trial.",
    icon: Search,
    accent: "text-[#3DD67A]",
    bg: "bg-[#F1F8EB]"
  }
];
