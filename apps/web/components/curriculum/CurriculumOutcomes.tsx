"use client";

import React, { useRef } from "react";
import { HOLISTIC_OUTCOMES } from "@/config/curriculum";
import Heading from "@/components/Headding";
import { motion, useInView } from "framer-motion";
import { Sparkles, Heart, Smile } from "lucide-react";

export default function CurriculumOutcomes(): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <section ref={containerRef} className="py-12 sm:py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Background radial gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[700px] h-[400px] sm:h-[700px] bg-[#FDF3E5]/40 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#EBDFFF] border border-[#9B5FFF]/20 text-[#702ED4] text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-wider mb-3 sm:mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#9B5FFF]" />
            <span>The WhizKids Difference</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Heading
              headingText="What This Really Means for"
              spanText="Your Child"
              className="justify-center!"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 sm:mt-4 text-foreground/80 text-xs sm:text-base md:text-xl font-semibold px-2 sm:px-0"
          >
            Your child isn’t just learning ABCs and 123s. They are building the fundamental emotional and cognitive pillars for life.
          </motion.p>
        </div>

        {/* 5 Core Life Outcomes Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-5 mb-10 sm:mb-12">
          {HOLISTIC_OUTCOMES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`${item.bg} rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-gray-200/80 shadow-xs flex flex-col justify-between hover:shadow-lg transition-all group`}
              >
                <div>
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white flex items-center justify-center mb-4 sm:mb-6 shadow-sm ${item.accent} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground font-display mb-2 sm:mb-3">
                    {item.title}
                  </h3>
                  <p className="text-foreground/80 text-xs sm:text-sm leading-relaxed font-semibold">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-black/5 flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-foreground/60">
                  <Smile className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                  <span>Real Growth</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Compact Final Quote Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="relative rounded-2xl sm:rounded-3xl bg-linear-to-r from-[#29BFDF] via-[#9B5FFF] to-[#FF4D8D] p-1 shadow-lg max-w-3xl mx-auto overflow-hidden"
        >
          <div className="bg-white rounded-[18px] sm:rounded-[22px] p-5 sm:p-8 text-center flex flex-col items-center justify-center relative z-10">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FDA924]/15 text-[#FDA924] flex items-center justify-center mb-3 sm:mb-4 shadow-2xs">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-[#FDA924]" />
            </div>

            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-foreground font-display mb-2 max-w-2xl">
              “And most importantly… They enjoy the process.”
            </h3>

            <p className="text-xs sm:text-base md:text-lg text-foreground/85 font-bold max-w-xl leading-relaxed">
              Because when a child enjoys learning, everything else follows naturally.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
