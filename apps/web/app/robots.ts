import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"], // Disallow API routes and admin panels if any
    },
    sitemap: "https://whizkidsinternational.in/sitemap.xml",
  };
}
