"use client";

// components/event-list.tsx
import type { EventWithUI } from "@/style/events-stype";
import EventCard from "./event-card";

interface EventListProps {
  events: EventWithUI[];
  onEventClick?: (event: EventWithUI) => void; // nhận event object
}

export default function EventList({ events, onEventClick }: EventListProps) {
  const eventsByDate = events.reduce(
    (acc, event) => {
      const date = event.dateLabel;
      (acc[date] ??= []).push(event);
      return acc;
    },
    {} as Record<string, EventWithUI[]>,
  );

  return (
    <div className="space-y-0 pb-8">
      {Object.entries(eventsByDate).map(([date, dateEvents], idx, arr) => (
        <div key={date} className="relative">
          <div className="grid grid-cols-[120px_60px_1fr] gap-0">
            <div className="pt-6">
              <div className="font-medium text-gray-900">
                {dateEvents[0].dateLabel}
              </div>
              <div className="font-medium text-gray-500">
                {dateEvents[0].dayLabel}
              </div>
            </div>
            <div className="relative flex justify-center">
              <div
                className={`
                  absolute border-l-2 border-dashed border-gray-200 left-1/2 -translate-x-1/2
                  ${idx === 0 ? "top-7" : "top-0"}
                  ${idx === arr.length - 1 ? "bottom-0 h-[calc(100%-7px)]" : "bottom-0"}
                `}
              />
              <div className="w-2 h-2 rounded-full bg-gray-900 mt-7 relative z-10" />
            </div>
            <div className="space-y-6 py-6">
              {dateEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onClick={() => onEventClick?.(event)} // truyền event object
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
