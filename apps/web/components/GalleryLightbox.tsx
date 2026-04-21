"use client";

import { GalleryCategory, GalleryItem } from "@/utils/gallery";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Config ───────────────────────────────────────────────────────────────────

const AUTOPLAY_MS = 3500;

const CATEGORY_COLORS: Record<GalleryCategory, string> = {
  Classrooms: "#29BFDF",
  Activities: "#FF8C4B",
  Events: "#9B5FFF",
  Outdoor: "#3DD67A",
};

const CATEGORY_EMOJIS: Record<GalleryCategory, string> = {
  Classrooms: "📖",
  Activities: "🌟",
  Events: "🎈",
  Outdoor: "☀️",
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface LightboxProps {
  items: GalleryItem[];
  initialIndex: number;
  onClose: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function GalleryLightbox({ items, initialIndex, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [slideDir, setSlideDir] = useState<"left" | "right">("right");
  const [animKey, setAnimKey] = useState(0);
  const [thumbErr, setThumbErr] = useState<Record<number, boolean>>({});
  const [mainErr, setMainErr] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  const total = items.length;

  // ─── Navigation ────────────────────────────────────────────────────────────

  const navigate = useCallback((newIdx: number, dir: "left" | "right") => {
    setSlideDir(dir);
    setAnimKey((k) => k + 1);
    setMainErr(false);
    setCurrent(newIdx);
  }, []);

  const goPrev = useCallback(() => navigate((current - 1 + total) % total, "left"), [current, total, navigate]);
  const goNext = useCallback(() => navigate((current + 1) % total, "right"), [current, total, navigate]);
  const goTo = useCallback((idx: number) => navigate(idx, idx > current ? "right" : "left"), [current, navigate]);

  // ─── Autoplay ──────────────────────────────────────────────────────────────

  const startPlay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => {
        setSlideDir("right");
        setAnimKey((k) => k + 1);
        setMainErr(false);
        return (prev + 1) % total;
      });
    }, AUTOPLAY_MS);
  }, [total]);

  const stopPlay = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  useEffect(() => { if (isPlaying) startPlay(); else stopPlay(); return stopPlay; }, [isPlaying, startPlay, stopPlay]);

  // ─── Keyboard ──────────────────────────────────────────────────────────────

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === " ") { e.preventDefault(); setIsPlaying((p) => !p); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext, onClose]);

  // ─── Scroll active thumb into view ─────────────────────────────────────────

  useEffect(() => {
    const el = thumbRef.current?.querySelector<HTMLElement>(".lb-thumb-active");
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [current]);

  // ─── Body scroll lock ──────────────────────────────────────────────────────

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // ─── Touch / swipe ─────────────────────────────────────────────────────────

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0]?.clientX ?? 0; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - (e.changedTouches[0]?.clientX ?? 0);
    if (Math.abs(diff) > 50) { if (diff > 0) goNext(); else goPrev(); }
  };

  // ─── Derived ───────────────────────────────────────────────────────────────

  const item = items[current];
  if (!item) return null;

  const src = typeof item.image === "string" ? item.image : (item.image as { src: string }).src;
  const catColor = CATEGORY_COLORS[item.category];
  const catEmoji = CATEGORY_EMOJIS[item.category];

  // Slide animation classes — these still require global keyframes defined in CSS
  const slideClass = slideDir === "right" ? "lb-slide-right" : "lb-slide-left";

  return (
    <div
      className="fixed inset-0 z-10000 bg-[rgba(10,10,18,0.95)] backdrop-blur-xl flex flex-col items-center justify-start overscroll-contain"
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox viewer"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* ── Top bar ── */}
      <div className="w-full flex items-center gap-3 px-5 py-3.5 shrink-0 bg-black/25 border-b border-white/6">
        {/* Category badge */}
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.78rem] font-bold text-white font-display whitespace-nowrap"
          style={{ background: catColor }}
        >
          <span aria-hidden="true">{catEmoji}</span>
          {item.category}
        </span>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Counter */}
        <span className="text-sm font-semibold text-white/75 whitespace-nowrap" aria-live="polite">
          {current + 1} / {total}
        </span>

        {/* Autoplay toggle */}
        <button
          id="lb-play-btn"
          className={[
            "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/20 text-[0.78rem] font-semibold cursor-pointer whitespace-nowrap transition-all duration-200",
            isPlaying
              ? "bg-white/12 text-white border-white/40"
              : "bg-transparent text-white/70 hover:bg-white/12 hover:text-white hover:border-white/40",
          ].join(" ")}
          onClick={() => setIsPlaying((p) => !p)}
          aria-label={isPlaying ? "Pause slideshow" : "Start slideshow"}
          title={isPlaying ? "Pause (Space)" : "Slideshow (Space)"}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
          <span className="hidden sm:inline">{isPlaying ? "Pause" : "Slideshow"}</span>
        </button>

        {/* Close */}
        <button
          id="lb-close-btn"
          className="flex items-center justify-center w-9 h-9 rounded-full border border-white/20 bg-transparent text-white/70 cursor-pointer shrink-0 transition-all duration-200 hover:bg-red-500/30 hover:text-white hover:border-red-400/40"
          onClick={onClose}
          aria-label="Close lightbox (Esc)"
          title="Close (Esc)"
        >
          <CloseIcon />
        </button>
      </div>

      {/* ── Stage ── */}
      <div
        className="relative flex-1 w-full flex items-center justify-center overflow-hidden min-h-0"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Prev arrow */}
        <button
          id="lb-prev-btn"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-white/18 bg-white/8 text-white/80 flex items-center justify-center cursor-pointer backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:text-white hover:scale-110 sm:left-3 max-sm:w-9 max-sm:h-9 max-sm:left-1"
          onClick={goPrev}
          aria-label="Previous image (←)"
          title="Previous (←)"
        >
          <ChevronLeftIcon />
        </button>

        {/* Main image */}
        <div
          key={animKey}
          className={`relative w-[90%] h-full max-w-[900px] ${slideClass}`}
        >
          {!mainErr ? (
            <Image
              src={src}
              alt={item.note ?? item.category}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-contain rounded-xl"
              onError={() => setMainErr(true)}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50">
              <span style={{ fontSize: "4rem" }}>{catEmoji}</span>
              <span className="mt-2 text-sm text-white/50">Image unavailable</span>
            </div>
          )}
        </div>

        {/* Next arrow */}
        <button
          id="lb-next-btn"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-white/18 bg-white/8 text-white/80 flex items-center justify-center cursor-pointer backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:text-white hover:scale-110 max-sm:w-9 max-sm:h-9 max-sm:right-1"
          onClick={goNext}
          aria-label="Next image (→)"
          title="Next (→)"
        >
          <ChevronRightIcon />
        </button>
      </div>

      {/* ── Caption ── */}
      {item.note && (
        <div className="shrink-0 px-6 py-2 text-center">
          <span className="text-sm font-semibold text-white/80 font-display">{item.note}</span>
        </div>
      )}

      {/* ── Autoplay progress bar ── */}
      {isPlaying && (
        <div key={`progress-${current}`} className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 overflow-hidden z-20">
          <div
            className="lb-progress-fill h-full bg-primary"
            style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
          />
        </div>
      )}

      {/* ── Thumbnail strip ── */}
      <div
        className="shrink-0 flex gap-2 overflow-x-auto px-4 py-3 scrollbar-none w-full max-w-full justify-start bg-black/25 border-t border-white/6"
        ref={thumbRef}
        role="list"
        aria-label="Image thumbnails"
        style={{ scrollbarWidth: "none" }}
      >
        {items.map((t, idx) => {
          const tsrc = typeof t.image === "string" ? t.image : (t.image as { src: string }).src;
          const isActive = idx === current;
          return (
            <button
              key={idx}
              role="listitem"
              className={[
                "lb-thumb-active-ref relative shrink-0 w-16 h-16 rounded-lg overflow-hidden border-[2.5px] bg-white/8 cursor-pointer transition-all duration-200",
                isActive
                  ? "lb-thumb-active opacity-100 -translate-y-1"
                  : "border-transparent opacity-55 hover:opacity-85 hover:-translate-y-0.5",
              ].join(" ")}
              onClick={() => goTo(idx)}
              aria-label={`Go to image ${idx + 1}${t.note ? `: ${t.note}` : ""}`}
              aria-current={isActive}
              style={isActive ? { borderColor: catColor } : {}}
            >
              {!thumbErr[idx] ? (
                <Image
                  src={tsrc}
                  alt={t.note ?? t.category}
                  fill
                  sizes="72px"
                  loading="lazy"
                  className="object-cover"
                  onError={() => setThumbErr((e) => ({ ...e, [idx]: true }))}
                />
              ) : (
                <span className="absolute inset-0 flex items-center justify-center text-2xl opacity-50">
                  {CATEGORY_EMOJIS[t.category]}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Keyboard hint ── */}
      <p className="shrink-0 text-[0.7rem] text-white/28 px-4 py-1.5 text-center tracking-wide hidden sm:block" aria-hidden="true">
        ← → Navigate &nbsp;·&nbsp; Space Slideshow &nbsp;·&nbsp; Esc Close
      </p>
    </div>
  );
}

// ─── Icon helpers ─────────────────────────────────────────────────────────────

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5,3 19,12 5,21" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15,18 9,12 15,6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9,18 15,12 9,6" />
    </svg>
  );
}
