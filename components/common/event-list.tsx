import type { Event } from "@/lib/types";
import EventCard from "./event-card";

interface EventListProps {
  events: Event[];
}

export default function EventList({ events }: EventListProps) {
  // Group events by date
  const eventsByDate = events.reduce(
    (acc, event) => {
      const date = event.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(event);
      return acc;
    },
    {} as Record<string, Event[]>,
  );

  return (
    <div className="space-y-0">
      {Object.entries(eventsByDate).map(([date, dateEvents], index, array) => (
        <div key={date} className="relative">
          <div className="grid grid-cols-[120px_60px_1fr] gap-0">
            {/* Cột bên trái: Ngày và thứ */}
            <div className="pt-6">
              <div className="font-medium">{dateEvents[0].dateLabel}</div>
              <div className="font-medium text-gray-400">
                {dateEvents[0].dayLabel}
              </div>
            </div>

            {/* Cột giữa: Timeline với chấm tròn và đường kẻ dọc */}
            <div className="relative flex justify-center">
              {/* Đường kẻ dọc */}
              <div
                className={`absolute border-l-2 border-dashed border-white/30 left-1/2 transform -translate-x-1/2 ${
                  index === 0 ? "top-7" : "top-0"
                } ${index === array.length - 1 ? "bottom-0 h-[calc(100%-7px)]" : "bottom-0"}`}
              ></div>

              {/* Chấm tròn */}
              <div className="w-2 h-2 rounded-full bg-white mt-7 relative z-10"></div>
            </div>

            {/* Cột bên phải: Các thẻ sự kiện */}
            <div className="space-y-6 py-6">
              {dateEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
