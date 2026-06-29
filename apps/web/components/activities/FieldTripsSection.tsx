"use client";

import Heading from "@/components/Headding";
import TopBottomShapeSection from "@/components/ui/top-bottom-shape-section";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, MapPin } from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Trip Data ────────────────────────────────────────────────────────────────

const trips = [
  {
    id: "supermarket",
    name: "Supermarket",
    emoji: "🛒",
    heading: "Learning at the",
    headingSpan: "Supermarket",
    tagline: "Money, Math & Real-World Choices",
    description:
      "Children visit a real supermarket and discover how the world of buying and selling works — from recognising fruit and vegetables to understanding that things have prices. They practise counting, sorting, and making simple choices while exploring the store.",
    learnings: [
      "Understand buying & selling concepts",
      "Recognise everyday food items",
      "Practice basic counting & math",
      "Develop decision-making skills",
    ],
    image: "/images/activities-trip-supermarket.png",
    bg: "bg-[#F1F8EB]",
    accentBg: "bg-[#F1F8EB]",
    accent: "text-green-strong",
    border: "border-[#3DD67A]/25",
    mapBg: "#F1F8EB",
    dotColor: "#3DD67A",
    reverse: false,
  },
  {
    id: "hospital",
    name: "Hospital",
    emoji: "🏥",
    heading: "Exploring the",
    headingSpan: "Hospital",
    tagline: "Health, Helpers & Bravery",
    description:
      "A visit to the hospital removes fear and builds curiosity. Children meet friendly doctors and nurses, learn about how hospitals help people, see medical instruments up close, and understand the important role healthcare professionals play in our community.",
    learnings: [
      "Remove fear around doctors & hospitals",
      "Understand community health roles",
      "Learn basic body awareness",
      "Build confidence and bravery",
    ],
    image: "/images/activities-trip-hospital.png",
    bg: "bg-[#E4F3F7]",
    accentBg: "bg-[#E4F3F7]",
    accent: "text-skyblue-strong",
    border: "border-[#29BFDF]/25",
    mapBg: "#E4F3F7",
    dotColor: "#29BFDF",
    reverse: true,
  },
  {
    id: "post-office",
    name: "Post Office",
    emoji: "📮",
    heading: "Discovering the",
    headingSpan: "Post Office",
    tagline: "Communication, Letters & Stamps",
    description:
      "In an age of instant messaging, the post office is a magical world of letters, stamps, and parcels. Children write their own simple letters, put them in envelopes, and watch the postal journey begin — learning communication, patience, and how the world stays connected.",
    learnings: [
      "Understand letter writing & communication",
      "Learn about stamps and postal services",
      "Experience sequencing and process",
      "Develop patience and anticipation",
    ],
    image: "/images/activities-trip-postoffice.png",
    bg: "bg-[#EBDCFF]",
    accentBg: "bg-[#EBDCFF]",
    accent: "text-lavender-strong",
    border: "border-[#9B5FFF]/25",
    mapBg: "#EBDCFF",
    dotColor: "#9B5FFF",
    reverse: false,
  },
  {
    id: "police-station",
    name: "Police Station",
    emoji: "🚔",
    heading: "Visiting the",
    headingSpan: "Police Station",
    tagline: "Safety, Rules & Community Heroes",
    description:
      "Children get to meet real police officers who keep our communities safe. They see how a police station works, learn about rules, explore a police vehicle, and understand why law and order matters — building a healthy, respectful attitude towards authority.",
    learnings: [
      "Understand community safety roles",
      "Build healthy respect for authority",
      "Learn importance of rules & discipline",
      "Overcome fear of uniforms & police",
    ],
    image: "/images/activities-trip-police.png",
    bg: "bg-[#FDE9E9]",
    accentBg: "bg-[#FDE9E9]",
    accent: "text-pink-strong",
    border: "border-[#FF4D8D]/25",
    mapBg: "#FDE9E9",
    dotColor: "#FF4D8D",
    reverse: true,
  },
  {
    id: "park",
    name: "Park",
    emoji: "🌳",
    heading: "Adventures at the",
    headingSpan: "Park",
    tagline: "Nature, Play & Exploration",
    description:
      "The park is a treasure trove of sensory experiences. Children explore nature — observing insects, collecting leaves and pebbles, playing freely on equipment, and simply running in open green space. It nurtures their physical development, curiosity, and love for the outdoors.",
    learnings: [
      "Connect with nature and outdoors",
      "Develop gross motor skills",
      "Learn observation and curiosity",
      "Build healthy outdoor habits",
    ],
    image: "/images/activities-trip-park.png",
    bg: "bg-[#FFF6F0]",
    accentBg: "bg-[#FFF6F0]",
    accent: "text-peach-strong",
    border: "border-[#FF8C4B]/25",
    mapBg: "#FFF6F0",
    dotColor: "#FF8C4B",
    reverse: false,
  },
];

