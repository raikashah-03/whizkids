import { StaticImageData } from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────

export type GalleryCategory = "Classrooms" | "Activities" | "Events" | "Outdoor";

export interface GalleryItem {
  image: StaticImageData | string;
  note?: string;
  category: GalleryCategory;
}

// ─── Gallery Images ────────────────────────────────────────────────────────────
// Images live in /public/gallery-images/
// Naming convention: classrooms-1.webp, activities-1.webp, events-1.webp, outdoor-1.webp … (1-10)

export const galleryItems: GalleryItem[] = [
  // ── Classrooms ──────────────────────────────────────────────────────────────
  { image: "/gallery-images/classrooms-1.webp", note: "Learning Together", category: "Classrooms" },
  { image: "/gallery-images/classrooms-2.webp", note: "Creative Thinking", category: "Classrooms" },
  { image: "/gallery-images/classrooms-3.webp", note: "Story Time", category: "Classrooms" },
  { image: "/gallery-images/classrooms-4.webp", note: "Little Artists", category: "Classrooms" },
  { image: "/gallery-images/classrooms-5.webp", note: "Guided Learning", category: "Classrooms" },
  { image: "/gallery-images/classrooms-6.webp", note: "Building Blocks", category: "Classrooms" },
  { image: "/gallery-images/classrooms-7.webp", note: "Reading Circle", category: "Classrooms" },
  { image: "/gallery-images/classrooms-8.webp", note: "Math Explorers", category: "Classrooms" },
  { image: "/gallery-images/classrooms-9.webp", note: "Science Discovery", category: "Classrooms" },
  { image: "/gallery-images/classrooms-10.webp", note: "Team Projects", category: "Classrooms" },

  // ── Activities ───────────────────────────────────────────────────────────────
  { image: "/gallery-images/activities-1.webp", note: "Creative Play", category: "Activities" },
  { image: "/gallery-images/activities-2.webp", note: "Little Scientists", category: "Activities" },
  { image: "/gallery-images/activities-3.webp", note: "Art & Craft", category: "Activities" },
  { image: "/gallery-images/activities-4.webp", note: "Music Fun", category: "Activities" },
  { image: "/gallery-images/activities-5.webp", note: "Play & Grow", category: "Activities" },
  { image: "/gallery-images/activities-6.webp", note: "Sensory Play", category: "Activities" },
  { image: "/gallery-images/activities-7.webp", note: "Building Dreams", category: "Activities" },
  { image: "/gallery-images/activities-8.webp", note: "Colour Workshop", category: "Activities" },
  { image: "/gallery-images/activities-9.webp", note: "Dance & Move", category: "Activities" },
  { image: "/gallery-images/activities-10.webp", note: "Puzzle Masters", category: "Activities" },

  // ── Events ───────────────────────────────────────────────────────────────────
  { image: "/gallery-images/events-1.webp", note: "Celebrations", category: "Events" },
  { image: "/gallery-images/events-2.webp", note: "Annual Day", category: "Events" },
  { image: "/gallery-images/events-3.webp", note: "Sports Day", category: "Events" },
  { image: "/gallery-images/events-4.webp", note: "Cultural Fest", category: "Events" },
  { image: "/gallery-images/events-5.webp", note: "Happy Birthday!", category: "Events" },
  { image: "/gallery-images/events-6.webp", note: "Graduation Day", category: "Events" },
  { image: "/gallery-images/events-7.webp", note: "Field Trip", category: "Events" },
  { image: "/gallery-images/events-8.webp", note: "Science Fair", category: "Events" },
  { image: "/gallery-images/events-9.webp", note: "Fancy Dress", category: "Events" },
  { image: "/gallery-images/events-10.webp", note: "Parent's Day", category: "Events" },

  // ── Outdoor ──────────────────────────────────────────────────────────────────
  { image: "/gallery-images/outdoor-1.webp", note: "Outdoor Adventures", category: "Outdoor" },
  { image: "/gallery-images/outdoor-2.webp", note: "Garden Explorers", category: "Outdoor" },
  { image: "/gallery-images/outdoor-3.webp", note: "Nature Walk", category: "Outdoor" },
  { image: "/gallery-images/outdoor-4.webp", note: "Playground Fun", category: "Outdoor" },
  { image: "/gallery-images/outdoor-5.webp", note: "Sports & Play", category: "Outdoor" },
  { image: "/gallery-images/outdoor-6.webp", note: "Circle Time", category: "Outdoor" },
  { image: "/gallery-images/outdoor-7.webp", note: "Mud Kitchen", category: "Outdoor" },
  { image: "/gallery-images/outdoor-8.webp", note: "Water Play", category: "Outdoor" },
  { image: "/gallery-images/outdoor-9.webp", note: "Sunny Days", category: "Outdoor" },
  { image: "/gallery-images/outdoor-10.webp", note: "Free Play", category: "Outdoor" },
];
