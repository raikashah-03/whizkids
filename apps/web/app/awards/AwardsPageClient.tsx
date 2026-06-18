"use client";

import CtaSection from "@/components/CtaSection";
import { AWARDS } from "@/config/awards";
import { motion } from "framer-motion";
import { Calendar, Landmark, Trophy } from "lucide-react";
import Image from "next/image";
import React from "react";

const AwardsPageClient = (): React.JSX.Element => {
  return (
    <main className="min-h-screen bg-white">
      {/* Dynamic styles for animating gradients */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animating-gradient-0 {
          background: linear-gradient(135deg, #FFF6F0 0%, #FFFFFF 50%, #FFF0E6 100%);
          background-size: 200% 200%;
          animation: gradientShift 10s ease infinite;
        }
        .animating-gradient-1 {
          background: linear-gradient(135deg, #E4F3F7 0%, #FFFFFF 50%, #D5EFF5 100%);
          background-size: 200% 200%;
          animation: gradientShift 10s ease infinite;
        }
        .animating-gradient-2 {
          background: linear-gradient(135deg, #F9F3FF 0%, #FFFFFF 50%, #EFE3FF 100%);
          background-size: 200% 200%;
          animation: gradientShift 10s ease infinite;
        }
      `}} />

      {/* ── Custom Gradient Header ── */}
      <section className="relative pb-20  md:pb-28 bg-gradient-to-br from-[#FFF6F0] via-white to-[#E4F3F7] overflow-hidden">
        {/* Floating circles/blobs */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-peach-strong/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#29BFDF]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container max-w-5xl pt-[70px] mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            {/* Elegant Icon Badge */}
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 shadow-sm">
              <Trophy className="w-6 h-6" />
            </div>

            <span className="text-xs font-black uppercase tracking-[0.25em] text-primary mb-3">
              Whizkids Jayamahal
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight font-display italic mb-6">
              Awards We <span className="text-primary not-italic">Received</span>
            </h1>

            <p className="text-gray-600 font-semibold max-w-2xl text-base md:text-lg leading-relaxed">
              Every recognition is a beautiful milestone reflecting our deep commitment to nurturing young minds and creating a second home for your child.
            </p>
          </motion.div>
        </div>

        {/* Decorative Bottom Wave */}
        <div className="absolute bottom-0 left-0 w-full h-8 bg-white" style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }} />
      </section>

      {/* ── Awards Detailed List ── */}
      <div className="flex flex-col">
        {AWARDS.map((award, index) => {
          const isEven = index % 2 === 0;

          return (
            <section
              key={award.id}
              id={award.id}
              className={`w-full py-24 md:py-36 relative overflow-hidden border-b border-gray-100/30 scroll-mt-24 animating-gradient-${index % 3}`}
            >
              {/* Floating blur shapes inside sections */}
              <div className="absolute top-1/4 left-5 w-48 h-48 bg-white/30 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-1/4 right-5 w-64 h-64 bg-white/20 rounded-full blur-3xl pointer-events-none" />

              <div className="container max-w-5xl mx-auto px-4 relative z-10">
                <div className={`flex flex-col md:flex-row items-center gap-12 md:gap-20 ${isEven ? "" : "md:flex-row-reverse"
                  }`}>
                  {/* Images Column (Scroll animation from left or right) */}
                  <motion.div
                    className="w-full md:w-1/2 relative flex justify-center pb-8 md:pb-12"
                    initial={{ opacity: 0, scale: 0.92, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    {award.image && award.receivingImage ? (
                      /* Overlapping Layout */
                      <div className="relative w-[78%] max-w-[320px] mr-8 mb-8 md:mr-12 md:mb-12">
                        {/* Main: Receiving Ceremony Image (Square, reduced size) */}
                        <div className="relative aspect-square w-full rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100/50 bg-[#FAFAFC] z-10">
                          <Image
                            src={award.receivingImage}
                            alt={`${award.title} Ceremony`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>

                        {/* Floating: Trophy Image (Increased size, white border) */}
                        <div className="absolute bottom-0 right-0 w-32 h-32 md:w-44 md:h-44 rounded-[1.75rem] bg-white shadow-[0_15px_40px_rgb(0,0,0,0.12)] border-4 border-white overflow-hidden flex items-center justify-center translate-x-1/4 translate-y-1/4 z-20 group hover:scale-[1.03] transition-transform duration-500">
                          <div className="relative w-full h-full">
                            <Image
                              src={award.image}
                              alt={`${award.title} Trophy`}
                              fill
                              className="object-contain p-3 md:p-5"
                              sizes="(max-width: 768px) 128px, 176px"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Single Image Layout */
                      <div className="relative aspect-square md:aspect-[4/3] w-full max-w-[360px] rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 bg-[#FAFAFC]">
                        {award.receivingImage ? (
                          <Image
                            src={award.receivingImage}
                            alt={`${award.title} Ceremony`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        ) : (
                          <Image
                            src={award.image}
                            alt={`${award.title} Trophy`}
                            fill
                            className="object-contain p-8"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        )}
                      </div>
                    )}
                  </motion.div>

                  {/* Text Description (Scroll animation from opposite side) */}
                  <motion.div
                    className="w-full md:w-1/2 flex flex-col gap-5 text-left"
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                        <Calendar className="w-3.5 h-3.5" />
                        {award.year}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E4F3F7] text-[#29BFDF] text-xs font-bold">
                        <Landmark className="w-3.5 h-3.5" />
                        {award.organization}
                      </span>
                    </div>

                    <h2 className="text-2xl md:text-3.5xl font-black text-gray-900 leading-tight">
                      {award.title}
                    </h2>

                    <p className="text-primary font-bold text-base md:text-lg leading-relaxed">
                      {award.tagline}
                    </p>

                    <div className="h-0.5 w-16 bg-primary/25" />

                    <p className="text-gray-600 text-sm md:text-base leading-relaxed font-medium">
                      {award.description}
                    </p>
                  </motion.div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <CtaSection />
    </main>
  );
};

export default AwardsPageClient;
