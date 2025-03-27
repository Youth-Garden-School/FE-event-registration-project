"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CalendarHeaderProps {
  currentMonth: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

export function CalendarHeader({
  currentMonth,
  onPreviousMonth,
  onNextMonth,
}: CalendarHeaderProps) {
  // Format month name in Vietnamese
  const monthNames = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  const monthName = monthNames[currentMonth.getMonth()];
  const year = currentMonth.getFullYear();

  return (
    <div className="flex items-center justify-between px-1 py-2">
      <h3 className="font-medium text-sm">{monthName}</h3>
      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 rounded-full p-0 hover:bg-gray-100"
          onClick={onPreviousMonth}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Tháng trước</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 rounded-full p-0 hover:bg-gray-100"
          onClick={onNextMonth}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Tháng sau</span>
        </Button>
      </div>
    </div>
  );
}
