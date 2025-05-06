// lib/api.ts
import type { EventWithUI } from "@/style/events-stype";
import { formatTime } from "@/lib/utils";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://be-event-registration-project-jpv3.onrender.com/api";

async function fetchAllEvents(): Promise<EventWithUI[]> {
  const token = localStorage.getItem("ACCESS_TOKEN");
  const res = await fetch(`${API_BASE_URL}/events`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
  if (!res.ok) throw new Error(`Error fetching events: ${res.status}`);
  const { result } = await res.json();

  return result.map((e: any) => {
    const date = new Date(e.startTime);
    return {
      ...e,
      // dd/mm/yyyy
      dateLabel: date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      // Thứ trong tuần, ví dụ "Thứ hai"
      dayLabel: date.toLocaleDateString("vi-VN", {
        weekday: "long",
      }),
      displayTime: formatTime(date),
      attendees: e.attendees || [],
    };
  });
}

export async function getUpcomingEvents(): Promise<EventWithUI[]> {
  const all = await fetchAllEvents();
  return all.filter((e) => new Date(e.startTime) > new Date());
}

export async function getPastEvents(): Promise<EventWithUI[]> {
  const all = await fetchAllEvents();
  return all.filter((e) => new Date(e.startTime) <= new Date());
}