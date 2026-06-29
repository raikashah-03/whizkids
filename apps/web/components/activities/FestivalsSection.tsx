"use client";

import Heading from "@/components/Headding";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import React, { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Festival Data ────────────────────────────────────────────────────────────

const festivals = [
  {
    id: "diwali",
    name: "Diwali",
    emoji: "🪔",
    tagline: "Festival of Lights",
    description:
      "Children dress in traditional attire, craft and decorate clay diyas, make Rangoli patterns, and celebrate the triumph of light over darkness. It's a beautiful immersion in our cultural roots.",
    skills: ["Cultural awareness", "Fine motor craft", "Creativity", "Values & traditions"],
    image: "/images/activities-festivals-diwali.png",
    bg: "bg-[#FFF6F0]",
    accent: "text-peach-strong",
    accentBg: "bg-[#F4EEE5]",
    border: "border-[#FF8C4B]/20",
    season: "October / November",
  },
  {
    id: "holi",
    name: "Holi",
    emoji: "🌈",
    tagline: "Festival of Colours",
    description:
      "Using safe, skin-friendly dry colours, children experience the joy of Holi with colour play, music, and dance. A riot of colours that teaches inclusivity, joy, and celebration.",
    skills: ["Sensory play", "Inclusive celebration", "Joy & expression", "Social bonding"],
    image: "/images/activities-festivals-holi.png",
    bg: "bg-[#F1F8EB]",
    accent: "text-green-strong",
    accentBg: "bg-[#F1F8EB]",
    border: "border-[#3DD67A]/20",
    season: "March",
  },
  {
    id: "christmas",
    name: "Christmas",
    emoji: "🎄",
    tagline: "Festival of Giving",
    description:
      "Santa hats, carols, and gift exchanges! Children learn the spirit of giving, decorate the classroom tree, make cards for friends, and celebrate togetherness across cultures.",
    skills: ["Empathy & giving", "Craft & creativity", "Multi-cultural learning", "Community spirit"],
    image: "/images/activities-festivals-christmas.png",
    bg: "bg-[#E4F3F7]",
    accent: "text-skyblue-strong",
    accentBg: "bg-[#E4F3F7]",
    border: "border-[#29BFDF]/20",
    season: "December",
  },
];

const otherFestivals = [
  { name: "Independence Day", emoji: "🇮🇳" },
  { name: "Ganesh Chaturthi", emoji: "🐘" },
  { name: "Eid", emoji: "🌙" },
  { name: "Children's Day", emoji: "👦" },
  { name: "Onam", emoji: "🌸" },
  { name: "Republic Day", emoji: "🏅" },
  { name: "Navratri", emoji: "💃" },
  { name: "Easter", emoji: "🐣" },
];

// ─── Festival Card ─────────────────────────────────────────────────────────────

function FestivalCard({ festival, index }: { festival: typeof festivals[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current) return;
    const isEven = index % 2 === 0;

    gsap.from(imageRef.current, {
      scrollTrigger: { trigger: cardRef.current, start: "top 78%", toggleActions: "play none none reverse" },
      x: isEven ? -70 : 70,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
    });
    gsap.from(contentRef.current, {
      scrollTrigger: { trigger: cardRef.current, start: "top 78%", toggleActions: "play none none reverse" },
      x: isEven ? 70 : -70,
      opacity: 0,
      duration: 0.9,
      delay: 0.12,
      ease: "power3.out",
    });
  }, { scope: cardRef });

  const isEven = index % 2 === 0;

  return (
    <div
      ref={cardRef}
      id={festival.id}
      className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-10 lg:gap-16 py-16 md:py-20 border-b border-foreground/8 last:border-0`}
    >
      {/* Image side */}
      <div ref={imageRef} className="flex-1 w-full">
        <div className="relative">
          {/* Decorative rotated accent frame */}
          <div className={`absolute -inset-3 rounded-[2.5rem] ${festival.accentBg} rotate-2 pointer-events-none`} />
          <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] shadow-[0_16px_50px_rgba(0,0,0,0.13)]">
            <Image
              src={festival.image}
              alt={`${festival.name} celebration at Whizkids`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Bottom gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            {/* Festival name badge */}
            <div className="absolute bottom-4 left-4">
              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm font-bold text-sm shadow-lg ${festival.accent}`}>
                <span>{festival.emoji}</span>
                <span>{festival.name}</span>
              </span>
            </div>
          </div>
          {/* Season badge */}
          <div className={`absolute -top-3 ${isEven ? "-right-3" : "-left-3"} ${festival.bg} border ${festival.border} rounded-xl px-3 py-1.5 shadow-md`}>
            <p className="text-xs font-bold text-foreground/60 uppercase tracking-wide">🗓️ {festival.season}</p>
          </div>
        </div>
      </div>

      {/* Content side */}
      <div ref={contentRef} className="flex-1 flex flex-col gap-5">
        {/* Label */}
        <div className={`w-fit flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm ${festival.accentBg} ${festival.accent}`}>
          <span>{festival.emoji}</span>
          <span>{festival.tagline}</span>
        </div>

        <Heading
          headingText="Celebrating"
          spanText={festival.name}
          className="justify-start!"
        />

        <p className="text-foreground/70 font-medium leading-relaxed text-base md:text-lg max-w-lg">
          {festival.description}
        </p>

        {/* Skills */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-3">What children learn</p>
          <div className="flex flex-wrap gap-2">
            {festival.skills.map((s, i) => (
              <span key={i} className={`px-3 py-1 rounded-full text-xs font-bold ${festival.accentBg} ${festival.accent}`}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function FestivalsSection(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.from(headerRef.current, {
      scrollTrigger: { trigger: headerRef.current, start: "top 82%", toggleActions: "play none none reverse" },
      y: 50, opacity: 0, duration: 0.9, ease: "power3.out",
    });

    pillsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none none reverse" },
        scale: 0, opacity: 0, duration: 0.45, delay: i * 0.06, ease: "back.out(2)",
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="festivals" className="relative bg-background overflow-hidden">
      {/* Decorative blobs */}
      <span aria-hidden className="pointer-events-none absolute top-0 -left-24 w-72 h-72 rounded-full bg-[#FDE9E9]/50 blur-3xl" />
      <span aria-hidden className="pointer-events-none absolute bottom-0 -right-24 w-72 h-72 rounded-full bg-[#EBDCFF]/40 blur-3xl" />

      {/* Floating icons */}
      <div className="absolute top-16 right-[10%] w-14 h-14 opacity-50 animate-float pointer-events-none hidden lg:block">
        <Image src="/icons/star.png" alt="" fill className="object-contain" />
      </div>
      <div className="absolute bottom-32 left-[5%] w-12 h-12 opacity-40 animate-bob pointer-events-none hidden lg:block">
        <Image src="/icons/cloud-1.png" alt="" fill className="object-contain" />
      </div>

      <div className="container max-w-6xl mx-auto px-4">

        {/* ── Section Header ── */}
        <div ref={headerRef} className="text-center pt-16 md:pt-20 mb-4">
          <div className="w-fit mx-auto flex items-center gap-2 px-4 py-1.5 bg-[#FDE9E9] rounded-full text-pink-strong font-bold text-xs tracking-widest uppercase mb-6 shadow-sm">
            🎉 Cultural Celebrations
          </div>
          <Heading
            headingText="Festivals We"
            spanText="Celebrate"
            className="justify-center!"
            afterHeadingText="🎊"
          />
          <p className="text-foreground/70 font-medium max-w-2xl mx-auto mt-4 text-base md:text-lg leading-relaxed">
            At Whizkids, every festival is a learning adventure. We celebrate India's rich cultural tapestry —
            giving children a joyful, hands-on understanding of traditions, values, and the joy of togetherness.
          </p>
        </div>

        {/* ── Festival Cards ── */}
        {festivals.map((f, i) => (
          <FestivalCard key={f.id} festival={f} index={i} />
        ))}

        {/* ── Other Festivals We Celebrate ── */}
        <div className="pb-16 md:pb-20">
          <p className="text-center text-foreground/50 font-bold text-xs uppercase tracking-widest mb-6">
            And many more celebrations…
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {otherFestivals.map((f, i) => (
              <div
                key={i}
                ref={(el) => { pillsRef.current[i] = el; }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-foreground/8 shadow-sm font-bold text-sm text-foreground/70"
              >
                <span>{f.emoji}</span>
                <span>{f.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
