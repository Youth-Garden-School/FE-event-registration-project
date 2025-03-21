import { MapPin, Users, ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/ui/avatar-group";
import Image from "next/image";

interface EventOrganizerProps {
  id: string;
  title: string;
  time: string;
  location: string;
  image: string;
  participants: {
    id: string;
    name: string;
    avatar?: string;
  }[];
}

export default function EventCardOrganizer({
  title,
  time,
  location,
  image,
  participants,
}: EventOrganizerProps) {
  return (
    <div className="bg-[#16182b] rounded-xl overflow-hidden w-[610px] h-[176px]">
      <div className="flex">
        <div className="p-6 flex-1">
          <div className="text-lg font-medium mb-1">{time}</div>
          <h3 className="text-white flex-[0]  text-[32px] font-semibold leading-[38.4px] mb-4">
            {title}
          </h3>

          <div className="space-y-2">
            <div className="flex items-center text-gray-400">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="text-sm">{location}</span>
            </div>

            <div className="flex items-center text-gray-400">
              <Users className="w-4 h-4 mr-2" />
              <span className="text-sm">
                {participants.length} người tham dự
              </span>
            </div>
          </div>

          <div className="mt-6 flex items-center">
            <button className="px-4 py-2 rounded-md bg-[#1a1c2a] text-sm hover:bg-white/5 transition-colors flex items-center">
              <span>Quản lý sự kiện</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>

            {participants.length > 0 && (
              <div className="ml-2">
                <AvatarGroup>
                  {participants.slice(0, 3).map((participant) => (
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

                {participants.length > 3 && (
                  <span className="text-sm text-gray-400 ml-1">
                    +{participants.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="p-4 flex items-center">
          <div className="w-32 h-32 relative rounded-lg overflow-hidden">
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
