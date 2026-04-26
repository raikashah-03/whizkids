import { urlFor } from "@/lib/sanity";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Blog } from "./BlogSection";


interface BlogCardProps {
  blog: Blog;
  colorScheme?: {
    bg: string;
    text: string;
    pill: string;
  };
}

const BlogCard = ({ blog, colorScheme }: BlogCardProps): React.JSX.Element => {
  const formattedDate = new Date(blog._createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <Link href={`/blogs/${blog.slug.current}`} className="group block h-full">
      <div
        className="rounded-[3rem] h-full transition-all duration-500  hover:-translate-y-2 flex flex-col"
      >
        {/* Card Image Section */}
        <div className="relative aspect-4/3 rounded-[2.5rem] overflow-hidden border-4 border-white transition-transform duration-700 w-[95%] mx-auto -mb-3">
          {blog.blogsCardImage ? (
            <Image
              src={urlFor(blog.blogsCardImage).url()}
              alt={blog.blogsCardImage.alt || blog.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-300">No Image</span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex w-full items-center justify-between h-auto">
          <svg xmlns="http://www.w3.org/2000/svg" width="54" height="47" viewBox="0 0 54 47" fill="none">
            <path d="M0 0V45.5C21.1667 46.8333 54 45.5 54 45.5C17.5 37 6.5 27.5 0 0Z" fill={colorScheme?.bg} />
          </svg>

          <svg xmlns="http://www.w3.org/2000/svg" width="54" height="47" viewBox="0 0 54 47" fill="none">
            <path d="M54 0V45.5C32.8333 46.8333 0 45.5 0 45.5C36.5 37 47.5 27.5 54 0Z" fill={colorScheme?.bg} />
          </svg>
        </div>
        <div className="flex-1 flex flex-col p-6 relative rounded-b-[2.5rem]" style={{ backgroundColor: colorScheme?.bg }}>
          {/* Title */}
          <h3
            className="text-xl md:text-xl font-black leading-tight mb-8 group-hover:text-primary transition-colors line-clamp-3"
            style={{ color: colorScheme?.text }}
          >
            {blog.title}
          </h3>

          {/* Footer */}
          <div className="mt-auto pt-6 border-t border-black/5 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-black opacity-90">{formattedDate}</span>
              <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest">{blog.author || "Admin"}</span>
            </div>

            <div
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-primary group-hover:text-white"
            >
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
