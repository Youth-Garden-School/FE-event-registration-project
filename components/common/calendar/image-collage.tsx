export function ImageCollage() {
  return (
    <div className="relative w-full h-[230px] overflow-hidden rounded-xl bg-black">
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white text-5xl font-bold tracking-widest" style={{ fontFamily: "cursive" }}>
          <div className="flex flex-col items-center">
            <div className="tracking-[0.5em]">READING</div>
            <div className="tracking-[0.5em]">RHYTHMS</div>
          </div>
        </h1>
      </div>
    </div>
  )
}
