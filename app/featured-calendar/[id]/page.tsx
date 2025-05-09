"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";

import { CommunityProfile } from "@/components/common/calendar/community-profile";
import EventList from "@/components/common/calendar/event-list";
import CalendarView from "@/components/common/calendar/calendar-view";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AddLumaEventModal } from "@/components/common/calendar/add-luma-event-modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { format, isToday, isTomorrow, parseISO } from "date-fns";
import { vi } from "date-fns/locale";

import type { EventWithUI } from "@/style/events-stype";
import { getCalendarById, Calendar } from "@/lib/api-calendar";

export default function FeaturedCalendarPage() {
const { calendarId } = useParams() as { calendarId: string };

  // 1) States cho API-data
  const [calendar, setCalendar] = useState<Calendar | null>(null);
  const [events, setEvents] = useState<EventWithUI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 2) States cho UI
  const [showAddLumaModal, setShowAddLumaModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  // 3) Hàm convert API-event -> EventWithUI
  const convertToEventWithUI = (e: any): EventWithUI => {
    const dt = parseISO(e.startTime);
    let dateLabel: string;
    if (isToday(dt)) dateLabel = "Hôm nay";
    else if (isTomorrow(dt)) dateLabel = "Ngày mai";
    else dateLabel = format(dt, "d 'thg' M", { locale: vi });

    return {
      ...e,
      dateLabel,
      dayLabel: format(dt, "EEEE", { locale: vi }),
      displayTime: format(dt, "HH:mm", { locale: vi }),
      attendees: e.attendees ?? [],
    };
  };

  // 4) Tách logic fetch để reuse khi load lần đầu & khi thêm event thành công
  const fetchCalendarAndEvents = () => {
    setLoading(true);
    setError(null);

    getCalendarById(calendarId)
      .then((cal) => {
        setCalendar(cal);
        const evts = (cal.events ?? []).map(convertToEventWithUI);
        setEvents(evts);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Lỗi khi tải lịch");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // 5) Chạy fetch lần đầu khi calendarId thay đổi
  useEffect(() => {
    fetchCalendarAndEvents();
  }, [calendarId]);

  // 6) Phân tách upcoming / past
  const now = useMemo(() => new Date(), []);
  const upcomingEvents = useMemo(
    () => events.filter((e) => parseISO(e.startTime) >= now),
    [events, now]
  );
  const pastEvents = useMemo(
    () => events.filter((e) => parseISO(e.startTime) < now),
    [events, now]
  );

  // 7) Lọc theo tab / ngày chọn / search
  const filteredEvents = useMemo(() => {
    let base = activeTab === "upcoming" ? upcomingEvents : pastEvents;

    if (selectedDate) {
      base = base.filter((e) => {
        const dt = parseISO(e.startTime);
        return (
          dt.getFullYear() === selectedDate.getFullYear() &&
          dt.getMonth() === selectedDate.getMonth() &&
          dt.getDate() === selectedDate.getDate()
        );
      });
    } else if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      base = base.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          (e.description?.toLowerCase().includes(q) ?? false) ||
          (e.location?.toLowerCase().includes(q) ?? false)
      );
    }

    return base;
  }, [activeTab, upcomingEvents, pastEvents, selectedDate, searchQuery]);

  // 8) Handlers
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };
  const handleTabChange = (value: string) => {
    setActiveTab(value as any);
    setCurrentPage(1);
  };
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setCurrentPage(1);
  };

  // 9) UI cho loading / error / not-found
  if (loading) {
    return <div className="py-8 text-center">Đang tải lịch…</div>;
  }
  if (error) {
    return (
      <div className="py-8 text-center text-red-500">
        Lỗi khi tải: {error}
      </div>
    );
  }
  if (!calendar) {
    return (
      <div className="py-8 text-center text-gray-600">
        Không tìm thấy lịch này.
      </div>
    );
  }

  // 10) Render chính
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <CommunityProfile calendarId={calendarId} />

        {/* Events Section */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Sự kiện</h2>
          </div>

          {/* Search & Add */}
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Tìm kiếm sự kiện..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-10"
              />
            </div>
            <Button
              className="bg-[#0071e3] hover:bg-[#0071e3]/90 ml-4"
              onClick={() => setShowAddLumaModal(true)}
            >
              + Gửi sự kiện
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Tabs + List */}
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="bg-gray-100 rounded-lg p-1 mb-6">
                  <TabsTrigger value="upcoming">Sắp tới</TabsTrigger>
                  <TabsTrigger value="past">Đã qua</TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming">
                  <EventList
                    events={filteredEvents}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    eventsPerPage={10}
                  />
                </TabsContent>
                <TabsContent value="past">
                  <EventList
                    events={filteredEvents}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    eventsPerPage={10}
                  />
                </TabsContent>
              </Tabs>
            </div>

            {/* Right: Mini Calendar */}
            <div className="lg:col-span-1">
              <CalendarView calendarId={calendarId} onDateSelect={handleDateSelect} />
            </div>
          </div>
        </div>
      </div>

      {/* Add Luma Event Modal */}
      <AddLumaEventModal
        isOpen={showAddLumaModal}
        calendarId={calendarId}
        onClose={() => setShowAddLumaModal(false)}
        onEventAdded={() => {
          setShowAddLumaModal(false);
          fetchCalendarAndEvents();
        }}
      />
    </div>
  );
}
