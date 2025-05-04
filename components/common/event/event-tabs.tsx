// components/event-tabs.tsx
"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import EventList from "./event-list";
import NoEventsComponent from "./no-event";
import { getUpcomingEvents, getPastEvents } from "@/lib/api-event";
import type { EventWithUI } from "@/style/events-stype";
import { EventModal } from "./event-modal";

export default function EventTabs() {
  // Dữ liệu sự kiện
  const [upcomingEvents, setUpcomingEvents] = useState<EventWithUI[]>([]);
  const [pastEvents, setPastEvents] = useState<EventWithUI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal
  const [selectedEvent, setSelectedEvent] = useState<EventWithUI | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Phân trang
  const EVENTS_PER_PAGE = 10;
  const [upcomingPage, setUpcomingPage] = useState(1);
  const [pastPage, setPastPage] = useState(1);

  // Fetch và sort dữ liệu
  useEffect(() => {
    setLoading(true);
    Promise.all([getUpcomingEvents(), getPastEvents()])
      .then(([up, past]) => {
        // Tab Sắp tới: giữ nguyên thứ tự từ API (đã sort sẵn)
        setUpcomingEvents(up);

        // Tab Đã qua: sort theo endTime giảm dần (mới kết thúc trước)
        const sortedPast = past.slice().sort((a, b) => {
          return new Date(b.endTime).getTime() - new Date(a.endTime).getTime();
        });
        setPastEvents(sortedPast);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Modal handlers
  const openModal = (event: EventWithUI) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  // Khi cancel từ modal, remove luôn khỏi cả hai list
  const handleRemoveEvent = (removed: EventWithUI) => {
    setUpcomingEvents((prev) => prev.filter((e) => e.id !== removed.id));
    setPastEvents((prev) => prev.filter((e) => e.id !== removed.id));
    closeModal();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  // Tính số trang
  const totalUpcomingPages = Math.ceil(upcomingEvents.length / EVENTS_PER_PAGE);
  const totalPastPages = Math.ceil(pastEvents.length / EVENTS_PER_PAGE);

  // Lấy slice cho trang hiện tại
  const pagedUpcoming = upcomingEvents.slice(
    (upcomingPage - 1) * EVENTS_PER_PAGE,
    upcomingPage * EVENTS_PER_PAGE,
  );
  const pagedPast = pastEvents.slice(
    (pastPage - 1) * EVENTS_PER_PAGE,
    pastPage * EVENTS_PER_PAGE,
  );

  return (
    <>
      <Tabs defaultValue="upcoming" className="space-y-6">
        {/* Header + Tabs */}
        <div className="flex justify-between items-center">
          <h1 className="text-gray-900 text-[32px] font-semibold">Sự kiện</h1>
          <TabsList className="bg-gray-100 rounded-[8px] p-[2px]">
            <TabsTrigger value="upcoming">Sắp tới</TabsTrigger>
            <TabsTrigger value="past">Đã qua</TabsTrigger>
          </TabsList>
        </div>

        {/* Tab: Sự kiện sắp tới */}
        <TabsContent value="upcoming">
          {upcomingEvents.length > 0 ? (
            <>
              <EventList events={pagedUpcoming} onEventClick={openModal} />
              {totalUpcomingPages > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                  {Array.from(
                    { length: totalUpcomingPages },
                    (_, i) => i + 1,
                  ).map((p) => (
                    <button
                      key={p}
                      onClick={() => setUpcomingPage(p)}
                      className={`px-3 py-1 rounded ${
                        p === upcomingPage
                          ? "bg-gray-600 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <NoEventsComponent
              message="Không có sự kiện sắp tới"
              subMessage="Bạn chưa có sự kiện nào lên lịch."
            />
          )}
        </TabsContent>

        {/* Tab: Sự kiện đã qua */}
        <TabsContent value="past">
          {pastEvents.length > 0 ? (
            <>
              <EventList events={pagedPast} onEventClick={openModal} />
              {totalPastPages > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                  {Array.from({ length: totalPastPages }, (_, i) => i + 1).map(
                    (p) => (
                      <button
                        key={p}
                        onClick={() => setPastPage(p)}
                        className={`px-3 py-1 rounded ${
                          p === pastPage
                            ? "bg-gray-600 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {p}
                      </button>
                    ),
                  )}
                </div>
              )}
            </>
          ) : (
            <NoEventsComponent
              message="Không có sự kiện đã qua"
              subMessage="Bạn chưa có lịch sử sự kiện."
            />
          )}
        </TabsContent>
      </Tabs>

      {/* Modal chi tiết sự kiện */}
      <EventModal
        isOpen={isModalOpen}
        onClose={closeModal}
        event={selectedEvent}
        onCancel={handleRemoveEvent}
      />
    </>
  );
}
