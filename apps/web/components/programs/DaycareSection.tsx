/**
 * DaycareSection (Server Component)
 *
 * Displays the Whizkids Daycare service with rich copy, feature highlights,
 * and a CTA that opens the global inquiry modal via <InquireButton>.
 *
 * Design mirrors SummerCampSection: rounded card, blob decorations,
 * content left / image right, no image animation.
 */

import Heading from "@/components/Headding";
import InquireButton from "@/components/InquireButton";
import daycareImg from "@/public/images/programs/daycare.png";
import { Clock, Heart, ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";

const features = [
  { icon: ShieldCheck, title: "Safe Environment" },
  { icon: Heart, title: "Dedicated Care" },
  { icon: Clock, title: "Extended Hours" },
];

export default function DaycareSection(): React.JSX.Element {
  return (
    <section id="daycare" className="relative overflow-hidden">

      <div className="container relative p-12 md:p-18 bg-peach rounded-3xl overflow-hidden">

        {/* ── Blob decorations (mirrors SummerCamp style) ── */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          {/* Top-right blob */}
          <svg
            className="absolute -top-24 -right-24 w-96 h-96 opacity-20 text-primary"
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
          {/* Bottom-left spinning blob */}
          <svg
            className="absolute -bottom-24 -left-24 w-[500px] h-[500px] opacity-10 text-peach-strong animate-spin-slow"
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

        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* ── Image side — first in DOM = top on mobile, left on desktop ── */}
          <div className="w-full lg:w-2/5">
            <div className="relative group">
              {/* Tilted background plate */}
              <div className="absolute inset-0 bg-primary/20 rounded-[4rem] rotate-6 group-hover:rotate-3 transition-transform duration-500" />
              {/* Image */}
              <div className="relative rounded-[4rem] overflow-hidden aspect-square shadow-2xl z-10 border-4 border-white">
                <Image
                  src={daycareImg}
                  alt="Children in daycare at Whizkids"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              {/* Floating heart badge */}
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-white rounded-full shadow-2xl flex items-center justify-center z-20">
                <Heart className="w-10 h-10 text-primary fill-primary" />
              </div>
            </div>
          </div>

          {/* ── Content side — right on desktop ── */}
          <div className="w-full lg:w-3/5">
            <div className="flex flex-col gap-6">

              {/* Eyebrow + heading */}
              <div className="flex flex-col gap-3">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-primary w-fit shadow-sm border border-primary/20">
                  <Sparkles className="w-4 h-4 fill-current" />
                  <span className="text-xs font-black uppercase tracking-wider">
                    Daycare
                  </span>
                </div>

                <div>
                  <Heading
                    headingText="A Safe Haven for"
                    spanText="Little Ones"
                  />
                </div>
              </div>

              {/* Body copy */}
              <div className="space-y-6 text-gray-700 font-medium">
                <p className="mid-text leading-relaxed">
                  At Whizkids, our daycare program is more than just a supervision
                  service — it is a warm, nurturing extension of your home. We
                  understand that the early months and years are critical for a
                  child&apos;s development, which is why our dedicated caregivers focus
                  on building strong emotional bonds and providing personalized
                  attention to every little one.
                </p>
                <p className="mid-text leading-relaxed">
                  Our state-of-the-art facility is strictly child-proofed and
                  monitored to ensure the highest standards of safety and hygiene.
                  We provide a stimulating environment filled with age-appropriate
                  activities that encourage sensory exploration and cognitive growth.
                </p>
              </div>

              {/* Features — mirrors activity icon row */}
              <div className="flex flex-wrap gap-8 py-6 border-y border-primary/10">
                {features.map(({ icon: Icon, title }) => (
                  <div key={title} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-lg font-black text-gray-900">{title}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-2">
                <InquireButton
                  programTitle="Daycare"
                  className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-primary text-white font-bold text-lg shadow-xl shadow-primary/20 transition-all hover:brightness-105 hover:-translate-y-0.5 active:scale-95"
                />
              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
