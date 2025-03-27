"use client"; // Cần thêm khi dùng useState trong Next.js (App Router)

import { useState } from "react";
import ADPListProfile from "@/components/common/featured-calendar/adplist-profile";
import { EventFilters } from "@/components/common/featured-calendar/event-filters";
import { EventList } from "@/components/common/featured-calendar/event-list";
import CalendarView from "@/components/common/featured-calendar/calendar-view";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilterChange = (categoryId: string) => {
    setActiveFilter(categoryId);
  };

  return (
    <main className="min-h-screen">
      <ADPListProfile />
      <div className="max-w-6xl mx-auto px-4 py-4">
        {/* Events Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Sự kiện</h2>

          <EventFilters
            onFilterChange={handleFilterChange}
            activeFilter={activeFilter}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <EventList categoryFilter={activeFilter} />
            </div>

            <div className="lg:col-span-1">
              <CalendarView />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
