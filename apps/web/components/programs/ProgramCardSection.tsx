/**
 * ProgramCardSection (Server Component)
 *
 * Renders a single academic program section (Playgroup, Nursery, JR KG, SR KG).
 * Uses <InquireButton> (client) for the CTA so the section itself stays server-rendered.
 */

import InquireButton from "@/components/InquireButton";
import MaskedImage from "@/components/MaskedImage";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

interface ProgramSection {
  id: string;
  title: string;
  age: string;
  description: string;
  curriculum: readonly string[];
  image: any;
  mask: string;
  bgColor: string;
  accentColor: string;
  fillColor: string;
  stage: number; // 1-based index
}

export default function ProgramCardSection({
  id,
  title,
  age,
  description,
  curriculum,
  image,
  mask,
  bgColor,
  accentColor,
  fillColor,
  stage,
}: ProgramSection): React.JSX.Element {
  const isEven = stage % 2 !== 0; // stage 1, 3 → normal; 2, 4 → reversed

  return (
    <section
      id={id}
      className={`py-20 md:py-32 scroll-mt-24 ${bgColor} relative overflow-hidden`}
    >
      {/* Top decorative bubbles */}
      <div
        className="absolute top-0 left-0 w-full h-[35px] opacity-20"
        style={{
          backgroundImage: "url('/shapes/top-bubble-shape.svg')",
          backgroundRepeat: "repeat-x",
          backgroundSize: "auto 100%",
        }}
      />

      <div className="container relative z-10">
        <div
          className={`flex flex-col md:flex-row items-center gap-12 lg:gap-20 ${isEven ? "" : "md:flex-row-reverse"
            }`}
        >
          {/* ── Image side ── */}
          <div className="w-full md:w-5/12 relative">
            <div className="relative z-10 w-full max-w-[450px] mx-auto">
              <MaskedImage
                image={image.src}
                maskImage={mask}
                className="w-full aspect-square drop-shadow-2xl z-10"
              />

              {/* Blob background */}
              <div className="absolute inset-0 mt-10 opacity-30 z-0 scale-110">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  viewBox="0 0 173 147"
                  fill="none"
                  className="w-full h-auto max-w-[450px] md:max-w-none"
                >
                  <path
                    d="M3.36949 82.4073C-5.03051 57.2073 5.20296 15.2405 14.3696 18.9072C15.8696 13.5738 20.3491 17.0439 27.3695 4.4077C34.8696 -9.09197 54.3695 14.9075 81.3695 11.4075C108.37 7.90753 170.87 -7.09283 152.87 18.9072C134.87 44.9072 167.369 51.9074 170.869 63.9074C174.369 75.9074 168.869 69.9074 144.369 98.4074C119.869 126.907 198.87 75.9073 144.369 142.907C135.903 153.315 125.869 134.907 99.8694 126.407C73.8694 117.907 46.7234 154.674 29.8694 142.907C3.36949 124.407 31.8695 115.907 27.3695 98.4074C22.8695 80.9074 13.8695 113.907 3.36949 82.4073Z"
                    fill={fillColor}
                  />
                </svg>
              </div>

              {/* Floating decorative icons */}
              <div className="absolute -top-10 -left-10 w-16 h-16 animate-float z-20 pointer-events-none opacity-80">
                <Image
                  src={isEven ? "/icons/bee.png" : "/icons/cloud-1.png"}
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              <div
                className="absolute -bottom-10 -left-10 w-14 h-14 animate-bob z-20 pointer-events-none opacity-80"
                style={{ animationDelay: "1.5s" }}
              >
                <Image
                  src={isEven ? "/icons/pencil.png" : "/icons/star.png"}
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              <div
                className="absolute top-10 -right-10 w-12 h-12 animate-drift z-20 pointer-events-none opacity-70 hidden md:block"
                style={{ animationDelay: "2.5s" }}
              >
                <Image
                  src="/icons/cloud-2.png"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>

              {/* Age badge */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-3xl shadow-xl p-6 border border-gray-50 z-20 animate-bob">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">
                    Target Age
                  </span>
                  <span className={`text-xl font-black ${accentColor}`}>{age}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Content side ── */}
          <div className="w-full md:w-7/12">
            <div className="flex flex-col gap-6 md:gap-8">
              <div className="flex flex-col gap-2">
                <span className={`text-sm font-black uppercase tracking-[0.2em] ${accentColor}`}>
                  Stage {stage}
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight font-display italic">
                  {title}
                </h2>
              </div>

              <p className="mid-text text-gray-600 leading-relaxed font-medium">
                {description}
              </p>

              <div className="flex flex-col gap-4">
                <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest">
                  Curriculum Focus
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {curriculum.map((item) => (
                    <div key={item} className="flex items-start gap-2.5 group">
                      <CheckCircle2
                        className={`w-5 h-5 shrink-0 mt-0.5 ${accentColor} opacity-70`}
                      />
                      <span className="font-bold text-gray-700 group-hover:text-gray-900 transition-colors">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <InquireButton
                  programTitle={title}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-white font-bold text-base shadow-[0_4px_16px_rgba(253,169,36,0.2)] transition-all duration-200 hover:shadow-[0_6px_22px_rgba(253,169,36,0.45)] hover:-translate-y-0.5 active:scale-95"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative bubbles */}
      <div
        className="absolute bottom-0 left-0 w-full h-[35px] opacity-10"
        style={{
          backgroundImage: "url('/shapes/bottom-bubble-shape.svg')",
          backgroundRepeat: "repeat-x",
          backgroundSize: "auto 100%",
        }}
      />
    </section>
  );
}
