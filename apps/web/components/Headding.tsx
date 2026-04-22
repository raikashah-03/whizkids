import Image, { StaticImageData } from "next/image";
import { Fragment } from "react";

const SPAN_COLORS = [
  "var(--skyblue-bright)",
  "var(--peach-bright)",
  "var(--lavender-bright)",
  "var(--pink-bright)",
  "var(--green-bright)",
] as const;

interface HeadingProps {
  headingText: string;
  spanText: string;
  frontImage?: string | StaticImageData;
  backImage?: string | StaticImageData;
  className?: string;
}


export default function Heading({
  headingText,
  spanText,
  frontImage,
  backImage,
  className = "",
}: HeadingProps) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>

      {backImage && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -z-10 select-none"
        >
          <Image
            src={backImage}
            alt=""
            width={80}
            height={80}
            className="object-contain"
          />
        </span>
      )}

      {/* ── Heading ── */}
      <h2 className="section-heading m-0">
        {headingText}{" "}

        <span aria-label={spanText} role="text">
          {(() => {
            let charCount = 0;
            return spanText.split(" ").map((word, wordIndex, array) => {
              const wordElements = (
                <span key={`word-${wordIndex}`} className="inline-block">
                  {Array.from(word).map((char, charIdx) => {
                    const currentColorIndex =
                      (charCount + charIdx) % SPAN_COLORS.length;
                    return (
                      <span
                        key={charIdx}
                        aria-hidden="true"
                        style={{ color: SPAN_COLORS[currentColorIndex] }}
                      >
                        {char}
                      </span>
                    );
                  })}
                </span>
              );
              charCount += word.length + 1;

              return (
                <Fragment key={`frag-${wordIndex}`}>
                  {wordElements}
                  {wordIndex < array.length - 1 && " "}
                </Fragment>
              );
            });
          })()}
        </span>
      </h2>


      {frontImage && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-6 select-none"
        >
          <Image
            src={frontImage}
            alt=""
            width={56}
            height={56}
            className="object-contain"
          />
        </span>
      )}
    </div>
  );
}
