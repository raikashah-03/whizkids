"use client"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Apple, BookOpen, Coins, Shield, ShieldAlert, Users } from "lucide-react";
import Link from "next/link";
import React, { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const usps = [
  {
    id: "banking",
    title: "Banking",
    titleSpan: "(Buy & Sell)",
    description: "Teaching early financial literacy through fun, interactive buying and selling role-play.",
    icon: Coins,
    bg: "bg-[#EBDCFF]",
    iconBg: "text-white",
    iconColor: "text-foreground",
    textColor: "text-foreground",
    decoration: "circles",
  },
  {
    id: "good-touch",
    title: "Good Touch",
    titleSpan: "Bad Touch",
    description: "Empowering children with essential body safety awareness in a safe, sensitive environment.",
    icon: Shield,
    bg: "bg-[#E4F3F7]",
    iconBg: "text-white/40",
    iconColor: "text-skyblue-strong",
    textColor: "text-foreground",
    decoration: "wave",
  },
  {
    id: "stranger-activity",
    title: "Stranger",
    titleSpan: "Activity",
    description: "Crucial awareness activities teaching kids how to identify and react to unfamiliar adults.",
    icon: ShieldAlert,
    bg: "bg-lavender-strong",
    iconBg: "text-white/20",
    iconColor: "text-white",
    textColor: "text-white",
    decoration: "dots",
  },
  {
    id: "healthy-food",
    title: "Junk vs",
    titleSpan: "Healthy Food",
    description: "Guiding children to make nutritious choices and understand the impact of what they eat.",
    icon: Apple,
    bg: "bg-[#FFDE59]",
    iconBg: "text-[#FFF3C4]",
    iconColor: "text-foreground",
    textColor: "text-foreground",
    decoration: "circles",
  },
  {
    id: "bedtime-stories",
    title: "No-Screen",
    titleSpan: "Bedtime Stories",
    description: "Fostering imagination and calm routines with engaging, screen-free storytelling.",
    icon: BookOpen,
    bg: "bg-[#FDE9E9]",
    iconBg: "text-white",
    iconColor: "text-[#FF4D8D]",
    textColor: "text-foreground",
    decoration: "wave",
  },
  {
    id: "playdate",
    title: "Fun",
    titleSpan: "Playdates",
    description: "Structured playdates focusing on social skills, sharing, and making lifelong friends.",
    icon: Users,
    bg: "bg-[#EBDCFF]",
    iconBg: "text-white",
    iconColor: "text-foreground",
    textColor: "text-foreground",
    decoration: "dots",
  },
];

// Scalloped starburst background for icons
function ScallopedCircle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M50 2.5 L60 12 L74 9 L77 23 L91 26 L86 39 L96 49 L86 59 L91 72 L77 75 L74 89 L60 86 L50 95.5 L40 86 L26 89 L23 75 L9 72 L14 59 L4 49 L14 39 L9 26 L23 23 L26 9 L40 12 Z" />
    </svg>
  );
}

// Top right decorative elements for each card type
function ConcentricCircles({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      <circle cx="100" cy="0" r="70" stroke="currentColor" strokeWidth="10" />
      <circle cx="100" cy="0" r="50" stroke="currentColor" strokeWidth="10" />
      <circle cx="100" cy="0" r="30" stroke="currentColor" strokeWidth="10" />
      <circle cx="100" cy="0" r="10" stroke="currentColor" strokeWidth="10" />
    </svg>
  );
}

function WaveDecoration({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="currentColor">
      <path d="M0,0 Q25,30 50,0 T100,0 L100,100 Q75,70 50,100 T0,100 Z" />
    </svg>
  );
}

function DotGrid({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="currentColor">
      <pattern id="dots" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
        <circle fill="currentColor" cx="8" cy="8" r="3"></circle>
      </pattern>
      <rect x="0" y="0" width="100" height="100" fill="url(#dots)"></rect>
    </svg>
  );
}

