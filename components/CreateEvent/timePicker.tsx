import { useState, useEffect, useRef } from "react";
import { format, addHours, addMinutes, differenceInMinutes } from "date-fns";

export default function TimePicker({
  startTime,
  selectedTime,
  onSelect,
  isEndPicker = false,
}: any) {
  const [availableTimes, setAvailableTimes] = useState<any>([]);
  const pickerRef = useRef<any>(null);

  useEffect(() => {
    const start = startTime
      ? addHours(startTime, isEndPicker ? 1 : 0)
      : new Date();
    start.setSeconds(0, 0);

    if (!isEndPicker) {
      const minutes = start.getMinutes();
      start.setMinutes(minutes <= 30 ? 30 : 60, 0, 0);
    }

    const times = Array.from({ length: 10 }, (_, i) =>
      addMinutes(start, i * 30),
    );
    setAvailableTimes(times);
  }, [startTime, isEndPicker]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
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
    >
      {availableTimes.map((time: any, index: any) => {
        const diff = startTime ? differenceInMinutes(time, startTime) : 0;
        const label = isEndPicker
          ? `${Math.floor(diff / 60) > 0 ? `${Math.floor(diff / 60)}h ` : ""}${diff % 60 > 0 ? `${diff % 60}m` : ""}`
          : null;
        return (
          <div
            key={index}
            className={`px-3 py-2 cursor-pointer hover:bg-gray-300 flex justify-between ${
              format(selectedTime, "HH:mm") === format(time, "HH:mm")
                ? isEndPicker
                : ""
            }`}
            onClick={() => onSelect(time)}
          >
            <span>{format(time, "HH:mm")}</span>
            {isEndPicker && (
              <span className="text-gray-500 text-sm">{label}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
