"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
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

  const [event, setEvent] = useState<EventDetail | null>(null);
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    Promise.all([getEventById(eventId), getMyRegistration(eventId)])
      .then(([evt, reg]) => {
        setEvent(evt);
        setRegistration(reg);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Không tải được dữ liệu sự kiện.");
      })
      .finally(() => setLoading(false));
  }, [eventId]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Đang tải dữ liệu…</p>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl text-red-600 mb-4">
          {error || "Không tìm thấy sự kiện."}
        </h1>
        <Link href="/" className="text-blue-500 hover:underline">
          ← Quay về trang chủ
        </Link>
      </div>
    );
  }

  const handleRegister = async () => {
    try {
      const reg = await registerEvent(event.id);
      setRegistration(reg);
    } catch (err) {
      console.error("Register failed:", err);
      alert("Đăng ký thất bại, thử lại sau.");
    }
  };

  const handleCancel = async () => {
    if (!registration) return;
    try {
      await cancelRegistration(registration.id);
      setRegistration(null);
    } catch (err) {
      console.error("Cancel failed:", err);
      alert("Hủy đăng ký thất bại, thử lại sau.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
        <p className="text-gray-600 mb-6">{event.description}</p>
        <div className="space-y-2 mb-6">
          <p>
            <strong>Thời gian:</strong>{" "}
            {new Date(event.startTime).toLocaleString("vi-VN")} –{" "}
            {new Date(event.endTime).toLocaleString("vi-VN")}
          </p>
          <p>
            <strong>Địa điểm:</strong> {event.location}
          </p>
          <p>
            <strong>Hình thức:</strong>{" "}
            {event.isOnline ? "Trực tuyến" : "Trực tiếp"}
          </p>
        </div>

        {registration ? (
          <button
            onClick={handleCancel}
            className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition"
          >
            Hủy đăng ký
          </button>
        ) : (
          <button
            onClick={handleRegister}
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition"
          >
            Đăng ký tham dự
          </button>
        )}

        <div className="mt-4 text-center">
          <Link href="/" className="text-blue-500 hover:underline">
            ← Quay về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
