import React from "react";
import { Lightbulb, Puzzle, Star } from "lucide-react";
import Image from "next/image";
import Heading from "./Headding";

const features = [
  {
    title: "Skill-based Curriculum",
    icon: Puzzle,
    top: "20%",
    left: "8%",
    color: "text-peach-strong",
  },
  {
    title: "Personalised Learning",
    icon: Star,
    top: "48%",
    left: "20%",
    color: "text-skyblue-strong",
  },
  {
    title: "Imaginative Environment",
    icon: Lightbulb,
    top: "74%",
    left: "38%",
    color: "text-pink-strong",
  },
];

const BuildingFoundation: React.FC = () => {
  return (
    <section className="overflow-hidden relative">
      <div className="container relative z-10 max-w-5xl!">

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-start">

          {/* Left Side: Large Hero Image */}
          <div className="relative flex justify-center items-start pt-10 md:pt-26 w-full mx-auto max-w-[230px] md:max-w-[400px] lg:w-auto shrink-0">
            <Image
              src="/images/child-playing-legos.png"
              alt="Child playing legos"
              width={600}
              height={800}
              className="relative z-10 w-full h-auto object-contain object-top drop-shadow-2xl"
            />

            {/* Small decorative floating shapes */}
            <div className="absolute bottom-10 left-0 sm:left-10 w-5 h-5 bg-green-strong rotate-45 z-20 animate-bob"></div>
            <div className="absolute top-20 right-0 sm:right-10 w-4 h-4 bg-pink-strong rounded-full z-20 animate-float"></div>
          </div>

          {/* Right Side: Headline and Flow Line Features */}
          <div className="relative w-full min-w-0">

            {/* Headline */}
            <div className="mb-2 md:mb-4">
              <Heading
                headingText="Building the foundation of a"
                spanText="happy childhood"
                className="justify-start!"
              />
            </div>

            {/* Flow Line Container — SVG path on ALL screen sizes */}
            <div className="relative w-full max-w-[425px] aspect-425/460 mx-auto lg:mx-0 mt-8">

              {/* Inline SVG - the squiggly path */}
              <svg
                viewBox="0 0 425 540"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full text-skyblue-strong absolute inset-0 z-0 opacity-80"
              >
                <path
                  d="M9.52127 0.381348C-13.4794 87.8813 12.5204 112.381 93.5206 169.881C137.169 200.866 123.398 244.924 114.021 282.881C103.521 325.381 151.85 383.114 218.521 392.881C297.021 404.381 315.021 361.881 307.021 348.881C290.521 337.381 267.297 334.381 242.797 356.381C206.58 388.902 183.756 454.067 199.021 474.881C221.021 504.881 289.021 548.381 424.021 535.381"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray="8 8"
                  className="animate-pulse"
                />
              </svg>

              {/* Absolutely positioned feature items along the SVG path */}
              {features.map((item, idx) => (
                <div
                  key={idx}
                  className="absolute flex items-center gap-2 sm:gap-3 md:gap-4 group transform -translate-y-1/2"
                  style={{ top: item.top, left: item.left }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-white rounded-2xl shadow-xl border border-gray-100 flex shrink-0 items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 ${item.color}`} />
                  </div>

                  {/* Label — wraps on mobile, nowrap on larger screens */}
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl px-2 py-1 sm:bg-transparent sm:backdrop-blur-none sm:px-0 sm:py-0 max-w-[90px] sm:max-w-[140px] md:max-w-none">
                    <span className="font-bold text-foreground text-xs sm:text-sm md:text-base lg:text-lg leading-tight sm:whitespace-nowrap">
                      {item.title}
                    </span>
                  </div>
                </div>
              ))}

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default BuildingFoundation;