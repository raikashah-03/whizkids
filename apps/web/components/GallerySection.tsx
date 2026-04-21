"use client";

import GalleryLightbox from "@/components/GalleryLightbox";
import { GalleryCategory, GalleryItem, galleryItems } from "@/utils/gallery";
import Image from "next/image";
import { useCallback, useState } from "react";

// ─── Config ──────────────────────────────────────────────────────────────────

type Tab = "All" | GalleryCategory;

interface TabConfig {
  key: Tab;
  label: string;
  emoji: string;
  color: string;
}

const TABS: TabConfig[] = [
  { key: "All", label: "All Moments", emoji: "🎉", color: "#FDA924" },
  { key: "Classrooms", label: "Classroom", emoji: "📖", color: "#29BFDF" },
  { key: "Activities", label: "Activities", emoji: "🌟", color: "#FF8C4B" },
  { key: "Outdoor", label: "Outdoor Fun", emoji: "☀️", color: "#3DD67A" },
  { key: "Events", label: "Events", emoji: "🎈", color: "#9B5FFF" },
];

const CATEGORY_GRADIENTS: Record<GalleryCategory, string> = {
  Classrooms: "linear-gradient(135deg,#B8D9EF 0%,#29BFDF25 100%)",
  Activities: "linear-gradient(135deg,#FFD6B8 0%,#FF8C4B25 100%)",
  Events: "linear-gradient(135deg,#D6C2FF 0%,#9B5FFF25 100%)",
  Outdoor: "linear-gradient(135deg,#C8F0D6 0%,#3DD67A25 100%)",
};

const CATEGORY_EMOJIS: Record<GalleryCategory, string> = {
  Classrooms: "📖",
  Activities: "🌟",
  Events: "🎈",
  Outdoor: "☀️",
};

const PAGE_SIZE = 9;

// ─── Gallery Card ─────────────────────────────────────────────────────────────

interface CardProps {
  item: GalleryItem;
  index: number;
  spanTwo: boolean;
  onClick: () => void;
}

