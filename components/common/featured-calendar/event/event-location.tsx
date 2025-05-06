"use client";

import { Button } from "@/components/ui/button";
import { Video, ExternalLink } from "lucide-react";
import { events } from "@/lib/events-calendar-data";

interface EventLocationProps {
  eventId: string | number;
  isRegistered: boolean;
  onRegister: () => void;
}

export function EventLocation({
  eventId,
  isRegistered,
  onRegister,
}: EventLocationProps) {
  // Find the event from data
  const event = events.find((e) => e.id.toString() === eventId.toString());

  if (!event) return null;

  // Check if the event is online
  const isOnlineEvent =
    event.location?.toLowerCase().includes("online") ||
    event.location?.toLowerCase().includes("zoom") ||
    event.type === "online";

  // Get Google Maps URL for physical locations
  const getGoogleMapsUrl = () => {
    const address =
      event.fullAddress || event.address || `${event.location}, ${event.city}`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  };

  // Get Google Maps Embed URL for iframe
  const getMapEmbedUrl = () => {
    return `https://maps.google.com/maps?q=${encodeURIComponent(
      event.fullAddress || event.address || `${event.location}, ${event.city}`,
    )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  };

  const handleCopyZoomLink = () => {
    if (event.zoomLink) {
      navigator.clipboard
        .writeText(event.zoomLink)
        .then(() => {
          alert("Đã sao chép link Zoom!");
        })
        .catch((err) => {
          console.error("Không thể sao chép link Zoom: ", err);
        });
    }
  };

  return (
    <div className="mb-8">
      <h3 className="font-medium text-lg mb-3">Địa điểm</h3>

      {isOnlineEvent ? (
        <div className="space-y-4">
          <div className="mb-3">
            <div className="font-medium">Sự kiện trực tuyến</div>
            <div className="text-sm text-gray-600">Tham gia qua Zoom</div>
          </div>

          {isRegistered ? (
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Video className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-800">Link tham gia</span>
              </div>
              <div className="flex items-center justify-between bg-white border border-blue-100 rounded-md p-2 mb-3">
                <span className="text-sm text-gray-600 truncate">
                  {event.zoomLink || "https://zoom.us/j/123456789"}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-blue-600"
                  onClick={handleCopyZoomLink}
                >
                  Sao chép
                </Button>
              </div>
              <p className="text-sm text-gray-600">
                Link này sẽ hoạt động vào thời gian diễn ra sự kiện. Bạn cũng sẽ
                nhận được email nhắc nhở trước khi sự kiện bắt đầu.
              </p>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
              <p className="text-gray-600 mb-3">
                Đăng kí để nhận link tham gia sự kiện
              </p>
              <Button
                onClick={onRegister}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Đăng kí ngay
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="mb-3">
            <div className="font-medium">{event.location}</div>
            <div className="text-sm text-gray-600">
              {event.fullAddress ||
                event.address ||
                `${event.location}, ${event.city}`}
            </div>
          </div>

          <div className="relative w-full rounded-lg overflow-hidden border border-gray-200 mb-3">
            <div className="h-[300px]">
              <iframe
                src={getMapEmbedUrl()}
                className="absolute top-0 left-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Bản đồ địa điểm: ${event.location}`}
              />
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 p-0 h-auto hover:bg-transparent hover:underline flex items-center"
            onClick={() => window.open(getGoogleMapsUrl(), "_blank")}
          >
            <span>Xem bản đồ lớn hơn</span>
            <ExternalLink className="h-3 w-3 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}
