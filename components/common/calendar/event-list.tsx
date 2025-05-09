"use client"

import React, { useState, useEffect } from "react"
import type { CalendarEvent } from "@/lib/api-calendar"
import { fetchCalendarEvents } from "@/lib/api-calendar"
import { getUserRegistrations, getEventRegistrations, Registration } from "@/lib/api-event"
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
}

export default function EventList({
  calendarId,
  onEventClick,
  currentPage = 1,
  onPageChange = () => {},
  eventsPerPage = 10,
}: EventListProps) {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [registeredIds, setRegisteredIds] = useState<Set<string>>(new Set())
  const [managedIds, setManagedIds]     = useState<Set<string>>(new Set())

  // 1) Load all events in this calendar
  useEffect(() => {
    async function load() {
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

  // 2) Classify each event: registered? managed?
  useEffect(() => {
    async function classify() {
      try {
        // A) Your registrations
        const meRes = await getUserRegistrations(0, 1000, "createdAt")
        const regs: Registration[] = meRes.data.result.content
        const regSet = new Set(regs.map((r) => r.event.id))
        setRegisteredIds(regSet)

        // B) Events you manage (if the call succeeds, assume you’re manager)
        const mSet = new Set<string>()
        await Promise.all(
          events.map(async (ev) => {
            try {
              await getEventRegistrations(ev.id, 0, 1, "createdAt")
              mSet.add(ev.id)
            } catch {
              // not manager → ignore
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

  // Update local state when user registers/unregisters
  const handleRegisterChange = (eventId: string, registered: boolean) => {
    setRegisteredIds((prev) => {
      const next = new Set(prev)
      registered ? next.add(eventId) : next.delete(eventId)
      return next
    })
  }

  // Pagination + grouping by date
  const totalPages = Math.ceil(events.length / eventsPerPage)
  const startIndex = (currentPage - 1) * eventsPerPage
  const pageEvents = events.slice(startIndex, startIndex + eventsPerPage)
  const eventsByDate = pageEvents.reduce<Record<string, CalendarEvent[]>>((acc, ev) => {
    const d = new Date(ev.startTime)
    let label = isToday(d) ? "Hôm nay" : isTomorrow(d) ? "Ngày mai" : format(d, "d 'thg' M", { locale: vi })
    ;(acc[label] ||= []).push(ev)
    return acc
  }, {})

  if (loading) return <div>Đang tải sự kiện…</div>

  return (
    <div className="space-y-0 pb-8">
      {Object.entries(eventsByDate).map(([date, dayEvents], idx, arr) => (
        <div key={date} className="relative">
          {/* Date Column & Timeline omitted for brevity */}
          <div className="space-y-6 py-6">
            {dayEvents.map((ev) => (
              <EventCard
                key={ev.id}
                event={ev}
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
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      )}

      {!events.length && <div className="text-center py-8 text-gray-500">Không tìm thấy sự kiện nào</div>}
    </div>
  )
}
