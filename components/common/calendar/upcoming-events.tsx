"use client";
import EventCard from "./event-card";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

interface UpcomingEventsProps {
  events: any[];
}

export function UpcomingEvents({ events }: UpcomingEventsProps) {
  // Nhóm sự kiện theo ngày
  const groupedEvents = events.reduce(
    (groups, event) => {
      const dateKey = format(event.date, "yyyy-MM-dd");

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }

      groups[dateKey].push(event);
      return groups;
    },
    {} as Record<string, typeof events>,
  );

  // Sắp xếp ngày
  const sortedDates = Object.keys(groupedEvents).sort();

  // Hàm trợ giúp để định dạng tiêu đề ngày
  const formatDateHeading = (dateKey: string) => {
    const date = new Date(dateKey);
    return format(date, "EEEE, d MMMM", { locale: vi });
  };

  if (events.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Không tìm thấy sự kiện nào
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {sortedDates.map((dateKey) => (
        <div key={dateKey}>
          <div className="flex items-center gap-2 text-gray-500 mb-3">
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <span>{formatDateHeading(dateKey)}</span>
          </div>

          <div className="space-y-4">
            {groupedEvents[dateKey].map((event: any) => (
              <EventCard
                key={event.id}
                time={event.time}
                title={event.title}
                hosts={event.hosts}
                type={event.type === "online" ? "online" : undefined}
                location={event.location}
                image={event.image}
                attendees={event.attendees}
                event={event}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
