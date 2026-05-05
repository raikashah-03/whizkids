"use client";

/**
 * HeroBanner — Client Component
 *
 * Features:
 * - GSAP Parallax scroll on banner images, blobs & clouds
 * - Wave entrance animation on each heading character (GSAP + SplitType)
 * - Top-left banner image + bottom-right banner image
 * - Parallax clouds at the bottom covering the area
 * - All colours from global CSS tokens
 */

import InquireButton from "@/components/InquireButton";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import SplitType from "split-type";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Shared wavy-underline path ───────────────────────────────────────────────
const WAVY_PATH =
  "M56.3587 42.3257L4.8587 70.8257C-7.5413 87.6256 6.69203 87.4923 15.3587 85.3257C15.3587 85.3257 64.8587 41.3257 96.3587 44.8257C114.359 46.8257 112.359 68.3257 143.359 61.3257C191.244 44.865 206.359 33.0431 222.359 35.8257C236.359 38.2605 251.359 48.3257 287.859 31.3257C331.859 6.82568 361.859 15.3257 365.359 12.8258C368.159 10.8259 372.859 7.32587 374.859 5.82582C361.192 0.159158 326.259 -6.37418 295.859 12.8258C265.459 32.0258 234.192 26.8258 222.359 21.8258C192.859 21.8258 143.359 54.8257 127.859 48.3257C100.259 22.7257 68.692 33.659 56.3587 42.3257Z";

