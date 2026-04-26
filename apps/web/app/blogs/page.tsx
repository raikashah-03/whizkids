import { Metadata } from "next";
import { client } from "@/lib/sanity";
import BreadCrumb from "@/components/BreadCrumb";
import BlogGrid from "@/components/BlogGrid";
import { Blog } from "@/components/BlogSection";

export const metadata: Metadata = {
  title: "Insights & Stories | Whizkids Blog",
  description: "Explore the latest parenting tips, early childhood education insights, and school updates from the Whizkids community. Stay informed and inspired as your child grows.",
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
    description: "Heartwarming stories and professional insights from the world of Whizkids.",
    images: ["/images/blog-og-banner.jpg"],
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
