import { MapPin, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/ui/avatar-group";
import Image from "next/image";

interface EventParticipantProps {
  id: string;
  title: string;
  time: string;
  endTime?: string;
  location: string;
  organizer: string;
  image: string;
  participants: {
    id: string;
    name: string;
    avatar?: string;
  }[];
  isParticipating?: boolean;
}

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
    <div className="bg-[#16182b] rounded-xl overflow-hidden border border-[#ffffff29] border-[0.8px] hover:border-white transition-all duration-300 cursor-pointer">
      <div className="flex">
        <div className="p-6 flex-1">
          <div className="text-lg font-medium mb-1">
            {time}
            {endTime && ` - ${endTime}`}
          </div>
          <h3 className="text-xl font-bold mb-4">{title}</h3>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-gray-400">
              <Star className="w-4 h-4 mr-2 text-yellow-400" />
              <span className="text-sm">{organizer}</span>
            </div>

            <div className="flex items-center text-gray-400">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="text-sm">{location}</span>
            </div>
          </div>

          {participants.length > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <AvatarGroup>
                {participants.slice(0, 3).map((participant) => (
                  <Avatar
                    key={participant.id}
                    className="border-2 border-[#16182b]"
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
                <span className="text-sm text-gray-400">
                  +{participants.length - 3}
                </span>
              )}
            </div>
          )}

          <button
            className={`px-4 py-2 rounded-md text-sm transition-colors flex items-center ${
              isParticipating
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-[#1a1c2a] hover:bg-white/5 text-white"
            }`}
          >
            <span>{isParticipating ? "Sẽ tham gia" : "Tham gia"}</span>
          </button>
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
