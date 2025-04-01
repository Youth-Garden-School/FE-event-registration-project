"use client"; // Cần thêm khi dùng useState trong Next.js (App Router)

import { useState } from "react";
import ADPListProfile from "@/components/common/featured-calendar/adplist-profile";
import { EventFilters } from "@/components/common/featured-calendar/event-filters";
import { EventList } from "@/components/common/featured-calendar/event-list";
import CalendarView from "@/components/common/featured-calendar/calendar-view";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Hàm xử lý thay đổi bộ lọc
  const handleFilterChange = (categoryId: string): void => {
    setActiveFilter(categoryId);
    // Khi thay đổi bộ lọc, xóa bộ lọc ngày đã chọn
    setSelectedDate(null);
  };

  // Hàm xử lý khi chọn ngày
  const handleDateSelect = (date: Date): void => {
    setSelectedDate(date);
    // Khi chọn ngày, đặt bộ lọc về "all" để hiển thị tất cả sự kiện trong ngày đó
    setActiveFilter("all");
  };

  return (
    <main className="min-h-screen">
      <ADPListProfile />
      <div className="max-w-6xl mx-auto px-4 py-4">
        {/* Phần hiển thị sự kiện */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Sự kiện</h2>

          <EventFilters
            onFilterChange={handleFilterChange}
            activeFilter={activeFilter}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <EventList
                categoryFilter={activeFilter}
                selectedDate={selectedDate}
              />
            </div>

            <div className="lg:col-span-1">
              <CalendarView onDateSelect={handleDateSelect} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
