import { useState, useRef, useEffect } from "react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { MapPin, Edit, Ticket, User, Users, Link } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, addHours } from "date-fns";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import TimePicker from "./TimePicker";
import { FormValues } from "./types";

interface EventFormFieldsProps {
  form: any;
  onSubmit: (values: FormValues) => void;
}

export default function EventFormFields({
  form,
  onSubmit,
}: EventFormFieldsProps) {
  const [startDate1, setStartDate1] = useState<Date>(new Date());
  const [endDate1, setEndDate1] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(addHours(new Date(), 1));
  const [showPicker, setShowPicker] = useState(false);
  const [showPicker1, setShowPicker1] = useState(false);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [capacity, setCapacity] = useState("");
  const [isLimited, setIsLimited] = useState(false);
  const [overloadList, setOverloadList] = useState(false);

  const pickerRef = useRef<HTMLDivElement>(null);
  const pickerRef1 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setShowPicker(false);
      }
      if (
        pickerRef1.current &&
        !pickerRef1.current.contains(event.target as Node)
      ) {
        setShowPicker1(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

        <div className="space-y-3 bg-muted/30 rounded-lg p-4">
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
                      onChange={(date: Date) => {
                        setStartDate1(date);
                        setShowPicker(false);
                        if (endDate1 < date) {
                          setEndDate1(date);
                          form.setValue("endDate", date);
                        }
                        setStartDate(date);
                        form.setValue("startDate", date);
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
                        if (time) {
                          setStartDate(time);
                          form.setValue("startDate", time);
                        }
                        setShowStartPicker(false);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

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
                      onChange={(date: Date) => {
                        setEndDate1(date);
                        setShowPicker1(false);
                        setEndDate(date);
                        form.setValue("endDate", date);
                      }}
                      minDate={startDate1}
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
                        if (time) {
                          setEndDate(time);
                          form.setValue("endDate", time);
                        }
                        setShowEndPicker(false);
                      }}
                      isEndPicker
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="bg-white rounded-md px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-300">
              <span>🌍</span>
              <span>GMT+07:00</span>
              <span className="text-muted-foreground">Bangkok</span>
            </div>
          </div>
        </div>

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

        <div className="space-y-4">
          <h3 className="font-medium">Tùy chọn sự kiện</h3>

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
                      Tự động đóng đăng kí khi đạt đến giới hạn. Chỉ những người
                      được duyệt mới được tính vào giới hạn.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-3 mt-4">
                    <div>
                      <label className="block mb-1 font-medium">Sức chứa</label>
                      <Input
                        type="number"
                        placeholder="Nhập số lượng"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                      />
                    </div>

                    <div className="flex items-center justify-between mt-2">
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

        <Button
          type="submit"
          className="w-full bg-amber-700 hover:bg-amber-800 cursor-pointer"
        >
          Cập nhật sự kiện
        </Button>
      </form>
    </Form>
  );
}
