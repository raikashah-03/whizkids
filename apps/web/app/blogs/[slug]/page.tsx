import BlogDetailsContent from "@/components/BlogDetailsContent";
import BlogsBreadCrumb from "@/components/BlogsBreadCrumb";
import { client } from "@/lib/sanity";
import { Metadata } from "next";
import { PortableTextBlock } from "next-sanity";
import Image from "next/image";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

interface BlogSectionData {
  title?: string;
  content: PortableTextBlock; // PortableText blocks
}

interface BlogSuggestion {
  title: string;
  author: string;
  _createdAt: string;
  slug: { current: string };
  mainImageUrl: string;
}

export interface BlogFull {
  _id: string;
  _createdAt: string;
  title: string;
  overview?: string;
  author: string;
  category: string;
  readTime?: number;
  slug: { current: string };
  mainImageUrl: string;
  metaDescription?: string;
  metaKeywords?: string[];
  sections?: BlogSectionData[];
  body?: any[];
}

async function getBlog(slug: string): Promise<BlogFull | null> {
  return client.fetch(
    `*[_type == "blog" && slug.current == $slug][0] {
      ...,
      "mainImageUrl": mainImage.asset->url
    }`,
    { slug }
  );
}

async function getSuggestions(currentId: string): Promise<BlogSuggestion[]> {
  return client.fetch(
    `*[_type == "blog" && _id != $currentId] | order(_createdAt desc)[0...5] {
      title,
      author,
      _createdAt,
      slug,
       "mainImageUrl": mainImage.asset->url
    }`,
    { currentId }
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return { title: "Blog Not Found" };

  const description = blog.metaDescription || blog.overview;
  const images = blog.mainImageUrl ? [blog.mainImageUrl] : ["/images/home-page-screenshot.png"];

  return {
    title: blog.title,
    description: description,
    keywords: blog.metaKeywords,
    openGraph: {
      title: blog.title,
      description: description,
      url: `https://whizkidsinternational.in/blogs/${slug}`,
      siteName: "Whizkids International Preschool",
      images: images.map(url => ({
        url,
        width: 1200,
        height: 630,
        alt: blog.title,
      })),
      locale: "en_IN",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: description,
      images: images,
    },
  };
}

export default async function BlogDetailsPage({ params }: Props): Promise<React.JSX.Element> {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold italic text-gray-400">Blog post not found. ✨</h1>
      </div>
    );
  }

  const suggestions = await getSuggestions(blog._id);

  return (
    <main className="bg-[#FBFBFB] min-h-screen">
      {/* ── Compact Header Section ── */}
      <BlogsBreadCrumb blog={blog} />

      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* ── Left: Blog Content ── */}
          <div className="lg:col-span-8">
            <div className="border border-gray-50 overflow-hidden">

              <div className="blog-content prose-sm md:prose-base max-w-none text-gray-600 leading-relaxed">
                {blog.sections?.map((section, idx) => (
                  <div key={idx} className="mb-10">
                    {section.title && (
                      <h2 className="text-2xl font-black text-gray-900 mb-6 font-dynapuff">
                        {section.title}
                      </h2>
                    )}
                    <BlogDetailsContent content={section.content} />
                  </div>
                ))}

                {!blog.sections && blog.body && (
                  <BlogDetailsContent content={blog.body} />
                )}
              </div>
            </div>
          </div>

          {/* ── Right: Sidebar Suggestions ── */}
          <aside className="lg:col-span-4 lg:sticky lg:top-32 self-start">
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-8 w-1.5 bg-primary rounded-full" />
                <h3 className="text-xl font-black text-gray-900 font-dynapuff">Latest Stories</h3>
              </div>

              <div className="flex flex-col gap-6">
                {suggestions.map((item) => (
                  <Link
                    key={item.slug.current}
                    href={`/blogs/${item.slug.current}`}
                    className="group flex gap-4 p-4 rounded-3xl transition-all hover:bg-white hover:shadow-lg hover:shadow-gray-200/50"
                  >
                    {item.mainImageUrl && (
                      <div className="relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden bg-gray-100">
                        <Image
                          src={item.mainImageUrl}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-110"
                        />
                      </div>
                    )}
                    <div className="flex flex-col justify-center gap-1">
                      <h4 className="text-sm font-black text-gray-900 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
                        <span>{item.author || "Admin"}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-200" />
                        <span>
                          {new Date(item._createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short"
                          })}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Explore More Button */}
              <Link
                href="/blogs"
                className="mt-4 flex items-center justify-center py-4 rounded-2xl bg-gray-50 text-xs font-black text-gray-600 transition-all hover:bg-primary hover:text-white"
              >
                View All Highlights
              </Link>
            </div>
          </aside>

        </div>
      </section>
    </main>
  );
}
