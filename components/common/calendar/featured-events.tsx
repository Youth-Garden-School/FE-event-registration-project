"use client"

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Video } from "lucide-react"
import { EventModal } from "./event-modal"
import { format } from "date-fns"
import { vi } from "date-fns/locale"

interface FeaturedEventsProps {
  events: any[]
}

export function FeaturedEvents({ events }: FeaturedEventsProps) {
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (events.length === 0) {
    return <Card className="border rounded-lg p-6 text-center text-gray-500">Không có sự kiện nổi bật nào</Card>
  }

  const openModal = (event: any) => {
    setSelectedEvent(event)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  // Format date to Vietnamese
  const formatDate = (date: Date) => {
    return format(date, "EEEE, d MMMM", { locale: vi })
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <Card
          key={event.id}
          className="overflow-hidden border hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => openModal(event)}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Event Image */}
            <div className="md:col-span-1">
              <div className="relative h-48 md:h-full w-full">
                <Image
                  src={event.posterImage || event.image || "/placeholder.svg?height=400&width=400"}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 left-2">
                  <Badge className="bg-red-500 text-white border-none">Nổi bật</Badge>
                </div>
              </div>
            </div>

            {/* Event Details */}
            <div className="md:col-span-2 p-4">
              <h4 className="text-xl font-bold mb-2">{event.title}</h4>

              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {formatDate(event.date)} • {event.time}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-600 mb-3">
                {event.type === "online" ? (
                  <>
                    <Video className="h-4 w-4 text-blue-500" />
                    <span>Sự kiện trực tuyến</span>
                  </>
                ) : (
                  <>
                    <MapPin className="h-4 w-4" />
                    <span>
                      {event.location}, {event.city}
                    </span>
                  </>
                )}
              </div>

              <p className="text-gray-700 line-clamp-2 mb-3">{event.description}</p>

              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">{event.attendees} người tham dự</span>
              </div>
            </div>
          </div>
        </Card>
      ))}

      {/* Event Modal */}
      {selectedEvent && <EventModal isOpen={isModalOpen} onClose={closeModal} event={selectedEvent} />}
    </div>
  )
}
