"use client";

import Heading from "@/components/Headding";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface SportImage {
  src: string;
  alt: string;
}

type CollageVariant = "trio-featured" | "duo-portrait" | "quad-mosaic" | "trio-wide";

interface SportProgram {
  id: string;
  emoji: string;
  label: string;
  headingMain: string;
  headingSpan: string;
  tagline: string;
  description: string[];
  benefits: string[];
  images: SportImage[];
  collageVariant: CollageVariant;
  accentBg: string;
  accentText: string;
  accentBorder: string;
  accentPillBg: string;
  imageRight: boolean; // alternating layout
}

// ─── Sport Data ───────────────────────────────────────────────────────────────

const sports: SportProgram[] = [
  {
    id: "gymnastics",
    emoji: "🤸",
    label: "Gymnastics",
    headingMain: "Building Balance &",
    headingSpan: "Gymnastics",
    tagline: "Flexibility, Coordination & Confidence",
    description: [
      "Our gymnastics program helps children get comfortable with their bodies in a simple, natural way. They stretch, balance, and try basic movements — slowly building strength and coordination as they go. Nothing rushed, nothing forced. Over time, you’ll notice it yourself: better balance, more control, and a quiet confidence in the way they move.",
    ],
    benefits: [
      "Develops balance & motor coordination",
      "Builds core strength and flexibility",
      "Boosts spatial awareness and confidence",
      "Improves posture and body control",
    ],
    images: [
      { src: "/images/sports-gymnastics-1.png", alt: "Children doing gymnastics on mats" },
      { src: "/images/sports-gymnastics-2.png", alt: "Child doing a bridge pose" },
      { src: "/images/sports-gymnastics-3.png", alt: "Children stretching in gym class" },
    ],
    collageVariant: "trio-featured",
    accentBg: "bg-[#E4F3F7]",
    accentText: "text-skyblue-strong",
    accentBorder: "border-[#29BFDF]/25",
    accentPillBg: "bg-[#E4F3F7] text-skyblue-strong",
    imageRight: false,
  },
  {
    id: "taekwondo",
    emoji: "🥋",
    label: "Taekwondo",
    headingMain: "Focus, Discipline &",
    headingSpan: "Taekwondo",
    tagline: "Respect, Focus & Inner Strength",
    description: [
      "Our taekwondo sessions help children feel more aware, in control, and quietly confident.",
      "It’s not about aggression — it’s about understanding personal space, staying alert, and responding calmly. Along the way, they build coordination, discipline, and respect in a way that naturally shows in how they behave.",
    ],
    benefits: [
      "Teaches respect and self-discipline",
      "Sharpens focus and concentration",
      "Develops gross motor skills and agility",
      "Builds confidence and emotional control",
    ],
    images: [
      { src: "/images/sports-taekwondo-1.png", alt: "Children in taekwondo uniforms" },
      { src: "/images/sports-taekwondo-2.png", alt: "Two children bowing in taekwondo" },
      { src: "/images/sports-taekwondo-3.png", alt: "Child breaking a board" },
    ],
    collageVariant: "trio-wide",
    accentBg: "bg-[#EBDCFF]",
    accentText: "text-lavender-strong",
    accentBorder: "border-[#9B5FFF]/25",
    accentPillBg: "bg-[#EBDCFF] text-lavender-strong",
    imageRight: true,
  },
  {
    id: "yoga",
    emoji: "🧘",
    label: "Yoga",
    headingMain: "Calm, Breathe &",
    headingSpan: "Yoga",
    tagline: "Mindfulness, Balance & Inner Peace",
    description: [
      "Our yoga sessions give children a gentle break in their day. They stretch, move, and try simple breathing at their own pace. No pressure, no expectations. It helps them slow down, feel a bit more settled, and just be more at ease in themselves.",
    ],
    benefits: [
      "Improves flexibility and balance",
      "Teaches mindfulness and breathing",
      "Regulates energy and emotions",
      "Builds concentration and inner calm",
    ],
    images: [
      { src: "/images/sports-yoga-1.png", alt: "Children meditating on yoga mats" },
      { src: "/images/sports-yoga-2.png", alt: "Child doing tree pose yoga" },
      { src: "/images/sports-yoga-3.png", alt: "Children in child's pose" },
      { src: "/images/sports-yoga-4.png", alt: "Children doing breathing exercises" },
    ],
    collageVariant: "quad-mosaic",
    accentBg: "bg-[#F1F8EB]",
    accentText: "text-green-strong",
    accentBorder: "border-[#3DD67A]/25",
    accentPillBg: "bg-[#F1F8EB] text-green-strong",
    imageRight: false,
  },
  {
    id: "football",
    emoji: "⚽",
    label: "Football",
    headingMain: "Teamwork, Energy &",
    headingSpan: "Football",
    tagline: "Agility, Teamwork & Pure Fun",
    description: [
      "At this age, football is less about goals and more about just playing. Children run, kick, and figure things out as they go. Through simple games, they start building balance, coordination, and a sense of space. They also learn to take turns, pass, and play together — all while doing what they already love: moving and having fun.",
    ],
    benefits: [
      "Develops agility and running speed",
      "Builds teamwork and communication",
      "Enhances gross motor skills",
      "Encourages healthy outdoor activity",
    ],
    images: [
      { src: "/images/sports-football-1.png", alt: "Children playing football on a field" },
      { src: "/images/sports-football-2.png", alt: "Child dribbling a football" },
      { src: "/images/sports-football-3.png", alt: "Children celebrating a goal" },
    ],
    collageVariant: "duo-portrait",
    accentBg: "bg-[#F4EEE5]",
    accentText: "text-peach-strong",
    accentBorder: "border-[#FF8C4B]/25",
    accentPillBg: "bg-[#F4EEE5] text-peach-strong",
    imageRight: true,
  },
];

