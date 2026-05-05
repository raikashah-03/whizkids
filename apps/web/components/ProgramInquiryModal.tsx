"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Send, X } from "lucide-react";
import { useEffect, useState } from "react";

interface ProgramInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  programTitle: string;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
  agreed: boolean;
}

interface FormErrors {
  email?: string;
  phone?: string;
  message?: string;
  agreed?: string;
}

export default function ProgramInquiryModal({
  isOpen,
  onClose,
  programTitle,
}: ProgramInquiryModalProps): React.JSX.Element {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    message: "",
    agreed: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  function validate(): boolean {
    const newErrors: FormErrors = {};

    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (form.phone && !/^[\d\s+\-()]{7,15}$/.test(form.phone)) {
      newErrors.phone = "Please enter a valid phone number.";
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }
    if (!form.agreed) {
      newErrors.agreed = "Please accept the Terms of Service and Privacy Policy.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      // Prepending program title to message or sending as a separate field
      const submissionData = {
        ...form,
        subject: `Program Inquiry: ${programTitle}`,
        message: `[Inquiry for: ${programTitle}]\n\n${form.message}`,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json();
        alert(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Failed to send message. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }

  const resetForm = () => {
    setSubmitted(false);
    setForm({ name: "", email: "", phone: "", message: "", agreed: false });
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-foreground/30 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-60 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden pointer-events-auto relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors z-10"
              >
                <X size={20} />
              </button>

              {/* Accent Bar */}
              <div className="h-2 w-full bg-primary" />

              <div className="p-8 md:p-10">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center text-center py-10"
                  >
                    <div className="w-20 h-20 bg-green/20 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-10 h-10 text-green-strong" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-4 font-display">Message Sent!</h3>
                    <p className="text-gray-500 max-w-xs mb-8">
                      Thank you for inquiring about <strong>{programTitle}</strong>. We&apos;ll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={resetForm}
                      className="px-8 py-3 rounded-full bg-primary text-white font-bold hover:brightness-105 transition-all shadow-lg shadow-primary/20"
                    >
                      Close Window
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h3 className="text-2xl md:text-3xl font-black text-gray-900 font-display leading-tight">
                        Inquire for <span className="text-primary">{programTitle}</span>
                      </h3>
                      <p className="text-gray-500 mt-2 text-sm">
                        Please fill out the form below and our admissions team will contact you shortly.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Name */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="modal-name" className="text-xs font-black text-gray-400 uppercase tracking-widest">
                          Full Name
                        </label>
                        <input
                          id="modal-name"
                          type="text"
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-5 py-3.5 text-sm focus:bg-white focus:border-primary outline-none transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="modal-email" className="text-xs font-black text-gray-400 uppercase tracking-widest">
                            Email Address
                          </label>
                          <input
                            id="modal-email"
                            type="email"
                            name="email"
                            required
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className={`w-full rounded-2xl border bg-gray-50 px-5 py-3.5 text-sm outline-none transition-all ${errors.email ? "border-pink-strong bg-pink/10" : "border-gray-100 focus:bg-white focus:border-primary"
                              }`}
                          />
                          {errors.email && <span className="text-[10px] text-pink-strong font-bold">{errors.email}</span>}
                        </div>

                        {/* Phone */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="modal-phone" className="text-xs font-black text-gray-400 uppercase tracking-widest">
                            Phone Number
                          </label>
                          <input
                            id="modal-phone"
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="+91"
                            className={`w-full rounded-2xl border bg-gray-50 px-5 py-3.5 text-sm outline-none transition-all ${errors.phone ? "border-pink-strong bg-pink/10" : "border-gray-100 focus:bg-white focus:border-primary"
                              }`}
                          />
                          {errors.phone && <span className="text-[10px] text-pink-strong font-bold">{errors.phone}</span>}
                        </div>
                      </div>

                      {/* Message */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="modal-message" className="text-xs font-black text-gray-400 uppercase tracking-widest">
                          Your Inquiry
                        </label>
                        <textarea
                          id="modal-message"
                          name="message"
                          required
                          rows={3}
                          value={form.message}
                          onChange={handleChange}
                          placeholder={`I'm interested in ${programTitle} for my child...`}
                          className={`w-full rounded-2xl border bg-gray-50 px-5 py-3.5 text-sm outline-none transition-all resize-none ${errors.message ? "border-pink-strong bg-pink/10" : "border-gray-100 focus:bg-white focus:border-primary"
                            }`}
                        />
                        {errors.message && <span className="text-[10px] text-pink-strong font-bold">{errors.message}</span>}
                      </div>

                      {/* Terms */}
                      <label className="flex items-start gap-3 cursor-pointer group py-2">
                        <input
                          type="checkbox"
                          name="agreed"
                          checked={form.agreed}
                          onChange={handleChange}
                          className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 text-primary focus:ring-primary accent-primary"
                        />
                        <span className="text-[11px] text-gray-500 leading-tight">
                          I agree to the <a href="/terms" className="text-primary hover:underline">Terms of Service</a> and <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
                        </span>
                      </label>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-primary text-white font-black text-lg shadow-xl shadow-primary/20 transition-all hover:brightness-105 active:scale-[0.98] disabled:opacity-60"
                      >
                        {loading ? (
                          <div className="h-6 w-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <Send size={18} />
                            Send Inquiry
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
