// Import các thư viện và components cần thiết / Import necessary libraries and components
import { MapPin, Users, ArrowRight, Calendar } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/ui/avatar-group";
import { Badge } from "@/components/ui/badge";
import type { EventWithUI } from "@/style/events-stype";
import Image from "next/image";
import { formatTime } from "@/lib/utils";

// Định nghĩa interface cho props của component
// Define interface for component props
interface EventCardProps {
  event: EventWithUI;
  onClick?: () => void;
}

// Component chính hiển thị thẻ sự kiện / Main event card component
export default function EventCard({ event, onClick }: EventCardProps) {
  // Đảm bảo attendees luôn là một mảng / Ensure attendees is always an array
  const attendees = event.attendees || [];

  return (
    <div
      className="rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer bg-white dark:bg-[#16182b] border-gray-200 dark:border-[#ffffff29] hover:border-gray-400 dark:hover:border-white"
      onClick={onClick}
    >
      <div className="flex">
        {/* Phần nội dung bên trái / Left content section */}
        <div className="p-6 flex-1">
          {/* Hiển thị thời gian và tiêu đề / Display time and title */}
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-lg font-medium mb-1">
            <Calendar className="w-4 h-4" />
            <span className="whitespace-nowrap">
              {event.displayTime || formatTime(new Date(event.startTime))}
            </span>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-gray-900 dark:text-white text-xl font-bold">
              {event.title}
            </h3>
          </div>

          {/* Thông tin địa điểm và người tham dự / Location and attendee info */}
          <div className="space-y-2">
            {event.location && (
              <div className="flex items-center text-gray-500 dark:text-gray-400">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">{event.location}</span>
              </div>
            )}

            {/* Hiển thị số người tham dự / Display attendee count */}
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <Users className="w-4 h-4 mr-2" />
              <span className="text-sm">
                {attendees.length > 0
                  ? `${attendees.length} người tham dự`
                  : "Không có người tham dự"}
              </span>
            </div>
          </div>

          {/* Phần quản lý và hiển thị người tham dự / Management and attendee display */}
          <div className="mt-3 flex items-center gap-4">
            <div className="flex items-center gap-2">
              {event.isUserEvent ? (
                <button className="px-4 py-2 rounded-md bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 text-gray-900 dark:text-white text-sm transition-colors flex items-center">
                  <span>Quản lý sự kiện</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              ) : (
                <Badge
                  variant="secondary"
                  className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                >
                  {event.requiresApproval ? "Chờ duyệt" : "Đã đăng ký"}
                </Badge>
              )}

              {/* Hiển thị avatar người tham dự / Display attendee avatars */}
              {attendees.length > 0 && (
                <div className="flex items-center gap-2">
                  <AvatarGroup>
                    {attendees
                      .filter((a) => a?.status === "CONFIRMED")
                      .slice(0, 3)
                      .map((attendee) => (
                        <Avatar key={attendee?.id} className="w-5 h-5">
                          <AvatarFallback className="text-xs">
                            {attendee?.email?.charAt(0).toUpperCase() || "?"}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                  </AvatarGroup>
                  {attendees.length > 3 && (
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      +{attendees.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Phần hình ảnh bên phải / Right image section */}
        <div className="p-4">
          <div className="w-32 h-32 relative rounded-lg overflow-hidden">
            <Image
              src={event.coverImage || "/placeholder.svg"}
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
