"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import EventList from "./event-list";
import NoEventsComponent from "./no-event";
import { EventModal } from "./event-modal";
import { getUserRegistrations } from "@/lib/api-event";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

type EventWithUI = any;
type EventAttendee = any;
type Registration = any;

export default function EventTabs() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<EventWithUI[]>([]);
  const [pastEvents, setPastEvents] = useState<EventWithUI[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventWithUI | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const EVENTS_PER_PAGE = 10;
  const [upcomingPage, setUpcomingPage] = useState(1);
  const [pastPage, setPastPage] = useState(1);

  function buildEventUI(
    reg: any,
    attendees: any[],
    isUserEvent: boolean,
  ): EventWithUI {
    const e = reg.event;
    const start = new Date(e.startTime);
    return {
      id: e.id,
      title: e.title,
      description: e.description,
      coverImage: e.coverImage,
      startTime: e.startTime || "",
      endTime: e.endTime || "",
      location: e.location,
      isOnline: e.isOnline,
      eventColor: e.eventColor,
      fontStyle: e.fontStyle,
      themeMode: e.themeMode,
      style: e.style,
      createdBy: e.createdBy,
      createdAt: e.createdAt,
      updatedBy: e.updatedBy,
      updatedAt: e.updatedAt,
      calendarId: e.calendarId,
      attendees: attendees,
      attendeeCount: attendees.length,
      requiresApproval: reg.status !== "CONFIRMED",
      isUserEvent,
      myRegistrationId: reg.id,
      dateLabel: format(start, "dd/MM/yyyy", { locale: vi }),
      dayLabel: format(start, "EEEE", { locale: vi }),
    };
  }

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        // 1) Lấy registrations của user
        const meRes = await getUserRegistrations(0, 100, "createdAt");
        const regs: Registration[] = meRes.data.result.content;
        const now = new Date();

        // 2) Chỉ lấy registrations có status là CONFIRMED
        const confirmedRegs = regs.filter((r) => r.status === "CONFIRMED");

        // 3) Chuyển thành UI với flags cho quản lý vs đã đăng ký
        const allUI = confirmedRegs.map((r) => {
          const attendees = r.event.attendees || [];
          // Kiểm tra user có phải creator (quản lý) không
          const isUserEvent = r.user.id === r.event.createdBy;

          return buildEventUI(r, attendees, isUserEvent);
        });

        // 3) Phân nhóm upcoming / past
        const ups = allUI.filter((ui) => new Date(ui.startTime) > now);
        const pst = allUI.filter((ui) => new Date(ui.endTime) < now);

        // 4) Sort theo thời gian
        ups.sort(
          (a, b) =>
            new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
        );
        pst.sort(
          (a, b) =>
            new Date(b.endTime).getTime() - new Date(a.endTime).getTime(),
        );

        setUpcomingEvents(ups);
        setPastEvents(pst);
      } catch (e: any) {
        if (e.response?.status === 401) {
          router.push("/login");
          return;
        }
        setError(e.message || "Không thể tải dữ liệu");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [router]);

  const openModal = (e: EventWithUI) => {
    setSelectedEvent(e);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };
  const handleRemoveEvent = (removed: EventWithUI) => {
    setUpcomingEvents((prev) => prev.filter((x) => x.id !== removed.id));
    setPastEvents((prev) => prev.filter((x) => x.id !== removed.id));
    closeModal();
  };

  if (loading)
    return (
      <div className=" bg-white-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <div className="w-16 h-16 border-4 border-t-gray-800 border-b-gray-800 border-l-gray-200 border-r-gray-200 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">
            Đang tải sự kiện của bạn...
          </p>
        </div>
      </div>
    );

  if (error)
    return <div className="p-4 text-red-500 text-center">Error: {error}</div>;

  const totalUpcomingPages = Math.ceil(upcomingEvents.length / EVENTS_PER_PAGE);
  const totalPastPages = Math.ceil(pastEvents.length / EVENTS_PER_PAGE);
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
        <div className="flex justify-between items-center">
          <h1 className="text-gray-900 text-[32px] font-semibold">
            Sự kiện của bạn
          </h1>
          <TabsList className="bg-gray-100 rounded p-1">
            <TabsTrigger value="upcoming">Sắp tới</TabsTrigger>
            <TabsTrigger value="past">Đã qua</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="upcoming">
          {pagedUpcoming.length > 0 ? (
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
                      className={`px-3 py-1 rounded ${p === upcomingPage ? "bg-gray-600 text-white" : "bg-gray-200 text-gray-700"}`}
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
              subMessage="Bạn chưa đăng ký sự kiện nào."
            />
          )}
        </TabsContent>

        <TabsContent value="past">
          {pagedPast.length > 0 ? (
            <>
              <EventList events={pagedPast} onEventClick={openModal} />
              {totalPastPages > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                  {Array.from({ length: totalPastPages }, (_, i) => i + 1).map(
                    (p) => (
                      <button
                        key={p}
                        onClick={() => setPastPage(p)}
                        className={`px-3 py-1 rounded ${p === pastPage ? "bg-gray-600 text-white" : "bg-gray-200 text-gray-700"}`}
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

      {selectedEvent && (
        <EventModal
          isOpen={isModalOpen}
          onClose={closeModal}
          event={selectedEvent}
          onCancel={handleRemoveEvent}
        />
      )}
    </>
  );
}
