"use client";

import { useState } from "react";
import { X, Link } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AddExternalEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddExternalEventModal({
  isOpen,
  onClose,
}: AddExternalEventModalProps) {
  const [eventUrl, setEventUrl] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-medium">Thêm sự kiện bên ngoài</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <Link className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Nhập URL sự kiện"
                value={eventUrl}
                onChange={(e) => setEventUrl(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Thêm sự kiện
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
