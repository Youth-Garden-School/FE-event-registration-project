import { useState } from "react";
import { Calendar, Check, Globe, Plus, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

export default function EventFormHeader() {
  const [visibility, setVisibility] = useState({
    label: "Công khai",
    icon: <Globe className="h-4 w-4" />,
  });

  const calendars = [
    { name: "123", color: "bg-green-500" },
    { name: "Đi chơi", color: "bg-purple-500" },
    { name: "Đi ngủ", color: "bg-red-500" },
  ];

  const [selectedCalendar, setSelectedCalendar] = useState("Lịch cá nhân");
  const [open, setOpen] = useState(false);

  const handleSelect = (name: string) => {
    setSelectedCalendar(name);
    setOpen(false);
  };

  return (
    <div className="flex justify-between">
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
                onClick={() => handleSelect(calendar.name)}
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
                // handle create calendar here
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

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2 cursor-pointer">
            {visibility.icon}
            {visibility.label}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
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
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="cursor-pointer w-[290px] h-[75px]"
            onClick={() =>
              setVisibility({
                label: "Công khai",
                icon: <Globe className="h-4 w-4" />,
              })
            }
          >
            <Globe className="h-4 w-4" />
            <div>
              <h1 className="text-black">Công khai</h1>
              <p className="text-gray-500">
                Hiển thị trên lịch của bạn và có thể được nổi bật.
              </p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer w-[290px] h-[75px]"
            onClick={() =>
              setVisibility({
                label: "Riêng tư",
                icon: <User className="h-5 w-5 text-muted-foreground" />,
              })
            }
          >
            <User className="h-5 w-5 text-muted-foreground" />
            <div>
              <h1 className="text-black">Riêng tư</h1>
              <p className="text-gray-500">
                Không công khai. Chỉ những người có đường dẫn mới có thể đăng
                kí.
              </p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