// Individual Cloud Stat component based on the reference design
function CloudStat({ value, label, color, stopColor }: { value: string; label: string; color: string; stopColor: string }) {
  return (
    <div className="usps-stat relative w-full max-w-[200px] aspect-[1.5/1] flex flex-col items-center justify-center drop-shadow-sm">
      <svg
        className={`absolute inset-0 w-full h-full ${color} opacity-90`}
        viewBox="0 0 200 130"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`grad-${label}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor={stopColor} />
          </linearGradient>
        </defs>
        <path
          d="M140.2,95.5 C164.5,95.5 184,76 184,51.7 C184,29.9 166.5,12 144.8,11.2 C134.4,-2.4 114.7,-4 100,6.7 C87.3,-2.8 69.4,0 60.5,12 C44,9.5 28.5,20.8 26.3,37.3 C10.1,40.7 0,55.3 0,72 C0,91.3 15.7,107 35,107 L140.2,107 Z"
          fill={`url(#grad-${label})`}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeOpacity="0.4"
          strokeLinejoin="round"
          transform="translate(8, 10)"
        />
      </svg>
      <div className={`relative z-10 flex flex-col items-center gap-0 mt-4 ${color}`}>
        <span className="text-xs md:text-sm font-black uppercase tracking-widest opacity-80">
          {label}
        </span>
        <span className="text-3xl md:text-4xl font-black font-display tracking-tight">
          {value}
        </span>
      </div>
    </div>
  );
}

export default function UspsSection(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });

    tl.from(".usps-heading", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .from(".usps-tag", {
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "back.out(2)",
      }, "-=0.4")
      .from(".usps-card", {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.4")
      .from(".usps-stat", {
        scale: 0.8,
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
        ease: "back.out(1.5)",
      }, "-=0.4");
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="usps" className="relative z-20 py-16 md:py-24">
      <div className="container max-w-6xl mx-auto px-4">

        {/* ── Section header ── */}
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-16 relative">
          <div className="z-10">
            <h2 className="usps-heading text-4xl md:text-5xl font-medium font-display text-foreground leading-[1.15]">
              What separates us
              <br />
              <span className="text-lavender-strong italic">from the rest</span>
            </h2>
          </div>

          <div className="relative w-full md:w-[350px] h-32 md:h-auto mt-8 md:mt-0 shrink-0 hidden sm:block">
            <div className="usps-tag absolute top-2 right-36 px-5 py-1.5 bg-[#EBDCFF] text-lavender-strong text-sm font-bold rounded-full -rotate-[10deg] shadow-sm tracking-wide">#funny</div>
            <div className="usps-tag absolute top-0 right-10 px-5 py-1.5 bg-[#FFDE59] text-foreground text-sm font-bold rounded-full rotate-[8deg] shadow-sm tracking-wide">#enjoy</div>
            <div className="usps-tag absolute top-14 right-20 px-5 py-1.5 bg-lavender-strong text-white text-sm font-bold rounded-full rotate-[-5deg] shadow-sm tracking-wide">#happy</div>
          </div>
        </div>

        {/* ── USP Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {usps.map((usp) => (
            <Link
              href={`/our-specialty#${usp.id}`}
              key={usp.id}
              className={`usps-card relative rounded-[2.5rem] p-8 md:p-10 flex flex-col gap-8 overflow-hidden
                ${usp.bg}
                md:min-h-[350px]
                shadow-sm hover:shadow-md transition-shadow cursor-pointer block hover:-translate-y-1 transform duration-300`}
            >
              {/* Top Right Decoration */}
              <div className={`absolute top-0 right-0 w-32 h-32 opacity-30 text-white mix-blend-overlay`}>
                {usp.decoration === "circles" && <ConcentricCircles className="w-full h-full" />}
                {usp.decoration === "wave" && <WaveDecoration className="w-full h-full" />}
                {usp.decoration === "dots" && <DotGrid className="w-full h-full" />}
              </div>

              {/* Icon */}
              <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                <ScallopedCircle className={`absolute inset-0 w-full h-full ${usp.iconBg}`} />
                <usp.icon className={`relative z-10 w-6 h-6 ${usp.iconColor}`} />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-3 relative z-10 mt-auto">
                <h3
                  className={`text-3xl md:text-4xl font-black font-display leading-[1.1] ${usp.textColor}`}
                >
                  {usp.title}
                  <br />
                  <span className="italic font-medium">{usp.titleSpan}</span>
                </h3>
                <p className={`text-base font-medium leading-relaxed opacity-90 ${usp.textColor}`}>
                  {usp.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* ── CTA Button ── */}
        <div className="mt-12 flex justify-center">
          <Link href="/our-specialty" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm">
            View All Specialties
          </Link>
        </div>

        {/* ── Bottom stats (Individual Clouds) ── */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 items-center justify-items-center">
          {[
            { value: "1,000+", label: "FAMILIES", color: "text-lavender-strong", stopColor: "#EBDCFF" },
            { value: "6+", label: "YEARS", color: "text-[#FF8A66]", stopColor: "#FFE4E1" },
            { value: "12+", label: "PROGRAMS", color: "text-primary", stopColor: "#FFF3C4" },
            { value: "100%", label: "SAFE", color: "text-lavender-strong", stopColor: "#EBDCFF" },
          ].map((stat, i) => (
            <CloudStat key={i} {...stat} />
          ))}
        </div>

      </div>
    </section>
  );
}
