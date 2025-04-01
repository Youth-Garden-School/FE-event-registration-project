"use client";

import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CustomCalendar } from "@/components/ui/calendar/custom-calendar";
import { Badge } from "@/components/ui/badge";
import { events, highlightedDays } from "@/lib/events-calendar-data";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

interface CalendarViewProps {
  onDateSelect?: (date: Date) => void;
}

export default function CalendarView({ onDateSelect }: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  // Filter events for the selected date
  const selectedDateEvents = events.filter(
    (event) =>
      event.date.getDate() === selectedDate.getDate() &&
      event.date.getMonth() === selectedDate.getMonth() &&
      event.date.getFullYear() === selectedDate.getFullYear(),
  );

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    // Gọi callback để thông báo cho component cha về ngày đã chọn
    if (onDateSelect) {
      onDateSelect(date);
    }
  };

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

        {selectedDateEvents.length > 0 && (
          <div className="mt-4 space-y-3">
            <h4 className="font-medium text-sm">
              Sự kiện ngày {format(selectedDate, "d MMMM", { locale: vi })}
            </h4>
            {selectedDateEvents.map((event) => (
              <div
                key={event.id}
                className="p-2 border rounded-md hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-medium text-sm">{event.title}</h5>
                    <p className="text-xs text-gray-500">{event.time}</p>
                  </div>
                  <Badge
                    variant={event.type === "online" ? "outline" : "default"}
                    className="text-xs"
                  >
                    {event.type === "online" ? "Trực tuyến" : "Trực tiếp"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedDateEvents.length === 0 && (
          <div className="mt-4 p-4 text-center text-gray-500 text-sm">
            Không có sự kiện nào vào ngày này
          </div>
        )}
      </CardContent>
    </Card>
  );
}
