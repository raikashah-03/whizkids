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

// Gradient backgrounds used while images load / on error
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

// Initial grid items & load-more batch size
const PAGE_SIZE = 9;

// ─── Gallery Card ─────────────────────────────────────────────────────────────

interface CardProps {
  item: GalleryItem;
  index: number;       // position in the displayed subset (used for priority)
  onClick: () => void;
}

function GalleryCard({ item, index, onClick }: CardProps) {
  const [errored, setErrored] = useState(false);
  const src = typeof item.image === "string" ? item.image : (item.image as { src: string }).src;
  const emoji = CATEGORY_EMOJIS[item.category];

  console.log(src, '---source---')

  // Only mark the first 3 visible cards as priority (LCP candidates)
  const isPriority = index < 3;

  return (
    <div
      className="gallery-card"
      style={{ background: CATEGORY_GRADIENTS[item.category] }}
      onClick={onClick}
      role="button"
      aria-label={`Open image: ${item.note ?? item.category}`}
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick()}
    >
      <div className="gallery-card__img-wrap">
        {!errored ? (
          <Image
            src={src}
            alt={item.note ?? item.category}
            fill
            priority={isPriority}
            loading={isPriority ? "eager" : "lazy"}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="gallery-card__img"
            onError={() => {
              console.log('---error---')
              setErrored(true)
            }}
          />
        ) : (
          <div className="gallery-card__placeholder">
            <span className="gallery-card__placeholder-emoji">{emoji}</span>
          </div>
        )}
      </div>

      {/* Note badge */}
      {item.note && (
        <span className="gallery-card__note">
          <span aria-hidden="true" className="gallery-card__note-icon">{emoji}</span>
          {item.note}
        </span>
      )}

      {/* Hover zoom icon */}
      <span className="gallery-card__zoom" aria-hidden="true">
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

  // The full filtered list (used by both the grid and lightbox for navigation)
  const filtered =
    activeTab === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeTab);

  const displayed = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  // ── handlers ───────────────────────────────────────────────────────────────

  const handleTabChange = useCallback((tab: Tab) => {
    setActiveTab(tab);
    setVisibleCount(PAGE_SIZE);
    setLightboxIdx(null);
  }, []);

  const handleLoadMore = useCallback(() => {
    setLoadingMore(true);
    // Small artificial delay so the spinner shows (images are lazily fetched)
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filtered.length));
      setLoadingMore(false);
    }, 600);
  }, [filtered.length]);

  // Open lightbox at the absolute position in `filtered`, not `displayed`
  const openLightbox = useCallback((displayedIdx: number) => {
    setLightboxIdx(displayedIdx);
  }, []);

  return (
    <>
      <section aria-label="Gallery" className="gallery-section">
        <div className="container">

          {/* ── Filter tabs ── */}
          <div
            className="gallery-tabs"
            role="tablist"
            aria-label="Filter gallery by category"
          >
            {TABS.map((tab) => (
              <button
                key={tab.key}
                role="tab"
                id={`gallery-tab-${tab.key.toLowerCase().replace(/\s/g, "-")}`}
                aria-selected={activeTab === tab.key}
                aria-controls="gallery-grid"
                onClick={() => handleTabChange(tab.key)}
                className={`gallery-tab${activeTab === tab.key ? " gallery-tab--active" : ""}`}
                style={activeTab === tab.key ? { background: tab.color, borderColor: tab.color } : {}}
              >
                <span aria-hidden="true">{tab.emoji}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* ── Result count ── */}
          <p className="gallery-result-count" aria-live="polite">
            Showing <strong>{displayed.length}</strong> of <strong>{filtered.length}</strong> photos
          </p>

          {/* ── Grid ── */}
          <div
            id="gallery-grid"
            role="tabpanel"
            aria-label={`${activeTab} photos`}
            className="gallery-grid"
          >
            {displayed.map((item, idx) => (
              <GalleryCard
                key={`${item.category}-${idx}-${activeTab}`}
                item={item}
                index={idx}
                onClick={() => openLightbox(idx)}
              />
            ))}
          </div>

          {/* ── Empty state ── */}
          {displayed.length === 0 && (
            <p className="gallery-empty">
              No photos yet in this category — check back soon! 🌈
            </p>
          )}

          {/* ── Load More ── */}
          {hasMore && (
            <div className="gallery-load-more-wrap">
              <span aria-hidden="true" className="gallery-deco gallery-deco--left">
                <svg width="40" height="14" viewBox="0 0 40 14" fill="none">
                  <path d="M2 7 Q10 1 18 7 Q26 13 34 7" stroke="#FDA924" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                </svg>
              </span>

              <button
                id="gallery-load-more-btn"
                className="gallery-load-more-btn"
                onClick={handleLoadMore}
                disabled={loadingMore}
                aria-live="polite"
                aria-label="Load more gallery photos"
              >
                {loadingMore ? (
                  <>
                    <span className="gallery-spinner" aria-hidden="true" />
                    Loading…
                  </>
                ) : (
                  <>
                    <span aria-hidden="true">🖼️</span>
                    Load More Photos
                    <span aria-hidden="true" className="gallery-load-more-arrow">▶</span>
                  </>
                )}
              </button>

              <span aria-hidden="true" className="gallery-deco gallery-deco--right">
                <svg width="40" height="14" viewBox="0 0 40 14" fill="none">
                  <path d="M6 7 Q14 13 22 7 Q30 1 38 7" stroke="#FDA924" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                </svg>
              </span>
            </div>
          )}

        </div>
      </section>

      {/* ── Lightbox (portal-style: renders outside section) ── */}
      {lightboxIdx !== null && (
        <GalleryLightbox
          items={displayed}           // navigate only within what's visible
          initialIndex={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
        />
      )}
    </>
  );
}
