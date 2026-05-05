/**
 * SummerCampSection (Server Component)
 *
 * Displays the Whizkids Summer Camp service with rich copy, activity highlights,
 * and a CTA that opens the global inquiry modal via <InquireButton>.
 */

import summerCampImg from "@/public/images/programs/summercamp.png";
import { Music, Palette, Sun } from "lucide-react";
import Image from "next/image";
import Heading from "../Headding";

const activities = [
  { icon: Palette, title: "Creative Arts" },
  { icon: Music, title: "Music & Fun" },
  { icon: Sun, title: "Outdoor Fun" },
];

export default function SummerCampSection(): React.JSX.Element {
  return (
    <section
      id="summer-camp"
      className="relative overflow-hidden"
    >

      <div className="container relative p-12 md:p-18 bg-skyblue rounded-3xl overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <svg
            className="absolute -top-24 -left-24 w-96 h-96 opacity-20 text-skyblue-strong"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              opacity={0.5}
              d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.5,81.4,29,73.1,41.4C64.8,53.8,53.8,64.1,40.7,71.4C27.6,78.7,13.8,83,0.4,82.3C-13,81.6,-26.1,75.9,-38.3,68.2C-50.5,60.5,-61.9,50.8,-70.2,38.8C-78.5,26.8,-83.7,13.4,-84.6,-0.5C-85.5,-14.4,-82.1,-28.8,-74.6,-41.8C-67.1,-54.8,-55.5,-66.4,-42.2,-74.1C-28.9,-81.8,-14.4,-85.6,0.3,-86.1C15,-86.6,30.5,-83.6,44.7,-76.4Z"
              transform="translate(100 100)"
            />
          </svg>
          <svg
            className="absolute -bottom-24 -right-24 w-[500px] h-[500px] opacity-10 text-skyblue-strong animate-spin-slow"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              opacity={0.5}
              d="M36.7,-64.4C47.7,-57.4,56.9,-48.5,64.1,-37.9C71.3,-27.3,76.5,-15.1,77.5,-2.5C78.5,10.1,75.4,23.1,68.3,34.1C61.2,45.1,50.1,54.1,38.2,61.4C26.3,68.7,13.2,74.3,-0.1,74.5C-13.4,74.7,-26.8,69.5,-38.4,61.7C-50,53.9,-59.8,43.5,-66.6,31.6C-73.4,19.7,-77.2,6.3,-76.5,-6.9C-75.8,-20.1,-70.6,-33.1,-62,-44.1C-53.4,-55.1,-41.4,-64.1,-29,-69.3C-16.6,-74.5,-3.8,-75.9,8,-77.3C19.8,-78.7,30.3,-80.1,36.7,-64.4Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">

          {/* ── Image side — first in DOM = top on mobile, right on desktop (reversed) ── */}
          <div className="w-full lg:w-2/5">
            <div className="relative group">
              <div className="absolute inset-0 bg-skyblue-strong/20 rounded-[4rem] rotate-6 group-hover:rotate-3 transition-transform duration-500" />
              <div className="relative rounded-[4rem] overflow-hidden aspect-square shadow-2xl z-10 border-4 border-white">
                <Image
                  src={summerCampImg}
                  alt="Children enjoying summer camp activities"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              {/* Floating star */}
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-white rounded-full shadow-2xl flex items-center justify-center animate-bob z-20">
                <Image
                  src="/icons/star.png"
                  alt=""
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* ── Content side — left on desktop ── */}
          <div className="w-full lg:w-3/5">
            <div className="flex flex-col gap-6">
              {/* Eyebrow + heading */}
              <div className="flex flex-col gap-3">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-skyblue-strong w-fit shadow-sm border border-skyblue-strong/20">
                  <Sun className="w-4 h-4 fill-current" />
                  <span className="text-xs font-black uppercase tracking-wider">
                    Summer Adventures
                  </span>
                </div>

                <div>
                  <Heading
                    headingText="Unforgettable"
                    spanText="Summer Camp"
                    afterHeadingText="Fun!"
                  />
                </div>
              </div>

              {/* Body copy */}
              <div className="space-y-6 text-gray-700 font-medium">
                <p className="mid-text leading-relaxed">
                  Get ready for a summer like no other! Our Whizkids Summer Camp is
                  a vibrant hub of creativity, exploration, and pure joy. We believe
                  that summer is the perfect time for children to step outside their
                  comfort zones, discover new passions, and build lasting friendships
                  in a safe and supportive environment.
                </p>
                <p className="mid-text leading-relaxed">
                  From messy art projects and rhythmic music workshops to hands-on
                  science experiments and outdoor nature walks, our weekly themed
                  activities are designed to spark curiosity and keep bodies moving.
                </p>
              </div>

              {/* Activity icons */}
              <div className="flex flex-wrap gap-8 py-6 border-y border-skyblue-strong/10">
                {activities.map(({ icon: Icon, title }) => (
                  <div key={title} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-skyblue-strong shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-lg font-black text-gray-900">{title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
      {/* Layered organic blob shapes */}



    </section>
  );
}
