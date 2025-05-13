import { useState } from "react";
import { Calendar, Check, Plus } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

interface CalendarSelectorProps {
  selectedCalendar: string;
  onSelect: (name: string) => void;
}

const calendars = [
  { name: "123", color: "bg-green-500" },
  { name: "Đi chơi", color: "bg-purple-500" },
  { name: "Đi ngủ", color: "bg-red-500" },
];

export default function CalendarSelector({
  selectedCalendar,
  onSelect,
}: CalendarSelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full cursor-pointer w-[140px] h-[40px]">
          <Calendar className="h-4 w-4 text-blue-500" />
          <span className="text-sm">{selectedCalendar}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-down"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-[250px] rounded-md shadow-lg">
        <p className="text-sm font-medium text-muted-foreground px-2 mb-2">
          Chọn lịch của sự kiện:
        </p>
        <div className="space-y-1">
          {calendars.map((calendar) => (
            <div
              key={calendar.name}
              className="flex items-center justify-between hover:bg-slate-100 px-2 py-1.5 rounded cursor-pointer"
              onClick={() => {
                onSelect(calendar.name);
                setOpen(false);
              }}
            >
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${calendar.color}`} />
                <span>{calendar.name}</span>
              </div>
              {selectedCalendar === calendar.name && (
                <Check className="w-4 h-4 text-black" />
              )}
            </div>
          ))}

          <div
            className="flex items-center gap-2 px-2 py-1.5 hover:bg-slate-100 rounded cursor-pointer"
            onClick={() => {
              setOpen(false);
              // Handle create calendar
            }}
          >
            <Plus className="w-4 h-4" />
            <span>Tạo lịch</span>
          </div>
        </div>

        <p className="text-[12px] text-gray-500 px-2 mt-3">
          Tạo sự kiện dưới một lịch sẽ cấp quyền quản lý cho các quản trị viên
          của lịch đó.
        </p>
      </PopoverContent>
    </Popover>
  );
}
