import { urlFor } from "@/lib/sanity";
import { LightBrightColors } from "@/utils/consts";
import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Testimonial } from "./TestimonialSection";

interface TestimonialCardProps {
  testimonial: Testimonial;
  variant?: "glass" | "plain";
  index?: number;
}

const TestimonialCard = ({ testimonial, variant = "plain", index = 0 }: TestimonialCardProps): React.JSX.Element => {
  const colorScheme = LightBrightColors[index % LightBrightColors.length] || LightBrightColors[0];

  return (
    <div className="bg-white rounded-[2.5rem] p-5 md:p-8 shadow-xl shadow-gray-200/50 flex flex-col relative group transition-all duration-500 border border-transparent hover:border-gray-100">

      <div className="absolute -top-4 right-[100px] w-[90px] h-[40px] rounded-t-2xl">
        <svg xmlns="http://www.w3.org/2000/svg" width="90" height="40" viewBox="0 0 119 57" fill="none">
          <path d="M107.516 56.5H6.51599C0.916021 56.5 -0.150665 50.5 0.0159887 47.5C0.988171 30.0001 11.984 2.5 50.5 0C105 4.5 111.516 35.0002 118.016 44.5002C121 55.5 113.183 55.6667 107.516 56.5Z" fill={`${colorScheme?.darkColor}`} />
          <circle cx="47.5" cy="22" r="2.5" fill="white" />
          <circle cx="66.5" cy="22" r="2.5" fill="white" />
          <path d="M46 34C46 34 49 41.5 57.5 41.5C66 41.5 68.5 34 68.5 34" stroke="white" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-4 flex-1">
        {/* Right Side: Quote and Content */}
        <div className="flex-1 relative pt-2 flex flex-col">
          {/* Quote Icon */}
          <div className="flex gap-1 justify-start mb-3 opacity-60">
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="35" viewBox="0 0 23 40" fill="none">
              <path d="M11.0447 18.3747C8.84832 15.0799 14.5447 7.87472 18.0447 4.37472C20.0447 2.37477 17.0447 -1.15745 14.5447 0.374744C9.37801 3.54135 -0.755286 12.8747 0.044714 24.8747C0.911382 37.8748 11.0447 42.8748 19.0447 36.3748C25.4447 31.1748 23.5446 19.3747 15.5447 18.3747C12.5446 18.8747 12.0447 18.8748 11.0447 18.3747Z" fill={`${colorScheme?.darkColor}`} />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="35" viewBox="0 0 23 40" fill="none">
              <path d="M11.0447 18.3747C8.84832 15.0799 14.5447 7.87472 18.0447 4.37472C20.0447 2.37477 17.0447 -1.15745 14.5447 0.374744C9.37801 3.54135 -0.755286 12.8747 0.044714 24.8747C0.911382 37.8748 11.0447 42.8748 19.0447 36.3748C25.4447 31.1748 23.5446 19.3747 15.5447 18.3747C12.5446 18.8747 12.0447 18.8748 11.0447 18.3747Z" fill={`${colorScheme?.darkColor}`} />
            </svg>
          </div>

          <div className="flex-1">
            <p className="text-gray-700 leading-relaxed italic text-sm md:text-base">
              &quot;{testimonial.message}&quot;
            </p>
          </div>

          {/* Rating */}
          <div className="flex gap-1 mt-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < testimonial.stars ? "fill-current" : "text-gray-200"}`}
                style={{ color: i < testimonial.stars ? "#FFB800" : undefined }}
              />
            ))}
          </div>
        </div>
      </div>


      {/* Bottom: Author Pill */}
      <div
        className="mt-auto flex items-center gap-4 p-4 rounded-full transition-all group-hover:scale-[1.02]"
        style={{ backgroundColor: colorScheme?.lightColor }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden"
          style={{ backgroundColor: 'white' }}
        >
          {testimonial.authorImage ? (
            <Image
              src={urlFor(testimonial.authorImage).url()}
              alt={testimonial.author}
              fill
              className="object-cover"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-white  font-bold font-display overflow-hidden"
              style={{ backgroundColor: colorScheme?.darkColor }}
            >
              <div className="text-3xl">
                {testimonial.author.trim().charAt(0).toUpperCase()}
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col overflow-hidden">
          <h3 className="font-bold text-gray-900 leading-tight text-sm md:text-base" style={{ color: colorScheme?.darkColor }}>
            {testimonial.author}
          </h3>
          <p className="text-xs md:text-sm text-gray-600 opacity-70">
            Happy Parent
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
