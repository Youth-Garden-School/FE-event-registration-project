import { MapPin, Users, ArrowRight, Star, AlertTriangle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/ui/avatar-group";
import type { Event } from "@/lib/types";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  // Nếu là sự kiện của người dùng (họ tổ chức)
  if (event.isUserEvent) {
    return (
      <div className="bg-[#16182b] rounded-xl overflow-hidden">
        <div className="flex">
          <div className="p-6 flex-1">
            <div className="text-lg font-medium mb-1">{event.time}</div>
            <h3 className="text-xl font-bold mb-4">{event.title}</h3>

            <div className="space-y-2">
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

              <div className="flex items-center text-gray-400">
                <Users className="w-4 h-4 mr-2" />
                <span className="text-sm">
                  {event.participants.length > 0
                    ? `${event.participants.length} người tham dự`
                    : "Không có người tham dự"}
                </span>
              </div>
            </div>

            <div className="mt-6 flex items-center">
              <button className="px-4 py-2 rounded-md bg-[#1a1c2a] text-sm hover:bg-white/5 transition-colors flex items-center">
                <span>Quản lý sự kiện</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>

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

                  {event.participants.length > 3 && (
                    <span className="text-sm text-gray-400 ml-1">
                      +{event.participants.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="p-4 flex items-center">
            <div className="w-32 h-32 relative rounded-lg overflow-hidden bg-yellow-400">
              {event.image ? (
                <div className="absolute inset-0 flex items-center justify-center text-black font-bold text-xs text-center p-1">
                  YOU'RE ON THE GUEST-LIST*
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Nếu là sự kiện người dùng tham gia
  return (
    <div className="bg-[#16182b] rounded-xl overflow-hidden">
      <div className="flex">
        <div className="p-6 flex-1">
          <div className="text-lg font-medium mb-1">
            {event.time}
            {event.endTime && ` - ${event.endTime}`}
          </div>
          <h3 className="text-xl font-bold mb-4">{event.title}</h3>

          <div className="space-y-2 mb-4">
            {event.organizer && (
              <div className="flex items-center text-gray-400">
                <Star className="w-4 h-4 mr-2 text-yellow-400" />
                <span className="text-sm">{event.organizer}</span>
              </div>
            )}

            <div className="flex items-center text-gray-400">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="text-sm">{event.location}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <button
              className={`px-4 py-2 rounded-md text-sm transition-colors flex items-center ${
                event.isParticipating
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-[#1a1c2a] hover:bg-white/5 text-white"
              }`}
            >
              <span>{event.isParticipating ? "Sẽ tham gia" : "Tham gia"}</span>
            </button>

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

                {event.participants.length > 3 && (
                  <span className="text-sm text-gray-400 ml-1">
                    +{event.participants.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="p-4 flex items-center">
          <div className="w-32 h-32 relative rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center bg-blue-500 text-white font-bold text-xs text-center p-1">
              WEB3 IDEATHON
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
