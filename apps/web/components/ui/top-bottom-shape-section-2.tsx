
const TopBottomShapeSection2 = ({ children, className }: { children: React.ReactNode, className?: string }): React.JSX.Element => {
  return (
    <section className={`bg-skyblue relative overflow-hidden py-12 md:py-20 ${className}`}>

      {/* Top bubble strip — repeats horizontally */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-full h-[35px] z-0"
        style={{
          backgroundImage: "url('/shapes/down-curve.svg')",
          backgroundRepeat: "repeat-x",
          backgroundSize: "auto 100%",
          backgroundPosition: "left top",
        }}
      />
      {children}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-full h-[35px] z-0"
        style={{
          backgroundImage: "url('/shapes/up-curve.svg')",
          backgroundRepeat: "repeat-x",
          backgroundSize: "auto 100%",
          backgroundPosition: "left bottom",
        }}
      />
    </section>
  )
}

export default TopBottomShapeSection2