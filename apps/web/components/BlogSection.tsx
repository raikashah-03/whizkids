import { client } from "@/lib/sanity";
import { SanityImageAssetDocument } from "next-sanity";
import BlogCard from "./BlogCard";
import Heading from "./Headding";
import OutlineButton from "./OutlineButton";

export interface Blog {
  _id: string;
  _createdAt: string;
  title: string;
  author: string;
  category: string;
  slug: { current: string };
  blogsCardImage: SanityImageAssetDocument;
}

const BlogSection = async (): Promise<React.JSX.Element> => {
  // Fetch top 3 most recent blogs
  const blogs: Blog[] = await client.fetch(
    `*[_type == "blog"] | order(_createdAt desc)[0...3] {
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

  if (blogs.length === 0) return <></>;

  const colorSchemes = [
    { bg: "#FDE9E9", text: "#D04141", pill: "#D04141" }, // Soft Red
    { bg: "#E9FDEE", text: "#41D05C", pill: "#41D05C" }, // Soft Green
    { bg: "#E9F2FD", text: "#4180D0", pill: "#4180D0" }, // Soft Blue
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Decorative Bubbles */}
      <div className="absolute top-40 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -right-10 w-60 h-60 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <Heading
            headingText="Our Latest Stories"
            spanText="Blog & Insights"
            className="justify-center!"
          />
          <p className="mt-4 text-gray-600 mid-text-1">
            Dive into our world of early childhood education, parenting tips,
            and the wonderful adventures happening every day at Whizkids.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {blogs.map((blog, idx) => (
            <BlogCard
              key={blog._id}
              blog={blog}
              colorScheme={colorSchemes[idx % colorSchemes.length]}
            />
          ))}
        </div>

        {/* View All Action */}
        <div className="mt-16 text-center">
          <OutlineButton
            text="Explore All Stories"
            href="/blogs"
          />
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
