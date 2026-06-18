import { Metadata } from "next";
import AwardsPageClient from "./AwardsPageClient";

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

export default function AwardsPage(): React.JSX.Element {
  return <AwardsPageClient />;
}
