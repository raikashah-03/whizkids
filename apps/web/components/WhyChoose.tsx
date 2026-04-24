
import { Brain, GraduationCap, Heart, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Heading from "./Headding";

const features = [
  {
    title: "Expert Educators",
    description: "Heart-led teaching with experienced staff dedicated to early childhood.",
    icon: Heart,
    color: "text-pink-strong",
    bgColor: "bg-pink-light",
    rotation: "md:-rotate-2",
    animation: "animate-float"
  },
  {
    title: "Safe & Secure",
    description: "CCTV monitored, child-friendly environment for complete peace of mind.",
    icon: ShieldCheck,
    color: "text-skyblue-strong",
    bgColor: "bg-skyblue-light",
    rotation: "md:rotate-2",
    animation: "animate-bob"
  },
  {
    title: "Creative Play",
    description: "Engaging activities and play-based learning that spark imagination.",
    icon: Brain,
    color: "text-lavender-strong",
    bgColor: "bg-lavender-light",
    rotation: "md:-rotate-1",
    animation: "animate-float-slow"
  },
  {
    title: "Holistic Growth",
    description: "Building strong academic, social, and emotional foundations for life.",
    icon: GraduationCap,
    color: "text-green-strong",
    bgColor: "bg-green-light",
    rotation: "md:rotate-3",
    animation: "animate-float"
  }
];

const WhyChoose = () => {
  return (
    <section className="bg-peach w-full relative overflow-hidden extra-top-padding extra-bottom-padding">
      {/* Decorative Background Elements */}
      {/* <div className="absolute top-20 left-10 w-32 h-32 bg-pink-light rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-float hidden md:block"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-skyblue-light rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-float-slow hidden md:block"></div> */}

      <div className="absolute bg-background top-0 right-0 z-0">
        <Image src="/shapes/top-shape-1.svg" alt="Top Shape" width={1920} height={137} className="w-full h-full object-cover" />
      </div>

      <div className="container relative z-10">

        {/* Top Split Content Segment */}
        <div className="flex flex-col md:flex-row gap-6 lg:gap-20 mb-5 lg:mb-20">

          {/* Left Side: Headings & Images */}
          <div className="mt-5 md:w-[40%] flex flex-col items-center text-center md:items-start md:text-left">
            <Heading
              headingText="Why Choose"
              spanText="Whizkids?"
              className="justify-center md:justify-start mb-4"
              afterIcon="/icons/bee.png"
            />

            <p className="text-foreground/80 text-xl font-medium mb-10">
              We help their brains bloom ✨
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <div className="w-[80px]">
                <Image
                  src="/images/swinging-boy.png"
                  alt="Swinging Boy"
                  width={200}
                  height={200}
                  className="relative z-10 w-full h-auto rounded-3xl object-cover transition-transform duration-300 animate-float-slow"
                />
              </div>
              <div className="w-[100px]">
                <Image
                  src="/icons/alphabets.png"
                  alt="Alphabets"
                  width={200}
                  height={200}
                  className="relative z-10 w-full h-auto rounded-3xl object-cover transition-transform duration-300 animate-float-slow"
                />
              </div>
              <div className="w-[70px]">
                <Image
                  src="/images/swinging-girl.png"
                  alt="Swinging Girl"
                  width={200}
                  height={200}
                  className="relative z-10 w-full h-auto rounded-3xl object-cover  transition-transform duration-300 animate-bob"
                />
              </div>
            </div>
          </div>

          {/* Right Side: Supporting Text */}
          <div className="space-y-3 md:space-y-6 mt-5 md:w-[60%] text-center md:text-left">
            <p className="text-foreground/80 text-sm font-medium md:text-lg">
              We provide a nurturing environment where your child can explore,
              learn, and grow with confidence and joy every single day. Our dedicated educators bring years of experience and boundless passion to every classroom.
            </p>
            <p className="text-foreground/80 text-sm font-medium md:text-lg">
              By blending structured curriculum with creative, unstructured play, we ensure emotional and academic development go hand-in-hand. Whether it is painting, storytime, or problem-solving games, every activity is designed to spark curiosity.
            </p>

          </div>

        </div>

        {/* Bottom: Playful 4-Column Grid of Small Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 group
                ring-1 ring-black/5 rounded-3xl ${feature.rotation} relative flex flex-col items-center text-center`}
            >
              <div className={`w-14 h-14 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-5 
                ${feature.animation} group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              <h4 className="text-lg font-bold mb-2 text-foreground">
                {feature.title}
              </h4>
              <p className="text-foreground/70 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>

      <div className="absolute bg-background bottom-0 right-0 z-0 pointer-events-none">
        <Image src="/shapes/bottom-shape-1.svg" alt="Bottom Shape" width={1920} height={107} className="w-full h-full object-cover" />
      </div>
    </section>
  );
};

export default WhyChoose;
