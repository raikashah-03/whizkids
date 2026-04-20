"use client";

import { GalleryItem, GalleryCategory } from "@/utils/gallery";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

// ─── Config ───────────────────────────────────────────────────────────────────

const AUTOPLAY_MS = 3500;

const CATEGORY_COLORS: Record<GalleryCategory, string> = {
  Classrooms: "#29BFDF",
  Activities: "#FF8C4B",
  Events:     "#9B5FFF",
  Outdoor:    "#3DD67A",
};

const CATEGORY_EMOJIS: Record<GalleryCategory, string> = {
  Classrooms: "📖",
  Activities: "🌟",
  Events:     "🎈",
  Outdoor:    "☀️",
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
  const [animKey, setAnimKey] = useState(0); // bump to re-trigger CSS anim
  const [thumbErr, setThumbErr] = useState<Record<number, boolean>>({});
  const [mainErr, setMainErr]   = useState(false);

  const timerRef     = useRef<ReturnType<typeof setInterval> | null>(null);
  const thumbRef     = useRef<HTMLDivElement>(null);
  const touchStartX  = useRef(0);

  const total = items.length;

  // ─── Navigation ────────────────────────────────────────────────────────────

  const navigate = useCallback((newIdx: number, dir: "left" | "right") => {
    setSlideDir(dir);
    setAnimKey((k) => k + 1);
    setMainErr(false);
    setCurrent(newIdx);
  }, []);

  const goPrev = useCallback(() => {
    navigate((current - 1 + total) % total, "left");
  }, [current, total, navigate]);

  const goNext = useCallback(() => {
    navigate((current + 1) % total, "right");
  }, [current, total, navigate]);

  const goTo = useCallback((idx: number) => {
    navigate(idx, idx > current ? "right" : "left");
  }, [current, navigate]);

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

  useEffect(() => {
    if (isPlaying) startPlay(); else stopPlay();
    return stopPlay;
  }, [isPlaying, startPlay, stopPlay]);

  // ─── Keyboard ──────────────────────────────────────────────────────────────

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")      onClose();
      if (e.key === "ArrowLeft")   goPrev();
      if (e.key === "ArrowRight")  goNext();
      if (e.key === " ")           { e.preventDefault(); setIsPlaying((p) => !p); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext, onClose]);

  // ─── Scroll active thumb into view ─────────────────────────────────────────

  useEffect(() => {
    const el = thumbRef.current?.querySelector<HTMLElement>(".lb-thumb--active");
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [current]);

  // ─── Body scroll lock ──────────────────────────────────────────────────────

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // ─── Touch / swipe ─────────────────────────────────────────────────────────

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? 0;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - (e.changedTouches[0]?.clientX ?? 0);
    if (Math.abs(diff) > 50) { if (diff > 0) goNext(); else goPrev(); }
  };

  // ─── Derived ───────────────────────────────────────────────────────────────

  const item = items[current];

  // Bail out if the index is somehow out of bounds (shouldn't happen, but keeps TS happy)
  if (!item) return null;

  const src      = typeof item.image === "string" ? item.image : (item.image as { src: string }).src;
  const catColor = CATEGORY_COLORS[item.category];
  const catEmoji = CATEGORY_EMOJIS[item.category];

  return (
    <div
      className="lb-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox viewer"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* ── Top bar ── */}
      <div className="lb-topbar">
        {/* Category badge */}
        <span className="lb-category-badge" style={{ background: catColor }}>
          <span aria-hidden="true">{catEmoji}</span>
          {item.category}
        </span>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Counter */}
        <span className="lb-counter" aria-live="polite">{current + 1} / {total}</span>

        {/* Autoplay toggle */}
        <button
          id="lb-play-btn"
          className={`lb-play-btn${isPlaying ? " lb-play-btn--active" : ""}`}
          onClick={() => setIsPlaying((p) => !p)}
          aria-label={isPlaying ? "Pause slideshow" : "Start slideshow"}
          title={isPlaying ? "Pause (Space)" : "Slideshow (Space)"}
        >
          {isPlaying
            ? <PauseIcon />
            : <PlayIcon />}
          <span className="lb-play-label">{isPlaying ? "Pause" : "Slideshow"}</span>
        </button>

        {/* Close */}
        <button
          id="lb-close-btn"
          className="lb-close-btn"
          onClick={onClose}
          aria-label="Close lightbox (Esc)"
          title="Close (Esc)"
        >
          <CloseIcon />
        </button>
      </div>

      {/* ── Stage ── */}
      <div
        className="lb-stage"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Prev arrow */}
        <button
          id="lb-prev-btn"
          className="lb-arrow lb-arrow--prev"
          onClick={goPrev}
          aria-label="Previous image (←)"
          title="Previous (←)"
        >
          <ChevronLeftIcon />
        </button>

        {/* Main image */}
        <div className={`lb-img-wrap lb-slide-${slideDir}`} key={animKey}>
          {!mainErr ? (
            <Image
              src={src}
              alt={item.note ?? item.category}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 80vw"
              className="lb-img"
              onError={() => setMainErr(true)}
            />
          ) : (
            <div className="lb-img-fallback">
              <span style={{ fontSize: "4rem" }}>{catEmoji}</span>
              <span style={{ color: "rgba(255,255,255,0.5)", marginTop: "0.5rem", fontSize: "0.9rem" }}>
                Image unavailable
              </span>
            </div>
          )}
        </div>

        {/* Next arrow */}
        <button
          id="lb-next-btn"
          className="lb-arrow lb-arrow--next"
          onClick={goNext}
          aria-label="Next image (→)"
          title="Next (→)"
        >
          <ChevronRightIcon />
        </button>
      </div>

      {/* ── Caption ── */}
      {item.note && (
        <div className="lb-caption">
          <span className="lb-caption__note">{item.note}</span>
        </div>
      )}

      {/* ── Autoplay progress bar ── */}
      {isPlaying && (
        <div className="lb-progress" key={`progress-${current}`}>
          <div
            className="lb-progress__fill"
            style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
          />
        </div>
      )}

      {/* ── Thumbnail strip ── */}
      <div className="lb-thumbs-wrap" ref={thumbRef} role="list" aria-label="Image thumbnails">
        {items.map((t, idx) => {
          const tsrc = typeof t.image === "string" ? t.image : (t.image as { src: string }).src;
          return (
            <button
              key={idx}
              role="listitem"
              className={`lb-thumb${idx === current ? " lb-thumb--active" : ""}`}
              onClick={() => goTo(idx)}
              aria-label={`Go to image ${idx + 1}${t.note ? `: ${t.note}` : ""}`}
              aria-current={idx === current}
              style={idx === current ? { borderColor: catColor } : {}}
            >
              {!thumbErr[idx] ? (
                <Image
                  src={tsrc}
                  alt={t.note ?? t.category}
                  fill
                  sizes="72px"
                  loading="lazy"
                  className="lb-thumb__img"
                  onError={() => setThumbErr((e) => ({ ...e, [idx]: true }))}
                />
              ) : (
                <span className="lb-thumb__fallback">{CATEGORY_EMOJIS[t.category]}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Keyboard hint ── */}
      <p className="lb-hint" aria-hidden="true">
        ← → Navigate &nbsp;·&nbsp; Space Slideshow &nbsp;·&nbsp; Esc Close
      </p>
    </div>
  );
}

// ─── Icon helpers ─────────────────────────────────────────────────────────────

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5,3 19,12 5,21"/>
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16"/>
      <rect x="14" y="4" width="4" height="16"/>
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15,18 9,12 15,6"/>
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9,18 15,12 9,6"/>
    </svg>
  );
}
