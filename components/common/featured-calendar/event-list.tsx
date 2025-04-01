import { format, isToday, isTomorrow, isSameDay } from "date-fns";
import { vi } from "date-fns/locale";
import EventCard from "@/components/common/featured-calendar/event-card";
import { events } from "@/lib/events-calendar-data";

interface EventListProps {
  categoryFilter?: string;
  selectedDate?: Date | null;
}

export function EventList({
  categoryFilter = "all",
  selectedDate = null,
}: EventListProps) {
  // Lọc sự kiện theo ngày nếu có ngày được chọn
  let filteredEvents = events;

  if (selectedDate) {
    filteredEvents = events.filter((event) =>
      isSameDay(event.date, selectedDate),
    );
  }

  // Nhóm sự kiện theo ngày
  const groupedEvents = filteredEvents.reduce(
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

  // Lọc sự kiện nếu có danh mục được chỉ định
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

  // Hàm trợ giúp để định dạng tiêu đề ngày
  const formatDateHeading = (dateKey: string) => {
    const date = new Date(dateKey);

    if (isToday(date)) {
      return "Hôm nay";
    } else if (isTomorrow(date)) {
      return "Ngày mai";
    } else {
      // Định dạng như "16 thg 4"
      return `${date.getDate()} thg ${date.getMonth() + 1}`;
    }
  };

  // Lấy ngày trong tuần bằng tiếng Việt
  const getDayOfWeek = (dateKey: string) => {
    const date = new Date(dateKey);
    return format(date, "EEEE", { locale: vi });
  };

  return (
    <div className="space-y-6">
      {filteredDates.length > 0 ? (
        filteredDates.map((dateKey) => (
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
        ))
      ) : (
        <div className="text-center py-8 text-gray-500">
          {selectedDate
            ? `Không có sự kiện nào vào ngày ${format(selectedDate, "d MMMM", { locale: vi })}`
            : "Không tìm thấy sự kiện nào"}
        </div>
      )}
    </div>
  );
}
