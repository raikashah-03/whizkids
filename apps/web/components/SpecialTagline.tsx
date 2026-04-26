"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import SplitType from "split-type";

import Image from "next/image";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SpecialTagline = (): React.JSX.Element => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const bgShapeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!textRef.current || !sectionRef.current) return;

      // Split the text into characters and words
      const splitText = new SplitType(textRef.current, {
        types: "words,chars",
      });

      // Animate characters
      if (splitText.chars) {
        gsap.from(splitText.chars, {
          opacity: 0.1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 55%",
            end: "top 10%",
            scrub: true,
          },
        });
      }

      // Background Shape Animation: Scaling up and moving to top
      if (bgShapeRef.current) {
        gsap.fromTo(
          bgShapeRef.current,
          {
            y: "50%",
            scale: 0.5,
            opacity: 0
          },
          {
            y: "-10%",
            scale: 1.2,
            opacity: 0.4,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 100%",
              end: "top 20%",
              scrub: true,
            },
          }
        );
      }

      return () => {
        splitText.revert();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="bg-lavender-light flex items-center justify-center h-[65vh] md:h-[70vh] w-full overflow-hidden relative"
    >
      {/* Dynamic Background Shape */}
      <div
        ref={bgShapeRef}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] pointer-events-none z-0"
      >
        <Image
          src="/shapes/top-shape-1.svg"
          alt=""
          fill
          className="object-contain opacity-20 text-lavender-strong"
        />
      </div>

      {/* Playful Floating Elements */}
      <div className="absolute top-10 left-10 w-16 h-16 md:w-24 md:h-24 opacity-40 animate-float pointer-events-none z-10">
        <Image src="/icons/bee.png" alt="" fill className="object-contain" />
      </div>
      <div className="absolute bottom-10 right-10 w-20 h-20 md:w-32 md:h-32 opacity-40 animate-bob pointer-events-none z-10">
        <Image src="/icons/parasuit.png" alt="" fill className="object-contain" />
      </div>
      <div className="absolute top-1/2 right-5 -translate-y-1/2 w-12 h-12 md:w-20 md:h-20 opacity-30 animate-float-slow pointer-events-none z-10">
        <Image src="/icons/pencil.png" alt="" fill className="object-contain" />
      </div>

      <div className="container max-w-4xl mx-auto relative z-10">
        <h2
          ref={textRef}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-display leading-[1.4] text-lavender-strong text-center m-0"
        >
          Every big dream starts with a joyful step. We nurture curiosity,
          inspire imagination, and build a foundation for lifelong learning.
        </h2>
      </div>
    </section>
  );
};

export default SpecialTagline;
