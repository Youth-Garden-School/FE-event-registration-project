import Image from "next/image";
import { Users } from "lucide-react";

interface AttendeeSectionProps {
  attendees: number;
  attendeesList?: Array<{
    initial?: string;
    name: string;
    avatar?: string;
  }>;
}

export function AttendeesSection({
  attendees,
  attendeesList,
}: AttendeeSectionProps) {
  return (
    <div className="p-5 border-t border-gray-100">
      <div className="flex items-center gap-2 mb-3">
        <Users className="h-5 w-5 text-gray-600" />
        <span className="font-medium">{attendees} người tham dự</span>
      </div>
      <div className="flex flex-wrap gap-1 mb-2">
        {attendeesList ? (
          <>
            {attendeesList.slice(0, 8).map((attendee, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xs overflow-hidden"
              >
                {attendee.avatar ? (
                  <Image
                    src={attendee.avatar || "/placeholder.svg"}
                    alt={attendee.name}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  attendee.initial
                )}
              </div>
            ))}
            {attendees > 8 && (
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                +{attendees - 8}
              </div>
            )}
          </>
        ) : (
          <>
            {[...Array(Math.min(8, attendees))].map((_, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xs overflow-hidden"
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
            {attendees > 8 && (
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                +{attendees - 8}
              </div>
            )}
          </>
        )}
      </div>
      {attendeesList && attendeesList.length > 2 && (
        <div className="text-sm text-gray-600">
          {attendeesList[0].name}, {attendeesList[1].name} và {attendees - 2}{" "}
          người khác
        </div>
      )}
    </div>
  );
}