// ─── Collage Layouts ──────────────────────────────────────────────────────────

/**
 * trio-featured: 1 large image left + 2 smaller stacked right (asymmetric)
 *
 *  ┌──────────────┬───────┐
 *  │              │   B   │
 *  │      A       ├───────┤
 *  │              │   C   │
 *  └──────────────┴───────┘
 */
function TrioFeaturedCollage({ images, accentBg, accentText }: { images: SportImage[]; accentBg: string; accentText: string }) {
  return (
    <div className="collage-block grid gap-3 h-[420px] md:h-[500px]" style={{ gridTemplateColumns: "3fr 2fr", gridTemplateRows: "1fr 1fr" }}>
      {/* A — large featured */}
      <div className="relative rounded-[1.75rem] overflow-hidden row-span-2 shadow-[0_8px_30px_rgba(0,0,0,0.14)]">
        <Image src={images[0]!.src} alt={images[0]!.alt} fill className="object-cover" sizes="50vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      {/* B — top right */}
      <div className="relative rounded-[1.75rem] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.10)]">
        <Image src={images[1]!.src} alt={images[1]!.alt} fill className="object-cover" sizes="25vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
      </div>
      {/* C — bottom right, offset accent tile */}
      <div className={`relative rounded-[1.75rem] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.10)] ${accentBg}`}>
        <Image src={images[2]!.src} alt={images[2]!.alt} fill className="object-cover" sizes="25vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
        {/* Accent badge */}
        <div className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-base shadow-sm bg-white`}>
          🌟
        </div>
      </div>
    </div>
  );
}

/**
 * duo-portrait: 1 tall portrait + 1 short landscape staggered below (asymmetric)
 *
 *  ┌────────────────────────────┐
 *  │           A                │  ← tall
 *  └──────┬─────────────────────┘
 *         │           B         │  ← short, inset/overlapping
 *         └─────────────────────┘
 */
function DuoPortraitCollage({ images, accentBg }: { images: SportImage[]; accentBg: string }) {
  return (
    <div className="collage-block relative h-[420px] md:h-[500px]">
      {/* A — large top */}
      <div className="absolute top-0 left-0 right-[8%] h-[70%] rounded-[1.75rem] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.14)]">
        <Image src={images[0]!.src} alt={images[0]!.alt} fill className="object-cover" sizes="50vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      {/* B — bottom, shifted right, overlapping */}
      <div className="absolute bottom-0 right-0 left-[12%] h-[50%] rounded-[1.75rem] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.18)]" style={{ zIndex: 2 }}>
        <Image src={images[1]!.src} alt={images[1]!.alt} fill className="object-cover" sizes="40vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        {/* Decorative pill on image */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${accentBg} bg-opacity-90 backdrop-blur-sm text-foreground/80 shadow`}>
            ⚽ Game On!
          </span>
        </div>
      </div>
      {/* Decorative circle between images */}
      <div className={`absolute top-[55%] left-[5%] w-12 h-12 rounded-full ${accentBg} flex items-center justify-center text-xl shadow-md animate-bob`} style={{ zIndex: 3 }}>
        🏆
      </div>
    </div>
  );
}

