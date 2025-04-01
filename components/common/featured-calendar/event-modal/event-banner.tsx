import Image from "next/image";

interface EventBannerProps {
  image: string;
  title: string;
}

export function EventBanner({ image, title }: EventBannerProps) {
  return (
    <div className="p-4">
      <div className="rounded-xl overflow-hidden">
        <Image
          src={image || "/placeholder.svg?height=400&width=400"}
          alt={title}
          width={400}
          height={400}
          className="w-full object-cover"
        />
      </div>
    </div>
  );
}
