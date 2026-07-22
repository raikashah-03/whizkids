"use client";

import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Heading from "@/components/Headding";
import { PHILOSOPHY_PROMISES, PHILOSOPHY_QUESTIONS } from "@/config/curriculum";
import { CheckCircle2, XCircle, Sparkles, HelpCircle, ArrowRight, Quote, Heart, Star, ShieldAlert } from "lucide-react";
import Image from "next/image";

export default function JapanesePhilosophyIntro(): React.JSX.Element {
  const sectionRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Parallax scroll effect for the quote image container
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["0 1", "1 0"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const rotateShape = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-24 bg-white relative overflow-hidden">
      
      {/* ── Decorative Background Blobs & Shapes ── */}
      <div className="absolute top-10 -left-10 w-48 sm:w-72 h-48 sm:h-72 bg-[#E4F3F7]/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-10 w-56 sm:w-80 h-56 sm:h-80 bg-[#FDF3E5]/60 rounded-full blur-3xl pointer-events-none" />
      
      {/* Floating Decorative Icons */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-12 left-6 md:left-14 pointer-events-none opacity-80 z-10 hidden sm:block"
      >
        <Image src="/icons/rainbow.png" alt="" width={60} height={60} className="w-10 sm:w-12 md:w-16 h-auto" />
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-28 right-8 md:right-16 pointer-events-none opacity-80 z-10 hidden sm:block"
      >
        <Image src="/icons/star.png" alt="" width={50} height={50} className="w-8 sm:w-10 md:w-14 h-auto" />
      </motion.div>

      <motion.div
        style={{ rotate: rotateShape }}
        className="absolute bottom-20 left-10 pointer-events-none opacity-20 z-0 hidden lg:block"
      >
        <Image src="/icons/shape-dots.svg" alt="" width={120} height={120} className="w-24 h-auto" />
      </motion.div>

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        
        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#FDF3E5] border border-[#FDA924]/30 text-[#D98200] text-xs md:text-sm font-black uppercase tracking-wider mb-3 sm:mb-4 shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FDA924]" />
            <span>Why Japanese Philosophy?</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Heading
              headingText="Designed for How Children"
              spanText="Really Grow"
              className="justify-center!"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 sm:mt-6 text-foreground/85 text-sm sm:text-base md:text-xl font-semibold leading-relaxed px-2 sm:px-0"
          >
            We made a very conscious choice at WhizKids. Instead of following a typical preschool system, we chose to build our curriculum around Japanese philosophy, because it understands something very simple, yet deeply powerful:
          </motion.p>
        </div>

        {/* ── PARALLAX IMAGE CONTAINER FOR THE QUOTE (MOBILE-OPTIMIZED) ── */}
        <div ref={parallaxRef} className="my-8 sm:my-10 md:my-14 relative">
          
          {/* Floating Pencil Graphic */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -left-4 z-30 hidden md:block"
          >
            <Image src="/icons/pencil.png" alt="" width={60} height={60} className="w-12 md:w-14 h-auto drop-shadow-md" />
          </motion.div>

          <div className="relative w-full min-h-[320px] sm:min-h-[380px] md:min-h-[480px] rounded-3xl sm:rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-xl sm:shadow-2xl flex items-center justify-center p-5 sm:p-8 md:p-14 text-center border-2 sm:border-4 border-white">
            
            {/* Parallax Background Image */}
            <motion.div
              style={{ y: parallaxY }}
              className="absolute inset-0 w-full h-[135%] -top-[18%] pointer-events-none z-0"
            >
              <Image
                src="/images/activities-hero.png"
                alt="Children engaged in joyful play"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </motion.div>

            {/* Dark Overlay with 85% opacity */}
            <div className="absolute inset-0 bg-black/85 z-10" />

            {/* Quote Overlay Content */}
            <div className="relative z-20 max-w-3xl mx-auto flex flex-col items-center gap-3 sm:gap-5">
              
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-xl mb-1">
                <Quote className="w-5 h-5 sm:w-7 sm:h-7 text-[#FDA924] fill-current" />
              </div>

              <h3 
                style={{ color: "#ffffff" }} 
                className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-display leading-snug sm:leading-tight tracking-wide !text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
              >
                “Children don’t grow best when they’re rushed, corrected all the time, or made to perform.”
              </h3>

              <div className="h-0.5 sm:h-1 w-16 sm:w-24 bg-linear-to-r from-transparent via-[#FDA924] to-transparent my-0.5 sm:my-1 rounded-full" />

              <p 
                style={{ color: "#FFC72C" }} 
                className="text-base sm:text-xl md:text-2xl lg:text-3xl font-black font-sans tracking-wide !text-[#FFC72C] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
              >
                They grow when they feel safe, curious, understood, and free to try.
              </p>
            </div>
          </div>
        </div>

        {/* ── Comparison Showcase: Traditional vs WhizKids Approach ── */}
        <div className="mt-12 sm:mt-16 md:mt-24">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="text-xs font-black text-[#29BFDF] uppercase tracking-widest block mb-1">
              Curriculum Philosophy
            </span>
            <h3 className="text-xl sm:text-2xl md:text-4xl font-bold font-display text-foreground">
              Protecting Curiosity vs Traditional Pressure
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch mb-14 sm:mb-20">
            
            {/* Traditional Systems Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 bg-[#14141E] rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 md:p-10 border-2 border-red-500/30 shadow-xl sm:shadow-2xl flex flex-col justify-between relative overflow-hidden"
            >
              {/* Danger accent line */}
              <div className="absolute top-0 left-0 w-full h-1.5 sm:h-2 bg-linear-to-r from-red-500 via-orange-500 to-red-500" />

              <div>
                <div className="flex items-center gap-3 sm:gap-3.5 mb-5 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center font-bold shrink-0 border border-red-500/40 shadow-inner">
                    <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-xs font-bold text-red-400 uppercase tracking-widest block">Traditional Preschools</span>
                    <h3 
                      style={{ color: "#ffffff" }} 
                      className="text-lg sm:text-xl md:text-2xl font-black font-display !text-white"
                    >
                      What Most Systems Take Away
                    </h3>
                  </div>
                </div>

                <p 
                  style={{ color: "#E5E7EB" }} 
                  className="text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-6 font-semibold !text-gray-200"
                >
                  That natural curiosity and confidence to try... traditional rigid systems often slowly take away over time:
                </p>

                <div className="flex flex-col gap-2.5 sm:gap-3.5">
                  {[
                    "Rushed timelines & strict performance pressure",
                    "Over-corrected mistakes creating hesitation",
                    "Focusing only on mechanical writing & early counting",
                    "Passive observation instead of active participation"
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl bg-white/10 border border-white/20 shadow-xs"
                    >
                      <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 shrink-0 mt-0.5" />
                      <span 
                        style={{ color: "#ffffff" }} 
                        className="text-xs sm:text-sm font-bold leading-snug !text-white"
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div 
                style={{ color: "#F87171" }} 
                className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/15 flex items-center justify-between text-xs sm:text-sm font-bold !text-red-400"
              >
                <span>Result: Children become hesitant & fearful of failure.</span>
                <XCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 ml-2" />
              </div>
            </motion.div>

            {/* WhizKids Approach Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-7 bg-linear-to-br from-[#E4F3F7] via-white to-[#FDF3E5] rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 md:p-10 border-2 border-[#29BFDF]/40 shadow-xl sm:shadow-2xl flex flex-col justify-between relative overflow-hidden"
            >
              {/* Vibrant accent line */}
              <div className="absolute top-0 left-0 w-full h-1.5 sm:h-2 bg-linear-to-r from-[#29BFDF] via-[#9B5FFF] to-[#FDA924]" />

              <div>
                <div className="flex items-center gap-3 sm:gap-3.5 mb-5 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#29BFDF] text-white flex items-center justify-center font-bold shrink-0 shadow-md">
                    <CheckCircle2 className="w-5 h-5 sm:w-7 sm:h-7" />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-xs font-black text-[#29BFDF] uppercase tracking-widest block">The WhizKids Approach</span>
                    <h3 className="text-lg sm:text-xl md:text-3xl font-black font-display text-foreground">
                      A Learning Way That Protects Curiosity
                    </h3>
                  </div>
                </div>

                <p className="text-foreground/90 text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-6 font-bold">
                  We chose a framework that protects enthusiasm and helps children thrive naturally:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {PHILOSOPHY_PROMISES.map((promise, i) => (
                    <div
                      key={i}
                      className={`${promise.bg} rounded-2xl p-4 sm:p-5 border border-gray-300/60 shadow-xs flex flex-col gap-1.5 sm:gap-2`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full shadow-xs shrink-0" style={{ backgroundColor: promise.color }} />
                        <h4 className="font-extrabold text-sm sm:text-base text-foreground font-display">
                          {promise.title}
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-foreground/85 font-semibold leading-relaxed">
                        {promise.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-300/70 flex items-center justify-between text-xs sm:text-sm font-extrabold text-[#0099BA]">
                <span>Result: Children become confident, independent & curious.</span>
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#29BFDF] shrink-0 ml-2" />
              </div>
            </motion.div>

          </div>
        </div>

        {/* ── 3 Core Real-World Questions ── */}
        <div className="bg-linear-to-r from-[#FAFAFC] via-[#F4EEE5]/50 to-[#FAFAFC] rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 md:p-12 border border-gray-200/90 shadow-md relative overflow-hidden">
          
          {/* Background zigzag shape */}
          <div className="absolute top-4 right-4 pointer-events-none opacity-20">
            <Image src="/icons/shape-zigzag.svg" alt="" width={80} height={40} className="w-12 sm:w-16 h-auto" />
          </div>

          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="text-[10px] sm:text-xs font-black text-primary uppercase tracking-[0.2em] mb-1.5 block">
              Real World Readiness
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-foreground font-display">
              What Truly Matters for Your Child
            </h3>
            <p className="text-foreground/80 text-xs sm:text-sm md:text-base mt-2 font-semibold">
              Because what truly matters isn’t how early a child writes or counts — it’s how confident they feel in the real world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {PHILOSOPHY_QUESTIONS.map((q, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-5 sm:p-6 shadow-md sm:shadow-lg border border-gray-100 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#FDA924]/15 text-[#FDA924] flex items-center justify-center mb-3 sm:mb-4 shadow-2xs">
                    <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-foreground font-display mb-2">
                    {q.question}
                  </h4>
                  <p className="text-foreground/80 text-xs sm:text-sm leading-relaxed font-semibold">
                    {q.answer}
                  </p>
                </div>
                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100 flex items-center text-[11px] sm:text-xs font-bold text-primary gap-1.5">
                  <Heart className="w-3.5 h-3.5 fill-current text-primary" />
                  <span>Built by our philosophy</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-auto" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
