"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddLumaEventModal } from "@/components/common/calendar/add-luma-event-modal";
import { EventEmptyState } from "@/components/common/calendar/event-empty-state";
import EventList from "@/components/common/calendar/event-list";
import { events as mockEvents, calendarData } from "@/data/data-mock";
import { format, isToday, isTomorrow, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
import type { EventWithUI } from "@/style/events-stype";
import Image from 'next/image';
import { AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function SettingEventPage() {
  const params = useParams();
  const calendarId = params.id as string;
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("upcoming");
  const [showAddLumaModal, setShowAddLumaModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [events, setEvents] = useState([...mockEvents]);
  const [showDeleteCalendarDialog, setShowDeleteCalendarDialog] =
    useState(false);
  const [showDeleteEventDialog, setShowDeleteEventDialog] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | number | null>(
    null
  );
  const [calendar, setCalendar] = useState({ ...calendarData });

  // Kiểm tra xem ID lịch có khớp với dữ liệu không
  const isValidCalendar = calendarId === calendarData.id;

  // Chuyển đổi dữ liệu sự kiện sang định dạng EventWithUI
  const convertToEventWithUI = (event: any): EventWithUI => {
    const eventDate = event.startTime ? parseISO(event.startTime) : new Date();

    let dateLabel;
    if (isToday(eventDate)) {
      dateLabel = "Hôm nay";
    } else if (isTomorrow(eventDate)) {
      dateLabel = "Ngày mai";
    } else {
      dateLabel = format(eventDate, "d 'thg' M", { locale: vi });
    }

    const dayLabel = format(eventDate, "EEEE", { locale: vi });
    const displayTime = format(eventDate, "HH:mm", { locale: vi });

    return {
      ...event,
      isUserEvent: true, // Đánh dấu là sự kiện của người dùng
      dateLabel,
      dayLabel,
      displayTime,
    };
  };

  // Filter events for upcoming and past
  const currentDate = new Date();
  const upcomingEvents = events
    .filter((event) => new Date(event.startTime) >= currentDate)
    .map(convertToEventWithUI);

  const pastEvents = events
    .filter((event) => new Date(event.startTime) < currentDate)
    .map(convertToEventWithUI);

  // Get the events based on active tab
  const displayEvents = activeTab === "upcoming" ? upcomingEvents : pastEvents;

  // Reset page when changing tabs
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setCurrentPage(1);
  };

  // Xử lý xóa sự kiện
  const handleDeleteEvent = (eventId: string | number) => {
    setEventToDelete(eventId);
    setShowDeleteEventDialog(true);
  };

  const confirmDeleteEvent = () => {
    if (eventToDelete) {
      setEvents(events.filter((event) => event.id !== eventToDelete));
      setShowDeleteEventDialog(false);
      setEventToDelete(null);
    }
  };

  // Xử lý xóa trang lịch
  const handleDeleteCalendar = () => {
    setShowDeleteCalendarDialog(true);
  };

  const confirmDeleteCalendar = () => {
    // Xóa tất cả sự kiện
    setEvents([]);
    setShowDeleteCalendarDialog(false);
    // Chuyển hướng về trang chủ
    router.push("/");
  };

  // Xử lý lưu thay đổi
  const handleSaveChanges = () => {
    // Thực hiện lưu thay đổi
    alert("Đã lưu thay đổi thành công!");
  };

  // Nếu ID lịch không hợp lệ, hiển thị thông báo lỗi
  if (!isValidCalendar) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Không tìm thấy lịch</h1>
          <p className="text-gray-600 mb-4">
            Lịch với ID {calendarId} không tồn tại hoặc đã bị xóa.
          </p>
          <Button onClick={() => (window.location.href = "/")}>
            Quay lại trang chủ
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
              <span className="text-lg">D</span>
            </div>
            <h1 className="text-3xl font-medium text-gray-700">
              {calendar.name}
            </h1>
          </div>
          <div className="ml-auto">
            <Button
              variant="outline"
              className="text-gray-600"
              onClick={() => router.push(`/featured-calendar/${calendarId}`)}
            >
              Trang lịch <span className="ml-1">→</span>
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <Tabs defaultValue="events" className="w-full">
            <TabsList className="border-b w-full justify-start rounded-none bg-transparent p-0 h-auto">
              <TabsTrigger
                value="events"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-gray-900 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Sự kiện
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-gray-900 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Cài đặt
              </TabsTrigger>
            </TabsList>

            <TabsContent value="events" className="pt-4">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <h2 className="text-xl font-medium text-gray-800">Sự kiện</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2 text-blue-600 h-8 w-8 p-0"
                    onClick={() => setShowAddLumaModal(true)}
                  >
                    +
                  </Button>
                </div>

                <Tabs
                  value={activeTab}
                  onValueChange={handleTabChange}
                  className="w-auto"
                >
                  <TabsList className="bg-gray-100 rounded-[8px] text-gray-900 leading-[24px] p-[2px]">
                    <TabsTrigger
                      value="upcoming"
                      className="flex items-center justify-center border-[0.8px] border-solid border-[#0000] text-gray-900 text-[14px] font-medium leading-[21px] p-[5px_8px] text-center data-[state=active]:bg-white data-[state=active]:rounded-md"
                    >
                      Sắp tới
                    </TabsTrigger>
                    <TabsTrigger
                      value="past"
                      className="flex items-center justify-center border-[0.8px] border-solid border-[#0000] text-gray-900 text-[14px] font-medium leading-[21px] p-[5px_8px] text-center data-[state=active]:bg-white data-[state=active]:rounded-md"
                    >
                      Đã qua
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {displayEvents.length > 0 ? (
                <EventList
                  events={displayEvents}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                  eventsPerPage={10}
                  onEventClick={handleDeleteEvent}
                />
              ) : (
                <EventEmptyState
                  onAddEvent={() => setShowAddLumaModal(true)}
                  isPast={activeTab === "past"}
                />
              )}
            </TabsContent>

            <TabsContent value="settings">
              <div className="p-6 bg-white rounded-lg border mt-4">
                <h3 className="text-lg font-medium mb-4">Cài đặt trang chủ</h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-start pb-4 border-b">
                    <div className="flex-1">
                      <h4 className="font-medium">Tên trang chủ</h4>
                      <p className="text-sm text-gray-500 mb-2">
                        Tên hiển thị cho trang sự kiện của bạn
                      </p>
                      <div className="flex items-center">
                        <input
                          type="text"
                          defaultValue={calendar.name}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-start pb-4 border-b">
                    <div className="flex-1">
                      <h4 className="font-medium">Ảnh bìa</h4>
                      <p className="text-sm text-gray-500 mb-2">
                        Ảnh hiển thị ở đầu trang sự kiện
                      </p>
                      <div className="mt-2 relative w-full h-[120px] overflow-hidden rounded-lg border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center">
                        <div className="absolute inset-0">
                          <Image
                            src={
                              calendar.coverImage ||
                              "/placeholder.svg?height=600&width=1200"
                            }
                            alt="Cover preview"
                            className="w-full h-full object-cover"
                            width={1200}
                            height={600}
                            priority
                          />
                        </div>
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <Button variant="secondary" size="sm">
                            Thay đổi ảnh
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-start pb-4 border-b">
                    <div className="flex-1">
                      <h4 className="font-medium">Ảnh đại diện</h4>
                      <p className="text-sm text-gray-500 mb-2">
                        Logo hoặc ảnh đại diện cho trang sự kiện
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden relative">
                          <Image
                            src={
                              calendar.avatarImage ||
                              "/placeholder.svg?height=60&width=60"
                            }
                            alt="Avatar preview"
                            className="w-full h-full object-cover"
                            width={60}
                            height={60}
                            priority
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <Button
                              variant="secondary"
                              size="sm"
                              className="w-full h-full rounded-none text-xs"
                            >
                              Thay đổi
                            </Button>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          Kích thước đề xuất: 400x400 pixel
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-start pb-4 border-b">
                    <div className="flex-1">
                      <h4 className="font-medium">Mô tả</h4>
                      <p className="text-sm text-gray-500 mb-2">
                        Mô tả ngắn về trang sự kiện của bạn
                      </p>
                      <textarea
                        className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        defaultValue={calendar.description || ""}
                      ></textarea>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-red-200">
                    <div>
                      <h4 className="font-medium text-red-600">
                        Xóa trang lịch
                      </h4>
                      <p className="text-sm text-gray-500">
                        Hành động này không thể hoàn tác
                      </p>
                    </div>
                    <div>
                      <Button
                        variant="destructive"
                        onClick={handleDeleteCalendar}
                      >
                        Xóa trang lịch
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-end mt-4">
                    <Button
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={handleSaveChanges}
                    >
                      Lưu thay đổi
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Modal xác nhận xóa sự kiện */}
      <Dialog
        open={showDeleteEventDialog}
        onOpenChange={setShowDeleteEventDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xóa sự kiện</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa sự kiện này? Hành động này không thể
              hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteEventDialog(false)}
            >
              Hủy
            </Button>
            <Button variant="destructive" onClick={confirmDeleteEvent}>
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal xác nhận xóa trang lịch */}
      <Dialog
        open={showDeleteCalendarDialog}
        onOpenChange={setShowDeleteCalendarDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <span>Xóa trang lịch</span>
            </DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa trang lịch này? Tất cả sự kiện và dữ
              liệu liên quan sẽ bị xóa vĩnh viễn. Hành động này không thể hoàn
              tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteCalendarDialog(false)}
            >
              Hủy
            </Button>
            <Button variant="destructive" onClick={confirmDeleteCalendar}>
              Xóa vĩnh viễn
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal thêm sự kiện */}
      <AddLumaEventModal
        isOpen={showAddLumaModal}
        onClose={() => setShowAddLumaModal(false)}
      />
    </div>
  );
}