function GalleryCard({ item, index, spanTwo, onClick }: CardProps) {
  const [errored, setErrored] = useState(false);
  const src = typeof item.image === "string" ? item.image : (item.image as { src: string }).src;
  const emoji = CATEGORY_EMOJIS[item.category];
  const isPriority = index < 3;

  return (
    <div
      className={[
        "group relative rounded-[1.25rem] overflow-hidden min-h-[220px] cursor-pointer",
        "shadow-[0_4px_18px_rgba(0,0,0,0.1)] transition-all duration-300",
        "hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_12px_32px_rgba(0,0,0,0.18)]",
        spanTwo ? "lg:row-span-2" : "",
      ].join(" ")}
      style={{ background: CATEGORY_GRADIENTS[item.category] }}
      onClick={onClick}
      role="button"
      aria-label={`Open image: ${item.note ?? item.category}`}
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick()}
    >
      {/* Image */}
      <div className="absolute inset-0">
        {!errored ? (
          <Image
            src={src}
            alt={item.note ?? item.category}
            fill
            priority={isPriority}
            loading={isPriority ? "eager" : "lazy"}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.07]"
            onError={() => setErrored(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl opacity-40">{emoji}</span>
          </div>
        )}
      </div>

      {/* Gradient overlay (bottom fade) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%)" }}
      />

      {/* Note badge */}
      {item.note && (
        <span className="absolute bottom-3 left-3 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-foreground bg-white/90 backdrop-blur-sm shadow-[0_2px_8px_rgba(0,0,0,0.15)] whitespace-nowrap">
          <span aria-hidden="true" className="text-[0.85rem]">{emoji}</span>
          {item.note}
        </span>
      )}

      {/* Hover zoom icon */}
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 scale-[0.6] w-12 h-12 rounded-full bg-white/90 flex items-center justify-center opacity-0 text-foreground pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:scale-100"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="11" y1="8" x2="11" y2="14" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      </span>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function GallerySection() {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filtered =
    activeTab === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeTab);

  const displayed = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleTabChange = useCallback((tab: Tab) => {
    setActiveTab(tab);
    setVisibleCount(PAGE_SIZE);
    setLightboxIdx(null);
  }, []);

  const handleLoadMore = useCallback(() => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filtered.length));
      setLoadingMore(false);
    }, 600);
  }, [filtered.length]);

  const openLightbox = useCallback((displayedIdx: number) => {
    setLightboxIdx(displayedIdx);
  }, []);

  return (
    <>
      <section
        aria-label="Gallery"
        style={{ background: "linear-gradient(to bottom, #ffffff, var(--skyblue-light), var(--background))" }}
      >
        <div className="container">

          {/* ── Filter tabs ── */}
          <div
            className="flex flex-wrap gap-2 justify-center mb-10"
            role="tablist"
            aria-label="Filter gallery by category"
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  role="tab"
                  id={`gallery-tab-${tab.key.toLowerCase().replace(/\s/g, "-")}`}
                  aria-selected={isActive}
                  aria-controls="gallery-grid"
                  onClick={() => handleTabChange(tab.key)}
                  className={[
                    "inline-flex items-center gap-1.5 px-5 py-2 rounded-full border-2 font-display text-sm font-semibold cursor-pointer",
                    "shadow-[0_2px_8px_rgba(0,0,0,0.07)] transition-all duration-200",
                    isActive
                      ? "text-white border-transparent"
                      : "bg-white text-foreground border-transparent hover:bg-skyblue hover:shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:-translate-y-0.5",
                  ].join(" ")}
                  style={isActive ? { background: tab.color, borderColor: tab.color } : {}}
                >
                  <span aria-hidden="true">{tab.emoji}</span>
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* ── Result count ── */}
          <p className="text-center text-sm text-foreground/55 -mt-4 mb-6" aria-live="polite">
            Showing <strong>{displayed.length}</strong> of <strong>{filtered.length}</strong> photos
          </p>

          {/* ── Grid ── */}
          <div
            id="gallery-grid"
            role="tabpanel"
            aria-label={`${activeTab} photos`}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {displayed.map((item, idx) => (
              <GalleryCard
                key={`${item.category}-${idx}-${activeTab}`}
                item={item}
                index={idx}
                spanTwo={(idx % 4 === 0)}
                onClick={() => openLightbox(idx)}
              />
            ))}
          </div>

          {/* ── Empty state ── */}
          {displayed.length === 0 && (
            <p className="text-center text-foreground/55 mt-8 text-base">
              No photos yet in this category — check back soon! 🌈
            </p>
          )}

          {/* ── Load More ── */}
          {hasMore && (
            <div className="flex items-center justify-center gap-4 mt-10 relative">
              {/* Left squiggle */}
              <span aria-hidden="true" className="flex items-center opacity-75 animate-drift -scale-x-100">
                <svg width="40" height="14" viewBox="0 0 40 14" fill="none">
                  <path d="M2 7 Q10 1 18 7 Q26 13 34 7" stroke="#FDA924" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                </svg>
              </span>

              <button
                id="gallery-load-more-btn"
                className={[
                  "inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-primary font-display font-bold text-base cursor-pointer text-foreground",
                  "shadow-[0_4px_16px_rgba(253,169,36,0.2)] transition-all duration-200",
                  "hover:bg-primary hover:text-white hover:shadow-[0_6px_22px_rgba(253,169,36,0.45)] hover:-translate-y-0.5",
                  "disabled:opacity-70 disabled:cursor-not-allowed",
                ].join(" ")}
                onClick={handleLoadMore}
                disabled={loadingMore}
                aria-live="polite"
                aria-label="Load more gallery photos"
              >
                {loadingMore ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="inline-block w-[18px] h-[18px] border-[2.5px] border-primary border-t-transparent rounded-full animate-spin"
                    />
                    Loading…
                  </>
                ) : (
                  <>
                    <span aria-hidden="true">🖼️</span>
                    Load More Photos
                    <span aria-hidden="true" className="text-[0.7rem] opacity-70">▶</span>
                  </>
                )}
              </button>

              {/* Right squiggle */}
              <span aria-hidden="true" className="flex items-center opacity-75 animate-drift">
                <svg width="40" height="14" viewBox="0 0 40 14" fill="none">
                  <path d="M6 7 Q14 13 22 7 Q30 1 38 7" stroke="#FDA924" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                </svg>
              </span>
            </div>
          )}

        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightboxIdx !== null && (
        <GalleryLightbox
          items={displayed}
          initialIndex={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
        />
      )}
    </>
  );
}
