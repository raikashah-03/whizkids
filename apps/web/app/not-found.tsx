import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="h-screen overflow-hidden flex items-center justify-center px-4 relative ">
      <div className="max-w-md w-full text-center">
        {/* Soft playful card */}
        <div className="rounded-[32px] p-8">
          <h1 className="text-9xl md:text-9xl font-display mb-3 opacity-50">
            404
          </h1>

          <p className="text-sm md:text-base text-foreground/70 mb-6">
            Page not found
          </p>

          {/* Minimal CTAs */}
          <div className="flex gap-4 justify-center text-sm md:text-base font-semibold">
            <Link
              href="/"
              className="bg-green-strong/90 hover:bg-green px-5 py-2 rounded-full"
            >
              Home
            </Link>

            <Link
              href="/contact"
              className="bg-lavender-strong/90 hover:bg-lavender px-5 py-2 rounded-full"
            >
              Enquire
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}