export default function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[200px]">
      <div className="flex flex-col items-center gap-2">
        <div className="relative w-16 h-16">
          <div className="absolute w-16 h-16 rounded-full border-4 border-gray-200"></div>
          <div className="absolute w-16 h-16 rounded-full border-4 border-t-primary animate-spin"></div>
        </div>
        <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
      </div>
    </div>
  )
}
