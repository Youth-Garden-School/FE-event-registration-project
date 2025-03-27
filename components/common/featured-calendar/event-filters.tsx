"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { eventCategories } from "@/lib/events-calendar-data";

interface EventFiltersProps {
  onFilterChange?: (categoryId: string) => void;
  activeFilter?: string;
}

export function EventFilters({
  onFilterChange,
  activeFilter = "all",
}: EventFiltersProps) {
  return (
    <div className="flex justify-between mb-6">
      <div className="flex space-x-2 overflow-x-auto pb-2">
        <Button
          variant="outline"
          size="sm"
          className={`rounded-full flex items-center gap-2 ${activeFilter === "all" ? "bg-gray-100" : ""}`}
          onClick={() => onFilterChange && onFilterChange("all")}
        >
          <span>Tất cả</span>
        </Button>

        {eventCategories.map((category) => (
          <Button
            key={category.id}
            variant="outline"
            size="sm"
            className={`rounded-full flex items-center gap-2 ${activeFilter === category.id ? "bg-gray-100" : ""}`}
            onClick={() => onFilterChange && onFilterChange(category.id)}
          >
            <Badge
              className={`h-2 w-2 rounded-full bg-${category.color}-500 p-0`}
            />
            <span>{category.name}</span>
            <Badge className="bg-gray-200 text-gray-700">
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" className="h-8 w-8">
          <Search className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="h-8">
          <span className="text-blue-600">+ Gửi sự kiện</span>
        </Button>
      </div>
    </div>
  );
}
