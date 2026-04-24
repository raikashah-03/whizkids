"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQAccordion({ faqs }: { faqs: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <motion.div
            key={index}
            initial={false}
            animate={{
              borderColor: isOpen ? "var(--primary)" : "var(--gray-border, #f3f4f6)",
              boxShadow: isOpen
                ? "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                : "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            }}
            transition={{ duration: 0.3 }}
            className={`border-2 rounded-2xl overflow-hidden bg-white ${
              !isOpen ? "hover:border-gray-200 hover:shadow-md transition-shadow" : ""
            }`}
          >
            <button
              className="w-full group flex items-center justify-between px-5 py-4 md:px-6 md:py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              onClick={() => toggleFAQ(index)}
              aria-expanded={isOpen}
            >
              <span
                className={`font-bold text-base md:text-lg pr-4 transition-colors duration-300 ${
                  isOpen ? "text-primary" : "text-foreground"
                }`}
              >
                {faq.question}
              </span>

              {/* Icon Container */}
              <div
                className={`shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all duration-500 ease-in-out transform ${
                  isOpen
                    ? "bg-primary text-white rotate-180"
                    : "bg-gray-50 text-gray-400 border border-gray-200 group-hover:border-primary group-hover:text-primary rotate-0"
                }`}
              >
                {isOpen ? (
                  <Minus className="w-3 h-3 md:w-4 md:h-4" />
                ) : (
                  <Plus className="w-3 h-3 md:w-4 md:h-4" />
                )}
              </div>
            </button>

            {/* Expandable Content with Framer Motion */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { opacity: 1, height: "auto", marginBottom: 16 },
                    collapsed: { opacity: 0, height: 0, marginBottom: 0 },
                  }}
                  transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                  <div className="px-5 md:px-6 text-muted-foreground text-sm md:text-base leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
