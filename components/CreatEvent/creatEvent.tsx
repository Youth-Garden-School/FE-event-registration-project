"use client";

import { useState, useRef, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Calendar,
  Edit,
  Globe,
  Link,
  MapPin,
  Ticket,
  User,
  Users,
  Check,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, addHours, addMinutes, differenceInMinutes } from "date-fns";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

const formSchema = z.object({
  title: z.string().min(1, "Vui lòng nhập tên sự kiện"),
  startDate: z.date(),
  endDate: z.date(),
  location: z.string().optional(),
  description: z.string().optional(),
  requireApproval: z.boolean().default(false),
  capacity: z.string().default("Không giới hạn"),
});

const TimePicker = ({
  startTime,
  selectedTime,
  onSelect,
  isEndPicker = false,
}) => {
  const [availableTimes, setAvailableTimes] = useState([]);
  const pickerRef = useRef(null);

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
    const handleClickOutside = (event) => {
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
      {availableTimes.map((time, index) => {
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
};

export default function EventForm() {
  const [visibility, setVisibility] = useState({
    label: "Công khai",
    icon: <Globe className="h-4 w-4" />,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      startDate: new Date(new Date().setHours(9, 0, 0, 0)),
      endDate: new Date(new Date().setHours(10, 0, 0, 0)),
      location: "",
      description: "",
      requireApproval: false,
      capacity: "Không giới hạn",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const [startDate1, setStartDate1] = useState(new Date());
  const [endDate1, setEndDate1] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [showPicker1, setShowPicker1] = useState(false);

  const pickerRef = useRef(null);
  const pickerRef1 = useRef(null);

  // Đóng DatePicker khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event) {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false);
      }
      if (pickerRef1.current && !pickerRef1.current.contains(event.target)) {
        setShowPicker1(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addHours(new Date(), 1));
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const [capacity, setCapacity] = useState("");
  const [isLimited, setIsLimited] = useState(false);
  const [overloadList, setOverloadList] = useState(false);

  const calendars = [
    { name: "123", color: "bg-green-500" },
    { name: "Đi chơi", color: "bg-purple-500" },
    { name: "Đi ngủ", color: "bg-red-500" },
  ];

  const [selectedCalendar, setSelectedCalendar] = useState("Lịch cá nhân");
  const [open, setOpen] = useState(false);

  const handleSelect = (name: string) => {
    setSelectedCalendar(name);
    setOpen(false); // 👈 close Popover
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto p-4">
      {/* Left side - Event image */}
      <div className="w-full md:w-2/5 mr-8">
        <div className="overflow-hidden rounded-3xl bg-black w-[400px] h-[400px]">
          <img
            src="https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=400,height=400/gallery-images/ry/bd098b7b-aae7-495c-9b4d-2ff4c014a61e"
            alt=""
          />
        </div>

        {/* <div className="mt-4 p-4 border rounded-lg bg-muted/30">
          <div className="flex items-center gap-2 text-muted-foreground">
            <User className="h-4 w-4" />
            <span className="text-sm">Giao diện</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="font-medium">Tối giản</span>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Link className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Users className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div> */}
      </div>

      {/* Right side - Event form */}
      <div className="w-full md:w-3/5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Header with visibility options */}
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
                          <span
                            className={`w-3 h-3 rounded-full ${calendar.color}`}
                          />
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
                    Tạo sự kiện dưới một lịch sẽ cấp quyền quản lý cho các quản
                    trị viên của lịch đó.
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
                        icon: (
                          <User className="h-5 w-5 text-muted-foreground" />
                        ),
                      })
                    }
                  >
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <h1 className="text-black">Riêng tư</h1>
                      <p className="text-gray-500">
                        Không công khai. Chỉ những người có đường dẫn mới có thể
                        đăng kí.
                      </p>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Event title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Tên sự kiện"
                      className="text-9xl font-medium border-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Event time */}
            <div className="space-y-3 bg-muted/30 rounded-lg p-4">
              {/* Chọn ngày bắt đầu */}
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <div className="w-4 h-4 rounded-full bg-slate-300 border-2 border-white"></div>
                </div>
                <div className="flex-1">
                  <label>Bắt đầu</label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <div
                      className="bg-white hover:bg-gray-300 rounded-md px-3 py-2 cursor-pointer"
                      onClick={() => setShowPicker(!showPicker)}
                    >
                      {format(startDate1, "dd/MM/yyyy")}
                    </div>
                    {showPicker && (
                      <div
                        ref={pickerRef}
                        className="absolute bg-white shadow-md p-2 mt-2 rounded-md"
                      >
                        <DatePicker
                          selected={startDate1}
                          onChange={(date) => {
                            setStartDate1(date);
                            setShowPicker(false);
                            if (endDate1 < date) {
                              setEndDate1(date); // Cập nhật endDate nếu nó nhỏ hơn startDate
                            }
                          }}
                          minDate={new Date()}
                          inline
                        />
                      </div>
                    )}
                    <div>
                      <div
                        className="bg-white rounded-md px-3 py-2 hover:bg-gray-300 cursor-pointer"
                        onClick={() => setShowStartPicker(!showStartPicker)}
                      >
                        {format(startDate, "HH:mm")}
                      </div>
                      {showStartPicker && (
                        <TimePicker
                          startTime={null}
                          selectedTime={startDate}
                          onSelect={(time) => {
                            if (time) setStartDate(time);
                            setShowStartPicker(false);
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Chọn ngày kết thúc */}
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <div className="w-4 h-4 rounded-full border-2 border-slate-300"></div>
                </div>
                <div className="flex-1">
                  <label>Kết thúc</label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <div
                      className="bg-white hover:bg-gray-300 rounded-md px-3 py-2 cursor-pointer"
                      onClick={() => setShowPicker1(!showPicker1)}
                    >
                      {format(endDate1, "dd/MM/yyyy")}
                    </div>
                    {showPicker1 && (
                      <div
                        ref={pickerRef1}
                        className="absolute bg-white shadow-md p-2 mt-2 rounded-md"
                      >
                        <DatePicker
                          selected={endDate1}
                          onChange={(date) => {
                            setEndDate1(date);
                            setShowPicker1(false);
                          }}
                          minDate={startDate1} // Ngày kết thúc phải >= ngày bắt đầu
                          inline
                        />
                      </div>
                    )}
                    <div>
                      <div
                        className="bg-white rounded-md px-3 py-2 hover:bg-gray-300 cursor-pointer mt-2"
                        onClick={() => setShowEndPicker(!showEndPicker)}
                      >
                        {format(endDate, "HH:mm")}
                      </div>
                      {showEndPicker && (
                        <TimePicker
                          startTime={startDate}
                          selectedTime={endDate}
                          onSelect={(time) => {
                            if (time) setEndDate(time);
                            setShowEndPicker(false);
                          }}
                          isEndPicker
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Múi giờ */}
              <div className="flex justify-center ">
                <div className="bg-white rounded-md px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-300">
                  <span>🌍</span>
                  <span>GMT+07:00</span>
                  <span className="text-muted-foreground">Bangkok</span>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4 bg-muted/30 rounded-lg p-4">
              <MapPin className="h-5 w-5 mt-0.5 text-muted-foreground" />
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Thêm địa điểm sự kiện"
                          className="border-none bg-transparent px-0 focus-visible:ring-0"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <p className="text-sm text-muted-foreground">
                  Địa điểm trực tiếp hoặc liên kết ảo
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="flex items-start gap-4 bg-muted/30 rounded-lg p-4">
              <Edit className="h-5 w-5 mt-0.5 text-muted-foreground" />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Textarea
                        placeholder="Thêm mô tả"
                        className="min-h-0 border-none bg-transparent resize-none px-0 focus-visible:ring-0"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Event options */}
            <div className="space-y-4">
              <h3 className="font-medium">Tùy chọn sự kiện</h3>

              {/* Tickets */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Ticket className="h-5 w-5 text-muted-foreground" />
                  <span>Vé</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Miễn phí</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 cursor-pointer"
                  >
                    <Link className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Approval */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <span>Yêu cầu phê duyệt</span>
                </div>
                <FormField
                  control={form.control}
                  name="requireApproval"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="cursor-pointer"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Capacity */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span>Sức chứa</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">
                    {isLimited ? `${capacity} người` : "Không giới hạn"}
                  </span>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 cursor-pointer"
                      >
                        <Link className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[400px]">
                      <DialogHeader>
                        <DialogTitle>Sức chứa tối đa</DialogTitle>
                        <DialogDescription>
                          Tự động đóng đăng kí khi đạt đến giới hạn. Chỉ những
                          người được duyệt mới được tính vào giới hạn.
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-3 mt-4">
                        <div>
                          <label className="block mb-1 font-medium">
                            Sức chứa
                          </label>
                          <Input
                            type="number"
                            placeholder="Nhập số lượng"
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                          />
                        </div>

                        <div className="flex items-center justify-between mt-2 ">
                          <span>Danh sách chờ quá tải</span>
                          <Switch
                            checked={overloadList}
                            onCheckedChange={setOverloadList}
                            className="cursor-pointer"
                          />
                        </div>
                      </div>

                      <DialogFooter className="mt-4">
                        <Button
                          className="cursor-pointer"
                          variant="secondary"
                          onClick={() => setIsLimited(false)}
                        >
                          Gỡ giới hạn
                        </Button>
                        <Button
                          className="cursor-pointer"
                          onClick={() => setIsLimited(true)}
                        >
                          Đặt giới hạn
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
            {/* Submit button */}
            <Button
              type="submit"
              className="w-full bg-amber-700 hover:bg-amber-800 cursor-pointer"
            >
              Tạo sự kiện
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
