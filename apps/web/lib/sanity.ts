import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "kem446wc",
  dataset: "production",
  apiVersion: "2024-04-24",
  useCdn: false, // Use false for fresh data in server components
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
