"use client";

/**
 * InquiryModalContext
 *
 * Global context that manages the "Program Inquiry" modal state.
 * Any component anywhere in the app can call `useInquiryModal().open("Program Name")`
 * to open the modal with the correct title/subject — no prop drilling needed.
 */

import React, { createContext, useCallback, useContext, useState } from "react";

interface InquiryModalContextValue {
  open: (programTitle: string) => void;
  close: () => void;
  isOpen: boolean;
  programTitle: string;
}

const InquiryModalContext = createContext<InquiryModalContextValue | null>(null);

export function InquiryModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [programTitle, setProgramTitle] = useState("");

  const open = useCallback((title: string) => {
    setProgramTitle(title);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <InquiryModalContext.Provider value={{ open, close, isOpen, programTitle }}>
      {children}
    </InquiryModalContext.Provider>
  );
}

export function useInquiryModal(): InquiryModalContextValue {
  const ctx = useContext(InquiryModalContext);
  if (!ctx) {
    throw new Error("useInquiryModal must be used within an InquiryModalProvider");
  }
  return ctx;
}
