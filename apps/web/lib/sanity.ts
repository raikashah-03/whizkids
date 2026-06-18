import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "hquxk5ou"

export const client = createClient({
  projectId: projectId,
  dataset: "production",
  apiVersion: "2024-04-24",
  useCdn: false, // Use false for fresh data in server components
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
