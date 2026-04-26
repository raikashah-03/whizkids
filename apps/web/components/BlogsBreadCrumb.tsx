import { BlogFull } from "@/app/blogs/[slug]/page"
import Image from "next/image"
import MaskedImage from "./MaskedImage"

const BlogsBreadCrumb = ({ className, blog }: { className?: string, blog: BlogFull }): React.JSX.Element => {
  return (

    <section
      aria-label="Page banner"
      className={`relative w-full overflow-hidden bg-linear-to-b from-[#B8D9EF] via-[#D6EEFA] to-white min-h-[600px] ${className}`}
    >
      <div className="absolute top-4 left-2 md:top-6 md:left-6 pointer-events-none z-0">
        <Image
          src="/icons/cloud-1.png"
          alt=""
          width={80}
          height={50}
          className="w-12 h-auto md:w-[80px] animate-float opacity-70"
          style={{ animationDelay: '2.5s' }}
        />
      </div>

      <div className="absolute top-10 left-10 md:top-14 md:left-20 pointer-events-none z-0">
        <Image
          src="/icons/cloud-2.png"
          alt=""
          width={100}
          height={60}
          className="w-14 h-auto md:w-[90px] animate-drift opacity-80"
          style={{ animationDelay: '1.2s' }}
        />
      </div>

      <div className="absolute top-0 right-0 w-auto">
        <svg xmlns="http://www.w3.org/2000/svg" width="176" height="179" viewBox="0 0 176 179" fill="none">
          <path d="M99.5 27.3834C36.5 44.3834 14.1667 17.0501 1.5 2.88344L0 0.883443C48.3333 0.216776 148 -0.716557 160 0.883443C172 2.48344 175 10.8834 175 14.8834C176.5 70.8834 176.5 178.883 176.5 178.883C145.3 177.683 135.167 156.383 134 145.883C131.833 126.383 137 100.883 101 88.3834C-6.5 61.8834 124 24.3834 99.5 27.3834Z" fill="#FF8C4B55" />
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 w-auto">
        <svg xmlns="http://www.w3.org/2000/svg" width="168" height="153" viewBox="0 0 168 153" fill="none">
          <path d="M0.0346109 137V0C0.0346109 9.5 21.5347 36 38.5347 35.5C55.5347 35 70.0347 63 69.0347 72C68.2347 79.2 74.7013 86.6667 78.0347 89.5C83.868 93.6667 103.835 101.5 137.035 99.5C170.235 97.5 170.201 133 166.035 151C119.035 152.333 22.4346 154.2 12.0346 151C1.63461 147.8 -0.298722 140.333 0.0346109 137Z" fill="#29BFDF55" />
        </svg>
      </div>

      <div className="container pt-[100px]">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-8">
          {/* Text Content */}
          <div className="w-full md:w-1/2 text-center md:text-left order-2 md:order-1">
            <h1 className="text-xl md:text-2xl lg:text-3xl mb-4 leading-tight text-primary">{blog.title}</h1>
            <p className="mid-text-1 mb-8 max-w-2xl mx-auto md:mx-0">{blog.overview}</p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 md:gap-8 text-sm font-bold text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">
                  {blog.author?.[0] || "W"}
                </div>
                <span>{blog.author || "Whizkids Team"}</span>
              </div>
              <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-gray-200" />
              <span>
                {new Date(blog._createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })}
              </span>
              {blog.readTime && (
                <>
                  <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-gray-200" />
                  <span>{blog.readTime} min read</span>
                </>
              )}
            </div>
          </div>

          {/* Visual Content */}
          <div className="w-full md:w-1/2 relative order-1 md:order-2 flex justify-center items-center">
            {/* Background Dashed Path */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none md:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="560" height="543" viewBox="0 0 560 543" fill="none" className="w-full h-auto max-w-[450px] md:max-w-none">
                <path
                  d="M3.48725 541.742C-1.34608 523.742 -4.01279 497.242 78.9872 522.742C106.487 528.742 107.987 505.742 117.987 482.242C131.179 451.242 146.887 421.142 264.487 394.742C382.087 368.342 352.821 215.076 323.487 141.742C318.154 107.576 328.287 54.1424 411.487 113.742C449.987 154.742 475.987 117.742 486.987 73.2424C489.487 59.9091 502.687 33.7424 535.487 35.7424C590.987 59.2424 526.487 64.2424 518.487 42.7424C512.821 32.7424 504.887 10.4424 518.487 1.24243"
                  stroke="#29BFDF"
                  strokeWidth="3"
                  strokeDasharray="12 12"
                  className="opacity-40"
                />
              </svg>
            </div>

            {/* Masked Image Content */}
            <div className="w-[65%] md:w-[70%] lg:w-[65%] relative z-10 mx-auto">
              <MaskedImage
                maskImage="/shapes/ovel-shape-mask.svg"
                image={blog.mainImageUrl}
                className="w-full h-full"
              />

              {/* Floating Decorative Elements */}
              <div className="absolute -top-6 -right-6 md:-top-10 md:-right-10 w-12 h-12 md:w-16 md:h-16 animate-bob pointer-events-none">
                <Image src="/icons/bee.png" alt="bee" fill className="object-contain" />
              </div>
              <div className="absolute -bottom-4 -left-6 md:-bottom-8 md:-left-10 w-10 h-10 md:w-14 md:h-14 animate-float pointer-events-none" style={{ animationDelay: '1s' }}>
                <Image src="/icons/star.png" alt="ladybug" fill className="object-contain" />
              </div>
              <div className="absolute top-1/2 -right-8 md:-right-14 w-8 h-8 animate-spin-slow opacity-60 hidden md:block">
                <Image src="/icons/star.png" alt="star" fill className="object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>

  )
}

export default BlogsBreadCrumb