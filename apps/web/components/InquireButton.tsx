"use client";

/**
 * InquireButton
 *
 * A minimal client component that opens the global inquiry modal.
 * Pass any `programTitle` string — the modal will display it as the heading
 * and pre-populate the inquiry subject. Works anywhere on the site.
 *
 * Usage:
 *   <InquireButton programTitle="Daycare" className="..." />
 */

import { useInquiryModal } from "@/components/InquiryModalContext";
import { ArrowRight } from "lucide-react";
import React from "react";

interface InquireButtonProps {
  programTitle: string;
  label?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function InquireButton({
  programTitle,
  label,
  className,
  children,
}: InquireButtonProps): React.JSX.Element {
  const { open } = useInquiryModal();

  const defaultClass =
    "inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-white font-bold transition-all hover:-translate-y-0.5 active:scale-95";

  return (
    <button
      type="button"
      onClick={() => open(programTitle)}
      className={className ?? defaultClass}
    >
      {children ? children : (
        <>
          {label ?? `Inquire for ${programTitle}`}
          <ArrowRight className="w-5 h-5" />
        </>
      )}
    </button>
  );
}
