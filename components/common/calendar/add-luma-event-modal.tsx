"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addEventsToCalendar } from "@/lib/api-calendar";

interface AddLumaEventModalProps {
  isOpen: boolean;
  calendarId: string;
  onClose: () => void;
  onEventAdded?: () => void;  // callback để parent reload
}

export function AddLumaEventModal({
  isOpen,
  calendarId,
  onClose,
  onEventAdded,
}: AddLumaEventModalProps) {
  const [eventUrl, setEventUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 1) Validate URL
    if (!eventUrl.trim()) {
      setError("Vui lòng nhập đường dẫn sự kiện");
      return;
    }

    // 2) Trích xuất eventId từ URL
    //    Giả sử URL: https://luma.com/events/<EVENT_ID>
    const parts = eventUrl.split("/").filter((p) => p.length);
    const eventId = parts[parts.length - 1];
    if (!eventId) {
      setError("Không trích được ID từ URL");
      return;
    }

    setLoading(true);
    try {
      // 3) Gọi API thêm vào calendar
      const { message } = await addEventsToCalendar(calendarId, [eventId]);
      // 4) Thông báo thành công
      alert(message);
      // 5) Cho parent reload lại danh sách events
      onEventAdded?.();
      // 6) Reset form + đóng modal
      setEventUrl("");
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Thêm sự kiện thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-medium">Thêm sự kiện Luma</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}
          <Input
            placeholder="Nhập đường dẫn sự kiện Luma"
            value={eventUrl}
            onChange={(e) => setEventUrl(e.target.value)}
            required
          />

          <Button
            type="submit"
            className="w-full bg-[#0071e3] hover:bg-[#0071e3]/90 text-white"
            disabled={loading}
          >
            {loading ? "Đang gửi…" : "Thêm vào lịch"}
          </Button>
        </form>
      </div>
    </div>
  );
}
