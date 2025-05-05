"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import {
  getEventById,
  getMyRegistration,
  registerEvent,
  cancelRegistration,
  EventDetail,
  Registration,
} from "@/lib/api-events";

export default function EventJoinPage() {
  const { id: eventId } = useParams() as { id: string };
  const router = useRouter();

  const [event, setEvent] = useState<EventDetail | null>(null);
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch dữ liệu khi component mount
  useEffect(() => {
    setLoading(true);
    Promise.all([getEventById(eventId), getMyRegistration(eventId)])
      .then(([evt, reg]) => {
        setEvent(evt);
        setRegistration(reg);
      })
      .catch(() => setError("Không tải được dữ liệu sự kiện."))
      .finally(() => setLoading(false));
  }, [eventId]);

  // Handlers
  const handleRegister = async () => {
    if (!event) return;
    try {
      const reg = await registerEvent(event.id);
      setRegistration(reg);
    } catch {
      alert("Đăng ký thất bại, thử lại sau.");
    }
  };

  const handleCancel = async () => {
    if (!registration) return;
    try {
      await cancelRegistration(registration.id);
      setRegistration(null);
    } catch {
      alert("Hủy đăng ký thất bại, thử lại sau.");
    }
  };

  // UI
  if (loading) return <div>Đang tải dữ liệu…</div>;
  if (error || !event) {
    return (
      <div>
        <h1>{error || "Không tìm thấy sự kiện."}</h1>
        <Link href="/">Quay về trang chủ</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
      <p className="text-gray-600 mb-4">{event.description}</p>
      <p>
        <strong>Thời gian:</strong>{" "}
        {new Date(event.startTime).toLocaleString("vi-VN")} –{" "}
        {new Date(event.endTime).toLocaleString("vi-VN")}
      </p>
      <p>
        <strong>Địa điểm:</strong> {event.location}
      </p>

      {registration ? (
        <button
          onClick={handleCancel}
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded"
        >
          Hủy đăng ký
        </button>
      ) : (
        <button
          onClick={handleRegister}
          className="mt-6 px-4 py-2 bg-green-600 text-white rounded"
        >
          Đăng ký tham dự
        </button>
      )}
    </div>
  );
}
