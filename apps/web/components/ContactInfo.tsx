import { addressData } from "@/utils/consts";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";

// ─── Illustrated map preview (inline SVG — no image dependency) ───────────────
function MapIllustration() {
  return (
    <svg
      viewBox="0 0 280 140"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full h-auto"
    >
      {/* Sky / base */}
      <rect width="280" height="140" fill="#E8F5E9" rx="16" />

      {/* Green patches */}
      <ellipse cx="40" cy="115" rx="38" ry="22" fill="#A5D6A7" />
      <ellipse cx="240" cy="110" rx="42" ry="26" fill="#A5D6A7" />
      <ellipse cx="140" cy="128" rx="60" ry="18" fill="#C8E6C9" />

      {/* Trees (left cluster) */}
      <circle cx="24" cy="100" r="10" fill="#66BB6A" />
      <circle cx="38" cy="96" r="13" fill="#4CAF50" />
      <circle cx="54" cy="103" r="9" fill="#81C784" />

      {/* Trees (right cluster) */}
      <circle cx="232" cy="97" r="11" fill="#66BB6A" />
      <circle cx="248" cy="94" r="13" fill="#4CAF50" />
      <circle cx="262" cy="100" r="9" fill="#81C784" />

      {/* Road (horizontal) */}
      <path d="M0 88 Q140 78 280 88" stroke="#ECEFF1" strokeWidth="18" fill="none" />
      <path d="M0 88 Q140 78 280 88" stroke="#CFD8DC" strokeWidth="18" fill="none" strokeOpacity="0.5" />
      {/* Road dashes */}
      <path d="M60 86 Q100 82 140 82" stroke="white" strokeWidth="2.5" strokeDasharray="8 6" fill="none" />
      <path d="M140 82 Q180 82 220 84" stroke="white" strokeWidth="2.5" strokeDasharray="8 6" fill="none" />

      {/* Road (diagonal from bottom-left) */}
      <path d="M0 140 Q80 110 130 88" stroke="#ECEFF1" strokeWidth="14" fill="none" />
      <path d="M0 140 Q80 110 130 88" stroke="#CFD8DC" strokeWidth="14" fill="none" strokeOpacity="0.5" />

      {/* Small building / school */}
      <rect x="108" y="62" width="30" height="22" rx="3" fill="#FFCC80" />
      <polygon points="108,62 123,50 138,62" fill="#EF9A9A" />
      <rect x="119" y="71" width="8" height="13" rx="1" fill="#90CAF9" />
      {/* windows */}
      <rect x="111" y="66" width="6" height="5" rx="1" fill="#90CAF9" />
      <rect x="131" y="66" width="6" height="5" rx="1" fill="#90CAF9" />

      {/* Location pin */}
      <g transform="translate(118,20)">
        {/* shadow */}
        <ellipse cx="10" cy="42" rx="6" ry="2.5" fill="#00000020" />
        {/* pin body */}
        <path
          d="M10 0 C4.477 0 0 4.477 0 10 C0 17 10 28 10 28 C10 28 20 17 20 10 C20 4.477 15.523 0 10 0Z"
          fill="#4FC3F7"
          stroke="#0288D1"
          strokeWidth="1"
        />
        {/* pin inner circle */}
        <circle cx="10" cy="10" r="5.5" fill="white" />
        {/* star inside pin */}
        <path
          d="M10 5.5 L11.2 8.8 L14.8 8.8 L11.9 10.9 L13 14.1 L10 12 L7 14.1 L8.1 10.9 L5.2 8.8 L8.8 8.8 Z"
          fill="#FDA924"
        />
      </g>
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ContactInfo() {
  const { address, phone, email, icons } = addressData;

  return (
    <div
      className="w-full mx-auto rounded-2xl overflow-hidden
                 bg-white shadow-lg ring-1 ring-foreground/8"
    >
      {/* Illustrated map preview */}
      <div className="w-full overflow-hidden">
        <MapIllustration />
      </div>

      {/* Info body */}
      <div className="px-5 pt-4 pb-5 flex flex-col gap-4">

        {/* Heading */}
        <h3 className="text-foreground font-bold text-lg md:text-xl leading-tight">
          Get In Touch
        </h3>

        {/* Contact rows */}
        <ul className="flex flex-col gap-3">
          {/* Address */}
          <li className="flex items-start gap-3">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-peach">
              <icons.address size={14} className="text-peach-strong" strokeWidth={2.5} />
            </span>
            <span className="text-sm text-foreground/75 leading-snug">{address}</span>
          </li>

          {/* Phone */}
          <li className="flex items-center gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-skyblue">
              <icons.phone size={14} className="text-skyblue-strong" strokeWidth={2.5} />
            </span>
            <Link
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="text-sm text-foreground/75 hover:text-primary transition-colors"
            >
              {phone}
            </Link>
          </li>

          {/* Email */}
          <li className="flex items-center gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-lavender">
              <icons.email size={14} className="text-lavender-strong" strokeWidth={2.5} />
            </span>
            <Link
              href={`mailto:${email}`}
              className="text-sm text-foreground/75 hover:text-primary transition-colors break-all"
            >
              {email}
            </Link>
          </li>
        </ul>

        {/* Safety badge */}
        <div className="flex items-center gap-2 rounded-full bg-[#FFF8E7] border border-[#FDA924]/25 px-4 py-2 w-fit">
          <ShieldCheck size={15} className="text-primary shrink-0" strokeWidth={2.5} />
          <span className="text-xs font-medium text-foreground/70">
            CCTV monitored, safe &amp; secure campus
          </span>
        </div>

      </div>
    </div>
  );
}
