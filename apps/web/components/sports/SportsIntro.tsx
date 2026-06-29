"use client";

import Heading from "@/components/Headding";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Heart, Users, Zap } from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { value: "5+", label: "Sports", icon: Zap, bg: "bg-[#E4F3F7]", color: "text-skyblue-strong" },
  { value: "All", label: "Age Groups", icon: Users, bg: "bg-[#EBDCFF]", color: "text-lavender-strong" },
  { value: "Weekly", label: "Sessions", icon: Heart, bg: "bg-[#FDE9E9]", color: "text-pink-strong" },
  { value: "Certified", label: "Coaches", icon: Award, bg: "bg-[#F1F8EB]", color: "text-green-strong" },
];

export default function SportsIntro(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Content slides in from left
    gsap.from(contentRef.current, {
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      x: -60,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
    });

    // Image slides in from right
    gsap.from(imageRef.current, {
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      x: 60,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
    });

    // Stats pop in with stagger
    statsRef.current.forEach((stat, i) => {
      if (!stat) return;
      gsap.from(stat, {
        scrollTrigger: {
          trigger: stat,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        scale: 0.6,
        opacity: 0,
        duration: 0.6,
        delay: i * 0.1,
        ease: "back.out(1.7)",
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 overflow-hidden bg-background">
      {/* Decorative blobs */}
      <span aria-hidden className="pointer-events-none absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[#E4F3F7]/60 blur-3xl" />
      <span aria-hidden className="pointer-events-none absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-[#F4EEE5]/60 blur-3xl" />

      {/* Floating decorative icons */}
      <div className="absolute top-12 right-[12%] w-14 h-14 opacity-60 animate-float pointer-events-none hidden lg:block">
        <Image src="/icons/star.png" alt="" fill className="object-contain" />
      </div>
      <div className="absolute bottom-16 left-[8%] w-12 h-12 opacity-50 animate-bob pointer-events-none hidden lg:block">
        <Image src="/icons/cloud-1.png" alt="" fill className="object-contain" />
      </div>

      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* ── Left: Content ── */}
          <div ref={contentRef} className="flex-1 flex flex-col gap-6">
            {/* Label pill */}
            <div className="w-fit px-4 py-1.5 bg-[#E4F3F7] rounded-full text-skyblue-strong font-bold text-xs tracking-widest uppercase shadow-sm">
              Meet Our Team
            </div>

            <Heading
              headingText="Led by a Passionate"
              spanText="Sports Coach"
              className="justify-start!"
            />

            <p className="text-foreground/70 font-medium leading-relaxed text-base md:text-lg max-w-xl">
              At Whizkids, our dedicated sports coach brings energy, warmth, and expertise to every session.
              With a background in child fitness and development, our coach tailors every activity to be
              age-appropriate, safe, and above all — fun! Children don't just play; they build confidence,
              discipline, and a lifelong love for being active.
            </p>

            <div className="flex flex-col gap-2 mt-2">
              {[
                "Certified in Early Childhood Physical Education",
                "Trained in Gymnastics, Yoga & Martial Arts",
                "Specialised in age-appropriate motor skill development",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#E4F3F7] flex items-center justify-center shrink-0">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2 2 4-4" stroke="#29BFDF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-foreground/70 font-medium text-sm md:text-base">{item}</span>
                </div>
              ))}
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  ref={(el) => { statsRef.current[i] = el; }}
                  className={`${stat.bg} rounded-2xl p-4 flex flex-col items-center text-center gap-1 shadow-sm`}
                >
                  <stat.icon className={`w-5 h-5 ${stat.color} mb-1`} />
                  <span className={`text-xl font-black font-display ${stat.color}`}>{stat.value}</span>
                  <span className="text-xs font-bold text-foreground/60 uppercase tracking-wide">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Coach Image ── */}
          <div ref={imageRef} className="flex-shrink-0 w-full lg:w-[420px]">
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute -inset-4 rounded-[3rem] border-2 border-dashed border-[#29BFDF]/30 animate-spin-slow pointer-events-none" />

              {/* Main image frame */}
              <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
                <Image
                  src="/images/sports-coach.png"
                  alt="Whizkids Sports Coach"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 420px"
                />
                {/* Gradient overlay at bottom */}
                <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
                {/* Name badge */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg">
                    <div className="w-10 h-10 rounded-full bg-[#E4F3F7] flex items-center justify-center shrink-0">
                      <Award className="w-5 h-5 text-skyblue-strong" />
                    </div>
                    <div>
                      <p className="font-black font-display text-foreground text-sm">Sports Coach</p>
                      <p className="text-xs text-foreground/60 font-medium">Certified Physical Educator</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge top-right */}
              <div className="absolute -top-4 -right-4 bg-primary text-white rounded-2xl px-4 py-2 shadow-lg animate-bob">
                <p className="font-black font-display text-sm">14+ Years</p>
                <p className="text-xs opacity-90">of Excellence</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
