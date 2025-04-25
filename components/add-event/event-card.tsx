import Image from "next/image";
import Link from "next/link";
import { MoreHorizontal, Video, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

interface EventCardProps {
  event: any;
}

export function EventCard({ event }: EventCardProps) {
  const isOnlineEvent = event.type === "online";

  // Format date and time
  const formattedDate = format(new Date(event.date), "d 'thg' M", {
    locale: vi,
  });

  // Generate event ID (using the event.id or a random string if needed)
  const eventId = event.id
    ? event.id.toString()
    : Math.random().toString(36).substring(2, 8);

  return (
    <div className="bg-white rounded-lg border p-4 relative">
      {/* Invisible link covering the whole card for accessibility */}
      <Link
        href={`/${eventId}`}
        className="absolute inset-0 z-10"
        aria-label={event.title}
        tabIndex={-1}
      >
        &nbsp;
      </Link>

      <div className="flex items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">{event.title}</h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 relative z-20"
            >
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
            <span>{formattedDate}</span>
            <span>•</span>
            <span>{event.time}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
            {isOnlineEvent ? (
              <>
                <Video className="h-4 w-4 text-blue-500" />
                <span className="text-blue-600">Trực tuyến</span>
              </>
            ) : (
              <>
                <MapPin className="h-4 w-4" />
                <span>{event.location}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
            <Users className="h-4 w-4" />
            <span>
              {event.attendees > 0
                ? `${event.attendees} người tham dự`
                : "Không có người tham dự"}
            </span>
          </div>

          {event.featured && (
            <div className="mt-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Nổi bật trong {event.featuredLocation || "TP. Hồ Chí Minh"}
              </span>
            </div>
          )}

          {event.description && (
            <div className="mt-2 text-sm text-gray-600 line-clamp-2">
              {event.description}
            </div>
          )}

          <div className="mt-3">
            <Button
              variant="outline"
              size="sm"
              className="text-sm relative z-20"
            >
              + Thêm thẻ
            </Button>
          </div>

          <div className="mt-3">
            <Button
              variant="outline"
              size="sm"
              className="text-sm relative z-20"
            >
              Quản lý sự kiện →
            </Button>
          </div>
        </div>

        <div className="w-24 h-24 rounded-lg overflow-hidden">
          <Image
            src={event.image || "/placeholder.svg?height=96&width=96"}
            alt={event.title}
            width={96}
            height={96}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
