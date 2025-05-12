"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { EventDetail, Registration } from "@/lib/api-event";
import { getEventRegistrations, getEvent, deleteEvent } from "@/lib/api-event";
import { EventDetailsComponent } from "@/components/common/event-manage/event-details";
import { AttendeesList } from "@/components/common/event-manage/attendees-list";
import { DeleteDialog } from "@/components/common/event-manage/delete-dialog";

export default function EventManagePage() {
  const router = useRouter();
  const { id: eventId } = useParams() as { id: string };

  // State
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    pageNumber: 0,
    pageSize: 10,
    totalPages: 1,
    totalElements: 0,
  });

  // Fetch event data
  useEffect(() => {
    const loadEventData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch event details
        const eventResponse = await getEvent(eventId);
        setEvent(eventResponse.data.result);

        // Fetch registrations
        const registrationsResponse = await getEventRegistrations(eventId);
        setRegistrations(registrationsResponse.data.result.content);
        setPagination({
          pageNumber: registrationsResponse.data.result.pageNumber,
          pageSize: registrationsResponse.data.result.pageSize,
          totalPages: registrationsResponse.data.result.totalPages,
          totalElements: registrationsResponse.data.result.totalElements,
        });
      } catch (err) {
        console.error("Error loading event data:", err);
        setError(
          err instanceof Error ? err.message : "Đã xảy ra lỗi khi tải dữ liệu",
        );
      } finally {
        setLoading(false);
      }
    };

    loadEventData();
  }, [eventId]);

  // Handle event deletion
  const handleDeleteEvent = async () => {
    setSaving(true);
    try {
      await deleteEvent(eventId);
      setShowDeleteDialog(false);
      router.push("/event"); // Chuyển về trang danh sách sự kiện
    } catch (err) {
      console.error("Error deleting event:", err);
      setError(
        err instanceof Error ? err.message : "Đã xảy ra lỗi khi xóa sự kiện",
      );
    } finally {
      setSaving(false);
    }
  };

  // Count confirmed registrations
  const confirmedRegistrationsCount = registrations.filter(
    (reg) => reg.status === "CONFIRMED",
  ).length;

  // Load more registrations
  const loadMoreRegistrations = async (page: number) => {
    try {
      const registrationsResponse = await getEventRegistrations(eventId, page);
      setRegistrations(registrationsResponse.data.result.content);
      setPagination({
        pageNumber: registrationsResponse.data.result.pageNumber,
        pageSize: registrationsResponse.data.result.pageSize,
        totalPages: registrationsResponse.data.result.totalPages,
        totalElements: registrationsResponse.data.result.totalElements,
      });
    } catch (err) {
      console.error("Error loading more registrations:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Đã xảy ra lỗi khi tải thêm dữ liệu",
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <div className="w-16 h-16 border-4 border-t-gray-600 border-b-gray-600 border-l-gray-200 border-r-gray-200 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">
            Đang tải thông tin sự kiện...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">!</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Đã xảy ra lỗi
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button
            onClick={() => router.push("/event")}
            className="bg-gray-800 hover:bg-gray-900 text-white"
          >
            Quay lại trang sự kiện
          </Button>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">!</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Không tìm thấy sự kiện
          </h1>
          <p className="text-gray-600 mb-6">
            Sự kiện này có thể đã bị xóa hoặc không tồn tại.
          </p>
          <Button
            onClick={() => router.push("/event")}
            className="bg-gray-800 hover:bg-gray-900 text-white"
          >
            Quay lại trang sự kiện
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => router.push("/event")}
              aria-label="Quay lại"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Quản lý sự kiện</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => router.push(`/event-join/${eventId}`)}
              aria-label="Xem trang sự kiện"
            >
              <span>Xem trang sự kiện</span>
            </Button>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Event details */}
          <div className="lg:col-span-1">
            <EventDetailsComponent
              event={event}
              registrationsCount={confirmedRegistrationsCount}
              onEventUpdated={setEvent}
              onDeleteClick={() => setShowDeleteDialog(true)}
            />
          </div>

          {/* Right column - Attendees list */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h2 className="text-lg font-medium mb-4">
                Danh sách người tham dự
              </h2>
              <AttendeesList
                registrations={registrations}
                pagination={pagination}
                onPageChange={loadMoreRegistrations}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDeleteEvent}
        isDeleting={saving}
      />
    </div>
  );
}
