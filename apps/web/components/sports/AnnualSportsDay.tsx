"use client";

import Heading from "@/components/Headding";
import TopBottomShapeSection from "@/components/ui/top-bottom-shape-section";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CalendarHeart, Medal, Sparkles, Trophy, Users } from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const highlights = [
  {
    icon: CalendarHeart,
    label: "Every Year",
    sub: "Annual tradition",
    bg: "bg-white",
    color: "text-pink-strong",
  },
  {
    icon: Users,
    label: "All Ages",
    sub: "Every child participates",
    bg: "bg-white",
    color: "text-skyblue-strong",
  },
  {
    icon: Trophy,
    label: "Fun Medals",
    sub: "Everyone's a winner",
    bg: "bg-white",
    color: "text-primary",
  },
  {
    icon: Medal,
    label: "Parents Join",
    sub: "Family cheering section",
    bg: "bg-white",
    color: "text-lavender-strong",
  },
];

const events = [
  { emoji: "🏃", name: "Mini Marathon", color: "bg-[#E4F3F7]" },
  { emoji: "🤸", name: "Gymnastics Show", color: "bg-[#EBDCFF]" },
  { emoji: "⚽", name: "Football Dribble", color: "bg-[#F4EEE5]" },
  { emoji: "🧘", name: "Yoga Showcase", color: "bg-[#F1F8EB]" },
  { emoji: "🥋", name: "Taekwondo Demo", color: "bg-[#FDE9E9]" },
  { emoji: "🏆", name: "Trophy Ceremony", color: "bg-[#FFF6F0]" },
];

export default function AnnualSportsDay(): React.JSX.Element {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef<(HTMLDivElement | null)[]>([]);
  const highlightsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Heading animation
    gsap.from(headingRef.current, {
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 82%",
        toggleActions: "play none none reverse",
      },
      y: 50,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
    });

    // Image reveal
    gsap.from(imageRef.current, {
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      scale: 0.92,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    // Highlight cards
    highlightsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        y: 40,
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        delay: i * 0.1,
        ease: "back.out(1.5)",
      });
    });

    // Event tiles pop
    tilesRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        scale: 0,
        opacity: 0,
        duration: 0.5,
        delay: i * 0.07,
        ease: "back.out(2)",
      });
    });
  }, { scope: sectionRef });

  return (
    <TopBottomShapeSection>
      {/* Decorative floating elements */}
      <div className="absolute top-8 left-[5%] w-16 h-16 opacity-70 animate-float pointer-events-none hidden lg:block">
        <Image src="/icons/star.png" alt="" fill className="object-contain" />
      </div>
      <div className="absolute top-16 right-[8%] w-20 h-20 opacity-60 animate-float-slow pointer-events-none hidden lg:block">
        <Image src="/icons/kite.png" alt="" fill className="object-contain" />
      </div>
      <div className="absolute bottom-16 left-[6%] w-14 h-14 opacity-50 animate-bob pointer-events-none hidden lg:block">
        <Image src="/icons/cloud-2.png" alt="" fill className="object-contain" />
      </div>
      {/* Confetti star SVGs */}
      {[
        { top: "15%", left: "20%", size: 24, color: "#FDA924", delay: "0s" },
        { top: "30%", right: "15%", size: 16, color: "#9B5FFF", delay: "1s" },
        { top: "65%", left: "10%", size: 20, color: "#FF4D8D", delay: "0.5s" },
        { top: "75%", right: "20%", size: 14, color: "#29BFDF", delay: "1.5s" },
        { top: "50%", left: "45%", size: 18, color: "#3DD67A", delay: "0.8s" },
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

      <div ref={sectionRef} className="relative z-10 container max-w-6xl mx-auto px-4">

        {/* ── Section heading ── */}
        <div ref={headingRef} className="text-center mb-12">
          <div className="w-fit mx-auto flex items-center gap-2 px-4 py-1.5 bg-white rounded-full text-primary font-bold text-xs tracking-widest uppercase mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Annual Celebration
          </div>

          <Heading
            headingText="Annual"
            spanText="Sports Day"
            afterHeadingText="🏆"
            className="justify-center!"
          />

          <div className="text-foreground/70 font-medium max-w-3xl mx-auto mt-6 text-sm md:text-base leading-relaxed space-y-4">
            <p>
              Annual Sports Day at Whizkids is one of the most awaited days of the year, full of energy, excitement, and those little moments parents never forget.
            </p>
            <p>
              It’s not about competition in the traditional sense. It’s about children stepping out, trying, participating, and feeling proud of what they can do. From simple races and obstacle runs to group games and movement showcases, every activity is designed so each child gets their moment.
            </p>
            <p>
              We also put real thought into how we host it. We conduct our Annual Sports Day at a larger, more organised scale so children get used to structured events, bigger spaces, and performing in front of an audience. It helps them build the confidence and comfort they’ll need as they move on to more formal schools later on.
            </p>
            <p>
              You’ll see confidence building in real time, a hesitant child stepping forward, participating, and finishing with a smile because they did it. You’ll see teamwork, encouragement, and genuine joy on the field.
            </p>
            <p>
              With parents cheering, teachers guiding, and every child being recognised, it becomes more than just a sports day. It becomes a celebration of growth, effort, and self-belief — the kind of experience that truly prepares them for what’s ahead, while giving them a memory they’ll carry with them for years.
            </p>
          </div>
        </div>

        {/* ── Main Image ── */}
        <div ref={imageRef} className="relative rounded-[2.5rem] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.15)] mb-12" style={{ height: "420px" }}>
          <Image
            src="/images/sports-annual-day.png"
            alt="Whizkids Annual Sports Day celebration with children and parents"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 1200px"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          {/* Overlay text badge */}
          <div className="absolute bottom-6 left-6 md:left-10">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-3 inline-flex items-center gap-3 shadow-xl">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl">
                🏆
              </div>
              <div>
                <p className="font-black font-display text-foreground text-base">Annual Sports Day</p>
                <p className="text-xs text-foreground/60 font-medium">Every Year · All Programs · Families Welcome</p>
              </div>
            </div>
          </div>
          {/* Floating badge */}
          <div className="absolute top-6 right-6 bg-primary text-white rounded-2xl px-4 py-2 shadow-xl animate-bob">
            <p className="font-black font-display text-sm">Year After Year</p>
            <p className="text-xs opacity-90">A Tradition of Joy</p>
          </div>
        </div>

        {/* ── Highlight stats ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {highlights.map((h, i) => (
            <div
              key={i}
              ref={(el) => { highlightsRef.current[i] = el; }}
              className={`${h.bg} rounded-[1.5rem] p-5 flex flex-col items-center text-center gap-2 shadow-sm border border-foreground/5`}
            >
              <h.icon className={`w-7 h-7 ${h.color}`} />
              <p className={`font-black font-display text-lg ${h.color}`}>{h.label}</p>
              <p className="text-xs text-foreground/55 font-medium">{h.sub}</p>
            </div>
          ))}
        </div>

        {/* ── Event tiles ── */}
        <div className="mb-4">
          <p className="text-center text-foreground/60 font-bold text-xs uppercase tracking-widest mb-6">
            What happens on Sports Day
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {events.map((ev, i) => (
              <div
                key={i}
                ref={(el) => { tilesRef.current[i] = el; }}
                className={`${ev.color} rounded-full px-5 py-2 flex items-center gap-2 shadow-sm font-bold text-sm text-foreground/80`}
              >
                <span>{ev.emoji}</span>
                <span>{ev.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </TopBottomShapeSection>
  );
}
