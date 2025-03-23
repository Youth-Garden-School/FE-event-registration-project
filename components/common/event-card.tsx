// Import các thư viện và components cần thiết / Import necessary libraries and components
import { MapPin, Users, ArrowRight, Star, AlertTriangle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/ui/avatar-group";
import type { Event } from "@/lib/types";
import Image from "next/image";

// Định nghĩa interface cho props của component
// Define interface for component props
interface EventCardProps {
  event: Event; // Thông tin sự kiện / Event information
}

// Component chính hiển thị thẻ sự kiện với hai chế độ: người tổ chức và người tham gia
// Main component displaying event card with two modes: organizer and participant
export default function EventCard({ event }: EventCardProps) {
  // Nếu là sự kiện của người dùng (họ tổ chức)
  // If this is user's event (they are the organizer)
  if (event.isUserEvent) {
    return (
      // Container chính với hiệu ứng hover / Main container with hover effect
      <div
        className={`
        bg-white
        dark:bg-[#16182b]
        rounded-xl
        overflow-hidden
        border
        border-gray-200
        dark:border-[#ffffff29]
        hover:border-gray-400
        dark:hover:border-white
        transition-all
        duration-300
        cursor-pointer
      `}
      >
        <div className="flex">
          {/* Phần nội dung bên trái / Left content section */}
          <div className="p-6 flex-1">
            {/* Hiển thị thời gian và tiêu đề / Display time and title */}
            <div className="text-gray-600 dark:text-gray-400 text-lg font-medium mb-1">
              {event.time}
            </div>
            <h3 className="text-gray-900 dark:text-white text-xl font-bold mb-2">
              {event.title}
            </h3>

            {/* Thông tin địa điểm và số người tham gia / Location and participant info */}
            <div className="space-y-2">
              {/* Hiển thị địa điểm hoặc cảnh báo nếu thiếu / Display location or warning if missing */}
              {event.location ? (
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{event.location}</span>
                </div>
              ) : event.missingLocation ? (
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  <span className="text-sm">Thiếu địa điểm</span>
                </div>
              ) : null}

              {/* Hiển thị số người tham gia / Display participant count */}
              <div className="flex items-center text-gray-500 dark:text-gray-400">
                <Users className="w-4 h-4 mr-2" />
                <span className="text-sm">
                  {event.participants.length > 0
                    ? `${event.participants.length} người tham dự`
                    : "Không có người tham dự"}
                </span>
              </div>
            </div>

            {/* Phần nút quản lý và hiển thị người tham gia / Management button and participants display */}
            <div className="mt-3 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 rounded-md bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 text-gray-900 dark:text-white text-sm transition-colors flex items-center">
                  <span>Quản lý sự kiện</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>

                {/* Hiển thị avatar người tham gia / Display participant avatars */}
                {event.participants.length > 0 && (
                  <div className="flex items-center gap-2">
                    <AvatarGroup>
                      {event.participants.slice(0, 3).map((participant) => (
                        <Avatar key={participant.id} className="w-5 h-5">
                          <AvatarImage src={participant.avatar} />
                          <AvatarFallback className="text-xs">
                            {participant.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </AvatarGroup>
                    {event.participants.length > 3 && (
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        +{event.participants.length - 3}
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
                src={event.image || "/placeholder.svg"}
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

  // Nếu không phải sự kiện của người dùng (họ tham gia)
  // If not user's event (they are participating)
  return (
    <div
      className={`
      bg-white
      dark:bg-[#16182b]
      rounded-xl
      overflow-hidden
      border
      border-gray-200
      dark:border-[#ffffff29]
      hover:border-gray-400
      dark:hover:border-white
      transition-all
      duration-300
      cursor-pointer
    `}
    >
      <div className="flex">
        {/* Phần nội dung bên trái / Left content section */}
        <div className="p-6 flex-1">
          {/* Hiển thị thời gian / Display time */}
          <div className="text-gray-600 dark:text-gray-400 text-lg font-medium mb-1">
            {event.time}
            {event.endTime && ` - ${event.endTime}`}
          </div>
          {/* Tiêu đề sự kiện / Event title */}
          <h3 className="text-gray-900 dark:text-white text-xl font-bold mb-2">
            {event.title}
          </h3>

          {/* Thông tin người tổ chức và địa điểm / Organizer and location info */}
          <div className="space-y-2 mb-2">
            {/* Hiển thị người tổ chức / Display organizer */}
            {event.organizer && (
              <div className="flex items-center text-gray-500 dark:text-gray-400">
                <Star className="w-4 h-4 mr-2 text-yellow-400" />
                <span className="text-sm">{event.organizer}</span>
              </div>
            )}

            {/* Hiển thị địa điểm / Display location */}
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="text-sm">{event.location}</span>
            </div>
          </div>

          {/* Phần nút tham gia và hiển thị người tham gia / Participation button and participants display */}
          <div className="mt-3 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 rounded-md bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 text-sm transition-colors">
                Đã đăng ký
              </button>

              {/* Hiển thị avatar người tham gia / Display participant avatars */}
              {event.participants.length > 0 && (
                <div className="flex items-center gap-2">
                  <AvatarGroup>
                    {event.participants.slice(0, 3).map((participant) => (
                      <Avatar key={participant.id} className="w-5 h-5">
                        <AvatarImage src={participant.avatar} />
                        <AvatarFallback className="text-xs">
                          {participant.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </AvatarGroup>
                  {event.participants.length > 3 && (
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      +{event.participants.length - 3}
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
              src={event.image || "/placeholder.svg"}
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
