// Import các thư viện và components cần thiết / Import necessary libraries and components
import type { EventWithUI } from "@/style/events-stype";
import EventCard from "./event-card";

// Định nghĩa interface cho props của component
// Define interface for component props
interface EventListProps {
  events: EventWithUI[]; // Mảng các sự kiện / Array of events
  onEventClick?: (eventId: string) => void; // Callback khi click vào sự kiện / Callback when clicking an event
}

// Component chính hiển thị danh sách sự kiện theo ngày
// Main component displaying events list grouped by date
export default function EventList({ events, onEventClick }: EventListProps) {
  // Nhóm các sự kiện theo ngày / Group events by date
  const eventsByDate = events.reduce(
    (acc, event) => {
      const date = event.dateLabel;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(event);
      return acc;
    },
    {} as Record<string, EventWithUI[]>,
  );

  return (
    <div className="space-y-0 pb-8">
      {/* Lặp qua từng ngày và hiển thị các sự kiện / Iterate through each date and display events */}
      {Object.entries(eventsByDate).map(([date, dateEvents], index, array) => (
        <div key={date} className="relative">
          {/* Grid layout với 3 cột: ngày, timeline, và sự kiện */}
          {/* Grid layout with 3 columns: date, timeline, and events */}
          <div className="grid grid-cols-[120px_60px_1fr] gap-0">
            {/* Cột bên trái: Ngày và thứ / Left column: Date and day */}
            <div className="pt-6">
              <div className="font-medium text-gray-900 dark:text-white">
                {dateEvents[0].dateLabel}
              </div>
              <div className="font-medium text-gray-500 dark:text-gray-400">
                {dateEvents[0].dayLabel}
              </div>
            </div>

            {/* Cột giữa: Timeline với chấm tròn và đường kẻ dọc */}
            {/* Middle column: Timeline with dot and vertical line */}
            <div className="relative flex justify-center">
              {/* Đường kẻ dọc / Vertical line */}
              <div
                className={`
                  absolute
                  border-l-2
                  border-dashed
                  border-gray-200
                  dark:border-white/30
                  left-1/2
                  transform
                  -translate-x-1/2
                  ${index === 0 ? "top-7" : "top-0"}
                  ${index === array.length - 1 ? "bottom-0 h-[calc(100%-7px)]" : "bottom-0"}
                `}
              ></div>

              {/* Chấm tròn / Timeline dot */}
              <div className="w-2 h-2 rounded-full bg-gray-900 dark:bg-white mt-7 relative z-10"></div>
            </div>

            {/* Cột bên phải: Các thẻ sự kiện / Right column: Event cards */}
            <div className="space-y-6 py-6">
              {dateEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onClick={() => onEventClick?.(event.id)}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
