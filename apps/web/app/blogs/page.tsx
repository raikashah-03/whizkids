import BlogGrid from "@/components/BlogGrid";
import { Blog } from "@/components/BlogSection";
import BreadCrumb from "@/components/BreadCrumb";
import { client } from "@/lib/sanity";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights & Stories",
  description: "Explore the latest parenting tips, early childhood education insights, and school updates from the Whizkids International Preschool Jayamahal community.",
  keywords: [
    "preschool blog",
    "parenting tips",
    "early education insights",
    "Whizkids news",
    "child development stories",
    "learning activities for kids",
  ],
  openGraph: {
    title: "The Whizkids Blog | Stories that Inspire",
    description: "Heartwarming stories and professional insights from the world of Whizkids International Preschool Jayamahal.",
    url: "https://whizkidsinternational.in/blogs",
    siteName: "Whizkids International Preschool",
    images: [
      {
        url: "/images/home-page-screenshot.png",
        width: 1200,
        height: 630,
        alt: "Whizkids International Preschool Jayamahal",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Whizkids Blog | Stories that Inspire",
    description: "Heartwarming stories and professional insights from the world of Whizkids International Preschool Jayamahal.",
    images: ["/images/home-page-screenshot.png"],
  },
};

async function getInitialBlogs() {
  return client.fetch(
    `*[_type == "blog"] | order(_createdAt desc)[0...10] {
      _id,
      _createdAt,
      title,
      author,
      category,
      slug,
      blogsCardImage
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

async function getTotalCount() {
  return client.fetch(`count(*[_type == "blog"])`, {}, { next: { revalidate: 3600 } });
}

export default async function BlogListPage(): Promise<React.JSX.Element> {
  const initialBlogs: Blog[] = await getInitialBlogs();
  const totalCount: number = await getTotalCount();

  return (
    <main className="bg-[#FBFBFB]">
      <BreadCrumb
        heading={{
          main: "Blog & Insights",
          span: "Our Stories",
        }}
        description="Stay updated with the latest happenings, educational tips, and heartwarming stories from our community."
      />

      <section className="container mx-auto px-4 py-24">
        <BlogGrid initialBlogs={initialBlogs} totalCount={totalCount} />
      </section>
    </main>
  );
}
