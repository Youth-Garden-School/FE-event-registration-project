"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  MapPin,
  Users,
  Trash2,
  Edit,
  Save,
  Clock,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
import type { EventDetail } from "@/lib/api-event";
import { updateEvent } from "@/lib/api-event";

interface EventDetailsProps {
  event: EventDetail;
  registrationsCount: number;
  onEventUpdated: (event: EventDetail) => void;
  onDeleteClick: () => void;
}

export function EventDetailsComponent({
  event,
  registrationsCount,
  onEventUpdated,
  onDeleteClick,
}: EventDetailsProps) {
  const [editMode, setEditMode] = useState(false);
  const [editedEvent, setEditedEvent] = useState<EventDetail>(event);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Format date and time
  const formatDateTime = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return format(date, "EEEE, d MMMM yyyy • HH:mm", { locale: vi });
    } catch (e) {
      return dateString;
    }
  };

  // Handle input changes in edit mode
  const handleInputChange = (field: string, value: string) => {
    setEditedEvent({
      ...editedEvent,
      [field]: value,
    });
  };

  // Handle event update
  const handleSaveChanges = async () => {
    setSaving(true);
    setError(null);

    try {
      const response = await updateEvent(event.id, {
        title: editedEvent.title,
        description: editedEvent.description,
        coverImage: editedEvent.coverImage,
        startTime: editedEvent.startTime,
        endTime: editedEvent.endTime,
        location: editedEvent.location,
      });

      onEventUpdated(response.data.result);
      setEditMode(false);
    } catch (err) {
      console.error("Error updating event:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Đã xảy ra lỗi khi cập nhật sự kiện",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Event image */}
      <div className="relative h-48">
        <Image
          src={event.coverImage || "/placeholder.svg?height=400&width=600"}
          alt={event.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {editMode && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                const url = prompt(
                  "Nhập URL ảnh bìa mới:",
                  editedEvent.coverImage,
                );
                if (url) {
                  handleInputChange("coverImage", url);
                }
              }}
            >
              Thay đổi ảnh
            </Button>
          </div>
        )}
      </div>

      {/* Event info */}
      <div className="p-4">
        {editMode ? (
          <div className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tiêu đề
              </label>
              <Input
                id="title"
                value={editedEvent.title || ""}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Nhập tiêu đề sự kiện"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">Thời gian</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full border-2 border-blue-500 bg-white flex-shrink-0 mr-2"></div>
                    <label htmlFor="startDate" className="text-sm font-medium">
                      Bắt đầu
                    </label>
                  </div>
                  <Input
                    id="startDate"
                    type="date"
                    value={
                      editedEvent.startTime
                        ? new Date(editedEvent.startTime)
                            .toISOString()
                            .split("T")[0]
                        : ""
                    }
                    onChange={(e) => {
                      const date = e.target.value;
                      const time = new Date(editedEvent.startTime)
                        .toISOString()
                        .split("T")[1]
                        .substring(0, 5);
                      const newDateTime = `${date}T${time}`;
                      handleInputChange(
                        "startTime",
                        new Date(newDateTime).toISOString(),
                      );
                    }}
                    className="mb-2"
                  />
                  <Input
                    id="startTime"
                    type="time"
                    value={
                      editedEvent.startTime
                        ? new Date(editedEvent.startTime)
                            .toISOString()
                            .split("T")[1]
                            .substring(0, 5)
                        : ""
                    }
                    onChange={(e) => {
                      const date = new Date(editedEvent.startTime)
                        .toISOString()
                        .split("T")[0];
                      const time = e.target.value;
                      const newDateTime = `${date}T${time}`;
                      handleInputChange(
                        "startTime",
                        new Date(newDateTime).toISOString(),
                      );
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full border-2 border-gray-300 bg-white flex-shrink-0 mr-2"></div>
                    <label htmlFor="endDate" className="text-sm font-medium">
                      Kết thúc
                    </label>
                  </div>
                  <Input
                    id="endDate"
                    type="date"
                    value={
                      editedEvent.endTime
                        ? new Date(editedEvent.endTime)
                            .toISOString()
                            .split("T")[0]
                        : ""
                    }
                    onChange={(e) => {
                      const date = e.target.value;
                      const time = new Date(editedEvent.endTime)
                        .toISOString()
                        .split("T")[1]
                        .substring(0, 5);
                      const newDateTime = `${date}T${time}`;
                      handleInputChange(
                        "endTime",
                        new Date(newDateTime).toISOString(),
                      );
                    }}
                    className="mb-2"
                  />
                  <Input
                    id="endTime"
                    type="time"
                    value={
                      editedEvent.endTime
                        ? new Date(editedEvent.endTime)
                            .toISOString()
                            .split("T")[1]
                            .substring(0, 5)
                        : ""
                    }
                    onChange={(e) => {
                      const date = new Date(editedEvent.endTime)
                        .toISOString()
                        .split("T")[0];
                      const time = e.target.value;
                      const newDateTime = `${date}T${time}`;
                      handleInputChange(
                        "endTime",
                        new Date(newDateTime).toISOString(),
                      );
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">Địa điểm</span>
              </div>
              <Input
                id="location"
                value={editedEvent.location || ""}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="Địa điểm trực tiếp hoặc liên kết ảo"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Edit className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">Mô tả</span>
              </div>
              <Textarea
                id="description"
                value={editedEvent.description || ""}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={3}
                placeholder="Mô tả về sự kiện của bạn"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex gap-2 pt-4">
              <Button
                onClick={handleSaveChanges}
                className="flex-1 gap-2"
                disabled={saving}
              >
                <Save className="h-4 w-4" />
                <span>{saving ? "Đang lưu..." : "Lưu thay đổi"}</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => setEditMode(false)}
                className="flex-1"
              >
                Hủy
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-bold">{event.title}</h2>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setEditMode(true)}
                aria-label="Chỉnh sửa"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-4 w-4 flex-shrink-0" />
                <span>{formatDateTime(event.startTime)}</span>
              </div>

              <div className="flex items-start gap-2 text-gray-600">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-1" />
                <span>{event.location}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Users className="h-4 w-4 flex-shrink-0" />
                <span>{registrationsCount} người đã đăng ký</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Mô tả</h3>
              <p className="text-gray-600 text-sm">{event.description}</p>
            </div>

            <div className="border-t pt-4 mt-4">
              <Button
                variant="destructive"
                className="w-full"
                onClick={onDeleteClick}
                aria-label="Xóa sự kiện"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                <span>Xóa sự kiện</span>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
