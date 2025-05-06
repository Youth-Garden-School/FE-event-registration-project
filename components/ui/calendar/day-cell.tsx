"use client";

import { cn } from "@/lib/utils";

interface DayCellProps {
  day: Date | undefined;
  isSelected: boolean;
  isToday: boolean;
  isOutsideMonth: boolean;
  isHighlighted: boolean;
  onClick: () => void;
}

export function DayCell({
  day,
  isSelected,
  isToday,
  isOutsideMonth,
  isHighlighted,
  onClick,
}: DayCellProps) {
  if (!day) return <div className="w-9 h-9" />;

  const dayNumber = day.getDate();

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center justify-center w-9 h-9 rounded-full text-sm transition-colors",
        isOutsideMonth && "text-gray-400",
        isToday && !isSelected && "border border-graygray-500",
        isSelected && "bg-gray-500 text-white",
        isHighlighted && !isSelected && "bg-blue-100 font-medium",
        !isSelected &&
          !isHighlighted &&
          !isToday &&
          !isOutsideMonth &&
          "hover:bg-gray-100",
      )}
    >
      {dayNumber}
    </button>
  );
}
