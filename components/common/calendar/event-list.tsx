"use client";

import { useState, useEffect } from "react";
import type { CalendarEvent } from "@/lib/api-calendar";
import { fetchCalendarEvents } from "@/lib/api-calendar";
import {
  getUserRegistrations,
  getEventRegistrations,
  type Registration,
} from "@/lib/api-event";
import { EventCard } from "./event-card";
import NoEventsComponent from "@/components/common/event/no-event";
import { format, isToday, isTomorrow } from "date-fns";
import { vi } from "date-fns/locale";
import { Pagination } from "@/components/ui/pagination";
import type { EventWithUI } from "@/style/events-stype";

interface EventListProps {
  calendarId: string;
  onEventClick?: (event: CalendarEvent) => void;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  eventsPerPage?: number;
  events?: EventWithUI[];
}

export default function EventList({
  calendarId,
  onEventClick,
  currentPage = 1,
  onPageChange = () => {},
  eventsPerPage = 10,
  events: initialEvents,
}: EventListProps) {
  const [events, setEvents] = useState<EventWithUI[]>(initialEvents ?? []);
  const [loading, setLoading] = useState(!initialEvents);

  // IDs của sự kiện đã đăng ký
  const [registeredIds, setRegisteredIds] = useState<Set<string>>(new Set());
  // Bản đồ eventId -> registrationId để dùng hủy đăng ký
  const [registrationMap, setRegistrationMap] = useState<Map<string, string>>(
    new Map(),
  );
  // IDs của sự kiện bạn có quyền quản lý
  const [managedIds, setManagedIds] = useState<Set<string>>(new Set());

  // 1) Load tất cả events trong calendar nếu không có initialEvents
  useEffect(() => {
    if (initialEvents) {
      setEvents(initialEvents);
      return;
    }

    async function load() {
      setLoading(true);
      try {
        const evs = await fetchCalendarEvents(calendarId);
        // Convert to EventWithUI
        const uiEvents = evs.map((e) => {
          const dt = new Date(e.startTime);
          const dateLabel = isToday(dt)
            ? "Hôm nay"
            : isTomorrow(dt)
              ? "Ngày mai"
              : format(dt, "d 'thg' M", { locale: vi });
          return {
            ...e,
            dateLabel,
            dayLabel: format(dt, "EEEE", { locale: vi }),
            displayTime: format(dt, "HH:mm", { locale: vi }),
            attendees: e.attendees ?? [],
          };
        });
        setEvents(uiEvents);
      } catch (err) {
        console.error("Error loading calendar events:", err);
      } finally {
        setLoading(false);
      }
    }

    if (calendarId) {
      load();
    }
  }, [calendarId, initialEvents]);

  // 2) Phân loại: đã đăng ký? có quản lý?
  useEffect(() => {
    async function classify() {
      try {
        // A) Lấy registrations của user
        const meRes = await getUserRegistrations(0, 100, "createdAt");
        const regs: Registration[] = meRes.data.result.content;

        const regSet = new Set(regs.map((r) => r.event.id));
        setRegisteredIds(regSet);

        // Tạo map eventId -> registrationId
        const regMap = new Map<string, string>();
        regs.forEach((r) => regMap.set(r.event.id, r.id));
        setRegistrationMap(regMap);

        // B) Xác định event nào bạn quản lý
        const mSet = new Set<string>();
        await Promise.all(
          events.map(async (ev) => {
            try {
              // Nếu call thành công, bạn là manager
              await getEventRegistrations(ev.id, 0, 1, "createdAt");
              mSet.add(ev.id);
            } catch {
              // không phải manager --> bỏ qua
            }
          }),
        );
        setManagedIds(mSet);
      } catch (err) {
        console.error("Cannot classify events:", err);
      }
    }
    if (events.length) classify();
  }, [events]);

  // Cập nhật state khi user register/unregister từ modal
  const handleRegisterChange = (eventId: string, registered: boolean) => {
    setRegisteredIds((prev) => {
      const next = new Set(prev);
      if (registered) next.add(eventId);
      else next.delete(eventId);
      return next;
    });
    // Nếu hủy và cần cập nhật map, có thể xoá key khỏi map
    if (!registered) {
      setRegistrationMap((prev) => {
        const next = new Map(prev);
        next.delete(eventId);
        return next;
      });
    }
  };

  // Phân trang và nhóm theo ngày
  const totalPages = Math.ceil(events.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const pageEvents = events.slice(startIndex, startIndex + eventsPerPage);
  const eventsByDate = pageEvents.reduce<Record<string, EventWithUI[]>>(
    (acc, ev) => {
      const label = ev.dateLabel;
      if (!acc[label]) acc[label] = [];
      acc[label].push(ev);
      return acc;
    },
    {},
  );

  if (loading) return <div>Đang tải sự kiện…</div>;

  return (
    <div className="space-y-0 pb-8">
      {Object.entries(eventsByDate).map(([date, dayEvents]) => (
        <div key={date} className="relative">
          <div className="mb-4 font-medium text-gray-700">{date}</div>
          <div className="space-y-4">
            {dayEvents.map((ev) => (
              <EventCard
                key={ev.id}
                event={ev}
                registrationId={registrationMap.get(ev.id)}
                isRegistered={registeredIds.has(ev.id)}
                isManaged={managedIds.has(ev.id)}
                
                onRegisterChange={handleRegisterChange}
                onDeleteEvent={(eventId) => onEventClick?.(eventId)}
              />
            ))}
          </div>
        </div>
      ))}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}

      {!events.length && (
        <div className="text-center py-8 text-gray-500">
          <NoEventsComponent
            message="Không có sự kiện"
            subMessage="Không có sự kiện mới hiện tạitại."
          />
        </div>
      )}
    </div>
  );
}
