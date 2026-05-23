"use client";
import React from "react";

import whatsappIcon from "@/public/icons/whatsapp.png";
import { whatsappNumber } from "@/utils/consts";
import Image from "next/image";

/**
 * Floating WhatsApp button fixed to the bottom-right corner.
 * Includes:
 *  - float animation (gentle up-down)
 *  - a pulsing "halo" ring behind the icon to draw attention
 */
export default function WhatsAppFloat() {
  const href = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      id="whatsapp-float-btn"
      className="fixed bottom-7 right-7 z-9999 flex h-[58px] w-[58px] cursor-pointer items-center justify-center rounded-full bg-[#25d366] shadow-[0_6px_24px_rgba(37,211,102,0.45)] no-underline transition-all duration-300 animate-wa-float hover:scale-[1.06] hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(37,211,102,0.65)] hover:paused"
    >
      {/* Pulse ring — decorative halo */}
      <span
        className="pointer-events-none absolute inset-0 animate-wa-pulse rounded-full bg-[#25d366]/55"
        aria-hidden="true"
      />

      {/* Icon */}
      <span className="relative z-10 flex items-center justify-center">
        <Image
          src={whatsappIcon}
          alt="WhatsApp"
          width={32}
          height={32}
          className="object-contain"
          priority
        />
      </span>
    </a>

  );
}
