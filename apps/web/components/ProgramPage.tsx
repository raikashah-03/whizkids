import { StaticImageData } from "next/image";
import Link from "next/link";
import FramedMaskedImage from "./FrameMaskedImage";
import Heading from "./Headding";
import OutlineButton from "./OutlineButton";

// ── Asset imports ──────────────────────────────────────────────
import jrKgImg from "@/public/images/programs/jr-kg.jpg";
import nurseryImg from "@/public/images/programs/nursery.jpg";
import playgroupImg from "@/public/images/programs/playgroup.jpg";
import srKgImg from "@/public/images/programs/sr-kg.jpg";

import shape1Mask from "@/public/shapes/vector-shape-1-mask.svg";
import shape1Frame from "@/public/shapes/vector-shape-1.svg";
import shape2Mask from "@/public/shapes/vector-shape-2-mask.svg";
import shape2Frame from "@/public/shapes/vector-shape-2.svg";
import shape3Mask from "@/public/shapes/vector-shape-3-mask.svg";
import shape3Frame from "@/public/shapes/vector-shape-3.svg";
// Note: shape 3 mask filename has a trailing space — reference by string path below

// ── Program data ───────────────────────────────────────────────
interface Program {
  title: string;
  frameImage: StaticImageData;
  maskImage: StaticImageData | string;
  bgImage: StaticImageData;
  age: string;
  accentColor: string;
  slug: string;
}

const programs: Program[] = [
  {
    title: "Playgroup",
    frameImage: shape1Frame,
    maskImage: shape1Mask,
    bgImage: playgroupImg,
    age: "Below 3 Years",
    accentColor: "bg-peach-strong",
    slug: "playgroup",
  },
  {
    title: "Nursery",
    frameImage: shape2Frame,
    maskImage: shape2Mask,
    bgImage: nurseryImg,
    age: "3 – 4 Years",
    accentColor: "bg-skyblue-strong",
    slug: "nursery",
  },
  {
    title: "Jr. KG",
    frameImage: shape3Frame,
    maskImage: shape3Mask,
    bgImage: jrKgImg,
    age: "4 – 5 Years",
    accentColor: "bg-pink-strong",
    slug: "jr-kg",
  },
  {
    title: "Sr. KG",
    frameImage: shape1Frame,
    maskImage: shape1Mask,
    bgImage: srKgImg,
    age: "5 – 6 Years",
    accentColor: "bg-green-strong",
    slug: "sr-kg",
  },
  {
    title: "Daycare",
    frameImage: shape2Frame,
    maskImage: shape2Mask,
    bgImage: nurseryImg, // replace with daycare.jpg once available
    age: "6 Months – 3 Years",
    accentColor: "bg-peach-strong",
    slug: "daycare",
  },
];

// ── Program Card ───────────────────────────────────────────────
function ProgramCard({ program }: { program: Program }) {
  const frameSrc =
    typeof program.frameImage === "string"
      ? program.frameImage
      : (program.frameImage as StaticImageData).src;

  const maskSrc =
    typeof program.maskImage === "string"
      ? program.maskImage
      : (program.maskImage as StaticImageData).src;

  const bgSrc =
    typeof program.bgImage === "string"
      ? program.bgImage
      : (program.bgImage as StaticImageData).src;

  return (
    <Link
      href={`/programs#${program.slug}`}
      className="group focus:outline-none w-full block max-w-[320px]"
    >
      {/* Card: image + label overlaid at bottom */}
      <div className="relative w-full transition-transform duration-300 group-hover:-translate-y-2">

        {/* Shaped image */}
        <FramedMaskedImage
          frameImage={frameSrc}
          maskImage={maskSrc}
          bgImage={bgSrc}
          className="w-full aspect-square"
          scaleBgDown={true}
        />

        {/* Label — absolutely pinned to bottom center, overlapping the shape */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-max min-w-[75%] bg-white rounded-2xl shadow-md px-4 py-2 flex flex-col items-center gap-0.5 border border-gray-100 group-hover:shadow-lg transition-shadow duration-300 z-20">
          <span className="font-bold text-foreground text-sm sm:text-base leading-tight whitespace-nowrap">
            {program.title}
          </span>
          <span className={`text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full text-white ${program.accentColor}`}>
            {program.age}
          </span>
        </div>
      </div>
    </Link>
  );
}

// ── Main Section ───────────────────────────────────────────────
const ProgramPage = (): React.JSX.Element => {
  return (
    <section className="bg-skyblue relative overflow-hidden py-12 md:py-20">

      {/* Top bubble strip — repeats horizontally */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-full h-[35px] z-0"
        style={{
          backgroundImage: "url('/shapes/top-bubble-shape.svg')",
          backgroundRepeat: "repeat-x",
          backgroundSize: "auto 100%",
          backgroundPosition: "left top",
        }}
      />

      {/* Bottom bubble strip — repeats horizontally */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-full h-[35px] z-0"
        style={{
          backgroundImage: "url('/shapes/bottom-bubble-shape.svg')",
          backgroundRepeat: "repeat-x",
          backgroundSize: "auto 100%",
          backgroundPosition: "left bottom",
        }}
      />

      <div className="container relative z-10">

        {/* ── Centered Heading ── */}
        <div className="flex flex-col items-center text-center gap-4 mb-10 md:mb-14">
          <Heading
            headingText="Explore Our"
            spanText="Programs"
            className="justify-center!"
            beforeIcon='/shapes/left-heading-symbol.svg'
            afterIcon="/shapes/right-heading-symbol.svg"
          />
          <p className="max-w-2xl text-muted-foreground mid-text-1 leading-relaxed">
            From the first curious steps to confident little learners — our thoughtfully crafted programs nurture every stage of your child&apos;s early childhood journey through play, creativity, and exploration.
          </p>
        </div>

        {/* ── Program Cards ── */}
        <div className="flex flex-wrap justify-center gap-y-5 gap-x-4 sm:gap-x-6 md:gap-x-8">
          {programs.map((program) => (
            <ProgramCard key={program.slug} program={program} />
          ))}
        </div>

        {/* ── CTA Button ── */}
        <div className="flex justify-center mt-12 md:mt-16">
          <OutlineButton
            href="/programs"
            text="View All Programs"
            trailingIcon="▶"
            id="program-view-all-btn"
            aria-label="View all programs"
          />
        </div>

      </div>

    </section>
  );
};

export default ProgramPage;