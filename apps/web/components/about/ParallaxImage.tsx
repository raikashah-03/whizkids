"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import React, { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ParallaxImage = (): React.JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !imageRef.current) return;

    gsap.fromTo(
      imageRef.current,
      { y: "-20%" },
      {
        y: "20%",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        ease: "none",
      }
    );
  }, { scope: containerRef });

  return (

    <div className="container mx-auto px-0!">
      <div
        ref={containerRef}
        className="relative w-full h-[300px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl"
      >
        <Image
          ref={imageRef}
          src="/images/testimonials-hero.jpg" // Using an existing image as placeholder
          alt="Children engaged in playful learning"
          fill
          priority
          className="object-cover absolute left-0 w-full h-[140%] -top-[20%]"
          sizes="(max-width: 768px) 100vw, 80vw"
        />
        {/* Overlay to ensure the image looks good and text could potentially be added later */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none rounded-[3rem]"></div>
      </div>
    </div>

  );
};

export default ParallaxImage;
