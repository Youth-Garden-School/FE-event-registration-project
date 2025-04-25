"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, MapPin, Video, Users, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddEventModal({ isOpen, onClose }: AddEventModalProps) {
  const router = useRouter();
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const [eventLocation, setEventLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Ngăn chặn hành vi mặc định và đảm bảo chuyển hướng đúng
    e.stopPropagation();

    // Đóng modal trước khi chuyển hướng
    onClose();

    // Chuyển hướng đến trang xác nhận
    router.push("/event-created");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-medium">Tạo sự kiện mới</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="event-name">Tên sự kiện *</Label>
            <Input
              id="event-name"
              placeholder="Nhập tên sự kiện"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="event-description">Mô tả</Label>
            <Textarea
              id="event-description"
              placeholder="Mô tả về sự kiện của bạn"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-4">
            <Label>Thời gian sự kiện</Label>
            <div className="space-y-4">
              {/* Simple date input */}
              <div className="space-y-2">
                <Label htmlFor="event-date">Ngày</Label>
                <Input
                  id="event-date"
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                />
              </div>

              {/* Simple time inputs */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-time">Thời gian bắt đầu</Label>
                  <Input
                    id="start-time"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-time">Thời gian kết thúc</Label>
                  <Input
                    id="end-time"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="text-sm text-gray-500 flex items-center mt-2">
                <span className="inline-block w-4 h-4 rounded-full border mr-2"></span>
                GMT+07:00 Saigon
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="online-event">Sự kiện trực tuyến</Label>
              <Switch
                id="online-event"
                checked={isOnline}
                onCheckedChange={setIsOnline}
              />
            </div>
          </div>

          {!isOnline && (
            <div className="space-y-2">
              <Label htmlFor="event-location">Địa điểm</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="event-location"
                  placeholder="Thêm địa điểm"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          )}

          {isOnline && (
            <div className="space-y-2">
              <Label htmlFor="event-link">Link tham gia</Label>
              <div className="relative">
                <Video className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="event-link"
                  placeholder="Thêm link Zoom, Google Meet, v.v."
                  className="pl-10"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="event-attendees">Người tham dự</Label>
            <div className="relative">
              <Users className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                id="event-attendees"
                placeholder="Thêm người tham dự"
                className="pl-10"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button
              variant="outline"
              type="button"
              className="text-sm flex items-center gap-2"
            >
              <Tag className="h-4 w-4" />
              Thêm thẻ
            </Button>
          </div>

          <div className="pt-4 flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={onClose}>
              Hủy
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Tạo sự kiện
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
