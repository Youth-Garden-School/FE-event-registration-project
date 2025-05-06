"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Users } from "lucide-react";
import { EventModal } from "./event-modal/index";
import { useRouter } from "next/navigation";

interface EventCardProps {
  time: string;
  title: string;
  hosts: string[];
  type?: string;
  location?: string;
  image: string;
  attendees?: number;
  event?: any;
}

export default function EventCard({
  time,
  title,
  hosts,
  type,
  location,
  image,
  attendees,
  event,
}: EventCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // If Ctrl/Cmd key is pressed, navigate to the event page
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      router.push(`/event-join/${event.id}`);
    } else {
      // Otherwise open the modal
      openModal();
    }
  };

  return (
    <>
      <div
        className="flex gap-4 p-5 cursor-pointer hover:bg-gray-50 rounded-md transition-colors border border-gray-100 shadow-sm"
        onClick={handleCardClick}
      >
        <div className="flex-1">
          {/* Time */}
          <div className="text-gray-500 mb-2 text-sm font-medium">{time}</div>

          {/* Title */}
          <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>

          {/* Hosts */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex -space-x-2">
              {hosts.slice(0, 3).map((host, index) => (
                <div
                  key={index}
                  className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs overflow-hidden"
                >
                  {host.charAt(0)}
                </div>
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-1">
              Bởi {hosts.join(", ")}
            </span>
          </div>

          {/* Location or Online */}
          <div className="flex items-center gap-1 text-sm text-gray-500">
            {location ? (
              <>
                <MapPin className="w-4 h-4" />
                <span>{location}</span>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                  Trực tuyến
                </span>
                {attendees && attendees > 0 && (
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-gray-500" />
                    <span className="text-xs">{attendees}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Attendees (only show avatars for in-person events) */}
          {location && attendees && attendees > 0 && (
            <div className="flex items-center mt-4">
              <div className="flex -space-x-2">
                {[...Array(Math.min(5, attendees > 5 ? 5 : attendees))].map(
                  (_, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ),
                )}
              </div>
              {attendees > 5 && (
                <span className="text-xs text-gray-500 ml-2">
                  +{attendees - 5}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Event Image */}
        <div className="w-[100px] h-[100px] flex-shrink-0">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            width={100}
            height={100}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Event Modal */}
      <EventModal
        isOpen={isModalOpen}
        onClose={closeModal}
        event={
          event || {
            title,
            time,
            hosts,
            location,
            image,
            attendees,
          }
        }
      />
    </>
  );
}
