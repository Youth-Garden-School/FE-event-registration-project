"use client";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MonthSelectorProps {
  currentMonth: Date;
  onMonthSelect: (month: number) => void;
}

export function MonthSelector({
  currentMonth,
  onMonthSelect,
}: MonthSelectorProps) {
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

  const currentMonthName = monthNames[currentMonth.getMonth()];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 px-2 text-sm">
          {currentMonthName}
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-40">
        {monthNames.map((month, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => onMonthSelect(index)}
            className={index === currentMonth.getMonth() ? "bg-blue-50" : ""}
          >
            {month}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
