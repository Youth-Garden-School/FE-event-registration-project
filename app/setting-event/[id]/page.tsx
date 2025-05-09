// app/setting-event/[id]/page.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { AddLumaEventModal } from "@/components/common/calendar/add-luma-event-modal";
import { EventEmptyState } from "@/components/common/calendar/event-empty-state";
import EventList from "@/components/common/calendar/event-list";

import { format, isToday, isTomorrow, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
import { AlertCircle } from "lucide-react";

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
  Calendar,
  CalendarEvent,
} from "@/lib/api-calendar";
import type { EventWithUI } from "@/style/events-stype";

export default function SettingEventPage() {
  const { id: calendarId } = useParams() as { id: string };
  const router = useRouter();

  // --- API data states ---
  const [calendar, setCalendar] = useState<Calendar | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- UI states ---
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddLumaModal, setShowAddLumaModal] = useState(false);

  const [showDeleteEventDialog, setShowDeleteEventDialog] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);

  const [showDeleteCalendarDialog, setShowDeleteCalendarDialog] = useState(false);

  // --- Settings form states ---
  const [editName, setEditName] = useState("");
const [editCover, setEditCover] = useState("");
const [editAvatar, setEditAvatar] = useState("");
const [editDesc, setEditDesc] = useState("");
const [savingSettings, setSavingSettings] = useState(false);

useEffect(() => {
  if (calendar) {
    setEditName(calendar.name);
    setEditCover(calendar.coverImage ?? "");
    setEditAvatar(calendar.avatarImage ?? "");
    setEditDesc(calendar.description ?? "");
  }
}, [calendar]);

const handleSaveChanges = async () => {
  setSavingSettings(true);
  try {
    await updateCalendar(calendarId, {
      name: editName,
      coverImage: editCover,
      avatarImage: editAvatar,
      description: editDesc,
    });
    await fetchCalendarAndEvents();  // reload data
    alert("Lưu thay đổi thành công!");
  } catch (err: any) {
    console.error(err);
    alert("Lưu thay đổi thất bại: " + err.message);
  } finally {
    setSavingSettings(false);
  }
};

  // Convert API event → EventWithUI
  const convertToEventWithUI = (e: CalendarEvent): EventWithUI => {
    const dt = parseISO(e.startTime);
    const dateLabel = isToday(dt)
      ? "Hôm nay"
      : isTomorrow(dt)
      ? "Ngày mai"
      : format(dt, "d 'thg' M", { locale: vi });
    return {
      ...e,
      dateLabel,
      dayLabel: format(dt, "EEEE", { locale: vi }),
      displayTime: format(dt, "HH:mm", { locale: vi }),
      isUserEvent: true,
      attendees: e.attendees ?? [],
    };
  };

  // Fetch calendar + events
  const fetchCalendarAndEvents = useCallback(() => {
    setLoading(true);
    setError(null);

    getCalendarById(calendarId)
      .then((cal) => {
        setCalendar(cal);
        setEvents(cal.events ?? []);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Lỗi khi tải lịch");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [calendarId]);

  useEffect(() => {
    fetchCalendarAndEvents();
  }, [fetchCalendarAndEvents]);

  // Sync settings form when calendar loads
  useEffect(() => {
    if (calendar) {
      setEditName(calendar.name);
      setEditCover(calendar.coverImage ?? "");
      setEditAvatar(calendar.avatarImage ?? "");
      setEditDesc(calendar.description ?? "");
    }
  }, [calendar]);

  // Delete single event
  const handleDeleteEvent = (id: string) => {
    setEventToDelete(id);
    setShowDeleteEventDialog(true);
  };
  const confirmDeleteEvent = async () => {
    if (!eventToDelete) return;
    try {
      await deleteEventFromCalendar(calendarId, eventToDelete);
      fetchCalendarAndEvents();
    } catch (err) {
      console.error(err);
    } finally {
      setShowDeleteEventDialog(false);
      setEventToDelete(null);
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
    }
  };

  // Save settings
  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      await updateCalendar(calendarId, {
        name: editName,
        color: editColor,
        coverImage: editCover,
        avatarImage: editAvatar,
        description: editDesc,
      });
      fetchCalendarAndEvents();
      alert("Cập nhật thành công!");
    } catch (err: any) {
      console.error(err);
      alert("Cập nhật thất bại: " + err.message);
    } finally {
      setSaving(false);
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
    activeTab === "upcoming" ? upcomingEvents : pastEvents;

  if (loading) {
    return <div className="py-8 text-center">Đang tải lịch…</div>;
  }
  if (error) {
    return (
      <div className="py-8 text-center text-red-500">
        Lỗi khi tải: {error}
      </div>
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
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
              L
            </div>
            <h1 className="text-3xl font-medium text-gray-700">
              {calendar.name}
            </h1>
          </div>
          <div className="ml-auto">
            <Button
              variant="outline"
              onClick={() =>
                router.push(`/featured-calendar/${calendarId}`)
              }
            >
              Trang lịch →
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="events" className="w-full mb-4">
          <TabsList className="border-b">
            <TabsTrigger value="events">Sự kiện</TabsTrigger>
            <TabsTrigger value="settings">Cài đặt</TabsTrigger>
          </TabsList>

          {/* Events Tab */}
          <TabsContent value="events">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <h2 className="text-xl font-medium text-gray-800">
                  Sự kiện
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-2"
                  onClick={() => setShowAddLumaModal(true)}
                >
                  +
                </Button>
              </div>
              <Tabs
                value={activeTab}
                onValueChange={(v) => {
                  setActiveTab(v as any);
                  setCurrentPage(1);
                }}
                className="w-auto"
              >
                <TabsList className="bg-gray-100 rounded p-1">
                  <TabsTrigger value="upcoming">Sắp tới</TabsTrigger>
                  <TabsTrigger value="past">Đã qua</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {displayEvents.length > 0 ? (
              <EventList
                events={displayEvents}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                eventsPerPage={10}
                onEventClick={(evt) => handleDeleteEvent(evt.id)}
              />
            ) : (
              <EventEmptyState
                onAddEvent={() => setShowAddLumaModal(true)}
                isPast={activeTab === "past"}
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
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
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
                    <div className="mt-2 relative w-full h-[120px] overflow-hidden rounded-lg border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center">
                      <img
                        src={editCover || "/placeholder.svg?height=600&width=1200"}
                        alt="Cover preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            const url = prompt("Nhập URL ảnh bìa", editCover);
                            if (url) setEditCover(url);
                          }}
                        >
                          Thay đổi ảnh
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ảnh đại diện */}
                <div className="flex justify-between items-start pb-4 border-b">
                  <div className="flex-1">
                    <h4 className="font-medium">Ảnh đại diện</h4>
                    <p className="text-sm text-gray-500 mb-2">
                      Logo hoặc ảnh đại diện cho trang sự kiện
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden relative">
                        <img
                          src={editAvatar || "/placeholder.svg?height=60&width=60"}
                          alt="Avatar preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <Button
                            variant="secondary"
                            size="sm"
                            className="w-full h-full rounded-none text-xs"
                            onClick={() => {
                              const url = prompt("Nhập URL avatar", editAvatar);
                              if (url) setEditAvatar(url);
                            }}
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
              Bạn có chắc muốn xóa sự kiện này?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowDeleteEventDialog(false)}>
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
              Xóa trang lịch
            </DialogTitle>
            <DialogDescription>
              Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowDeleteCalendarDialog(false)}>
              Hủy
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDeleteCalendar}
            >
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
