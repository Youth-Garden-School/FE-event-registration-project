"use client"

import React, { useState, useEffect } from "react"
import type { CalendarEvent } from "@/lib/api-calendar"
import { fetchCalendarEvents } from "@/lib/api-calendar"
import {
  getUserRegistrations,
  getEventRegistrations,
  Registration,
} from "@/lib/api-event"
import EventCard from "./event-card"
import { format, isToday, isTomorrow } from "date-fns"
import { vi } from "date-fns/locale"
import { Pagination } from "@/components/ui/pagination"

interface EventListProps {
  calendarId: string
  onEventClick?: (event: CalendarEvent) => void
  currentPage?: number
  onPageChange?: (page: number) => void
  eventsPerPage?: number
  events?: CalendarEvent[]
}

export default function EventList({
  calendarId,
  onEventClick,
  currentPage = 1,
  onPageChange = () => {},
  eventsPerPage = 10,
  events: initialEvents,
}: EventListProps) {
  const [events, setEvents] = useState<CalendarEvent[]> (initialEvents ??[])
  const [loading, setLoading] = useState(true)

  // IDs của sự kiện đã đăng ký
  const [registeredIds, setRegisteredIds] = useState<Set<string>>(new Set())
  // Bản đồ eventId -> registrationId để dùng hủy đăng ký
  const [registrationMap, setRegistrationMap] = useState<Map<string, string>>(new Map())
  // IDs của sự kiện bạn có quyền quản lý
  const [managedIds, setManagedIds] = useState<Set<string>>(new Set())

  

  // 1) Load tất cả events trong calendar
  useEffect(() => {
    async function load() {
      if (initialEvents) {
      setLoading(true)
      }
      setLoading(true)
      
      try {
        const evs = await fetchCalendarEvents(calendarId)
        setEvents(evs)
      } catch (err) {
        console.error("Error loading calendar events:", err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [calendarId])

  // 2) Phân loại: đã đăng ký? có quản lý?
  useEffect(() => {
    async function classify() {
      try {
        // A) Lấy registrations của user
        const meRes = await getUserRegistrations(0, 100, "createdAt")
        const regs: Registration[] = meRes.data.result.content

        const regSet = new Set(regs.map((r) => r.event.id))
        setRegisteredIds(regSet)

        // Tạo map eventId -> registrationId
        const regMap = new Map<string, string>()
        regs.forEach((r) => regMap.set(r.event.id, r.id))
        setRegistrationMap(regMap)

        // B) Xác định event nào bạn quản lý
        const mSet = new Set<string>()
        await Promise.all(
          events.map(async (ev) => {
            try {
              // Nếu call thành công, bạn là manager
              await getEventRegistrations(ev.id, 0, 1, "createdAt")
              mSet.add(ev.id)
            } catch {
              // không phải manager --> bỏ qua
            }
          })
        )
        setManagedIds(mSet)
      } catch (err) {
        console.error("Cannot classify events:", err)
      }
    }
    if (events.length) classify()
  }, [events])

  // Cập nhật state khi user register/unregister từ modal
  const handleRegisterChange = (eventId: string, registered: boolean) => {
    setRegisteredIds((prev) => {
      const next = new Set(prev)
      if (registered) next.add(eventId)
      else next.delete(eventId)
      return next
    })
    // Nếu hủy và cần cập nhật map, có thể xoá key khỏi map
    if (!registered) {
      setRegistrationMap((prev) => {
        const next = new Map(prev)
        next.delete(eventId)
        return next
      })
    }
  }

  // Phân trang và nhóm theo ngày
  const totalPages = Math.ceil(events.length / eventsPerPage)
  const startIndex = (currentPage - 1) * eventsPerPage
  const pageEvents = events.slice(startIndex, startIndex + eventsPerPage)
  const eventsByDate = pageEvents.reduce<Record<string, CalendarEvent[]>>(
    (acc, ev) => {
      const d = new Date(ev.startTime)
      const label = isToday(d)
        ? "Hôm nay"
        : isTomorrow(d)
        ? "Ngày mai"
        : format(d, "d 'thg' M", { locale: vi })
      ;(acc[label] ||= []).push(ev)
      return acc
    },
    {}
  )

  if (loading) return <div>Đang tải sự kiện…</div>

  return (
    <div className="space-y-0 pb-8">
      {Object.entries(eventsByDate).map(([date, dayEvents]) => (
        <div key={date} className="relative">
          {/* Timeline phần bên trái có thể giữ nguyên */}
          <div className="space-y-6 py-6">
            {dayEvents.map((ev) => (
              <EventCard
                key={ev.id}
                event={ev}
                registrationId={registrationMap.get(ev.id)}
                isRegistered={registeredIds.has(ev.id)}
                isManaged={managedIds.has(ev.id)}
                onClick={() => onEventClick?.(ev)}
                onRegisterChange={(reg) => handleRegisterChange(ev.id, reg)}
              />
            ))}
          </div>
        </div>
      ))}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}

      {!events.length && (
        <div className="text-center py-8 text-gray-500">
          Không tìm thấy sự kiện nào
        </div>
      )}
    </div>
  )
}
