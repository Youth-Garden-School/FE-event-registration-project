// calendar-view.tsx
"use client";

import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CustomCalendar } from "@/components/ui/calendar/custom-calendar";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
import { getCalendarById } from "@/lib/api-calendar";

interface CalendarViewProps {
  calendarId: string;
  onDateSelect?: (date: Date) => void;
}



export default function CalendarView({
  calendarId,
  onDateSelect,
}: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [events, setEvents] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setLoading(true);
    setError(null);

    getCalendarById(calendarId)
      .then((cal) => {
        setEvents(cal.events ?? []);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Lỗi khi tải lịch");
      })
      .finally(() => setLoading(false));
  }, [calendarId]);

  // 2. Tính highlightedDays từ events
  const highlightedDays = events.map((e) => parseISO(e.startTime));

  // 3. Lọc sự kiện của ngày đã chọn
  const selectedDateEvents = events.filter((e) => {
    const dt = parseISO(e.startTime);
    return (
      dt.getFullYear() === selectedDate.getFullYear() &&
      dt.getMonth() === selectedDate.getMonth() &&
      dt.getDate() === selectedDate.getDate()
    );
  });

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    onDateSelect?.(date);
  };

  if (loading) {
    return (
      <Card className="border rounded-lg overflow-hidden">
        <CardContent className="p-4 text-center">Đang tải lịch…</CardContent>
      </Card>
    );
  }
  if (error) {
    return (
      <Card className="border rounded-lg overflow-hidden">
        <CardContent className="p-4 text-center text-red-500">
          {`Lỗi: ${error}`}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border rounded-lg overflow-hidden">
      <CardHeader className="p-4 pb-2 border-b">
        <h3 className="text-lg font-medium">Lịch sự kiện</h3>
      </CardHeader>
      <CardContent className="p-4">
        <CustomCalendar
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          highlightedDays={highlightedDays}
        />

        {selectedDateEvents.length > 0 ? (
          <div className="mt-4 space-y-3">
            <h4 className="font-medium text-sm">
              Sự kiện ngày{" "}
              {format(selectedDate, "d MMMM", { locale: vi })}
            </h4>
            {selectedDateEvents.map((e) => {
              const time = format(parseISO(e.startTime), "HH:mm", { locale: vi });
              return (
                <div
                  key={e.id}
                  className="p-2 border rounded-md hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium text-sm">{e.title}</h5>
                      <p className="text-xs text-gray-500">{time}</p>
                    </div>
                    <Badge
                      variant={e.isOnline ? "outline" : "default"}
                      className="text-xs"
                    >
                      {e.isOnline ? "Trực tuyến" : "Trực tiếp"}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mt-4 p-4 text-center text-gray-500 text-sm">
            Không có sự kiện nào vào ngày này
          </div>
        )}
      </CardContent>
    </Card>
  );
}
