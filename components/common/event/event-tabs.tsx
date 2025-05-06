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
  const [upcomingEvents, setUpcomingEvents] = useState<EventWithUI[]>([]);
  const [pastEvents, setPastEvents] = useState<EventWithUI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const handleRemoveEvent = (removedEvent: any) => {
    setUpcomingEvents((prev) => prev.filter((e) => e.id !== removedEvent.id));
    setPastEvents((prev) => prev.filter((e) => e.id !== removedEvent.id));
    closeModal();
  };
  // modal state
  const [selectedEvent, setSelectedEvent] = useState<EventWithUI | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([getUpcomingEvents(), getPastEvents()])
      .then(([up, past]) => {
        setUpcomingEvents(up);
        setPastEvents(past);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const openModal = (event: EventWithUI) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <>
      <Tabs defaultValue="upcoming" className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-gray-900 text-[32px] font-semibold">Sự kiện</h1>
          <TabsList className="bg-gray-100 rounded-[8px] p-[2px]">
            <TabsTrigger value="upcoming">Sắp tới</TabsTrigger>
            <TabsTrigger value="past">Đã qua</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="upcoming">
          {upcomingEvents.length > 0 ? (
            <EventList events={upcomingEvents} onEventClick={openModal} />
          ) : (
            <NoEventsComponent
              message="Không có sự kiện sắp tới"
              subMessage="Bạn chưa tổ chức hoặc tham gia sự kiện nào sắp tới."
            />
          )}
        </TabsContent>

        <TabsContent value="past">
          {pastEvents.length > 0 ? (
            <EventList events={pastEvents} onEventClick={openModal} />
          ) : (
            <NoEventsComponent
              message="Không có sự kiện trước đây"
              subMessage="Bạn chưa tổ chức hoặc tham gia sự kiện nào."
            />
          )}
        </TabsContent>
      </Tabs>

      {/* render modal ở cuối */}
      <EventModal
        isOpen={isModalOpen}
        onClose={closeModal}
        event={selectedEvent}
        onCancel={handleRemoveEvent}
      />
    </>
  );
}
