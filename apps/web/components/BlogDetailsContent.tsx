import Image from "next/image";
import { PortableText, type PortableTextComponents } from "next-sanity";
import { urlFor } from "@/lib/sanity";

interface BlogDetailsContentProps {
  content: any; // Using 'any' for portable text blocks from Sanity
}

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-6 text-gray-700 leading-relaxed text-lg md:text-xl font-medium">
        {children}
      </p>
    ),
    h1: ({ children }) => (
      <h1 className="mt-12 mb-8 font-black text-4xl md:text-5xl text-gray-900 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 mb-6 font-black text-3xl md:text-4xl text-gray-900">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-4 font-black text-2xl md:text-3xl text-gray-900">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-10 border-l-8 border-primary bg-primary/5 p-8 rounded-2xl text-xl md:text-2xl text-gray-800 italic font-bold">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-8 ml-6 list-disc space-y-4 text-lg md:text-xl text-gray-700 font-medium">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-8 ml-6 list-decimal space-y-4 text-lg md:text-xl text-gray-700 font-medium">{children}</ol>
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
        <div className="my-12 overflow-hidden rounded-[3rem] shadow-xl border-4 border-white">
          <Image
            alt={value.alt || "Blog visual"}
            className="h-auto w-full object-cover"
            height={800}
            src={urlFor(value).url()}
            width={1200}
          />
          {value.alt && (
            <p className="mt-4 text-center text-gray-500 text-sm font-bold italic">
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
