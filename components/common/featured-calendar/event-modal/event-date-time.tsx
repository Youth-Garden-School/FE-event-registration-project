import { Calendar, MapPin, Video } from "lucide-react";

interface EventDateTimeProps {
  date: Date;
  time: string;
  location: string;
  city: string;
  isOnlineEvent: boolean;
  formatDate: (date: Date) => string;
}

export function EventDateTime({
  date,
  time,
  location,
  city,
  isOnlineEvent,
  formatDate,
}: EventDateTimeProps) {
  return (
    <div className="px-5 py-3 flex flex-col gap-3 border-t border-gray-100 mt-4">
      <div className="flex items-start gap-3">
        <div className="bg-gray-100 rounded-full p-2 mt-1">
          <Calendar className="h-5 w-5 text-gray-600" />
        </div>
        <div>
          <div className="font-medium">{date ? formatDate(date) : ""}</div>
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
  );
}
