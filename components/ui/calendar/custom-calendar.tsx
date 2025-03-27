"use client";

import * as React from "react";
import {
  addMonths,
  subMonths,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
} from "date-fns";
import { vi } from "date-fns/locale";
import { CalendarHeader } from "./calendar-header";
import { WeekHeader } from "./week-header";
import { DayCell } from "./day-cell";

interface CustomCalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  highlightedDays?: Date[];
  className?: string;
}

export function CustomCalendar({
  selectedDate,
  onDateChange,
  highlightedDays = [],
  className,
}: CustomCalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(
    startOfMonth(selectedDate),
  );

  // Generate days for the current month view
  const generateDaysForMonthView = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { locale: vi });
    const endDate = endOfWeek(monthEnd, { locale: vi });

    const days = eachDayOfInterval({ start: startDate, end: endDate });

    // Split days into weeks
    const weeks: Date[][] = [];
    let week: Date[] = [];

    days.forEach((day, index) => {
      week.push(day);
      if (index % 7 === 6) {
        weeks.push(week);
        week = [];
      }
    });

    return weeks;
  };

  const weeks = generateDaysForMonthView();

  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const isDateHighlighted = (date: Date) => {
    return highlightedDays.some((highlightedDay) =>
      isSameDay(highlightedDay, date),
    );
  };

  return (
    <div className={className}>
      <CalendarHeader
        currentMonth={currentMonth}
        onPreviousMonth={handlePreviousMonth}
        onNextMonth={handleNextMonth}
      />

      <WeekHeader />

      <div className="space-y-1">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-1">
            {week.map((day, dayIndex) => (
              <div key={dayIndex} className="flex justify-center">
                <DayCell
                  day={day}
                  isSelected={isSameDay(day, selectedDate)}
                  isToday={isToday(day)}
                  isOutsideMonth={!isSameMonth(day, currentMonth)}
                  isHighlighted={isDateHighlighted(day)}
                  onClick={() => onDateChange(day)}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
