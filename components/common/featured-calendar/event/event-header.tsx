import { Calendar, MapPin, Video } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { events } from "@/lib/events-calendar-data";

interface EventHeaderProps {
  eventId: string | number;
}

export function EventHeader({ eventId }: EventHeaderProps) {
  // Find the event from data
  const event = events.find((e) => e.id.toString() === eventId.toString());

  if (!event) return null;

  const { title, date, time, location, city } = event;

  // Check if the event is online
  const isOnlineEvent =
    location?.toLowerCase().includes("online") ||
    location?.toLowerCase().includes("zoom") ||
    event.type === "online";

  // Format date to Vietnamese
  const formatDate = (date: Date) => {
    const dayOfWeek = format(date, "EEEE", { locale: vi });
    const dayOfMonth = date.getDate();
    const month = date.getMonth() + 1;
    return `${dayOfWeek}, ${dayOfMonth} tháng ${month}`;
  };

  return (
    <div>
      {/* Event title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>

      {/* Date and location */}
      <div className="mb-6">
        <div className="flex items-start gap-3 mb-3">
          <div className="bg-gray-100 rounded-full p-2 mt-1">
            <Calendar className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <div className="font-medium">{formatDate(date)}</div>
            <div className="text-gray-600">{time}</div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="bg-gray-100 rounded-full p-2 mt-1">
            {isOnlineEvent ? (
              <Video className="h-5 w-5 text-blue-600" />
            ) : (
              <MapPin className="h-5 w-5 text-gray-600" />
            )}
          </div>
          <div>
            <div className="font-medium">
              {isOnlineEvent ? "Sự kiện trực tuyến" : location}
            </div>
            <div className="text-gray-600">
              {isOnlineEvent ? "Tham gia qua Zoom" : city}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
