import { cn } from "@/lib/utils";

interface EventIndicatorProps {
  count: number;
  className?: string;
}

export function EventIndicator({ count, className }: EventIndicatorProps) {
  if (count <= 0) return null;

  return (
    <div className={cn("flex justify-center mt-1", className)}>
      <div className="flex space-x-0.5">
        {Array.from({ length: Math.min(count, 3) }).map((_, index) => (
          <div key={index} className="w-1 h-1 rounded-full bg-gray-500" />
        ))}
        {count > 3 && <div className="text-xs text-gray-500">+{count - 3}</div>}
      </div>
    </div>
  );
}
