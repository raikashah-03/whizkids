import Image from "next/image"

const TopBottomShapeSection = ({ children, className }: { children: React.ReactNode, className?: string }): React.JSX.Element => {
  return (
    <section className={`bg-peach w-full relative overflow-hidden extra-top-padding extra-bottom-padding ${className}`}>
      <div className="absolute bg-background top-0 right-0 z-0">
        <Image src="/shapes/top-shape-1.svg" alt="Top Shape" width={1920} height={137} className="w-full h-full object-cover" />
      </div>
      {children}
      <div className="absolute bg-background bottom-0 right-0 z-0 pointer-events-none">
        <Image src="/shapes/bottom-shape-1.svg" alt="Bottom Shape" width={1920} height={107} className="w-full h-full object-cover" />
      </div>
    </section>
  )
}

export default TopBottomShapeSection