"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { apiRequest } from "./api";
import { eventSchema } from "./EventSchema";
import { EventModal } from "@/components/common/event/event-modal";
import type { EventWithUI } from "@/style/events-stype";
import type { z } from "zod";

type EventProps = z.infer<typeof eventSchema>;

const EventList: React.FC = () => {
  const [events, setEvents] = useState<EventWithUI[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventWithUI | null>(null);

  const openModal = (event: EventWithUI) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleRemoveEvent = (removed: EventWithUI) => {
    setEvents((prev) => prev.filter((e) => e.id !== removed.id));
    closeModal();
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await apiRequest<any>("get", "/events");
        const eventsArray = Array.isArray(data) ? data : data.events || [];
        const validatedEvents = eventSchema.array().parse(eventsArray);
        const enhancedEvents: any[] = validatedEvents
          .slice(0, 12)
          .map((item) => {
            const date = new Date(item.startTime);
            return {
              ...item,
              coverImage: item.coverImage || "/images/events/vcs-mixer.jpg",
              dateLabel: date.toLocaleDateString("vi-VN", {
                day: "numeric",
                month: "short",
              }),
              dayLabel: date.toLocaleDateString("vi-VN", { weekday: "short" }),
              displayTime: date.toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
              }),
              displayDate: date.toLocaleDateString("vi-VN"),
              isUserEvent: false,
              isParticipating: false,
              calendarId: "", // Dummy or real value
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              createdBy: "", // Dummy or real value
              updatedBy: "", // Add missing property
              attendees: [], // Add missing property (empty array or actual data)
              requiresApproval: false, // Optional, adjust according to your logic
            };
          });

        setEvents(enhancedEvents);
      } catch (error) {
        console.error("Failed to fetch events:", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div>Đang tải...</div>;
  if (events.length === 0) return <div>Không có sự kiện nào.</div>;

  return (
    <section className="w-full py-6">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900">Khám phá sự kiện</h2>
        <p className="text-gray-600 mt-2">
          Khám phá các sự kiện phổ biến gần bạn, duyệt theo danh mục, hoặc xem
          qua một số lịch cộng đồng tuyệt vời.
        </p>
        <div className="flex">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mt-6">
              Sự kiện phổ biến
            </h3>
            <p className="text-gray-500">TP. Hồ Chí Minh</p>
          </div>
          <div className="mt-6 relative">
            <Button className="w-[115px] absolute left-[580px] cursor-pointer hover:bg-gray-300 hover:text-black">
              <Link href="/featured-calendar/0196c4c3-5e71-7265-b676-f88d404f087d">
                Xem tất cả →
              </Link>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex space-x-4 cursor-pointer"
              onClick={() => openModal(event)}
            >
              <div className="w-24 h-24 relative">
                <Image
                  src={event.coverImage || "/images/events/vcs-mixer.jpg"} // Fallback image
                  alt={event.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">
                  {event.title}
                </h4>
                <p className="text-gray-600 text-sm py-2">
                  {event.displayTime} {event.dateLabel}
                </p>
                <p className="text-gray-500 text-sm">{event.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <EventModal
        isOpen={isModalOpen}
        onClose={closeModal}
        event={selectedEvent}
        onCancel={handleRemoveEvent}
      />
    </section>
  );
};

export default EventList;
