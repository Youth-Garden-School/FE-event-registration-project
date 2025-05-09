"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, ExternalLink } from "lucide-react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import {
  getEvent as getEventById,
  getMyRegistration,
  registerEvent,
  cancelRegistration,
  type EventDetail,
  type Registration,
} from "@/lib/api-event"

export default function EventPage() {
  const router = useRouter()
  const { id: eventId } = useParams() as { id: string }
  const [event, setEvent] = useState<EventDetail | null>(null)
  const [registration, setRegistration] = useState<Registration | null>(null)
  const [isRegistered, setIsRegistered] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [registrationLoading, setRegistrationLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(null)
    Promise.all([getEventById(eventId), getMyRegistration(eventId)])
      .then(([evtRes, reg]) => {
        setEvent(evtRes.data.result)
        setRegistration(reg)
        setIsRegistered(!!reg)
      })
      .catch((err) => {
        console.error("Fetch error:", err)
        setError("Không tải được dữ liệu sự kiện.")
      })
      .finally(() => setLoading(false))
  }, [eventId])

  const handleRegister = async () => {
    if (registrationLoading) return

    setRegistrationLoading(true)
    try {
      const reg = await registerEvent(event!.id)
      setRegistration(reg)
      setIsRegistered(true)
      alert("Đăng ký thành công!")
    } catch (err) {
      console.error("Register failed:", err)
      alert("Đăng ký thất bại, thử lại sau.")
    } finally {
      setRegistrationLoading(false)
    }
  }

  const handleCancel = async () => {
    if (!registration || registrationLoading) return

    setRegistrationLoading(true)
    try {
      await cancelRegistration(registration.id)
      setRegistration(null)
      setIsRegistered(false)
      alert("Đã hủy đăng ký thành công")
    } catch (err) {
      console.error("Cancel failed:", err)
      alert("Hủy đăng ký thất bại, thử lại sau.")
    } finally {
      setRegistrationLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <div className="w-16 h-16 border-4 border-t-gray-800 border-b-gray-800 border-l-gray-200 border-r-gray-200 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Đang tải thông tin sự kiện...</p>
        </div>
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">!</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{error || "Không tìm thấy sự kiện"}</h1>
          <p className="text-gray-600 mb-6">Sự kiện này có thể đã bị xóa hoặc không tồn tại.</p>
          <Button onClick={() => router.push("/")} className="bg-black hover:bg-gray-800 text-white">
            Quay về trang chủ
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column - Event image */}
          <div className="md:col-span-1">
            <div className="rounded-xl overflow-hidden shadow-md">
              <Image
                src={event.coverImage || "/placeholder.svg?height=400&width=400"}
                alt={event.title}
                width={400}
                height={400}
                className="w-full aspect-square object-cover"
              />
            </div>

            <div className="mt-4 bg-white rounded-xl p-4 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">Thông tin tổ chức</h2>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="text-sm text-gray-500 hover:text-gray-700">Liên hệ người tổ chức</button>
              </div>
              <div className="mt-2">
                <button className="text-sm text-gray-500 hover:text-gray-700">Báo cáo sự kiện</button>
              </div>
            </div>
          </div>

          {/* Right column - Event details */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {/* Event title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-6">{event.title}</h1>

              {/* Date and time */}
              <div className="flex items-start gap-3 mb-4">
                <div className="bg-gray-100 rounded-full p-2 mt-1">
                  <Calendar className="h-5 w-5 text-gray-700" />
                </div>
                <div>
                  <div className="font-medium">
                    {format(new Date(event.startTime), "EEEE, d 'tháng' M", { locale: vi })}
                  </div>
                  <div className="text-gray-600">
                    {format(new Date(event.startTime), "HH:mm", { locale: vi })} -{' '}
                    {format(new Date(event.endTime), "HH:mm", { locale: vi })}
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3 mb-6">
                <div className="bg-gray-100 rounded-full p-2 mt-1">
                  <MapPin className="h-5 w-5 text-gray-700" />
                </div>
                <div>
                  <div className="font-medium flex items-center">
                    {event.location}
                    <ExternalLink className="h-3.5 w-3.5 ml-1 text-gray-400" />
                  </div>
                  <div className="text-gray-600">{event.city}</div>
                </div>
              </div>

              {/* Registration section */}
              <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
                <h3 className="font-medium text-lg mb-4">Đăng kí</h3>
                <p className="text-gray-600 mb-4">Chào mừng! Để tham gia sự kiện, vui lòng đăng kí bên dưới.</p>

                {isRegistered ? (
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-700">😊</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-xl">Bạn đã có chỗ</h3>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4 mb-4">
                      <Button variant="outline" className="flex-1 gap-2 border-gray-300 text-gray-700 hover:bg-gray-100">
                        <Calendar className="h-4 w-4" />
                        <span>Thêm vào lịch</span>
                      </Button>
                      <Button variant="outline" className="w-10 h-10 p-0 flex items-center justify-center border-gray-300 text-gray-700 hover:bg-gray-100">
                        <span className="text-lg">🇻🇳</span>
                      </Button>
                    </div>

                    <p className="text-gray-600 text-sm mt-2">
                      Không thể tham dự? Hãy thông báo cho người tổ chức bằng cách{' '}
                      <button
                        onClick={handleCancel}
                        disabled={registrationLoading}
                        className="text-gray-700 font-medium hover:underline"
                      >
                        {registrationLoading ? "đang hủy..." : "hủy đăng kí của bạn"}
                      </button>
                      .
                    </p>
                  </div>
                ) : (
                  <div>
                    <Button
                      onClick={handleRegister}
                      disabled={registrationLoading}
                      className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-lg"
                    >
                      {registrationLoading ? "Đang xử lý..." : "Đăng kí một chạm"}
                    </Button>
                  </div>
                )}
              </div>

              {/* Event information */}
              <div className="mb-6">
                <h3 className="font-medium text-lg mb-3">Thông tin sự kiện</h3>
                <div className="text-gray-700">
                  <p>{event.description}</p>
                </div>
              </div>

              {/* Location map */}
              <div className="mb-6">
                <h3 className="font-medium text-lg mb-3">Địa điểm</h3>
                <div className="rounded-xl overflow-hidden border border-gray-200 mb-3">
                  <iframe
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(
                      event.location + ", " + event.city
                    )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    className="w-full h-[200px]"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Bản đồ địa điểm: ${event.location}`}
                  />
                </div>
                <div className="text-sm text-gray-600">
                  <div className="font-medium">{event.location}</div>
                  <div>{event.city}, Vietnam</div>
                </div>
              </div>

              {/* Attendees section */}
              {event.attendees > 0 && (
                <div className="border-t border-gray-100 pt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-5 w-5 text-gray-600" />
                    <span className="font-medium">{event.attendees} người tham dự</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {(event.attendeesList || []).map((attendee, i) => (
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
                          attendee.initial || attendee.name.charAt(0)
                        )}
                      </div>
                    ))}
                    {event.attendees > (event.attendeesList?.length || 0) && (
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                        +{event.attendees - (event.attendeesList?.length || 0)}
                      </div>
                    )}
                  </div>
                  {event.attendeesList && event.attendeesList.length >= 2 && (
                    <div className="text-sm text-gray-600">
                      {event.attendeesList[0].name}, {event.attendeesList[1].name} và{' '}
                      {event.attendees - 2 > 0 ? `${event.attendees - 2} người khác` : ""}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
