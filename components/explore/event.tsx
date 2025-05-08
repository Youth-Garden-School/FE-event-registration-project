"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import Link from "next/link";
import { apiRequest } from "./api";
import { eventSchema } from "./EventSchema";

type EventProps = z.infer<typeof eventSchema>;

const EventList: React.FC = () => {
  const [events, setEvents] = useState<EventProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await apiRequest<any>("get", "/events");
        console.log("Raw data from /events:", data); // Add this
        const eventsArray = Array.isArray(data) ? data : data.events || [];
        const validatedEvents = eventSchema.array().parse(eventsArray);
        setEvents(
          validatedEvents.slice(0, 12).map((item) => ({
            id: item.id,
            title: item.title,
            startTime: item.startTime,
            location: item.location,
            coverImage: item.coverImage || "/images/events/vcs-mixer.jpg",
          })),
        );
      } catch (error) {
        console.error("Failed to fetch events:", error);
        setEvents([]); // Set empty array on error
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
              <Link href="/">Xem tất cả →</Link>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {events.map((event) => {
            const date = new Date(event.startTime).toLocaleDateString("vi-VN", {
              weekday: "short",
              day: "numeric",
              month: "short",
            });
            const time = new Date(event.startTime).toLocaleTimeString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
            });
            return (
              <div key={event.id} className="flex space-x-4 cursor-pointer">
                <div className="w-24 h-24 relative">
                  <Image
                    src={event.coverImage || "/images/events/vcs-mixer.jpg"}
                    alt={event.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                    onError={() => {
                      console.warn(`Failed to load image: ${event.coverImage}`);
                    }}
                  />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {event.title}
                  </h4>
                  <p className="text-gray-600 text-sm py-2">
                    {time} {date}
                  </p>
                  <p className="text-gray-500 text-sm">{event.location}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EventList;
