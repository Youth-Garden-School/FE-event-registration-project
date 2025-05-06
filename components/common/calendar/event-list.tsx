"use client"

import type { EventWithUI } from "@/style/events-stype"
import EventCard from "./event-card"
import { format, isToday, isTomorrow } from "date-fns"
import { vi } from "date-fns/locale"
import { Pagination } from "@/components/ui/pagination"

interface EventListProps {
  events: EventWithUI[]
  onEventClick?: (event: EventWithUI) => void
  currentPage?: number
  onPageChange?: (page: number) => void
  eventsPerPage?: number
}

export function EventList({
  events,
  onEventClick,
  currentPage = 1,
  onPageChange = () => {},
  eventsPerPage = 10,
}: EventListProps) {
  // Chuẩn bị dữ liệu sự kiện với các nhãn ngày
  const preparedEvents = events.map((event) => {
    // Nếu event đã có dateLabel và dayLabel, sử dụng chúng
    if (event.dateLabel && event.dayLabel) {
      return event
    }

    // Ngược lại, tạo các nhãn từ ngày
    const eventDate = event.date || (event.startTime ? new Date(event.startTime) : new Date())

    let dateLabel
    if (isToday(eventDate)) {
      dateLabel = "Hôm nay"
    } else if (isTomorrow(eventDate)) {
      dateLabel = "Ngày mai"
    } else {
      dateLabel = format(eventDate, "d 'thg' M", { locale: vi })
    }

    const dayLabel = format(eventDate, "EEEE", { locale: vi })

    return {
      ...event,
      dateLabel,
      dayLabel,
    }
  })

  // Tính toán tổng số trang
  const totalPages = Math.ceil(preparedEvents.length / eventsPerPage)

  // Lấy sự kiện cho trang hiện tại
  const startIndex = (currentPage - 1) * eventsPerPage
  const paginatedEvents = preparedEvents.slice(startIndex, startIndex + eventsPerPage)

  // Nhóm sự kiện theo ngày
  const eventsByDate = paginatedEvents.reduce(
    (acc, event) => {
      const date = event.dateLabel
      ;(acc[date] ??= []).push(event)
      return acc
    },
    {} as Record<string, EventWithUI[]>,
  )

  return (
    <div>
      <div className="space-y-0 pb-8">
        {Object.entries(eventsByDate).map(([date, dateEvents], idx, arr) => (
          <div key={date} className="relative">
            <div className="grid grid-cols-[120px_60px_1fr] gap-0">
              <div className="pt-6">
                <div className="font-medium text-gray-900">{dateEvents[0].dateLabel}</div>
                <div className="font-medium text-gray-500">{dateEvents[0].dayLabel}</div>
              </div>
              <div className="relative flex justify-center">
                <div
                  className={`
                    absolute border-l-2 border-dashed border-gray-200 left-1/2 -translate-x-1/2
                    ${idx === 0 ? "top-7" : "top-0"}
                    ${idx === arr.length - 1 ? "bottom-0 h-[calc(100%-7px)]" : "bottom-0"}
                  `}
                />
                <div className="w-2 h-2 rounded-full bg-gray-900 mt-7 relative z-10" />
              </div>
              <div className="space-y-6 py-6">
                {dateEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onClick={onEventClick ? () => onEventClick(event) : undefined}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Phân trang */}
      {events.length > eventsPerPage && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      )}

      {/* Hiển thị thông báo nếu không có sự kiện */}
      {events.length === 0 && <div className="text-center py-8 text-gray-500">Không tìm thấy sự kiện nào</div>}
    </div>
  )
}

export default EventList