/**
 * quad-mosaic: 4 images in a bento-style uneven 2-column grid
 *
 *  ┌───────┬──────────────┐
 *  │   A   │              │
 *  ├───────┤      B       │
 *  │       │              │
 *  │   C   ├──────────────┤
 *  │       │      D       │
 *  └───────┴──────────────┘
 */
function QuadMosaicCollage({ images }: { images: SportImage[] }) {
  return (
    <div className="collage-block grid gap-3 h-[420px] md:h-[500px]" style={{ gridTemplateColumns: "2fr 3fr", gridTemplateRows: "1fr 1fr" }}>
      {/* A — top left, square */}
      <div className="relative rounded-[1.75rem] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
        <Image src={images[0]!.src} alt={images[0]!.alt} fill className="object-cover" sizes="25vw" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20" />
      </div>
      {/* B — top right, tall spanning 2 rows */}
      <div className="relative rounded-[1.75rem] overflow-hidden row-span-2 shadow-[0_8px_30px_rgba(0,0,0,0.14)]">
        <Image src={images[1]!.src} alt={images[1]!.alt} fill className="object-cover object-top" sizes="35vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
      </div>
      {/* C — bottom left */}
      <div className="relative rounded-[1.75rem] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
        <Image src={images[2]!.src} alt={images[2]!.alt} fill className="object-cover object-bottom" sizes="25vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
        <div className="absolute bottom-3 left-3">
          <span className="px-2 py-0.5 bg-white/80 backdrop-blur-sm rounded-full text-xs font-bold text-green-strong">🌱 Breathe</span>
        </div>
      </div>
    </div>
  );
}

/**
 * trio-wide: 1 short wide + 2 side by side below (asymmetric horizontal)
 *
 *  ┌─────────────────────────┐
 *  │           A             │  ← wide short
 *  └──────────────┬──────────┘
 *  ┌──────────┐   │          │
 *  │    B     │   │    C     │  ← two below, different heights
 *  └──────────┘   └──────────┘
 */
function TrioWideCollage({ images, accentBg }: { images: SportImage[]; accentBg: string }) {
  return (
    <div className="collage-block relative h-[420px] md:h-[500px]">
      {/* A — top wide banner */}
      <div className="absolute top-0 left-0 right-0 h-[42%] rounded-[1.75rem] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
        <Image src={images[0]!.src} alt={images[0]!.alt} fill className="object-cover object-top" sizes="50vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/25" />
      </div>
      {/* B — bottom left, taller */}
      <div className="absolute bottom-0 left-0 w-[48%] h-[58%] rounded-[1.75rem] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.14)]">
        <Image src={images[1]!.src} alt={images[1]!.alt} fill className="object-cover" sizes="25vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      {/* C — bottom right, slightly shorter with accent pill */}
      <div className="absolute bottom-0 right-0 w-[48%] h-[50%] rounded-[1.75rem] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.14)]">
        <Image src={images[2]!.src} alt={images[2]!.alt} fill className="object-cover" sizes="25vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-bold bg-white/85 text-foreground/80 shadow backdrop-blur-sm`}>
            🥋 Focus!
          </span>
        </div>
      </div>
      {/* Overlap accent badge */}
      <div className={`absolute top-[37%] right-[44%] translate-y-[-50%] w-11 h-11 rounded-full ${accentBg} flex items-center justify-center text-lg shadow-lg animate-bob z-10`}>
        ⭐
      </div>
    </div>
  );
}

// ─── Sport Card ───────────────────────────────────────────────────────────────

