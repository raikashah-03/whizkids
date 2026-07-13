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
      "This is one of those trips children instantly connect with. They walk through the store, point at things they recognise, and slowly start noticing little details like “this costs money”, “we have to choose”, “we can’t take everything”. They pick, compare, count a little… and without even realising it, they’re learning how everyday things work. Because it feels so real to them, it just clicks.",
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
      "For most children, posting a letter is something they’ve never really seen. So we keep it simple. They write a small note, put it in an envelope, add a stamp, and drop it into the post box. That’s it. But in that small moment, they begin to understand that messages don’t always arrive instantly; sometimes they travel. And that simple idea stays with them.",
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
      "Children are naturally curious about police and what they do. So we take them to see it up close. They meet officers, look around the station, and get a simple idea of how things work. They might see a police vehicle, ask a few questions, and just take it all in. It helps them understand that police are there to help and keep people safe, and that idea feels much clearer when they’ve seen it for themselves.",
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
      "Some of the best learning is this simple. Children run freely, climb, pick up leaves, watch insects, and just spend time outdoors. They move at their own pace, following whatever catches their attention. It’s simple, but it matters; they move more, observe more, and slowly build a natural comfort with the world around them.",
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
          <p className="text-foreground/70 font-medium max-w-3xl mx-auto mt-4 text-base md:text-lg leading-relaxed">
            At Whizkids International Jayamahal, we don’t keep learning limited to four walls. Children step out, see real places, and make sense of things as they go, whether it’s a supermarket, a park, or a community space. They notice, ask, and connect things in their own simple way. These aren’t big, overwhelming outings. Just simple, real experiences that help children feel more aware, more confident, and a little more comfortable in the world around them.
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
