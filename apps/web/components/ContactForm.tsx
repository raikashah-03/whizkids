"use client";

import { Send } from "lucide-react";
import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── Component ────────────────────────────────────────────────────────────────

export default function ContactForm() {
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

  // ── Helpers ──────────────────────────────────────────────────────────────

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
    // Clear field error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
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

  // ── Success state ─────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <div
        className="w-full rounded-2xl bg-white shadow-lg ring-1 ring-foreground/8
                   flex flex-col items-center justify-center gap-4 px-6 py-14 text-center"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green text-green-strong text-2xl">
          ✓
        </span>
        <h3 className="text-lg font-bold text-foreground">Message Sent!</h3>
        <p className="text-sm text-foreground/60 max-w-xs">
          Thanks for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
        <button
          onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", message: "", agreed: false }); }}
          className="mt-2 rounded-full border border-foreground/15 px-5 py-2 text-sm font-medium
                     text-foreground/70 hover:bg-foreground/5 transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  // ── Form ──────────────────────────────────────────────────────────────────

  return (
    <div
      className="w-full rounded-2xl bg-white shadow-lg ring-1 ring-foreground/8
                 overflow-hidden flex flex-col h-full"
    >
      {/* Gradient accent bar */}
      <div className="h-1.5 w-full bg-linear-to-r from-skyblue-strong via-lavender-strong to-pink-strong" />

      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-3 px-6 py-5 grow"
        aria-label="Contact form"
      >
        {/* Heading */}
        <div>
          <h3 className="text-foreground font-bold text-xl md:text-2xl leading-tight">
            Send Us a Message
          </h3>
          <p className="mt-1 text-xs text-foreground/50">
            We&apos;ll respond within 24 hours on school days.
          </p>
        </div>

        {/* ── Name ── */}
        <div className="flex flex-col gap-1">
          <label htmlFor="cf-name" className="text-xs font-semibold text-foreground/60 uppercase tracking-wide">
            Your Name <span className="normal-case font-normal text-foreground/35">(optional)</span>
          </label>
          <input
            id="cf-name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="E.g. Priya Sharma"
            className="w-full rounded-xl border border-foreground/12 bg-background px-4 py-2
                       text-sm text-foreground placeholder:text-foreground/30
                       outline-none focus:border-lavender-strong focus:ring-2 focus:ring-lavender-strong/20
                       transition-all"
          />
        </div>

        {/* ── Email ── */}
        <div className="flex flex-col gap-1">
          <label htmlFor="cf-email" className="text-xs font-semibold text-foreground/60 uppercase tracking-wide">
            Email Address <span className="text-pink-strong">*</span>
          </label>
          <input
            id="cf-email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            aria-describedby={errors.email ? "cf-email-err" : undefined}
            className={`w-full rounded-xl border bg-background px-4 py-2 text-sm text-foreground
                        placeholder:text-foreground/30 outline-none transition-all
                        focus:ring-2 focus:ring-skyblue-strong/20
                        ${errors.email
                ? "border-pink-strong focus:border-pink-strong"
                : "border-foreground/12 focus:border-skyblue-strong"
              }`}
          />
          {errors.email && (
            <p id="cf-email-err" className="text-xs text-pink-strong mt-0.5">{errors.email}</p>
          )}
        </div>

        {/* ── Phone ── */}
        <div className="flex flex-col gap-1">
          <label htmlFor="cf-phone" className="text-xs font-semibold text-foreground/60 uppercase tracking-wide">
            Phone Number <span className="normal-case font-normal text-foreground/35">(optional)</span>
          </label>
          <input
            id="cf-phone"
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            aria-describedby={errors.phone ? "cf-phone-err" : undefined}
            className={`w-full rounded-xl border bg-background px-4 py-2 text-sm text-foreground
                        placeholder:text-foreground/30 outline-none transition-all
                        focus:ring-2 focus:ring-peach-strong/20
                        ${errors.phone
                ? "border-pink-strong focus:border-pink-strong"
                : "border-foreground/12 focus:border-peach-strong"
              }`}
          />
          {errors.phone && (
            <p id="cf-phone-err" className="text-xs text-pink-strong mt-0.5">{errors.phone}</p>
          )}
        </div>

        {/* ── Message ── */}
        <div className="flex flex-col gap-1">
          <label htmlFor="cf-message" className="text-xs font-semibold text-foreground/60 uppercase tracking-wide">
            Your Message <span className="text-pink-strong">*</span>
          </label>
          <textarea
            id="cf-message"
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={3}
            placeholder="Tell us how we can help…"
            aria-describedby={errors.message ? "cf-message-err" : undefined}
            className={`w-full resize-none rounded-xl border bg-background px-4 py-2 text-sm
                        text-foreground placeholder:text-foreground/30 outline-none transition-all
                        focus:ring-2 focus:ring-lavender-strong/20
                        ${errors.message
                ? "border-pink-strong focus:border-pink-strong"
                : "border-foreground/12 focus:border-lavender-strong"
              }`}
          />
          {errors.message && (
            <p id="cf-message-err" className="text-xs text-pink-strong mt-0.5">{errors.message}</p>
          )}
        </div>

        {/* ── Terms checkbox ── */}
        <div className="flex flex-col gap-1">
          <label className="flex items-start gap-2.5 cursor-pointer select-none group">
            <input
              id="cf-agreed"
              type="checkbox"
              name="agreed"
              checked={form.agreed}
              onChange={handleChange}
              className="mt-0.5 h-4 w-4 shrink-0 accent-primary cursor-pointer"
            />
            <span className="text-xs text-foreground/55 leading-snug group-hover:text-foreground/75 transition-colors">
              I agree to WizKids&apos;{" "}
              <a href="/terms-of-service" className="text-primary underline underline-offset-2 hover:opacity-80">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy-policy" className="text-primary underline underline-offset-2 hover:opacity-80">
                Privacy Policy
              </a>
            </span>
          </label>
          {errors.agreed && (
            <p className="text-xs text-pink-strong ml-6">{errors.agreed}</p>
          )}
        </div>

        {/* ── Submit ── */}
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2.5 rounded-full
                     bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-sm
                     hover:brightness-105 hover:-translate-y-0.5 transition-all
                     disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send size={15} strokeWidth={2.5} />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
}
