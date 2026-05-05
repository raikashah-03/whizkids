"use client";

/**
 * InquiryModalRoot
 *
 * Renders the <ProgramInquiryModal> at the layout level, driven by InquiryModalContext.
 * Import this once in the root layout — it provides the modal for the entire site.
 */

import { useInquiryModal } from "@/components/InquiryModalContext";
import ProgramInquiryModal from "@/components/ProgramInquiryModal";

export default function InquiryModalRoot(): React.JSX.Element {
  const { isOpen, close, programTitle } = useInquiryModal();

  return (
    <ProgramInquiryModal
      isOpen={isOpen}
      onClose={close}
      programTitle={programTitle}
    />
  );
}
