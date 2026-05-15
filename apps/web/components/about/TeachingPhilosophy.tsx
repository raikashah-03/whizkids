"use client";
import Heading from "@/components/Headding";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const philosophies = [
  {
    title: "Child-Centric Approach",
    description: "Every child is unique. We tailor our teaching methods to accommodate different learning styles, ensuring each child reaches their full potential at their own pace.",
    icon: "🌟",
    color: "bg-peach-light text-peach-strong",
  },
  {
    title: "Play-Based Learning",
    description: "Play is the serious work of childhood. We integrate play into our curriculum to foster cognitive development, problem-solving skills, and social interaction.",
    icon: "🎨",
    color: "bg-skyblue-light text-skyblue-strong",
  },
  {
    title: "Holistic Development",
    description: "We focus on the whole child—nurturing physical, emotional, social, and cognitive growth to build well-rounded and confident individuals.",
    icon: "🌱",
    color: "bg-green-light text-green-strong",
  },
  {
    title: "Active Partnership",
    description: "We believe education is a collaborative journey. We actively partner with parents to ensure a consistent and supportive learning environment home and away.",
    icon: "🤝",
    color: "bg-lavender-light text-lavender-strong",
  }
];

const TeachingPhilosophy = (): React.JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current) return;

    itemsRef.current.forEach((item, index) => {
      if (!item) return;

      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: index % 2 === 0 ? 0 : 0.2, // Stagger effect for items in the same row
      });
    });

  }, { scope: containerRef });

  return (
    <section className="py-16 md:py-24 bg-white" ref={containerRef}>
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="w-fit mx-auto items-center justify-center px-3 py-1.5 bg-pink-light rounded-full text-pink-strong font-bold text-xs tracking-widest uppercase mb-6 shadow-sm">
            Our Approach
          </div>

          <Heading
            headingText="Teaching"
            spanText="Philosophy"
            className="justify-center! mb-3"
            beforeIcon="/icons/pencil.png"
          />

          <p className="text-foreground/70 font-medium max-w-2xl mx-auto">
            We blend traditional values with modern educational research to create a dynamic and effective learning experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {philosophies.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className="flex gap-6 p-8 rounded-[2rem] bg-background shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className={`w-16 h-16 shrink-0 rounded-full flex items-center justify-center text-3xl ${item.color}`}>
                {item.icon}
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold mb-3 text-foreground">
                  {item.title}
                </h3>
                <p className="text-foreground/70 font-medium leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeachingPhilosophy;
