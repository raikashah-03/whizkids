import BlogCard from "@/components/BlogCard";
import { Blog } from "@/components/BlogSection";
import BreadCrumb from "@/components/BreadCrumb";
import { client } from "@/lib/sanity";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Whizkids Learning Center",
  description: "Explore the latest insights, stories, and parenting tips from the Whizkids family.",
};

async function getAllBlogs() {
  return client.fetch(
    `*[_type == "blog"] | order(_createdAt desc) {
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

export default async function BlogListPage(): Promise<React.JSX.Element> {
  const blogs: Blog[] = await getAllBlogs();

  const colorSchemes = [
    { bg: "#FDE9E9", text: "#D04141", pill: "#D04141" },
    { bg: "#E9FDEE", text: "#41D05C", pill: "#41D05C" },
    { bg: "#E9F2FD", text: "#4180D0", pill: "#4180D0" },
  ];

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
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {blogs.map((blog, idx) => (
              <BlogCard
                key={blog._id}
                blog={blog}
                colorScheme={colorSchemes[idx % colorSchemes.length]}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[3rem] shadow-sm border border-dashed border-gray-200">
            <h2 className="text-2xl font-bold text-gray-400 italic">No stories published yet. Stay tuned! ✨</h2>
          </div>
        )}
      </section>
    </main>
  );
}
