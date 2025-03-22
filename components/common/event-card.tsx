// Import các thư viện và components cần thiết / Import necessary libraries and components
import { MapPin, Users, ArrowRight, Star, AlertTriangle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/ui/avatar-group";
import type { Event } from "@/lib/types";

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
      <div className="bg-[#1c1e20] rounded-xl overflow-hidden border border-white/10 hover:border-white/50 transition-all duration-200">
        <div className="flex items-center">
          {/* Phần nội dung bên trái / Left content section */}
          <div className="p-2 flex-1">
            {/* Hiển thị thời gian và tiêu đề / Display time and title */}
            <div className="text-lg font-medium mb-1">{event.time}</div>
            <h3 className="text-xl font-bold mb-2">{event.title}</h3>

            {/* Thông tin địa điểm và số người tham gia / Location and participant info */}
            <div className="space-y-2">
              {/* Hiển thị địa điểm hoặc cảnh báo nếu thiếu / Display location or warning if missing */}
              {event.location ? (
                <div className="flex items-center text-gray-400">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{event.location}</span>
                </div>
              ) : event.missingLocation ? (
                <div className="flex items-center text-[#f0b429]">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  <span className="text-sm">Thiếu địa điểm</span>
                </div>
              ) : null}

              {/* Hiển thị số người tham gia / Display participant count */}
              <div className="flex items-center text-gray-400">
                <Users className="w-4 h-4 mr-2" />
                <span className="text-sm">
                  {event.participants.length > 0
                    ? `${event.participants.length} người tham dự`
                    : "Không có người tham dự"}
                </span>
              </div>
            </div>

            {/* Phần nút quản lý và hiển thị người tham gia / Management button and participants display */}
            <div className="mt-3 flex items-center">
              <button className="px-2 py-2 rounded-md bg-[#252729] text-sm hover:bg-white hover:text-black transition-colors flex items-center">
                <span>Quản lý sự kiện</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>

              {/* Hiển thị avatar người tham gia / Display participant avatars */}
              {event.participants.length > 0 && (
                <div className="ml-2 flex items-center">
                  <AvatarGroup>
                    {event.participants.slice(0, 3).map((participant) => (
                      <Avatar
                        key={participant.id}
                        className="border-2 border-[#16182b] w-6 h-6"
                      >
                        <AvatarImage
                          src={participant.avatar}
                          alt={participant.name}
                        />
                        <AvatarFallback>
                          {participant.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </AvatarGroup>

                  {/* Hiển thị số người tham gia còn lại / Display remaining participants count */}
                  {event.participants.length > 3 && (
                    <span className="text-sm text-gray-400 ml-1">
                      +{event.participants.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Phần hiển thị ảnh sự kiện / Event image section */}
          <div className="p-4 flex items-center">
            <div className="w-32 h-32 relative rounded-lg overflow-hidden">
              {event.image ? (
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-yellow-400 text-black font-bold text-xs text-center p-1">
                  YOU ARE ON THE GUEST-LIST*
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Nếu là sự kiện người dùng tham gia / If this is an event user is participating in
  return (
    // Container chính với hiệu ứng hover / Main container with hover effect
    <div className="bg-[#1c1e20] rounded-xl overflow-hidden border border-white/10 hover:border-white/50 transition-all duration-200">
      <div className="flex items-center">
        {/* Phần nội dung bên trái / Left content section */}
        <div className="p-3 flex-1">
          {/* Hiển thị thời gian / Display time */}
          <div className="text-lg font-medium mb-1">
            {event.time}
            {event.endTime && ` - ${event.endTime}`}
          </div>
          {/* Tiêu đề sự kiện / Event title */}
          <h3 className="text-xl font-bold mb-2">{event.title}</h3>

          {/* Thông tin người tổ chức và địa điểm / Organizer and location info */}
          <div className="space-y-2 mb-2">
            {/* Hiển thị người tổ chức / Display organizer */}
            {event.organizer && (
              <div className="flex items-center text-gray-400">
                <Star className="w-4 h-4 mr-2 text-yellow-400" />
                <span className="text-sm">{event.organizer}</span>
              </div>
            )}

            {/* Hiển thị địa điểm / Display location */}
            <div className="flex items-center text-gray-400">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="text-sm">{event.location}</span>
            </div>
          </div>

          {/* Phần nút tham gia và hiển thị người tham gia / Participation button and participants display */}
          <div className="flex items-center gap-2 mb-0">
            {/* Nút tham gia với trạng thái động / Dynamic participation button */}
            <button
              className={`px-2 py-1 rounded-md text-sm transition-colors flex items-center ${
                event.isParticipating
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-[#1a1c2a] hover:bg-white/5 text-white"
              }`}
            >
              <span>{event.isParticipating ? "Sẽ tham gia" : "Tham gia"}</span>
            </button>

            {/* Hiển thị avatar người tham gia / Display participant avatars */}
            {event.participants.length > 0 && (
              <div className="flex items-center">
                <AvatarGroup>
                  {event.participants.slice(0, 3).map((participant) => (
                    <Avatar
                      key={participant.id}
                      className="border-2 border-[#16182b] w-6 h-6"
                    >
                      <AvatarImage
                        src={participant.avatar}
                        alt={participant.name}
                      />
                      <AvatarFallback>
                        {participant.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </AvatarGroup>

                {/* Hiển thị số người tham gia còn lại / Display remaining participants count */}
                {event.participants.length > 3 && (
                  <span className="text-sm text-gray-400 ml-1">
                    +{event.participants.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Phần hiển thị ảnh sự kiện / Event image section */}
        <div className="p-4 flex items-center">
          <div className="w-32 h-32 relative rounded-lg overflow-hidden">
            {event.image ? (
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-blue-500 text-white font-bold text-xs text-center p-1">
                WEB3 IDEATHON
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
