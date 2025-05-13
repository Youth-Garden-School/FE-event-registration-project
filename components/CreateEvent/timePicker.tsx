import { useState, useEffect, useRef } from "react";
import { format, addHours, addMinutes, differenceInMinutes } from "date-fns";

interface TimePickerProps {
  startTime: Date | null;
  selectedTime: Date | null;
  onSelect: (time: Date | null) => void;
  isEndPicker?: boolean;
}

export default function TimePicker({
  startTime,
  selectedTime,
  onSelect,
  isEndPicker = false,
}: TimePickerProps) {
  const [availableTimes, setAvailableTimes] = useState<Date[]>([]);
  const pickerRef = useRef<HTMLDivElement | null>(null); // Chỉ rõ kiểu là HTMLDivElement

  useEffect(() => {
    const start = startTime
      ? addHours(startTime, isEndPicker ? 1 : 0)
      : new Date();
    start.setSeconds(0, 0);

    const times: Date[] = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = addMinutes(new Date(start.setHours(hour, minute)), 0);
        times.push(time);
      }
    }
    setAvailableTimes(times);
  }, [startTime, isEndPicker]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        onSelect(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onSelect]);

  return (
    <div
      ref={pickerRef}
      className="absolute bg-white shadow-md rounded-md p-2 mt-2 w-40"
      style={{ maxHeight: "300px", overflowY: "auto" }}
    >
      {availableTimes.map((time, index) => {
        const diff = startTime ? differenceInMinutes(time, startTime) : 0;
        const label = isEndPicker
          ? `${Math.floor(diff / 60) > 0 ? `${Math.floor(diff / 60)}h ` : ""}${diff % 60 > 0 ? `${diff % 60}m` : ""}`
          : null;

        const isSelected =
          selectedTime &&
          format(selectedTime, "HH:mm") === format(time, "HH:mm");

        return (
          <div
            key={index}
            className={`px-3 py-2 cursor-pointer hover:bg-gray-300 flex justify-between ${
              isSelected && isEndPicker ? "bg-gray-200" : ""
            }`}
            onClick={() => onSelect(time)}
          >
            <span>{format(time, "HH:mm")}</span>
            {isEndPicker && (
              <span className="text-white text-sm hover:text-gray-300">
                {label}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
