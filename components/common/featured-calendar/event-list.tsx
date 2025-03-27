import { format, isToday, isTomorrow } from "date-fns";
import { vi } from "date-fns/locale";
import EventCard from "@/components/common/featured-calendar/event-card";
import { events } from "@/lib/events-calendar-data";

interface EventListProps {
  categoryFilter?: string;
}

export function EventList({ categoryFilter = "all" }: EventListProps) {
  // Group events by date
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

  // Sort dates
  const sortedDates = Object.keys(groupedEvents).sort();

  // Filter events if category is specified
  const filteredDates =
    categoryFilter === "all"
      ? sortedDates
      : sortedDates.filter((dateKey) =>
          groupedEvents[dateKey].some(
            (event) =>
              (categoryFilter === "online" && event.type === "online") ||
              (categoryFilter === "irl-sf" && event.type === "in-person"),
          ),
        );

  // Helper function to format date heading
  const formatDateHeading = (dateKey: string) => {
    const date = new Date(dateKey);

    if (isToday(date)) {
      return "Hôm nay";
    } else if (isTomorrow(date)) {
      return "Ngày mai";
    } else {
      // Format like "16 thg 4"
      return `${date.getDate()} thg ${date.getMonth() + 1}`;
    }
  };

  // Get day of week in Vietnamese
  const getDayOfWeek = (dateKey: string) => {
    const date = new Date(dateKey);
    return format(date, "EEEE", { locale: vi });
  };

  return (
    <div className="space-y-6">
      {filteredDates.map((dateKey) => (
        <div key={dateKey}>
          <div className="flex items-center gap-2 text-gray-500">
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <span>{formatDateHeading(dateKey)}</span>
            <span className="text-gray-400">{getDayOfWeek(dateKey)}</span>
          </div>

          <div className="space-y-6 mt-4">
            {groupedEvents[dateKey]
              .filter(
                (event) =>
                  categoryFilter === "all" ||
                  (categoryFilter === "online" && event.type === "online") ||
                  (categoryFilter === "irl-sf" && event.type === "in-person"),
              )
              .map((event) => (
                <EventCard
                  key={event.id}
                  time={event.time}
                  title={event.title}
                  hosts={event.hosts.map((host) => `Bởi ${host}`)}
                  type={event.type === "online" ? "Trực tuyến" : undefined}
                  location={event.location}
                  image={event.image}
                  attendees={event.attendees}
                />
              ))}
          </div>
        </div>
      ))}

      {filteredDates.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Không tìm thấy sự kiện nào
        </div>
      )}
    </div>
  );
}
