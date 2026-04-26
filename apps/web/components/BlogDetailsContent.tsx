import { urlFor } from "@/lib/sanity";
import { PortableText, type PortableTextComponents } from "next-sanity";
import Image from "next/image";

interface BlogDetailsContentProps {
  content: any; // Using 'any' for portable text blocks from Sanity
}

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-6 text-gray-700 leading-relaxed text-sm md:text-lg font-medium">
        {children}
      </p>
    ),
    h1: ({ children }) => (
      <h1 className="mt-12 mb-8 font-black text-2xl md:text-3xl text-gray-900 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-8 mb-4 font-black text-xl md:text-2xl text-gray-900 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 mb-3 font-black text-lg md:text-xl text-gray-900 leading-tight">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-6 border-primary bg-primary/5 p-6 rounded-xl text-base md:text-lg text-gray-800 italic font-bold">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 ml-5 list-disc space-y-2 text-sm md:text-lg text-gray-700 font-medium">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-6 ml-5 list-decimal space-y-2 text-sm md:text-lg text-gray-700 font-medium">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-black text-gray-900">{children}</strong>,
    em: ({ children }) => <em className="italic opacity-90">{children}</em>,
    link: ({ children, value }) => (
      <a
        className="text-primary underline font-bold transition-all hover:text-primary/80"
        href={value?.href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <div className="my-8 overflow-hidden rounded-[2.5rem] shadow-lg border-4 border-white">
          <Image
            alt={value.alt || "Blog visual"}
            className="h-auto w-full object-cover"
            height={800}
            src={urlFor(value).url()}
            width={1200}
          />
          {value.alt && (
            <p className="mt-3 text-center text-gray-500 text-xs font-bold italic">
              {value.alt}
            </p>
          )}
        </div>
      );
    },
  },
};

const BlogDetailsContent = ({ content }: BlogDetailsContentProps): React.JSX.Element => {
  if (!content || !Array.isArray(content)) return <></>;

  return (
    <div className="max-w-none prose prose-p:font-nunito prose-headings:font-dynapuff">
      <PortableText value={content} components={portableTextComponents} />
    </div>
  );
};

export default BlogDetailsContent;
