import BlogCard from "@/components/BlogCard";
import BlogDetailsContent from "@/components/BlogDetailsContent";
import BreadCrumb from "@/components/BreadCrumb";
import Heading from "@/components/Headding";
import { client } from "@/lib/sanity";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getBlog(slug: string) {
  return client.fetch(
    `*[_type == "blog" && slug.current == $slug][0] {
      ...,
      "mainImageUrl": mainImage.asset->url
    }`,
    { slug }
  );
}

async function getMoreBlogs(currentId: string) {
  return client.fetch(
    `*[_type == "blog" && _id != $currentId] | order(_createdAt desc)[0...3]`,
    { currentId }
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return { title: "Blog Not Found" };

  return {
    title: `${blog.title} | Whizkids Blog`,
    description: blog.metaDescription || blog.overview,
    keywords: blog.metaKeywords,
  };
}

export default async function BlogDetailsPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Blog post not found.</h1>
      </div>
    );
  }

  const moreBlogs = await getMoreBlogs(blog._id);

  const colorSchemes = [
    { bg: "#FDE9E9", text: "#D04141", pill: "#D04141" },
    { bg: "#E9FDEE", text: "#41D05C", pill: "#41D05C" },
    { bg: "#E9F2FD", text: "#4180D0", pill: "#4180D0" },
  ];

  return (
    <main className="bg-[#FBFBFB]">
      {/* ── Breadcrumb Section ── */}
      <BreadCrumb
        heading={{
          main: blog.title,
          span: blog.category || "Our Stories",
        }}
        description={blog.overview}
        mainImage={blog.mainImageUrl}
      />

      <article className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Main Content Area */}
          <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl shadow-gray-200/50 mb-20">
            {/* Metadata Bar */}
            <div className="flex flex-wrap items-center gap-6 mb-12 pb-8 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black">
                  {blog.author?.[0] || "A"}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Written by</span>
                  <span className="text-sm font-black text-gray-900">{blog.author || "Admin"}</span>
                </div>
              </div>

              <div className="h-8 w-px bg-gray-100 hidden md:block" />

              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Published on</span>
                <span className="text-sm font-black text-gray-900">
                  {new Date(blog._createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  })}
                </span>
              </div>

              {blog.readTime && (
                <>
                  <div className="h-8 w-px bg-gray-100 hidden md:block" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Read Time</span>
                    <span className="text-sm font-black text-gray-900">{blog.readTime} mins</span>
                  </div>
                </>
              )}
            </div>

            {/* Dynamic Content Rendering */}
            <div className="blog-content">
              {blog.sections?.map((section: any, idx: number) => (
                <div key={idx} className="mb-12">
                  {section.title && (
                    <h2 className="text-3xl font-black text-gray-900 mb-6 font-dynapuff tracking-tight">
                      {section.title}
                    </h2>
                  )}
                  <BlogDetailsContent content={section.content} />
                </div>
              ))}

              {/* Fallback to legacy structure if needed or if content is directly in body */}
              {!blog.sections && blog.body && (
                <BlogDetailsContent content={blog.body} />
              )}
            </div>
          </div>

          {/* More Stories Section */}
          {moreBlogs.length > 0 && (
            <div className="mt-32">
              <div className="text-center mb-16">
                <Heading
                  headingText="Keep Exploring"
                  spanText="More Stories"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                {moreBlogs.map((item: any, idx: number) => (
                  <BlogCard
                    key={item._id}
                    blog={item}
                    colorScheme={colorSchemes[idx % colorSchemes.length]}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </main>
  );
}