function SportCard({ sport, index }: { sport: SportProgram; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentSide = useRef<HTMLDivElement>(null);
  const collageSide = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current) return;

    gsap.from(contentSide.current, {
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 78%",
        toggleActions: "play none none reverse",
      },
      x: sport.imageRight ? -60 : 60,
      opacity: 0,
      duration: 0.85,
      ease: "power3.out",
    });

    gsap.from(collageSide.current, {
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 78%",
        toggleActions: "play none none reverse",
      },
      x: sport.imageRight ? 60 : -60,
      opacity: 0,
      duration: 0.85,
      delay: 0.1,
      ease: "power3.out",
    });
  }, { scope: cardRef });

  const collageEl = (() => {
    switch (sport.collageVariant) {
      case "trio-featured":
        return <TrioFeaturedCollage images={sport.images} accentBg={sport.accentBg} accentText={sport.accentText} />;
      case "duo-portrait":
        return <DuoPortraitCollage images={sport.images} accentBg={sport.accentBg} />;
      case "quad-mosaic":
        return <QuadMosaicCollage images={sport.images} />;
      case "trio-wide":
        return <TrioWideCollage images={sport.images} accentBg={sport.accentBg} />;
    }
  })();

  return (
    <div
      ref={cardRef}
      id={sport.id}
      className={`relative flex flex-col ${sport.imageRight ? "lg:flex-row" : "lg:flex-row-reverse"} gap-10 lg:gap-14 items-center py-16 md:py-20`}
    >
      {/* Subtle divider line (not first) */}
      {index > 0 && (
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
      )}

      {/* ── Content side ── */}
      <div ref={contentSide} className="flex-1 flex flex-col gap-5">
        {/* Sport label pill */}
        <div className={`w-fit flex items-center gap-2 px-4 py-1.5 rounded-full font-bold text-xs tracking-widest uppercase shadow-sm ${sport.accentPillBg}`}>
          <span>{sport.emoji}</span>
          <span>{sport.label}</span>
        </div>

        <Heading
          headingText={sport.headingMain}
          spanText={sport.headingSpan}
          className="justify-start!"
        />

        <p className="text-sm font-bold text-foreground/50 uppercase tracking-widest -mt-1">
          {sport.tagline}
        </p>

        <div className="text-foreground/70 font-medium leading-relaxed text-sm md:text-base max-w-lg space-y-3">
          {sport.description.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {/* Benefits */}
        <div className="flex flex-col gap-2.5 mt-1">
          {sport.benefits.map((b, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle2 className={`w-5 h-5 mt-0.5 shrink-0 ${sport.accentText}`} />
              <span className="text-foreground/70 font-medium text-sm md:text-base">{b}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Collage side ── */}
      <div ref={collageSide} className="flex-1 w-full">
        {collageEl}
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function SportsProgramsSection(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    gsap.from(".sports-section-heading", {
      scrollTrigger: {
        trigger: ".sports-section-heading",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative bg-background overflow-hidden">
      {/* Decorative global background blobs */}
      <span aria-hidden className="pointer-events-none absolute top-1/4 -left-32 w-80 h-80 rounded-full bg-[#EBDCFF]/30 blur-3xl" />
      <span aria-hidden className="pointer-events-none absolute top-3/4 -right-32 w-80 h-80 rounded-full bg-[#E4F3F7]/30 blur-3xl" />

      <div className="container max-w-6xl mx-auto px-4">

        {/* ── Section Header ── */}
        <div className="sports-section-heading text-center mb-4 pt-12">
          <div className="w-fit mx-auto px-4 py-1.5 bg-[#FDE9E9] rounded-full text-pink-strong font-bold text-xs tracking-widest uppercase mb-6 shadow-sm">
            Our Sports Programs
          </div>
          <Heading
            headingText="Sports That"
            spanText="Shape Champions"
            className="justify-center!"
            beforeIcon="/icons/star.png"
          />
          <p className="text-foreground/70 font-medium max-w-2xl mx-auto mt-4">
            Every sport at Whizkids is designed to be age-appropriate, joyful, and developmentally enriching, giving children the physical skills and emotional resilience to thrive.
          </p>
        </div>

        {/* ── Individual Sport Cards ── */}
        {sports.map((sport, i) => (
          <SportCard key={sport.id} sport={sport} index={i} />
        ))}

      </div>
    </section>
  );
}
