// Import các thư viện cần thiết / Import necessary libraries
import { MapPin, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/ui/avatar-group";
import Image from "next/image";

// Định nghĩa interface cho props của component
// Define interface for component props
interface EventParticipantProps {
  id: string; // ID của sự kiện / Event ID
  title: string; // Tiêu đề sự kiện / Event title
  time: string; // Thời gian bắt đầu / Start time
  endTime?: string; // Thời gian kết thúc (tùy chọn) / End time (optional)
  location: string; // Địa điểm / Location
  organizer: string; // Người tổ chức / Organizer
  image: string; // Ảnh sự kiện / Event image
  participants: {
    id: string; // ID người tham gia / Participant ID
    name: string; // Tên người tham gia / Participant name
    avatar?: string; // Ảnh đại diện (tùy chọn) / Avatar (optional)
  }[];
  isParticipating?: boolean; // Trạng thái tham gia / Participation status
}

// Component chính hiển thị thẻ sự kiện cho người tham gia
// Main component displaying event card for participants
export default function EventCardParticipant({
  title,
  time,
  endTime,
  location,
  organizer,
  image,
  participants,
  isParticipating = false,
}: EventParticipantProps) {
  return (
    // Container chính với hiệu ứng hover
    // Main container with hover effects
    <div
      className={`
      bg-[#16182b]
      rounded-xl
      overflow-hidden
      border
      border-[#ffffff29]
      border-[0.8px]
      hover:border-white
      transition-all
      duration-300
      cursor-pointer
    `}
    >
      <div className="flex">
        {/* Phần nội dung bên trái / Left content section */}
        <div
          className={`
          p-6
          flex-1
        `}
        >
          {/* Hiển thị thời gian / Display time */}
          <div className="text-lg font-medium mb-1">
            {time}
            {endTime && ` - ${endTime}`}
          </div>
          {/* Tiêu đề sự kiện / Event title */}
          <h3
            className={`
            text-xl
            font-bold
            mb-4
          `}
          >
            {title}
          </h3>

          {/* Thông tin người tổ chức và địa điểm / Organizer and location info */}
          <div className="space-y-2 mb-4">
            {/* Người tổ chức với icon ngôi sao / Organizer with star icon */}
            <div
              className={`
              flex
              items-center
              text-gray-400
            `}
            >
              <Star className="w-4 h-4 mr-2 text-yellow-400" />
              <span className="text-sm">{organizer}</span>
            </div>

            {/* Địa điểm với icon địa điểm / Location with map pin icon */}
            <div
              className={`
              flex
              items-center
              text-gray-400
            `}
            >
              <MapPin className="w-4 h-4 mr-2" />
              <span className="text-sm">{location}</span>
            </div>
          </div>

          {/* Hiển thị danh sách người tham gia / Display participants list */}
          {participants.length > 0 && (
            <div className="flex items-center gap-2 mb-4">
              {/* Nhóm avatar người tham gia / Participant avatar group */}
              <AvatarGroup>
                {/* Hiển thị tối đa 3 avatar / Display maximum of 3 avatars */}
                {participants.slice(0, 3).map((participant) => (
                  <Avatar
                    key={participant.id}
                    className={`
                      border-2
                      border-[#16182b]
                    `}
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
              {participants.length > 3 && (
                <span className="text-sm text-gray-400">
                  +{participants.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Nút tham gia với trạng thái động / Dynamic participation button */}
          <button
            className={`
              px-4
              py-2
              rounded-md
              text-sm
              transition-colors
              flex
              items-center
              ${
                isParticipating
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-[#1a1c2a] hover:bg-white/5 text-white"
              }
            `}
          >
            <span>{isParticipating ? "Sẽ tham gia" : "Tham gia"}</span>
          </button>
        </div>

        {/* Phần hiển thị ảnh sự kiện / Event image section */}
        <div
          className={`
          p-4
          flex
          items-center
        `}
        >
          <div
            className={`
            w-32
            h-32
            relative
            rounded-lg
            overflow-hidden
          `}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
