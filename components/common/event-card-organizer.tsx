// Import các thư viện cần thiết / Import necessary libraries
import { MapPin, Users, ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/ui/avatar-group";
import Image from "next/image";

// Định nghĩa interface cho props của component
// Define interface for component props
interface EventOrganizerProps {
  id: string; // ID của sự kiện / Event ID
  title: string; // Tiêu đề sự kiện / Event title
  time: string; // Thời gian sự kiện / Event time
  location: string; // Địa điểm / Location
  image: string; // Ảnh sự kiện / Event image
  participants: {
    id: string; // ID người tham gia / Participant ID
    name: string; // Tên người tham gia / Participant name
    avatar?: string; // Ảnh đại diện (tùy chọn) / Avatar (optional)
  }[];
}

// Component chính hiển thị thẻ sự kiện cho người tổ chức
// Main component displaying event card for organizers
export default function EventCardOrganizer({
  title,
  time,
  location,
  image,
  participants,
}: EventOrganizerProps) {
  return (
    // Container chính với nền tối và bo tròn góc
    // Main container with dark background and rounded corners
    <div
      className={`
      bg-[#16182b]
      rounded-xl
      overflow-hidden
      w-[610px]
      h-[176px]
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
          {/* Hiển thị thời gian và tiêu đề / Display time and title */}
          <div className="text-lg font-medium mb-1">{time}</div>
          <h3
            className={`
            text-white
            flex-[0]
            text-[32px]
            font-semibold
            leading-[38.4px]
            mb-4
          `}
          >
            {title}
          </h3>

          {/* Thông tin địa điểm và số người tham gia / Location and participant info */}
          <div className="space-y-2">
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

            <div
              className={`
              flex
              items-center
              text-gray-400
            `}
            >
              <Users className="w-4 h-4 mr-2" />
              <span className="text-sm">
                {participants.length} người tham dự
              </span>
            </div>
          </div>

          {/* Phần nút quản lý và hiển thị người tham gia / Management button and participants display */}
          <div className="mt-6 flex items-center">
            {/* Nút quản lý sự kiện / Event management button */}
            <button
              className={`
              px-4
              py-2
              rounded-md
              bg-[#1a1c2a]
              text-sm
              hover:bg-white/5
              transition-colors
              flex
              items-center
            `}
            >
              <span>Quản lý sự kiện</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>

            {/* Hiển thị avatar người tham gia / Display participant avatars */}
            {participants.length > 0 && (
              <div className="ml-2">
                <AvatarGroup>
                  {/* Hiển thị tối đa 3 avatar / Display maximum of 3 avatars */}
                  {participants.slice(0, 3).map((participant) => (
                    <Avatar
                      key={participant.id}
                      className={`
                        border-2
                        border-[#16182b]
                        w-6
                        h-6
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
                  <span className="text-sm text-gray-400 ml-1">
                    +{participants.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
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
