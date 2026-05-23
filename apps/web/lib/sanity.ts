import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "hquxk5ou",
  dataset: "production",
  apiVersion: "2024-04-24",
  useCdn: false, // Use false for fresh data in server components
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