// ─── Trip Card ─────────────────────────────────────────────────────────────────

function TripCard({ trip, index }: { trip: typeof trips[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current) return;

    gsap.from(imageRef.current, {
      scrollTrigger: { trigger: cardRef.current, start: "top 78%", toggleActions: "play none none reverse" },
      x: trip.reverse ? 70 : -70,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
    });
    gsap.from(contentRef.current, {
      scrollTrigger: { trigger: cardRef.current, start: "top 78%", toggleActions: "play none none reverse" },
      x: trip.reverse ? -70 : 70,
      opacity: 0,
      duration: 0.9,
      delay: 0.12,
      ease: "power3.out",
    });
  }, { scope: cardRef });

  return (
    <div
      ref={cardRef}
      id={trip.id}
      className={`flex flex-col ${trip.reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-10 lg:gap-14 py-14 md:py-20 border-b border-foreground/8 last:border-0`}
    >
      {/* ── Image Side ── */}
      <div ref={imageRef} className="flex-1 w-full">
        <div className="relative">
          {/* Rotated accent bg */}
          <div className={`absolute -inset-3 rounded-[2.5rem] ${trip.accentBg} ${trip.reverse ? "-rotate-2" : "rotate-2"} pointer-events-none`} />

          {/* Main image */}
          <div className={`relative rounded-[2rem] overflow-hidden aspect-[4/3] shadow-[0_16px_60px_rgba(0,0,0,0.14)] border-2 ${trip.border}`}>
            <Image
              src={trip.image}
              alt={`${trip.name} field trip at Whizkids`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />

            {/* Location label */}
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-md">
                <MapPin className={`w-3.5 h-3.5 ${trip.accent} shrink-0`} />
                <span className={`text-xs font-black ${trip.accent}`}>{trip.name}</span>
              </div>
              <span className="text-2xl">{trip.emoji}</span>
            </div>
          </div>

          {/* Trip number badge */}
          <div
            className={`absolute -top-4 ${trip.reverse ? "-left-4" : "-right-4"} w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-foreground/5`}
          >
            <span className="font-black font-display text-lg text-foreground/60">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      {/* ── Content Side ── */}
      <div ref={contentRef} className="flex-1 flex flex-col gap-5">
        {/* Pill label */}
        <div className={`w-fit flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm ${trip.accentBg} ${trip.accent}`}>
          <span>{trip.emoji}</span>
          <span>Field Trip · {trip.name}</span>
        </div>

        <Heading
          headingText={trip.heading}
          spanText={trip.headingSpan}
          className="justify-start!"
        />

        <p className="text-xs font-bold uppercase tracking-widest text-foreground/40">
          {trip.tagline}
        </p>

        <p className="text-foreground/70 font-medium leading-relaxed text-base md:text-lg max-w-lg">
          {trip.description}
        </p>

        {/* Learnings */}
        <div className="flex flex-col gap-2.5">
          {trip.learnings.map((l, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle2 className={`w-5 h-5 mt-0.5 shrink-0 ${trip.accent}`} />
              <span className="text-foreground/70 font-medium text-sm md:text-base">{l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Journey Map (visual connector strip) ─────────────────────────────────────

function JourneyMap() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const pills = ref.current.querySelectorAll(".journey-pill");
    gsap.from(pills, {
      scrollTrigger: { trigger: ref.current, start: "top 85%", toggleActions: "play none none reverse" },
      scale: 0,
      opacity: 0,
      stagger: 0.12,
      duration: 0.5,
      ease: "back.out(1.8)",
    });
  }, { scope: ref });

  return (
    <div ref={ref} className="flex flex-wrap items-center justify-center gap-2 md:gap-0 md:flex-nowrap mb-2 py-8">
      {trips.map((t, i) => (
        <React.Fragment key={t.id}>
          <a
            href={`#${t.id}`}
            className={`journey-pill flex flex-col items-center gap-1.5 px-5 py-3 rounded-2xl ${t.accentBg} border ${t.border} hover:-translate-y-1 transition-transform duration-200 cursor-pointer min-w-[90px] text-center shadow-sm`}
          >
            <span className="text-2xl">{t.emoji}</span>
            <span className={`text-xs font-black ${t.accent}`}>{t.name}</span>
          </a>
          {i < trips.length - 1 && (
            <div className="hidden md:flex items-center px-1">
              <svg width="28" height="16" viewBox="0 0 28 16" fill="none" className="text-foreground/20">
                <path d="M0 8 Q14 0 28 8 Q14 16 0 8Z" fill="currentColor" />
              </svg>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function FieldTripsSection(): React.JSX.Element {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    gsap.from(headerRef.current, {
      scrollTrigger: { trigger: headerRef.current, start: "top 82%", toggleActions: "play none none reverse" },
      y: 50, opacity: 0, duration: 0.9, ease: "power3.out",
    });
  }, { scope: sectionRef });

  return (
    <TopBottomShapeSection>
      {/* Floating decorations */}
      <div className="absolute top-10 left-[6%] w-14 h-14 opacity-50 animate-float pointer-events-none hidden lg:block">
        <Image src="/icons/bus.png" alt="" fill className="object-contain" />
      </div>
      <div className="absolute top-20 right-[8%] w-12 h-12 opacity-40 animate-bob pointer-events-none hidden lg:block">
        <Image src="/icons/cloud-2.png" alt="" fill className="object-contain" />
      </div>
      <div className="absolute bottom-20 left-[8%] w-10 h-10 opacity-60 animate-spin-slow pointer-events-none hidden lg:block">
        <Image src="/icons/kite.png" alt="" fill className="object-contain" />
      </div>

      {/* Confetti stars */}
      {[
        { top: "12%", left: "18%", size: 20, color: "#FDA924", delay: "0s" },
        { top: "40%", right: "10%", size: 14, color: "#9B5FFF", delay: "0.8s" },
        { top: "70%", left: "12%", size: 18, color: "#29BFDF", delay: "0.4s" },
      ].map((s, i) => (
        <span
          key={i}
          aria-hidden
          className="pointer-events-none absolute animate-bob select-none"
          style={{ top: s.top, left: "left" in s ? s.left : undefined, right: "right" in s ? (s as any).right : undefined, animationDelay: s.delay }}
        >
          <svg width={s.size} height={s.size} viewBox="0 0 28 28" fill="none">
            <path d="M14 2l2.7 8.3H25l-6.9 5 2.6 8.2L14 18.5l-6.7 5 2.6-8.2L3 10.3h8.3z" fill={s.color} />
          </svg>
        </span>
      ))}

      <div ref={sectionRef} id="field-trips" className="relative z-10 container max-w-6xl mx-auto px-4">

        {/* ── Header ── */}
        <div ref={headerRef} className="text-center pt-4 mb-6">
          <div className="w-fit mx-auto flex items-center gap-2 px-4 py-1.5 bg-white rounded-full text-peach-strong font-bold text-xs tracking-widest uppercase mb-6 shadow-sm">
            🚌 Experiential Learning
          </div>
          <Heading
            headingText="Field Trips &"
            spanText="Real-World Learning"
            className="justify-center!"
            beforeIcon="/icons/bus.png"
          />
          <p className="text-foreground/70 font-medium max-w-2xl mx-auto mt-4 text-base md:text-lg leading-relaxed">
            At Whizkids, learning doesn't stop at the classroom door. Our carefully planned <strong>field trips</strong> take
            children into the real world — turning everyday places into extraordinary classrooms. Every visit is
            a hands-on adventure that builds knowledge, confidence, and curiosity.
          </p>
        </div>

        {/* ── Journey Map ── */}
        <JourneyMap />

        {/* ── Trip Cards ── */}
        {trips.map((trip, i) => (
          <TripCard key={trip.id} trip={trip} index={i} />
        ))}

        {/* ── Bottom note ── */}
        <div className="pb-8 text-center">
          <p className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-2xl shadow-sm text-sm font-bold text-foreground/60 border border-foreground/5">
            <span>📋</span>
            All field trips are supervised, safe, and planned in advance with parental consent.
          </p>
        </div>

      </div>
    </TopBottomShapeSection>
  );
}