export default function HeroBanner(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const pillBadgeRef = useRef<HTMLDivElement>(null);

  const imgLeftRef = useRef<HTMLDivElement>(null);
  const imgRightRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Avoid running on server
      if (!sectionRef.current) return;

      // 1. Split Text Animations
      // Safely split text targets inside the heading to preserve SVGs
      const splitHeadingElements = headingRef.current?.querySelectorAll(".split-target");
      let splitHeading: SplitType | null = null;
      let splitText: SplitType | null = null;

      const tl = gsap.timeline();

      if (splitHeadingElements && splitHeadingElements.length > 0) {
        splitHeading = new SplitType(splitHeadingElements as any, { types: "words,chars" });
        tl.from(splitHeading.chars, {
          opacity: 0,
          y: 40,
          rotateX: -90,
          stagger: 0.015,
          duration: 0.5,
          ease: "back.out(1.5)",
        });
      }

      if (textRef.current) {
        splitText = new SplitType(textRef.current, { types: "words,chars" });
        tl.from(
          splitText.chars,
          {
            opacity: 0,
            y: 10,
            stagger: 0.005,
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.3"
        );
      }

      if (badgeRef.current) {
        tl.from(
          badgeRef.current,
          {
            opacity: 0,
            scale: 0.5,
            duration: 0.4,
            ease: "back.out(2)",
          },
          0 // start at the beginning of timeline
        );
      }

      if (pillBadgeRef.current) {
        tl.from(
          pillBadgeRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.4,
            ease: "back.out(2)",
          },
          0
        );
      }

      if (buttonsRef.current) {
        tl.from(
          buttonsRef.current.children,
          {
            opacity: 0,
            scale: 0.8,
            y: 15,
            stagger: 0.1,
            duration: 0.4,
            ease: "back.out(1.5)",
          },
          "-=0.2"
        );
      }

      // 2. Parallax Animations
      // Images move up faster than normal scroll
      if (imgLeftRef.current) {
        gsap.to(imgLeftRef.current, {
          y: -150,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (imgRightRef.current) {
        gsap.to(imgRightRef.current, {
          y: -250,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Blobs subtly move down to create depth
      if (blobRef.current) {
        gsap.to(blobRef.current, {
          y: 80,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Clouds Parallax - move slower or faster than scroll
      if (cloudsRef.current) {
        const clouds = cloudsRef.current.children;
        gsap.utils.toArray(clouds).forEach((cloud: any, i) => {
          // positive y = moves slower than scroll (appears to stick)
          // negative y = moves faster than scroll (rises up)
          const yMove = i % 2 === 0 ? 120 + (i * 15) : -60 - (i * 10);
          gsap.to(cloud, {
            y: yMove,
            x: (i % 2 === 0 ? 15 : -15),
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      }

      return () => {
        if (splitHeading) splitHeading.revert();
        if (splitText) splitText.revert();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex items-center overflow-x-clip overflow-y-visible bg-background"
    >
      {/* ── Background blobs (subtle parallax) ── */}
      <div
        ref={blobRef}
        className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-lavender rounded-full blur-3xl opacity-60 pointer-events-none"
      />
      <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-peach rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[200px] h-[200px] bg-skyblue rounded-full blur-2xl opacity-30 pointer-events-none" />

      {/* ── Concentric circle decoration ── */}
      <div className="absolute left-[5%] bottom-[15%] opacity-25 pointer-events-none">
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="40" stroke="var(--lavender-bright)" strokeWidth="4" />
          <circle cx="50" cy="50" r="28" stroke="var(--lavender-bright)" strokeWidth="4" />
          <circle cx="50" cy="50" r="16" stroke="var(--lavender-bright)" strokeWidth="4" />
          <circle cx="50" cy="50" r="4" fill="var(--lavender-bright)" />
        </svg>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────
          MAIN CONTENT
      ───────────────────────────────────────────────────────────────────── */}
      <div className="container relative z-20 flex flex-col items-center gap-8 md:gap-12 mt-[90px]">

        {/* Desktop: Top-left image (Absolute to container) */}
        <div
          ref={imgLeftRef}
          className="absolute top-14 left-0 xl:-left-12 w-[180px] lg:w-[240px] pointer-events-none select-none z-10 hidden md:block"
        >
          <Image
            src="/images/banner-left-top.png"
            alt="Child learning"
            width={400}
            height={500}
            className="w-full h-auto object-contain drop-shadow-2xl"
            priority
          />
        </div>

        {/* Desktop: Bottom-right image (Absolute to container) */}
        <div
          ref={imgRightRef}
          className="absolute bottom-10 right-0 xl:-right-12 w-[160px] lg:w-[210px] pointer-events-none select-none z-10 hidden md:block"
        >
          <Image
            src="/images/banner-right-bottom-image.png"
            alt="Child playing"
            width={400}
            height={500}
            className="w-full h-auto object-contain drop-shadow-2xl"
            priority
          />
        </div>

        {/* Mobile: Images in relative flow */}
        <div className="flex md:hidden items-end justify-center gap-2 w-full px-2 mt-2">
          <div className="w-[160px] sm:w-[200px] relative z-10 pointer-events-none select-none drop-shadow-xl -rotate-2">
            <Image
              src="/images/banner-left-top.png"
              alt="Child learning"
              width={400}
              height={500}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
          <div className="w-[150px] sm:w-[190px] relative z-10 pointer-events-none select-none drop-shadow-xl mb-4 rotate-2">
            <Image
              src="/images/banner-right-bottom-image.png"
              alt="Child playing"
              width={400}
              height={500}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 lg:gap-8 z-20 relative px-4 md:px-20 lg:px-40">
          {/* Pill badge */}
          <div
            ref={pillBadgeRef}
            className="inline-flex items-center justify-center text-center gap-2 px-5 py-2 rounded-[2rem] md:rounded-full bg-peach border border-peach-strong/20 text-peach-strong font-black text-[10px] md:text-xs uppercase tracking-[0.15em] shadow-sm mb-2 max-w-[280px] md:max-w-none"
          >
            <span className="hidden md:inline-block w-2 h-2 shrink-0 rounded-full bg-peach-strong" />
            <span>Whizkids International Preschool</span>
          </div>

          {/* Swirly Arrow pointing to heading */}
          <div className="absolute top-24 left-0 md:-left-10 lg:-left-20 w-20 h-20 pointer-events-none hidden md:block opacity-60">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 80 Q 20 20, 90 70" stroke="var(--lavender-strong)" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M 75 75 L 90 70 L 80 55" stroke="var(--lavender-strong)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>

          {/* Rotating Badge Top Right */}
          <div
            ref={badgeRef}
            className="absolute -top-10 right-0 md:-right-10 lg:-right-24 w-28 h-28 md:w-36 md:h-36 z-20 pointer-events-none hidden md:block"
          >
            <div className="relative w-full h-full animate-[spin_12s_linear_infinite]">
              <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible opacity-80">
                <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
                <text fill="currentColor" className="text-[12px] md:text-[13px] font-bold tracking-[0.15em] uppercase text-foreground">
                  <textPath href="#circlePath" startOffset="0%">
                    WHIZKIDS PRESCHOOL • WHIZKIDS PRESCHOOL •
                  </textPath>
                </text>
              </svg>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#FFD666] rounded-full flex items-center justify-center relative shadow-sm">
                <div className="w-3.5 h-3.5 bg-lavender-strong rounded-tl-[10px] rounded-br-[3px] rounded-tr-[3px] rounded-bl-[3px] absolute top-2 md:top-3.5 left-2 md:left-3.5"></div>
                <div className="w-3.5 h-3.5 bg-lavender-strong rounded-tr-[10px] rounded-br-[3px] rounded-tl-[3px] rounded-bl-[3px] absolute top-2 md:top-3.5 right-2 md:right-3.5"></div>
                <div className="w-3.5 h-3.5 bg-lavender-strong rounded-bl-[10px] rounded-br-[3px] rounded-tr-[3px] rounded-tl-[3px] absolute bottom-2 md:bottom-3.5 left-2 md:left-3.5"></div>
                <div className="w-3.5 h-3.5 bg-lavender-strong rounded-br-[10px] rounded-bl-[3px] rounded-tr-[3px] rounded-tl-[3px] absolute bottom-2 md:bottom-3.5 right-2 md:right-3.5"></div>
              </div>
            </div>
          </div>

          {/* ── Headline — wave entrance ── */}
          <div ref={headingRef} className="flex flex-col items-center gap-1 perspective-midrange">
            {/* Line 1 */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-light text-foreground font-display leading-[1.09] split-target text-center md:text-start">
              The best place to
            </h1>

            {/* Line 2 — learn + and + play */}
            <div className="flex flex-wrap items-baseline justify-center gap-x-4 gap-y-1 mt-1">
              {/* "learn" with lavender underline */}
              <span className="text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-light font-display text-lavender-strong italic leading-[1.2] relative inline-block">
                <span className="split-target inline-block">learn</span>
                <svg
                  className="absolute -bottom-5 left-0 w-full h-10"
                  viewBox="0 0 375 87"
                  fill="none"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d={WAVY_PATH} fill="var(--lavender-bright)" opacity="0.5" />
                </svg>
              </span>

              <span className="text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-light font-display text-foreground leading-[1.09] split-target">
                and
              </span>

              {/* "play" with primary underline */}
              <span className="relative inline-block text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-light font-display text-primary italic leading-[1.2]">
                <span className="split-target inline-block">play</span>
                <svg
                  className="absolute -bottom-5 left-0 w-full h-10"
                  viewBox="0 0 375 87"
                  fill="none"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d={WAVY_PATH} fill="var(--primary-color)" opacity="0.45" />
                </svg>
              </span>
            </div>

            {/* Line 3 */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-light text-foreground font-display leading-[1.09] split-target mt-1">
              for kids
            </h1>
          </div>

          {/* Subtext */}
          <p
            ref={textRef}
            className="mid-text text-foreground/60 text-center leading-relaxed max-w-[600px] mt-4"
          >
            Discover a nurturing world of fun and interactive learning activities
            designed to support your child&apos;s growth, creativity, and
            confidence every single day.
          </p>

          {/* CTAs */}
          <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center gap-4 mt-6">
            <div className="inline-block">
              <InquireButton
                programTitle="General Admission"
                className="inline-flex items-center gap-4 pl-8 pr-2 py-2 rounded-full bg-lavender-strong text-white font-bold text-lg shadow-2xl shadow-lavender-strong/30 transition-all hover:brightness-110 hover:-translate-y-1 active:scale-95"
              >
                Get started
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <ArrowUpRight className="w-5 h-5 text-lavender-strong" />
                </div>
              </InquireButton>
            </div>
            <div className="inline-block">
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-foreground/10 text-foreground font-bold text-lg hover:border-lavender-strong hover:text-lavender-strong transition-all"
              >
                View Programs
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────
          BOTTOM PARALLAX CLOUDS
      ───────────────────────────────────────────────────────────────────── */}
      <div
        ref={cloudsRef}
        className="absolute bottom-0 left-0 w-full h-[200px] md:h-[300px] pointer-events-none z-0 flex items-end justify-between"
      >
        <div className="absolute -bottom-10 -left-10 w-[25%] md:w-[20%] opacity-100">
          <Image src="/icons/cloud-1.png" alt="" width={400} height={200} className="w-full h-auto" />
        </div>
        <div className="absolute bottom-5 left-[25%] w-[15%] md:w-[12%] opacity-90">
          <Image src="/icons/cloud-2.png" alt="" width={300} height={150} className="w-full h-auto" />
        </div>
        <div className="absolute -bottom-5 left-[45%] w-[30%] md:w-[20%] opacity-100">
          <Image src="/icons/cloud-1.png" alt="" width={500} height={250} className="w-full h-auto" />
        </div>
        <div className="absolute bottom-10 right-[25%] w-[20%] md:w-[15%] opacity-95">
          <Image src="/icons/cloud-2.png" alt="" width={250} height={125} className="w-full h-auto" />
        </div>
        <div className="absolute -bottom-15 -right-10 w-[35%] md:w-[25%] opacity-100">
          <Image src="/icons/cloud-1.png" alt="" width={600} height={300} className="w-full h-auto" />
        </div>
      </div>
    </section>
  );
}
