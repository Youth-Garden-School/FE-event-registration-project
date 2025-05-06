"use client"

import type React from "react"

import { MapPin, Users, ArrowRight, Calendar, Trash2, Video } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AvatarGroup } from "@/components/ui/avatar-group"
import { Badge } from "@/components/ui/badge"
import type { EventWithUI } from "@/style/events-stype"
import Image from "next/image"
import { formatTime } from "@/lib/utils"
import { useState } from "react"
import { EventModal } from "./event-modal"

interface EventCardProps {
  event: EventWithUI
  onClick?: () => void
}

export default function EventCard({ event, onClick }: EventCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Đảm bảo attendees luôn là một mảng
  const attendees = event.attendees || []

  const handleClick = () => {
    // Nếu không có onClick callback (tức là không phải ở trang setting-event), mở modal
    if (!onClick) {
      setIsModalOpen(true)
    } else {
      // Nếu ở trang setting-event, vẫn mở modal khi click vào card
      setIsModalOpen(true)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Ngăn sự kiện click lan ra card
    if (onClick) {
      onClick() // Gọi callback xóa sự kiện
    }
  }

  return (
    <>
      <div
        className="rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer bg-white border-gray-200 hover:border-gray-400"
        onClick={handleClick}
        style={{ borderLeft: event.eventColor ? `4px solid ${event.eventColor}` : undefined }}
      >
        <div className="flex">
          {/* Phần nội dung bên trái */}
          <div className="p-6 flex-1">
            {/* Hiển thị thời gian và tiêu đề */}
            <div className="flex items-center gap-2 text-gray-600 text-lg font-medium mb-1">
              <Calendar className="w-4 h-4" />
              <span className="whitespace-nowrap">
                {event.displayTime || (event.startTime ? formatTime(new Date(event.startTime)) : "")}
              </span>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-gray-900 text-xl font-bold">{event.title}</h3>
            </div>

            {/* Thông tin địa điểm và người tham dự */}
            <div className="space-y-2">
              {event.location ? (
                <div className="flex items-center text-gray-500">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{event.location}</span>
                </div>
              ) : event.isOnline ? (
                <div className="flex items-center text-gray-500">
                  <Video className="w-4 h-4 mr-2 text-blue-500" />
                  <span className="text-sm text-blue-500">Sự kiện trực tuyến</span>
                </div>
              ) : null}

              {/* Hiển thị số người tham dự */}
              <div className="flex items-center text-gray-500">
                <Users className="w-4 h-4 mr-2" />
                <span className="text-sm">
                  {attendees.length > 0 ? `${attendees.length} người tham dự` : "Không có người tham dự"}
                </span>
              </div>
            </div>

            {/* Phần quản lý và hiển thị người tham dự */}
            <div className="mt-3 flex items-center gap-4">
              <div className="flex items-center gap-2">
                {event.isUserEvent ? (
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 rounded-md bg-gray-50 hover:bg-gray-100 text-gray-900 text-sm transition-colors flex items-center">
                      <span>Quản lý sự kiện</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                    {/* Thêm nút xóa sự kiện nếu là trang setting-event */}
                    {onClick && (
                      <button
                        onClick={handleDeleteClick}
                        className="p-2 rounded-md hover:bg-red-50 text-red-500 hover:text-red-700"
                        aria-label="Xóa sự kiện"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ) : (
                  <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                    {event.requiresApproval ? "Chờ duyệt" : "Đã đăng ký"}
                  </Badge>
                )}

                {/* Hiển thị avatar người tham dự */}
                {attendees.length > 0 && (
                  <div className="flex items-center gap-2">
                    <AvatarGroup>
                      {attendees
                        .filter((a) => a?.status === "CONFIRMED" || !a.status)
                        .slice(0, 3)
                        .map((attendee, index) => (
                          <Avatar key={attendee?.id || index} className="w-5 h-5">
                            <AvatarFallback className="text-xs">
                              {attendee?.email?.charAt(0).toUpperCase() ||
                                attendee?.name?.charAt(0).toUpperCase() ||
                                "?"}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                    </AvatarGroup>
                    {attendees.length > 3 && <span className="text-sm text-gray-500">+{attendees.length - 3}</span>}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Phần hình ảnh bên phải */}
          <div className="p-4">
            <div className="w-32 h-32 relative rounded-lg overflow-hidden">
              <Image
                src={event.coverImage || "/placeholder.svg?height=128&width=128"}
                alt={event.title}
                width={128}
                height={128}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Event Modal */}
      <EventModal isOpen={isModalOpen} onClose={handleCloseModal} event={event} />
    </>
  )
}

// Hỗ trợ cả named export
export { EventCard }
