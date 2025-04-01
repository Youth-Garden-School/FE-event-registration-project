"use client";

import { ChevronUp, ChevronDown, LinkIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface ModalHeaderProps {
  onClose: () => void;
  eventId?: string | number;
  eventUrl?: string;
}

export function ModalHeader({ onClose, eventId, eventUrl }: ModalHeaderProps) {
  const router = useRouter();

  const handleEventPageClick = () => {
    // Chuyển hướng đến trang sự kiện
    if (eventUrl) {
      router.push(eventUrl);
      console.log("Chuyển hướng đến trang sự kiện:", eventUrl);
    } else if (eventId) {
      router.push(`/event-join/${eventId}`);
    }
  };

  const handleCopyLink = () => {
    const url =
      eventUrl || (eventId ? `/events/${eventId}` : window.location.href);
    navigator.clipboard
      .writeText(window.location.origin + url)
      .then(() => {
        alert("Đã sao chép liên kết!");
      })
      .catch((err) => {
        console.error("Không thể sao chép liên kết: ", err);
      });
  };

  return (
    <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm flex justify-between items-center p-3 border-b shadow-sm">
      <button onClick={onClose} className="rounded-full p-1 hover:bg-gray-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          className="h-5 w-5"
        >
          <path d="m13 17 5-5-5-5M6 17l5-5-5-5"></path>
        </svg>
      </button>

      <div className="flex items-center gap-2 flex-1 justify-between">
        <div className="flex items-center w-full">
          <button
            className="btn flex items-center text-sm bg-gray-100 hover:bg-gray-200 rounded-md px-2 py-1 mr-2"
            onClick={handleCopyLink}
          >
            <LinkIcon className="h-4 w-4 mr-1" />
            <span>Sao chép liên kết</span>
          </button>

          <button
            onClick={handleEventPageClick}
            className="btn flex items-center text-sm bg-gray-100 hover:bg-gray-200 rounded-md px-2 py-1"
          >
            <span>Trang sự kiện</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="h-4 w-4 ml-1"
            >
              <path d="M7 17 17 7M7 7h10v10"></path>
            </svg>
          </button>

          <div className="flex-1"></div>
        </div>

        <div className="flex items-center gap-1">
          <button disabled className="rounded-md bg-gray-100 p-1">
            <ChevronUp className="h-4 w-4 text-gray-400" />
          </button>
          <button className="rounded-md bg-gray-100 hover:bg-gray-200 p-1">
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
