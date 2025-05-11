"use client"

import React, { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import type { EventWithUI } from "@/style/events-stype"
import { Calendar, MapPin, Users, ArrowRight, Trash2, Video } from "lucide-react"
import Image from "next/image"
import { formatTime } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AvatarGroup } from "@/components/ui/avatar-group"
import { EventModal } from "./event-modal"

interface EventCardProps {
  event: EventWithUI
  onClick?: () => void
  isRegistered: boolean
  isManaged?: boolean
  
  onRegisterChange: (registered: boolean) => void
  registrationId?: string
}

export default function EventCard({
  event,
  onClick,
  isRegistered: initialRegistered,
  isManaged = false,
  onRegisterChange,
  registrationId,
}: EventCardProps) {
  const [localRegistered, setLocalRegistered] = useState(initialRegistered)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setLocalRegistered(initialRegistered)
  }, [initialRegistered])

  const handleRegisterChange = (reg: boolean) => {
    setLocalRegistered(reg)
    onRegisterChange(reg)
  }

  const attendees = event.attendees || []

  return (
    <>
      <div
        className="rounded-xl border cursor-pointer bg-white hover:border-gray-400"
        onClick={() => setIsModalOpen(true)}
        style={{ borderLeft: event.eventColor ? `4px solid ${event.eventColor}` : undefined }}
      >
        <div className="flex p-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Calendar className="w-4 h-4" />
              <span>{event.displayTime || formatTime(new Date(event.startTime))}</span>
            </div>
            <h3 className="text-xl font-bold mb-2">{event.title}</h3>

            {/* Location */}
            {event.location ? (
              <div className="flex items-center text-gray-500 mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">{event.location}</span>
              </div>
            ) : event.isOnline ? (
              <div className="flex items-center text-blue-500 mb-2">
                <Video className="w-4 h-4 mr-1" />
                <span className="text-sm">Sự kiện trực tuyến</span>
              </div>
            ) : null}

            {/* Attendees count */}
            <div className="flex items-center text-gray-500 mb-3">
              <Users className="w-4 h-4 mr-1" />
              <span className="text-sm">
                {attendees.length ? `${attendees.length} người tham dự` : "Không có người tham dự"}
              </span>
            </div>

            {/* Badge or Manage button */}
            {isManaged ? (
              <button className="px-4 py-2 bg-gray-50 rounded flex items-center text-sm">
                <span>Quản lý sự kiện</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            ) : (
              <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                {localRegistered ? "Đã đăng ký" : "Chưa đăng ký"}
              </Badge>
            )}

            {/* Small avatars */}
            {attendees.length > 0 && (
              <div className="flex items-center mt-2">
                <AvatarGroup>
                  {attendees.slice(0, 3).map((a, i) => (
                    <Avatar key={i} className="w-5 h-5">
                      <AvatarFallback className="text-xs">
                        {a?.email?.[0]?.toUpperCase() || "?"}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </AvatarGroup>
                {attendees.length > 3 && <span className="text-sm ml-2">+{attendees.length - 3}</span>}
              </div>
            )}
          </div>

          {/* Cover image */}
          <div className="w-32 h-32 rounded overflow-hidden">
            <Image
              src={event.coverImage || "/placeholder.svg?height=128&width=128"}
              alt={event.title}
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={event}
        isRegistered={localRegistered}
        isManaged={isManaged}
        onRegisterChange={handleRegisterChange}
        registrationId={registrationId}
      />

    </>
  )
}
