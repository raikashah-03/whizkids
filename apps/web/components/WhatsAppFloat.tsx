"use client";

import Image from "next/image";
import { whatsappNumber } from "@/utils/consts";
import whatsappIcon from "@/public/icons/whatsapp.png";

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
      className="whatsapp-float"
    >
      {/* Pulse ring — decorative halo */}
      <span className="whatsapp-pulse" aria-hidden="true" />

      {/* Icon */}
      <span className="whatsapp-icon-wrap">
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
