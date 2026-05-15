import { CheckCircle2 } from "lucide-react";
import Image, { StaticImageData } from "next/image";

export interface SpecialtySectionProps {
  id: string;
  title: string;
  description: string;
  features: readonly string[];
  images: (string | StaticImageData)[];
  bgColor: string;
  accentColor: string;
  fillColor: string;
  stage: number; // 1-based index
}

export default function SpecialtyCardSection({
  id,
  title,
  description,
  features,
  images,
  bgColor,
  accentColor,
  fillColor,
  stage,
}: SpecialtySectionProps): React.JSX.Element {
  const isEven = stage % 2 !== 0;

  return (
    <section
      id={id}
      className={`py-20 md:py-32 scroll-mt-24 ${bgColor} relative overflow-hidden`}
    >
      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div
          className={`flex flex-col md:flex-row items-center gap-12 lg:gap-20 ${
            isEven ? "" : "md:flex-row-reverse"
          }`}
        >
          {/* ── Content side ── */}
          <div className="w-full md:w-1/2">
            <div className="flex flex-col gap-6 md:gap-8">
              <h2 className="text-3xl md:text-5xl font-black text-foreground leading-tight font-display">
                {title}
              </h2>

              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-medium">
                {description}
              </p>

              <div className="flex flex-col gap-4 mt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((item) => (
                    <div key={item} className="flex items-start gap-3 group">
                      <CheckCircle2
                        className={`w-6 h-6 shrink-0 mt-0.5 ${accentColor} opacity-90`}
                      />
                      <span className="font-bold text-foreground/80 group-hover:text-foreground transition-colors">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Image side ── */}
          <div className="w-full md:w-1/2 relative">
            <div className="relative z-10 w-full aspect-square md:aspect-4/3 max-w-[500px] mx-auto">
              {images.length === 2 ? (
                <>
                  <div className="absolute top-0 left-0 w-[65%] h-[75%] rounded-[2.5rem] overflow-hidden shadow-lg border-4 border-white hover:z-30 hover:scale-105 transition-all duration-300 z-10">
                    <Image src={images[0]!} alt={`${title} image 1`} fill className="object-cover" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-[60%] h-[65%] rounded-[2.5rem] overflow-hidden shadow-2xl border-[8px] border-white hover:z-30 hover:scale-105 transition-all duration-300 z-20">
                    <Image src={images[1]!} alt={`${title} image 2`} fill className="object-cover" />
                  </div>
                </>
              ) : images.length === 3 ? (
                <>
                  <div className="absolute top-0 left-0 w-[55%] h-[60%] rounded-[2.5rem] overflow-hidden shadow-lg border-4 border-white hover:z-40 hover:scale-105 transition-all duration-300 z-10">
                    <Image src={images[0]!} alt={`${title} image 1`} fill className="object-cover" />
                  </div>
                  <div className="absolute top-[10%] right-0 w-[50%] h-[50%] rounded-[2.5rem] overflow-hidden shadow-xl border-[6px] border-white hover:z-40 hover:scale-105 transition-all duration-300 z-20">
                    <Image src={images[1]!} alt={`${title} image 2`} fill className="object-cover" />
                  </div>
                  <div className="absolute bottom-0 left-[15%] w-[60%] h-[45%] rounded-[2.5rem] overflow-hidden shadow-2xl border-[8px] border-white hover:z-40 hover:scale-105 transition-all duration-300 z-30">
                    <Image src={images[2]!} alt={`${title} image 3`} fill className="object-cover" />
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-4 h-full">
                  {images.map((img, i) => (
                    <div key={i} className="relative rounded-4xl overflow-hidden shadow-lg border-4 border-white h-full">
                      <Image src={img} alt={`${title} image ${i + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Blob background behind images */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-20 z-0 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 173 147"
                fill="none"
                className="w-full h-full"
              >
                <path
                  d="M3.36949 82.4073C-5.03051 57.2073 5.20296 15.2405 14.3696 18.9072C15.8696 13.5738 20.3491 17.0439 27.3695 4.4077C34.8696 -9.09197 54.3695 14.9075 81.3695 11.4075C108.37 7.90753 170.87 -7.09283 152.87 18.9072C134.87 44.9072 167.369 51.9074 170.869 63.9074C174.369 75.9074 168.869 69.9074 144.369 98.4074C119.869 126.907 198.87 75.9073 144.369 142.907C135.903 153.315 125.869 134.907 99.8694 126.407C73.8694 117.907 46.7234 154.674 29.8694 142.907C3.36949 124.407 31.8695 115.907 27.3695 98.4074C22.8695 80.9074 13.8695 113.907 3.36949 82.4073Z"
                  fill={fillColor}
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
