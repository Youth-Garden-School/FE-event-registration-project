"use client";

import type React from "react";

import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddLumaEventModal } from "@/components/common/calendar/add-luma-event-modal";
import { EventEmptyState } from "@/components/common/calendar/event-empty-state";
import EventList from "@/components/common/calendar/event-list";
import { format, isToday, isTomorrow, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
import { AlertCircle, Upload, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  getCalendarById,
  deleteEventFromCalendar,
  deleteCalendar,
  updateCalendar,
  type Calendar,
  type CalendarEvent,
} from "@/lib/api-calendar";
import type { EventWithUI } from "@/style/events-stype";
import { supabase } from "@/lib/supabase";

export default function SettingEventPage() {
  const { id: calendarId } = useParams() as { id: string };
  const router = useRouter();

  // --- API data states ---
  const [calendar, setCalendar] = useState<Calendar | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- UI states ---
  const [activeTab, setActiveTab] = useState<"events" | "settings">("events");
  const [activeEventsTab, setActiveEventsTab] = useState<"upcoming" | "past">(
    "upcoming"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddLumaModal, setShowAddLumaModal] = useState(false);

  const [showDeleteEventDialog, setShowDeleteEventDialog] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);

  const [showDeleteCalendarDialog, setShowDeleteCalendarDialog] =
    useState(false);

  // --- Settings form states ---
  const [editName, setEditName] = useState("");
  const [editCover, setEditCover] = useState("");
  const [editAvatar, setEditAvatar] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [savingSettings, setSavingSettings] = useState(false);

  // --- Upload states ---
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // --- Refs for file inputs ---
  const coverFileInputRef = useRef<HTMLInputElement>(null);
  const avatarFileInputRef = useRef<HTMLInputElement>(null);

  // Convert API event → EventWithUI
  const convertToEventWithUI = (e: CalendarEvent): EventWithUI => {
    const dt = parseISO(e.startTime);
    const dateLabel = isToday(dt)
      ? "Hôm nay"
      : isTomorrow(dt)
        ? "Ngày mai"
        : format(dt, "d 'thg' M", { locale: vi });
    return {
      id: e.id,
      title: e.title,
      description: e.description || "",
      startTime: e.startTime,
      endTime: e.endTime,
      location: e.location || "",
      isOnline: false,
      calendarId: e.id,
      dateLabel,
      dayLabel: format(dt, "EEEE", { locale: vi }),
      displayTime: format(dt, "HH:mm", { locale: vi }),
      isUserEvent: true,
      isRegistered: false,
      attendees: e.attendees ?? [],
      requiresApproval: e.requiresApproval ?? false,
    };
  };

  // Fetch calendar + events
  const fetchCalendarAndEvents = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const cal = await getCalendarById(calendarId);
      setCalendar(cal);
      setEvents(cal.events ?? []);

      // Sync settings form when calendar loads
      setEditName(cal.name);
      setEditCover(cal.coverImage ?? "");
      setEditAvatar(cal.avatarImage ?? "");
      setEditDesc(cal.description ?? "");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Lỗi khi tải lịch");
    } finally {
      setLoading(false);
    }
  }, [calendarId]);

  useEffect(() => {
    fetchCalendarAndEvents();
  }, [fetchCalendarAndEvents]);

  // Delete single event
  const handleDeleteEvent = (event: CalendarEvent) => {
    setEventToDelete(event.id);
    setShowDeleteEventDialog(true);
  };

  const confirmDeleteEvent = async () => {
    if (!eventToDelete) return;
    try {
      await deleteEventFromCalendar(calendarId, eventToDelete);
      await fetchCalendarAndEvents();
      setShowDeleteEventDialog(false);
      setEventToDelete(null);
    } catch (err) {
      console.error(err);
      alert("Không thể xóa sự kiện. Vui lòng thử lại sau.");
    }
  };

  // Delete entire calendar
  const handleDeleteCalendar = () => setShowDeleteCalendarDialog(true);

  const confirmDeleteCalendar = async () => {
    try {
      await deleteCalendar(calendarId);
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Không thể xóa lịch. Vui lòng thử lại sau.");
    }
  };

  // Save settings
  const handleSaveChanges = async () => {
    setSavingSettings(true);
    try {
      await updateCalendar(calendarId, {
        name: editName,
        coverImage: editCover,
        avatarImage: editAvatar,
        description: editDesc,
      });
      await fetchCalendarAndEvents();
      alert("Cập nhật thành công!");
    } catch (err: any) {
      console.error(err);
      alert("Cập nhật thất bại: " + (err.message || "Lỗi không xác định"));
    } finally {
      setSavingSettings(false);
    }
  };

  // Sanitize file name for storage
  const sanitizeFileName = (name: string) => {
    return name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9._-]/g, "")
      .toLowerCase();
  };

  // Handle cover image upload
  const handleCoverImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    if (
      !["image/jpeg", "image/png", "image/gif", "image/webp"].includes(
        file.type
      )
    ) {
      alert("Chỉ chấp nhận file ảnh định dạng JPG, PNG, GIF hoặc WebP");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Kích thước file không được vượt quá 5MB");
      return;
    }

    setUploadingCover(true);
    setUploadError(null);

    try {
      // Upload to Supabase
      const sanitizedName = sanitizeFileName(file.name);
      const fileName = `calendars/${calendarId}/cover/${Date.now()}_${sanitizedName}`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(fileName, file, { cacheControl: "3600", upsert: false });

      if (uploadError) throw new Error(uploadError.message);

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("images")
        .getPublicUrl(fileName);

      if (!urlData.publicUrl) throw new Error("Không thể lấy URL ảnh");

      // Update state
      setEditCover(urlData.publicUrl);
    } catch (err: any) {
      console.error("Upload Error:", err);
      setUploadError(err.message || "Tải ảnh thất bại");
      alert("Tải ảnh thất bại: " + (err.message || "Lỗi không xác định"));
    } finally {
      setUploadingCover(false);
      if (coverFileInputRef.current) coverFileInputRef.current.value = "";
    }
  };

  // Handle avatar image upload
  const handleAvatarImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    if (
      !["image/jpeg", "image/png", "image/gif", "image/webp"].includes(
        file.type
      )
    ) {
      alert("Chỉ chấp nhận file ảnh định dạng JPG, PNG, GIF hoặc WebP");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Kích thước file không được vượt quá 5MB");
      return;
    }

    setUploadingAvatar(true);
    setUploadError(null);

    try {
      // Upload to Supabase
      const sanitizedName = sanitizeFileName(file.name);
      const fileName = `calendars/${calendarId}/avatar/${Date.now()}_${sanitizedName}`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(fileName, file, { cacheControl: "3600", upsert: false });

      if (uploadError) throw new Error(uploadError.message);

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("images")
        .getPublicUrl(fileName);

      if (!urlData.publicUrl) throw new Error("Không thể lấy URL ảnh");

      // Update state
      setEditAvatar(urlData.publicUrl);
    } catch (err: any) {
      console.error("Upload Error:", err);
      setUploadError(err.message || "Tải ảnh thất bại");
      alert("Tải ảnh thất bại: " + (err.message || "Lỗi không xác định"));
    } finally {
      setUploadingAvatar(false);
      if (avatarFileInputRef.current) avatarFileInputRef.current.value = "";
    }
  };

  // Filter upcoming / past
  const now = new Date();
  const upcomingEvents = events
    .filter((e) => parseISO(e.startTime) >= now)
    .map(convertToEventWithUI);
  const pastEvents = events
    .filter((e) => parseISO(e.startTime) < now)
    .map(convertToEventWithUI);
  const displayEvents =
    activeEventsTab === "upcoming" ? upcomingEvents : pastEvents;

  if (loading) {
    return (
      <div className=" bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <div className="w-16 h-16 border-4 border-t-gray-600 border-b-gray-600 border-l-gray-200 border-r-gray-200 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Đang tải quản lý lịch...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center text-red-500">Lỗi khi tải: {error}</div>
    );
  }

  if (!calendar) {
    return (
      <div className="py-8 text-center text-gray-600">
        Không tìm thấy lịch này.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 overflow-hidden"
              style={{ backgroundColor: calendar.color || "#e5e7eb" }}
            >
              {calendar.avatarImage ? (
                <img
                  src={calendar.avatarImage || "/placeholder.svg"}
                  alt={calendar.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-lg">
                  {calendar.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <h1 className="text-3xl font-medium text-gray-700">
              {calendar.name}
            </h1>
          </div>
          <div className="ml-auto">
            <Button
              variant="outline"
              onClick={() => router.push(`/featured-calendar/${calendarId}`)}
            >
              Trang lịch <span className="ml-1">→</span>
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as "events" | "settings")}
          className="w-full mb-4"
        >
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

          {/* Events Tab */}
          <TabsContent value="events">
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
                value={activeEventsTab}
                onValueChange={(v) => {
                  setActiveEventsTab(v as "upcoming" | "past");
                  setCurrentPage(1);
                }}
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
                calendarId={calendarId}
                events={displayEvents}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                eventsPerPage={10}
                onEventClick={handleDeleteEvent}
              />
            ) : (
              <EventEmptyState
                onAddEvent={() => setShowAddLumaModal(true)}
                isPast={activeEventsTab === "past"}
              />
            )}
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="p-6 bg-white rounded-lg border mt-4">
              <h3 className="text-lg font-medium mb-4">Cài đặt trang chủ</h3>
              <div className="space-y-6">
                {/* Tên */}
                <div className="flex justify-between items-start pb-4 border-b">
                  <div className="flex-1">
                    <h4 className="font-medium">Tên trang chủ</h4>
                    <p className="text-sm text-gray-500 mb-2">
                      Tên hiển thị cho trang sự kiện của bạn
                    </p>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                </div>

                {/* Ảnh bìa */}
                <div className="flex justify-between items-start pb-4 border-b">
                  <div className="flex-1">
                    <h4 className="font-medium">Ảnh bìa</h4>
                    <p className="text-sm text-gray-500 mb-2">
                      Ảnh hiển thị ở đầu trang sự kiện
                    </p>
                    <input
                      ref={coverFileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/gif,image/webp"
                      className="hidden"
                      onChange={handleCoverImageUpload}
                    />
                    <div className="mt-2 relative w-full h-[120px] overflow-hidden rounded-lg border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center">
                      <div className="absolute inset-0">
                        <img
                          src={editCover || "/placeholder.svg?height=600&width=1200"}
                          alt="Cover preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        {uploadingCover ? (
                          <div className="flex flex-col items-center text-white">
                            <Loader2 className="h-6 w-6 animate-spin" />
                            <span className="text-sm mt-2">Đang tải...</span>
                          </div>
                        ) : (
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => coverFileInputRef.current?.click()}
                            className="gap-2"
                          >
                            <Upload className="h-4 w-4" />
                            <span>Tải ảnh lên</span>
                          </Button>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Kích thước đề xuất: 1200x600 pixel, tối đa 5MB
                    </p>
                  </div>
                </div>

                {/* Ảnh đại diện */}
                <div className="flex justify-between items-start pb-4 border-b">
                  <div className="flex-1">
                    <h4 className="font-medium">Ảnh đại diện</h4>
                    <p className="text-sm text-gray-500 mb-2">
                      Logo hoặc ảnh đại diện cho trang sự kiện
                    </p>
                    <input
                      ref={avatarFileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/gif,image/webp"
                      className="hidden"
                      onChange={handleAvatarImageUpload}
                    />
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden relative">
                        <img
                          src={
                            editAvatar || "/placeholder.svg?height=60&width=60"
                          }
                          alt="Avatar preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          {uploadingAvatar ? (
                            <div className="flex flex-col items-center text-white">
                              <Loader2 className="h-4 w-4 animate-spin" />
                            </div>
                          ) : (
                            <Button
                              variant="secondary"
                              size="sm"
                              className="w-full h-full rounded-none text-xs"
                              onClick={() =>
                                avatarFileInputRef.current?.click()
                              }
                            >
                              <Upload className="h-3 w-3 mr-1" />
                              Tải lên
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        <p>Kích thước đề xuất: 400x400 pixel</p>
                        <p className="text-xs mt-1">
                          Định dạng: JPG, PNG, GIF, WebP
                        </p>
                        <p className="text-xs">Kích thước tối đa: 5MB</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mô tả */}
                <div className="flex justify-between items-start pb-4 border-b">
                  <div className="flex-1">
                    <h4 className="font-medium">Mô tả</h4>
                    <p className="text-sm text-gray-500 mb-2">
                      Mô tả ngắn về trang sự kiện của bạn
                    </p>
                    <textarea
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                      className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    ></textarea>
                  </div>
                </div>

                {/* Xóa trang lịch */}
                <div className="flex justify-between items-center pt-4 border-t border-red-200">
                  <div>
                    <h4 className="font-medium text-red-600">Xóa trang lịch</h4>
                    <p className="text-sm text-gray-500">
                      Hành động này không thể hoàn tác
                    </p>
                  </div>
                  <Button variant="destructive" onClick={handleDeleteCalendar}>
                    Xóa trang lịch
                  </Button>
                </div>

                {/* Lưu thay đổi */}
                <div className="flex justify-end mt-4">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={handleSaveChanges}
                    disabled={savingSettings}
                  >
                    {savingSettings ? "Đang lưu…" : "Lưu thay đổi"}
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Delete Event Dialog */}
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

      {/* Delete Calendar Dialog */}
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

      {/* Add Event Modal */}
      <AddLumaEventModal
        isOpen={showAddLumaModal}
        calendarId={calendarId}
        onClose={() => setShowAddLumaModal(false)}
        onEventAdded={fetchCalendarAndEvents}
      />
    </div>
  );
}
