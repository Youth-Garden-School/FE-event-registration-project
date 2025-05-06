"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronDown, ChevronUp, ExternalLink, LinkIcon, MapPin, Share2, Users, Video, X } from "lucide-react"

interface EventModalProps {
  isOpen: boolean
  onClose: () => void
  event: any
}

export function EventModal({ isOpen, onClose, event }: EventModalProps) {
  const [isRegistered, setIsRegistered] = useState(false)
  const router = useRouter()

  if (!event) return null

  // Format date to Vietnamese
  const formatDate = (date: Date) => {
    const dayOfWeek = format(date, "EEEE", { locale: vi })
    const dayOfMonth = date.getDate()
    const month = date.getMonth() + 1
    return `${dayOfWeek}, ${dayOfMonth} tháng ${month}`
  }

  const handleRegister = () => {
    setIsRegistered(true)
  }

  const handleCancelRegistration = () => {
    setIsRegistered(false)
  }

  // Check if the event is online
  const isOnlineEvent =
    event.location?.toLowerCase().includes("online") || event.location?.toLowerCase().includes("zoom") || event.isOnline

  // Xác định ảnh poster từ event
  const eventImage = event.posterImage || event.coverImage || event.image || "/placeholder.svg?height=400&width=400"

  // Update the isPosterEvent condition
  const isPosterEvent = event.posterType === "special"

  const handleViewEventPage = () => {
    router.push(`/event-join/${event.id}`)
    onClose()
  }

  const handleCopyLink = () => {
    const url = `/event-join/${event.id}`
    navigator.clipboard
      .writeText(window.location.origin + url)
      .then(() => {
        alert("Đã sao chép liên kết!")
      })
      .catch((err) => {
        console.error("Không thể sao chép liên kết: ", err)
      })
  }

  const handleCopyZoomLink = () => {
    if (event.zoomLink) {
      navigator.clipboard
        .writeText(event.zoomLink)
        .then(() => {
          alert("Đã sao chép link Zoom!")
        })
        .catch((err) => {
          console.error("Không thể sao chép link Zoom: ", err)
        })
    }
  }

  // Get Google Maps URL for physical locations
  const getGoogleMapsUrl = () => {
    const address = event.fullAddress || event.address || `${event.location}, ${event.city}`
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
  }

  // Get Google Maps Embed URL for iframe
  const getMapEmbedUrl = () => {
    return `https://maps.google.com/maps?q=${encodeURIComponent(
      event.fullAddress || event.address || `${event.location}, ${event.city}`,
    )}&t=&z=15&ie=UTF8&iwloc=&output=embed`
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 overflow-hidden" onClick={onClose}>
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm flex justify-between items-center p-3 border-b shadow-sm">
              <button onClick={onClose} className="rounded-full p-1 hover:bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                >
                  <path d="m13 17 5-5-5-5M6 17l5-5-5-5"></path>
                </svg>
              </button>

              <div className="flex items-center gap-2 flex-1 justify-between">
                <div className="flex items-center w-full">
                  <button
                    className="btn flex items-center text-sm bg-gray-100 hover:bg-gray-200 rounded-md px-2 py-1 mr-2"
                    onClick={handleCopyLink}
                  >
                    <LinkIcon className="h-4 w-4 mr-1" />
                    <span>Sao chép liên kết</span>
                  </button>

                  <button
                    onClick={handleViewEventPage}
                    className="btn flex items-center text-sm bg-gray-100 hover:bg-gray-200 rounded-md px-2 py-1"
                  >
                    <span>Trang sự kiện</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      className="h-4 w-4 ml-1"
                    >
                      <path d="M7 17 17 7M7 7h10v10"></path>
                    </svg>
                  </button>

                  <div className="flex-1"></div>
                </div>

                <div className="flex items-center gap-1">
                  <button disabled className="rounded-md bg-gray-100 p-1">
                    <ChevronUp className="h-4 w-4 text-gray-400" />
                  </button>
                  <button className="rounded-md bg-gray-100 hover:bg-gray-200 p-1">
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Event Banner and Title */}
            {isPosterEvent ? (
              <div className="p-4">
                <Image
                  src={eventImage || "/placeholder.svg"}
                  alt={event.title}
                  width={400}
                  height={600}
                  className="w-full h-auto rounded-xl"
                />
              </div>
            ) : (
              <>
                {/* Event Banner */}
                <div className="p-4">
                  <div className="rounded-xl overflow-hidden">
                    <Image
                      src={eventImage || "/placeholder.svg"}
                      alt={event.title}
                      width={400}
                      height={400}
                      className="w-full object-cover"
                    />
                  </div>
                </div>

                {/* Event Title */}
                <div className="px-5">
                  <h1 className="text-2xl font-bold text-gray-900">{event.title}</h1>
                  {event.featured && (
                    <div className="bg-red-100 text-red-700 border-red-200 text-xs mt-2 inline-block px-2.5 py-0.5 rounded-full border">
                      Nổi bật trong {event.featuredLocation || "TP. Hồ Chí Minh"}
                    </div>
                  )}

                  {/* Organizers */}
                  {event.organizers && event.organizers.length > 0 ? (
                    <div className="flex items-center gap-1 mt-3 text-sm text-gray-600">
                      <div className="flex -space-x-2 mr-2">
                        {event.organizers.slice(0, 2).map((organizer: any) => (
                          <div
                            key={organizer.id}
                            className="w-6 h-6 rounded-full border-2 border-white overflow-hidden"
                          >
                            {organizer.avatar ? (
                              <Image
                                src={organizer.avatar || "/placeholder.svg"}
                                alt={organizer.name}
                                width={24}
                                height={24}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs">
                                {organizer.name.charAt(0)}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <span>Được tổ chức bởi {event.organizers.map((org: any) => org.name).join(" & ")}</span>
                    </div>
                  ) : event.hosts && event.hosts.length > 0 ? (
                    <div className="flex items-center gap-1 mt-3 text-sm text-gray-600">
                      <span>Được tổ chức bởi</span>
                      <div className="flex items-center">
                        <div className="w-5 h-5 rounded-full bg-purple-200 flex items-center justify-center text-xs overflow-hidden mr-1">
                          {event.hosts[0].charAt(0)}
                        </div>
                        <span className="font-medium">{event.hosts[0]}</span>
                      </div>
                    </div>
                  ) : null}
                </div>

                {/* Event Date and Time */}
                <div className="px-5 py-3 flex flex-col gap-3 border-t border-gray-100 mt-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-gray-100 rounded-full p-2 mt-1">
                      <Calendar className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-medium">{event.startTime ? formatDate(new Date(event.startTime)) : ""}</div>
                      <div className="text-gray-600">
                        {event.displayTime ||
                          (event.startTime ? format(new Date(event.startTime), "HH:mm", { locale: vi }) : "")}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-gray-100 rounded-full p-2 mt-1">
                      {isOnlineEvent ? (
                        <Video className="h-5 w-5 text-blue-600" />
                      ) : (
                        <MapPin className="h-5 w-5 text-gray-600" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{isOnlineEvent ? "Sự kiện trực tuyến" : event.location}</div>
                      <div className="text-gray-600">{isOnlineEvent ? "Tham gia qua Zoom" : event.city}</div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Registration Section */}
            <div className="p-5 border-t border-gray-100">
              {isRegistered ? (
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                      <span className="text-pink-500">😊</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">Bạn đã có chỗ</h3>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4 mb-4">
                    <Button variant="outline" className="flex-1 gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Thêm vào lịch</span>
                    </Button>
                    <Button variant="outline" className="w-10 h-10 p-0 flex items-center justify-center">
                      <span className="text-lg">🇻🇳</span>
                    </Button>
                  </div>

                  <p className="text-gray-600 text-sm mt-2">
                    Không thể tham dự? Hãy thông báo cho người tổ chức bằng cách{" "}
                    <button onClick={handleCancelRegistration} className="text-pink-500 font-medium hover:underline">
                      hủy đăng kí của bạn
                    </button>
                    .
                  </p>

                  <div className="mt-6 border-t border-gray-100 pt-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Chuẩn bị sẵn sàng cho sự kiện</h4>
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-sm">Hoàn thành trang cá nhân · Nhắc nhở: Email</p>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <h3 className="font-medium text-lg mb-4">Đăng kí</h3>
                  <p className="text-gray-600 mb-4">Chào mừng! Để tham gia sự kiện, vui lòng đăng kí bên dưới.</p>

                  <div className="flex items-center gap-3 mb-4 bg-gray-50 p-3 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-sm overflow-hidden">
                      <span>A</span>
                    </div>
                    <div>
                      <div className="font-medium">Anh Đức Nguyễn</div>
                      <div className="text-sm text-gray-500">anhducvtr2004@gmail.com</div>
                    </div>
                  </div>

                  <Button
                    onClick={handleRegister}
                    className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-lg"
                  >
                    Đăng kí một chạm
                  </Button>
                </div>
              )}
            </div>

            {/* Event Description */}
            <div className="p-5 border-t border-gray-100">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-lg">Thông tin sự kiện</h3>
                <button className="text-gray-500 hover:bg-gray-100 p-2 rounded-full">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
              <div className="text-gray-700">
                <p>{event.description}</p>
              </div>
            </div>

            {/* Location Section */}
            <div className="p-5 border-t border-gray-100">
              <h3 className="font-medium text-lg mb-3">Địa điểm</h3>

              {isOnlineEvent ? (
                <div className="space-y-4">
                  <div className="mb-3">
                    <div className="font-medium">Sự kiện trực tuyến</div>
                    <div className="text-sm text-gray-600">Tham gia qua Zoom</div>
                  </div>

                  {isRegistered ? (
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Video className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-blue-800">Link tham gia</span>
                      </div>
                      <div className="flex items-center justify-between bg-white border border-blue-100 rounded-md p-2 mb-3">
                        <span className="text-sm text-gray-600 truncate">
                          {event.zoomLink || "https://zoom.us/j/123456789"}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-blue-600"
                          onClick={handleCopyZoomLink}
                        >
                          Sao chép
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600">
                        Link này sẽ hoạt động vào thời gian diễn ra sự kiện. Bạn cũng sẽ nhận được email nhắc nhở trước
                        khi sự kiện bắt đầu.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                      <p className="text-gray-600 mb-3">Đăng kí để nhận link tham gia sự kiện</p>
                      <Button onClick={handleRegister} className="bg-blue-600 hover:bg-blue-700 text-white">
                        Đăng kí ngay
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="mb-3">
                    <div className="font-medium">{event.location}</div>
                    <div className="text-sm text-gray-600">
                      {event.fullAddress || event.address || `${event.location}, ${event.city}`}
                    </div>
                  </div>

                  <div className="relative w-full rounded-lg overflow-hidden border border-gray-200">
                    <div className="h-[200px]">
                      <iframe
                        src={getMapEmbedUrl()}
                        className="absolute top-0 left-0 w-full h-full border-0"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`Bản đồ địa điểm: ${event.location}`}
                      />
                    </div>

                    <div className="p-3 bg-white">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 p-0 h-auto hover:bg-transparent hover:underline flex items-center"
                        onClick={() => window.open(getGoogleMapsUrl(), "_blank")}
                      >
                        <span>Xem bản đồ lớn hơn</span>
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Organizer Section */}
            <div className="p-5 border-t border-gray-100">
              <h3 className="font-medium text-lg mb-3">Được tổ chức bởi</h3>

              {/* Detailed organizer list */}
              {event.organizers && event.organizers.length > 0 ? (
                <div className="space-y-3">
                  {event.organizers.map((organizer: any) => (
                    <div
                      key={organizer.id}
                      className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                          {organizer.avatar ? (
                            <Image
                              src={organizer.avatar || "/placeholder.svg"}
                              alt={organizer.name}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-base font-medium">
                              {organizer.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{organizer.name}</div>
                          {organizer.role && <div className="text-sm text-gray-500">{organizer.role}</div>}
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600 p-1.5 hover:bg-gray-100 rounded-full">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : event.hosts && event.hosts.length > 0 ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-lg overflow-hidden">
                      {event.hosts[0].charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{event.hosts[0]}</div>
                      <div className="text-sm text-gray-500">Người tổ chức sự kiện</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full">
                      <ExternalLink className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Attendees Section */}
            {event.attendees && event.attendees.length > 0 && (
              <div className="p-5 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-gray-600" />
                  <span className="font-medium">{event.attendees.length} người tham dự</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {event.attendeesList ? (
                    <>
                      {event.attendeesList.slice(0, 8).map((attendee: any, i: number) => (
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
                      {event.attendees.length > 8 && (
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                          +{event.attendees.length - 8}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {[...Array(Math.min(8, event.attendees.length))].map((_, i) => (
                        <div
                          key={i}
                          className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xs overflow-hidden"
                        >
                          {String.fromCharCode(65 + i)}
                        </div>
                      ))}
                      {event.attendees.length > 8 && (
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                          +{event.attendees.length - 8}
                        </div>
                      )}
                    </>
                  )}
                </div>
                {event.attendeesList && event.attendeesList.length > 2 && (
                  <div className="text-sm text-gray-600">
                    {event.attendeesList[0].name}, {event.attendeesList[1].name} và {event.attendees.length - 2} người
                    khác
                  </div>
                )}
              </div>
            )}

            {/* Modal Footer */}
            <div className="p-5 border-t border-gray-100 flex justify-between text-sm text-gray-500">
              <button className="hover:text-gray-700">Liên hệ người tổ chức</button>
              <button className="hover:text-gray-700">Báo cáo sự kiện</button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
