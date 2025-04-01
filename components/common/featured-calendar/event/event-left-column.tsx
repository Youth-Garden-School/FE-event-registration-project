"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { events } from "@/lib/events-calendar-data";

interface EventLeftColumnProps {
  eventId: string | number;
}

export function EventLeftColumn({ eventId }: EventLeftColumnProps) {
  // Find the event from data
  const event = events.find((e) => e.id.toString() === eventId.toString());

  if (!event) return null;

  // Get the first two organizers or hosts
  const organizers =
    event.organizers ||
    (event.hosts
      ? event.hosts.map((name: string, id: number) => ({ id, name }))
      : []);

  // Get the first few attendees
  const attendees = event.attendeesList || [];
  const attendeeCount = event.attendees || attendees.length || 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Event Cover Image with Glow Effect */}
      <div className="relative rounded-xl overflow-hidden">
        {/* Shadow/Glow image underneath */}
        <div className="absolute inset-0 filter blur-md opacity-30">
          <Image
            src={
              event.posterImage ||
              event.image ||
              "/placeholder.svg?height=400&width=400"
            }
            alt={`${event.title} cover shadow`}
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Main image */}
        <div className="relative">
          <Image
            src={
              event.posterImage ||
              event.image ||
              "/placeholder.svg?height=400&width=400"
            }
            alt={event.title}
            width={400}
            height={400}
            className="w-full aspect-square object-cover rounded-xl"
          />
        </div>
      </div>

      {/* Organizers Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm text-gray-500">Được tổ chức bởi</div>
        </div>
        <div className="flex flex-col gap-2.5">
          {organizers.slice(0, 2).map((organizer: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <Link
                href="#"
                className="flex items-center gap-2 flex-1 hover:text-blue-600"
              >
                <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
                  <Image
                    src={
                      organizer.avatar ||
                      `/placeholder.svg?height=24&width=24&text=${organizer.name.charAt(0)}`
                    }
                    alt={organizer.name}
                    width={24}
                    height={24}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="font-medium truncate">{organizer.name}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Attendees Card */}
      {attendeeCount > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-gray-500">
              {attendeeCount} người tham dự
            </div>
          </div>
          <button className="w-full text-left">
            <div className="flex items-center mb-2">
              <div className="flex -space-x-2">
                {attendees.slice(0, 6).map((attendee: any, i: number) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full border-2 border-white overflow-hidden"
                  >
                    <Image
                      src={
                        attendee.avatar ||
                        `/placeholder.svg?height=24&width=24&text=${attendee.initial || attendee.name.charAt(0)}`
                      }
                      alt={attendee.name}
                      width={24}
                      height={24}
                      className="w-full h-full object-cover bg-gray-200"
                    />
                  </div>
                ))}
                {attendeeCount > 6 && (
                  <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                    +{attendeeCount - 6}
                  </div>
                )}
              </div>
            </div>
            {attendees.length >= 2 && (
              <div className="text-sm text-gray-600 animate-fadeIn">
                {attendees[0].name}, {attendees[1].name} và {attendeeCount - 2}{" "}
                người khác
              </div>
            )}
          </button>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col gap-2">
        <Button
          variant="link"
          className="justify-start text-gray-600 hover:text-gray-900 p-0 h-auto"
        >
          Liên hệ người tổ chức
        </Button>
        <Button
          variant="link"
          className="justify-start text-gray-600 hover:text-gray-900 p-0 h-auto"
        >
          Báo cáo sự kiện
        </Button>
      </div>
    </div>
  );
}
