// components/event-tabs.tsx
"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import EventList from "./event-list"
import NoEventsComponent from "./no-event"
import { EventModal } from "./event-modal"
import {
  getUserRegistrations,
  getEventRegistrations,
  Registration,
} from "@/lib/api-event"
import type { EventWithUI as BaseEventWithUI } from "@/style/events-stype"
import { format } from "date-fns"
import { vi } from "date-fns/locale"

// Mở rộng BaseEventWithUI để thêm các trường cần cho modal
type EventWithUI = BaseEventWithUI & {
  attendees: Registration[]
  requiresApproval: boolean
  isUserEvent: boolean
  myRegistrationId: string
  dateLabel: string
  dayLabel: string
}

export default function EventTabs() {
  const [upcomingEvents, setUpcomingEvents] = useState<EventWithUI[]>([])
  const [pastEvents, setPastEvents]         = useState<EventWithUI[]>([])
  const [loading, setLoading]               = useState(true)
  const [error, setError]                   = useState<string | null>(null)

  // Modal
  const [selectedEvent, setSelectedEvent] = useState<EventWithUI | null>(null)
  const [isModalOpen, setIsModalOpen]     = useState(false)

  // Pagination
  const EVENTS_PER_PAGE = 10
  const [upcomingPage, setUpcomingPage] = useState(1)
  const [pastPage, setPastPage]         = useState(1)

  // Helper: build UI object từ Registration
  function buildEventUI(
    reg: Registration,
    attendees: Registration[],
    isUserEvent: boolean
  ): EventWithUI {
    const e = reg.event
    const start = new Date(e.startTime)
    return {
      id: e.id,
      title: e.title,
      description: e.description,
      coverImage: e.coverImage,
      startTime: e.startTime,
      endTime: e.endTime,
      location: e.location,
      isOnline: e.isOnline,
      // thêm các field
      attendees,
      requiresApproval: reg.status !== "CONFIRMED",
      isUserEvent,
      myRegistrationId: reg.id,
      // để EventList nhóm theo ngày
      dateLabel: format(start, "dd/MM/yyyy", { locale: vi }),
      dayLabel: format(start, "EEEE", { locale: vi }),
    }
  }

  useEffect(() => {
    async function load() {
      setLoading(true)
      setError(null)
      try {
        // 1) Lấy tất cả registration của user
        const meRes = await getUserRegistrations(0, 100, "createdAt")
        const regs: Registration[] = meRes.data.result.content
        const now = new Date()

        const ups: EventWithUI[] = []
        const pst: EventWithUI[] = []

        // 2) Phân loại & fetch attendees từng event
        await Promise.all(
          regs.map(async (r) => {
            let attendees: Registration[] = [r]
            let isUserEvent = false

            try {
              // nếu bạn có quyền xem registrations → bạn quản lý event
              const evRes = await getEventRegistrations(
                r.event.id,
                0,
                1,
                "createdAt"
              )
              const attendeeCount = evRes.data.result.totalElements
              isUserEvent = true
            } catch {
              // không có quyền → chỉ participant
            }

            const ui = buildEventUI(r, attendees, isUserEvent)
            const s = new Date(ui.startTime)
            const e = new Date(ui.endTime)
            if (s > now) ups.push(ui)
            else if (e < now) pst.push(ui)
          })
        )

        // 3) Sort
        ups.sort(
          (a, b) =>
            new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
        )
        pst.sort(
          (a, b) =>
            new Date(b.endTime).getTime() - new Date(a.endTime).getTime()
        )

        setUpcomingEvents(ups)
        setPastEvents(pst)
      } catch (e: any) {
        setError(e.message || "Không thể tải dữ liệu")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // Modal handlers
  const openModal = (e: EventWithUI) => {
    setSelectedEvent(e)
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedEvent(null)
  }

  // Khi hủy từ modal, remove khỏi cả hai list
  const handleRemoveEvent = (removed: EventWithUI) => {
    setUpcomingEvents((prev) => prev.filter((x) => x.id !== removed.id))
    setPastEvents((prev) => prev.filter((x) => x.id !== removed.id))
    closeModal()
  }

  if (loading) return <div className="p-4 text-center">Loading...</div>
  if (error)
    return (
      <div className="p-4 text-red-500 text-center">Error: {error}</div>
    )

  // Pagination slices
  const totalUpcomingPages = Math.ceil(
    upcomingEvents.length / EVENTS_PER_PAGE
  )
  const totalPastPages = Math.ceil(pastEvents.length / EVENTS_PER_PAGE)

  const pagedUpcoming = upcomingEvents.slice(
    (upcomingPage - 1) * EVENTS_PER_PAGE,
    upcomingPage * EVENTS_PER_PAGE
  )
  const pagedPast = pastEvents.slice(
    (pastPage - 1) * EVENTS_PER_PAGE,
    pastPage * EVENTS_PER_PAGE
  )

  return (
    <>
      <Tabs defaultValue="upcoming" className="space-y-6">
        {/* Header + Tabs */}
        <div className="flex justify-between items-center">
          <h1 className="text-gray-900 text-[32px] font-semibold">
            Sự kiện của bạn
          </h1>
          <TabsList className="bg-gray-100 rounded p-1">
            <TabsTrigger value="upcoming">Sắp tới</TabsTrigger>
            <TabsTrigger value="past">Đã qua</TabsTrigger>
          </TabsList>
        </div>

        {/* Tab: Sự kiện sắp tới */}
        <TabsContent value="upcoming">
          {pagedUpcoming.length > 0 ? (
            <>
              <EventList events={pagedUpcoming} onEventClick={openModal} />
              {totalUpcomingPages > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                  {Array.from({ length: totalUpcomingPages }, (_, i) => i + 1).map(
                    (p) => (
                      <button
                        key={p}
                        onClick={() => setUpcomingPage(p)}
                        className={`px-3 py-1 rounded ${
                          p === upcomingPage
                            ? "bg-gray-600 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}
                </div>
              )}
            </>
          ) : (
            <NoEventsComponent
              message="Không có sự kiện sắp tới"
              subMessage="Bạn chưa đăng ký sự kiện nào."
            />
          )}
        </TabsContent>

        {/* Tab: Sự kiện đã qua */}
        <TabsContent value="past">
          {pagedPast.length > 0 ? (
            <>
              <EventList events={pagedPast} onEventClick={openModal} />
              {totalPastPages > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                  {Array.from({ length: totalPastPages }, (_, i) => i + 1).map(
                    (p) => (
                      <button
                        key={p}
                        onClick={() => setPastPage(p)}
                        className={`px-3 py-1 rounded ${
                          p === pastPage
                            ? "bg-gray-600 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}
                </div>
              )}
            </>
          ) : (
            <NoEventsComponent
              message="Không có sự kiện đã qua"
              subMessage="Bạn chưa có lịch sử sự kiện."
            />
          )}
        </TabsContent>
      </Tabs>

      {/* Modal chi tiết */}
      {selectedEvent && (
        <EventModal
          isOpen={isModalOpen}
          onClose={closeModal}
          event={selectedEvent}
          onCancel={handleRemoveEvent}
        />
      )}
    </>
  )
}
