"use client";

import Heading from "@/components/Headding";
import { Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import FramedMaskedImage from "./FrameMaskedImage";
// ─── Types ────────────────────────────────────────────────────────────────────

interface BreadCrumbProps {
  heading: {
    main: string;
    span?: string;
  };
  description?: string;
  mainImage?: string;
  className?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Converts a URL segment into a human-readable label.
 * e.g. "our-gallery" → "Our Gallery"
 */
function segmentToLabel(segment: string): string {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function BreadCrumb({
  heading,
  description,
  mainImage,
  className,
}: BreadCrumbProps) {
  const pathname = usePathname();

  // Build breadcrumb segments from the URL path
  // e.g. /programs/playgroup → ["programs", "playgroup"]
  const segments = pathname.split("/").filter(Boolean);

  // JSON-LD structured data for SEO
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "/",
      },
      ...segments.map((seg, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: segmentToLabel(seg),
        item: "/" + segments.slice(0, i + 1).join("/"),
      })),
    ],
  };

  return (
    <>
      {/* ── SEO: BreadcrumbList structured data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section
        aria-label="Page banner"
        className={`relative w-full overflow-hidden bg-linear-to-b from-[#B8D9EF] via-[#D6EEFA] to-white py-10 md:py-14 ${className}`}
      >
        {/* ── Decorative background blobs ── */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-10 -top-10 h-56 w-56 rounded-full bg-[#7EC8E3]/30 blur-3xl select-none"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[#A8D8EA]/20 blur-3xl select-none"
        />

        {/* ── Decorative cloud-1 (top-left) ── */}
        <div className="absolute top-4 left-2 md:top-6 md:left-6 pointer-events-none z-0">
          <Image
            src="/icons/cloud-1.png"
            alt=""
            width={80}
            height={50}
            className="w-12 h-auto md:w-[80px] animate-float opacity-70"
            style={{ animationDelay: '2.5s' }}
          />
        </div>

        {/* ── Decorative cloud-2 (top-left, offset) ── */}
        <div className="absolute top-10 left-10 md:top-14 md:left-20 pointer-events-none z-0">
          <Image
            src="/icons/cloud-2.png"
            alt=""
            width={100}
            height={60}
            className="w-14 h-auto md:w-[90px] animate-drift opacity-80"
            style={{ animationDelay: '1.2s' }}
          />
        </div>

        {/* ── Decorative grad-cloud-1 (top-right) ── */}
        <div className="absolute top-2 -right-4 md:top-4 md:-right-8 pointer-events-none z-0">
          <Image
            src="/icons/grad-cloud-1.png"
            alt=""
            width={120}
            height={80}
            className="w-24 h-auto md:w-[160px] animate-float-slow opacity-90"
          />
        </div>

        {/* ── Decorative star (bottom-left) ── */}
        <span
          aria-hidden="true"
          className="animate-bob pointer-events-none absolute bottom-6 left-8 select-none"
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path
              d="M14 2l2.7 8.3H25l-6.9 5 2.6 8.2L14 18.5l-6.7 5 2.6-8.2L3 10.3h8.3z"
              fill="#FDA924"
            />
          </svg>
        </span>

        {/* ── Decorative star (bottom-right area) ── */}
        <span
          aria-hidden="true"
          className="animate-float pointer-events-none absolute bottom-4 right-[45%] select-none"
        >
          <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
            <path
              d="M14 2l2.7 8.3H25l-6.9 5 2.6 8.2L14 18.5l-6.7 5 2.6-8.2L3 10.3h8.3z"
              fill="#D6C2FF"
            />
          </svg>
        </span>

        {/* ── Decorative doodle squiggle (bottom-right) ── */}
        <span
          aria-hidden="true"
          className="animate-drift pointer-events-none absolute bottom-8 right-12 select-none opacity-50"
        >
          <svg width="48" height="24" viewBox="0 0 48 24" fill="none">
            <path
              d="M2 12 C8 2, 16 22, 24 12 S40 2, 46 12"
              stroke="#FFC9C9"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </span>

        {/* ── Page layout ── */}
        <div className="container relative z-10 flex flex-col items-center gap-8 md:flex-row md:justify-between">

          {/* ── Left: breadcrumb + heading + description ── */}
          <div className="flex flex-col gap-4 w-full md:max-w-[60%]">

            {/* Breadcrumb trail */}
            <nav aria-label="Breadcrumb">
              <ol
                className="flex flex-wrap items-center gap-1 text-xs text-foreground/60"
                itemScope
                itemType="https://schema.org/BreadcrumbList"
              >
                {/* Home */}
                <li
                  className="flex items-center gap-1"
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                >
                  <Link
                    href="/"
                    className="flex items-center gap-1 transition-colors hover:text-primary"
                    itemProp="item"
                  >
                    <Home size={13} className="shrink-0" aria-hidden="true" />
                    <span itemProp="name">Home</span>
                  </Link>
                  <meta itemProp="position" content="1" />
                </li>

                {/* Dynamic segments */}
                {segments.map((seg, i) => {
                  const href = "/" + segments.slice(0, i + 1).join("/");
                  const isLast = i === segments.length - 1;
                  return (
                    <li
                      key={seg}
                      className="flex items-center gap-1"
                      itemProp="itemListElement"
                      itemScope
                      itemType="https://schema.org/ListItem"
                    >
                      {/* Separator */}
                      <span aria-hidden="true" className="text-foreground/30">
                        &rsaquo;
                      </span>

                      {isLast ? (
                        <span
                          className="font-medium text-primary"
                          aria-current="page"
                          itemProp="name"
                        >
                          {segmentToLabel(seg)}
                        </span>
                      ) : (
                        <Link
                          href={href}
                          className="transition-colors hover:text-primary"
                          itemProp="item"
                        >
                          <span itemProp="name">{segmentToLabel(seg)}</span>
                        </Link>
                      )}
                      <meta itemProp="position" content={String(i + 2)} />
                    </li>
                  );
                })}
              </ol>
            </nav>

            {/* Heading — uses the Heading component */}
            <Heading
              headingText={heading.main}
              spanText={heading.span ?? ""}
              className="justify-start!"
            />

            {/* Description */}
            {description && (
              <p className="max-w-md text-sm leading-relaxed text-foreground/70 md:text-base">
                {description}
              </p>
            )}
          </div>

          {mainImage && (
            <div className="w-full max-w-[350px]">
              <FramedMaskedImage
                frameImage="/images/magic-vector.png"
                bgImage={mainImage}
                maskImage={"/images/magic-vector-mask-shape.svg"}
              />
            </div>
          )}

        </div>
      </section>
    </>
  );
}
