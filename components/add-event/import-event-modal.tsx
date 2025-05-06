"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ImportLumaEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ImportLumaEventModal({
  isOpen,
  onClose,
}: ImportLumaEventModalProps) {
  const [eventUrl, setEventUrl] = useState("");

  if (!isOpen) return null;

  const handleAddEvent = () => {
    // Handle adding the Luma event
    console.log("Adding Luma event:", eventUrl);
    // Reset and close
    setEventUrl("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 overflow-hidden p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Thêm sự kiện Luma</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <Input
          placeholder="Nhập đường dẫn sự kiện Luma"
          value={eventUrl}
          onChange={(e) => setEventUrl(e.target.value)}
          className="mb-4"
        />

        <Button
          variant="outline"
          className="text-sm flex items-center gap-2 mb-4"
        >
          + Thêm thẻ
        </Button>

        <Button
          onClick={handleAddEvent}
          className="w-full bg-gray-400 hover:bg-gray-500 text-white"
        >
          Thêm 1 sự kiện
        </Button>
      </div>
    </div>
  );
}
