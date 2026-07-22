import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CtaSection(): React.JSX.Element {
  return (
    <section id="cta" className="relative z-20 py-16 md:py-24">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="relative rounded-[3rem] md:rounded-[4rem] bg-[#FFF6F0] overflow-hidden flex flex-col md:flex-row items-stretch shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#FF8A66]/20">

          {/* Left Content */}
          <div className="flex-1 p-6 md:p-14 lg:p-16 z-10 flex flex-col justify-center">
            <div className="inline-flex self-start items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#FF8A66] font-bold text-xs uppercase tracking-widest mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              Enroll Today
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-foreground leading-[1.2] mb-6">
              Give your child the <span className="text-[#FF8A66] italic font-medium">best start</span> in life
            </h2>

            <p className="text-foreground/70 text-base md:text-lg font-medium leading-relaxed mb-10 max-w-md">
              Join the Whizkids family and watch your little one thrive in a safe, fun, and creative learning environment. Limited seats available
            </p>

            <Link
              href="/contact#contact-form"
              className="inline-flex self-start items-center gap-3 px-8 py-3.5 rounded-full bg-[#FF8A66] text-white font-bold text-base hover:bg-[#FF8A66]/90 hover:-translate-y-0.5 transition-all duration-300 shadow-md group"
            >
              Contact Us Now
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </Link>
          </div>

          {/* Right Image */}
          <div className="flex-1 w-full min-h-[350px] md:min-h-full relative overflow-hidden">
            {/* Soft fade gradient between text and image on desktop */}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#FFF6F0] via-[#FFF6F0]/80 to-transparent z-10 w-full md:w-1/3"></div>

            <Image
              src="/images/cta-kids.png"
              alt="Happy diverse preschool children playing with building blocks"
              fill
              className="object-cover object-center"
            />

            {/* Floating decorations on image */}
            <div className="absolute top-10 right-10 w-24 h-24 opacity-60 pointer-events-none z-20 animate-float hidden md:block">
              <Image src="/icons/cloud-2.png" alt="" fill className="object-contain" />
            </div>
            <div className="absolute bottom-10 right-20 w-16 h-16 opacity-70 pointer-events-none z-20 animate-bob hidden md:block">
              <Image src="/icons/bee.png" alt="" fill className="object-contain" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
