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

const highlights = [
  { emoji: "🎉", label: "Festivals", sub: "Cultural celebrations", href: "#festivals", bg: "bg-[#FDE9E9]", color: "text-pink-strong" },
  { emoji: "🚌", label: "Field Trips", sub: "Real-world adventures", href: "#field-trips", bg: "bg-[#F1F8EB]", color: "text-green-strong" },
  { emoji: "🎨", label: "Arts & Crafts", sub: "Creative expression", href: "#", bg: "bg-[#EBDCFF]", color: "text-lavender-strong" },
  { emoji: "🎵", label: "Music & Dance", sub: "Rhythm & movement", href: "#", bg: "bg-[#E4F3F7]", color: "text-skyblue-strong" },
  { emoji: "💦", label: "Water Play", sub: "Splash & sensory fun", href: "#", bg: "bg-[#E4F3F7]", color: "text-skyblue-strong" },
  { emoji: "🏺", label: "Pottery", sub: "Clay modeling & crafts", href: "#", bg: "bg-[#FFF6F0]", color: "text-peach-strong" },
];

export default function ActivitiesIntro(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.from(textRef.current, {
      scrollTrigger: { trigger: textRef.current, start: "top 80%", toggleActions: "play none none reverse" },
      y: 60, opacity: 0, duration: 0.9, ease: "power3.out",
    });

    gsap.from(imageRef.current, {
      scrollTrigger: { trigger: imageRef.current, start: "top 80%", toggleActions: "play none none reverse" },
      scale: 0.92, opacity: 0, duration: 0.9, delay: 0.1, ease: "power3.out",
    });

    cardsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none none reverse" },
        scale: 0.7, opacity: 0, duration: 0.5, delay: i * 0.1, ease: "back.out(1.8)",
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 bg-background overflow-hidden">
      {/* Background blobs */}
      <span aria-hidden className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#EBDCFF]/40 blur-3xl" />
      <span aria-hidden className="pointer-events-none absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#E4F3F7]/40 blur-3xl" />

      {/* Floating icons */}
      <div className="absolute top-12 left-[8%] w-14 h-14 opacity-50 animate-float pointer-events-none hidden lg:block">
        <Image src="/icons/rainbow.png" alt="" fill className="object-contain" />
      </div>
      <div className="absolute bottom-16 right-[10%] w-12 h-12 opacity-40 animate-bob pointer-events-none hidden lg:block">
        <Image src="/icons/bee.png" alt="" fill className="object-contain" />
      </div>

      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-16">

          {/* ── Left: Content ── */}
          <div ref={textRef} className="flex-1 flex flex-col gap-6">
            <div className="w-fit px-4 py-1.5 bg-[#EBDCFF] rounded-full text-lavender-strong font-bold text-xs tracking-widest uppercase shadow-sm">
              ✨ Beyond The Classroom
            </div>

            <Heading
              headingText="Activities That"
              spanText="Inspire & Delight"
              className="justify-start!"
            />

            <div className="text-foreground/70 font-medium leading-relaxed text-sm md:text-base max-w-xl space-y-4">
              <p>
                At Whizkids International Jayamahal, this is the part children talk about when they get home.
                The festival they celebrated, the place they visited, and the small things they tried for the first time. These aren’t “extra” activities for us; this is where real learning happens.
              </p>
              <p>
                We don’t rush through them or do them just for the sake of it. We slow down, let children take part, ask questions, enjoy the moment, and make sense of it in their own way.
              </p>
              <p>
                Because when a child experiences something for themselves, it stays. And that’s what really builds confidence, curiosity, and a genuine love for learning.
              </p>
            </div>

            {/* Highlights grid */}
            <div className="grid grid-cols-2 gap-3 mt-2">
              {highlights.map((h, i) => (
                <a
                  key={i}
                  ref={(el) => { cardsRef.current[i] = el; }}
                  href={h.href}
                  className={`${h.bg} rounded-2xl p-4 flex flex-col gap-1.5 shadow-sm hover:-translate-y-1 transition-transform duration-200 cursor-pointer`}
                >
                  <span className="text-2xl">{h.emoji}</span>
                  <span className={`font-black font-display text-sm ${h.color}`}>{h.label}</span>
                  <span className="text-xs text-foreground/55 font-medium">{h.sub}</span>
                </a>
              ))}
            </div>
          </div>

          {/* ── Right: Hero image with decorative badge ── */}
          <div ref={imageRef} className="flex-shrink-0 w-full lg:w-[440px]">
            <div className="relative">
              {/* Spinning dashed ring */}
              <div className="absolute -inset-4 rounded-[3rem] border-2 border-dashed border-[#EBDCFF]/70 animate-spin-slow pointer-events-none" />

              <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
                <Image
                  src="/images/activities-hero.png"
                  alt="Whizkids children enjoying activities"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 440px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg">
                    <div className="w-10 h-10 rounded-full bg-[#EBDCFF] flex items-center justify-center shrink-0 text-xl">
                      🌟
                    </div>
                    <div>
                      <p className="font-black font-display text-foreground text-sm">Holistic Activities</p>
                      <p className="text-xs text-foreground/60 font-medium">Cultural · Experiential · Creative</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-primary text-white rounded-2xl px-4 py-2 shadow-lg animate-bob">
                <p className="font-black font-display text-sm">Every Month</p>
                <p className="text-xs opacity-90">Something New!</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
