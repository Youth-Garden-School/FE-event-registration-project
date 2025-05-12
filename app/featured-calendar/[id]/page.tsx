"use client";

import type React from "react";
import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { getCalendarById, type Calendar } from "@/lib/api-calendar";

export default function FeaturedCalendarPage() {
  const { id } = useParams() as { id: string };
  const calendarId = id;
  const router = useRouter();

  // --- API data ---
  const [calendar, setCalendar] = useState<Calendar | null>(null);
  const [events, setEvents] = useState<EventWithUI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- UI state ---
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Chuyển CalendarEvent → EventWithUI
  const convertToUI = (e: any): EventWithUI => {
    const dt = parseISO(e.startTime);
    return {
      ...e,
      dateLabel: isToday(dt)
        ? "Hôm nay"
        : isTomorrow(dt)
          ? "Ngày mai"
          : format(dt, "d 'thg' M", { locale: vi }),
      dayLabel: format(dt, "EEEE", { locale: vi }),
      displayTime: format(dt, "HH:mm", { locale: vi }),
      attendees: e.attendees ?? [],
    };
  };

  // Fetch calendar + events
  useEffect(() => {
    setLoading(true);
    getCalendarById(calendarId)
      .then((cal) => {
        setCalendar(cal);
        setEvents((cal.events ?? []).map(convertToUI));
      })
      .catch((err) => setError(err.message || "Lỗi khi tải lịch"))
      .finally(() => setLoading(false));
  }, [calendarId]);

  // 1) Phân loại Upcoming / Past
  const now = new Date();
  const upcomingEvents = useMemo(
    () => events.filter((e) => parseISO(e.startTime) >= now),
    [events],
  );

  const pastEvents = useMemo(
    () => events.filter((e) => parseISO(e.startTime) < now),
    [events],
  );

  // 2) Hàm áp dụng filter ngày & search
  const applyFilters = (list: EventWithUI[]) => {
    let base = list;
    if (selectedDate) {
      base = base.filter((e) => {
        const d = parseISO(e.startTime);
        return (
          d.getFullYear() === selectedDate.getFullYear() &&
          d.getMonth() === selectedDate.getMonth() &&
          d.getDate() === selectedDate.getDate()
        );
      });
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      base = base.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          (e.description?.toLowerCase().includes(q) ?? false) ||
          (e.location?.toLowerCase().includes(q) ?? false),
      );
    }
    return base;
  };

  // 3) Chọn mảng đúng theo tab & áp filter
  const displayEvents = useMemo(() => {
    const list = activeTab === "upcoming" ? upcomingEvents : pastEvents;
    return applyFilters(list);
  }, [activeTab, upcomingEvents, pastEvents, selectedDate, searchQuery]);

  // Reset trang khi đổi tab hoặc filter
  const onTabChange = (tab: string) => {
    setActiveTab(tab as "upcoming" | "past");
    setCurrentPage(1);
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const onDateSelect = (d: Date) => {
    setSelectedDate(d);
    setCurrentPage(1);
  };

  // Xử lý khi thêm sự kiện mới
  const handleEventAdded = () => {
    setShowAddModal(false);
    // Tải lại dữ liệu
    getCalendarById(calendarId).then((cal) => {
      setCalendar(cal);
      setEvents((cal.events ?? []).map(convertToUI));
    });
  };

  if (loading) return <div className="py-8 text-center">Đang tải lịch…</div>;
  if (error)
    return <div className="py-8 text-center text-red-500">Lỗi: {error}</div>;
  if (!calendar)
    return (
      <div className="py-8 text-center text-gray-600">Không tìm thấy lịch.</div>
    );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <CommunityProfile calendarId={calendarId} />

        {/* Events Section */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Sự kiện</h2>
          </div>

          {/* Search and Add Event */}
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Tìm kiếm sự kiện..."
                value={searchQuery}
                onChange={onSearch}
                className="pl-10"
              />
            </div>
            <Button
              className="bg-[#0071e3] hover:bg-[#0071e3]/90 ml-4"
              onClick={() => setShowAddModal(true)}
            >
              + Gửi sự kiện
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {/* Tabs for Upcoming/Past Events */}
              <Tabs
                value={activeTab}
                onValueChange={onTabChange}
                className="w-full"
              >
                <TabsList className="bg-gray-100 rounded-[8px] text-gray-900 leading-[24px] p-[2px] mb-6">
                  <TabsTrigger
                    value="upcoming"
                    className="flex items-center justify-center border-[0.8px] border-solid border-[#0000] text-gray-900 text-[14px] font-medium leading-[21px] p-[5px_8px] text-center data-[state=active]:bg-white data-[state=active]:rounded-md"
                  >
                    Sắp tới
                  </TabsTrigger>
                  <TabsTrigger
                    value="past"
                    className="flex items-center justify-center border-[0.8px] border-solid border-[#0000] text-gray-900 text-[14px] font-medium leading-[21px] p-[5px_8px] text-center data-[state=active]:bg-white data-[state=active]:rounded-md"
                  >
                    Đã qua
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming">
                  <EventList
                    calendarId={calendarId}
                    events={displayEvents}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    eventsPerPage={10}
                  />
                </TabsContent>
                <TabsContent value="past">
                  <EventList
                    calendarId={calendarId}
                    events={displayEvents}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    eventsPerPage={10}
                  />
                </TabsContent>
              </Tabs>
            </div>

            <div className="lg:col-span-1">
              <CalendarView
                calendarId={calendarId}
                onDateSelect={onDateSelect}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Add Luma Event Modal */}
      <AddLumaEventModal
        isOpen={showAddModal}
        calendarId={calendarId}
        onClose={() => setShowAddModal(false)}
        onEventAdded={handleEventAdded}
      />
    </div>
  );
}
