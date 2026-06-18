import { Metadata } from "next";
import AwardsPageClient from "./AwardsPageClient";
import { client } from "@/lib/sanity";
import { AWARDS, mapSanityAward } from "@/config/awards";
import React from "react";

export const metadata: Metadata = {
  title: "Awards & Recognition | Whizkids International Preschool Jayamahal",
  description: "Explore the prestigious awards, honors, and certifications received by Whizkids International Preschool Jayamahal for educational excellence, innovation, and safety.",
  keywords: [
    "Whizkids awards",
    "preschool recognition",
    "Jayamahal preschool honors",
    "educational excellence awards",
    "best school award",
  ],
};

export default async function AwardsPage(): Promise<React.JSX.Element> {
  let awardsList = AWARDS;
  try {
    const sanityAwards = await client.fetch(
      `*[_type == "award"] | order(year desc, _createdAt desc)`,
      {},
      { next: { revalidate: 60 } }
    );
    if (sanityAwards && sanityAwards.length > 0) {
      awardsList = sanityAwards.map(mapSanityAward);
    }
  } catch (error) {
    console.error("Failed to fetch awards from Sanity:", error);
  }

  return <AwardsPageClient initialAwards={awardsList} />;
}
