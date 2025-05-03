"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // For redirecting to login page
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import Link from "next/link";
import { apiClient, API_BASE_URL } from "@/components/common/apiClient"; // Import apiClient and base URL
import { toast } from "react-toastify";

// Schema validation with Zod aligned with API response
const eventSchema = z.object({
  id: z.string(),
  title: z.string(), // API uses "title" instead of "name"
  startTime: z.string(), // API uses ISO date string
  location: z.string(),
  coverImage: z.string().url().optional(), // Optional as it may not always be present
});

// Props validation
type EventProps = z.infer<typeof eventSchema>;

const EventList: React.FC = () => {
  const [events, setEvents] = useState<EventProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // For redirecting to login page

  useEffect(() => {
    const fetchEvents = async () => {
      // Get access token from localStorage
      const accessToken = localStorage.getItem("access_token");

      if (!accessToken) {
        // Redirect to login page if not authenticated
        toast.error("Vui lòng đăng nhập để xem sự kiện");
        router.push("/login");
        return;
      }

      try {
        // Use apiClient to fetch events
        const data = await apiClient.get<{ result: any[] }>(
          `${API_BASE_URL}/events`,
          accessToken,
        );

        // Parse and validate the API response
        const parsedEvents = data.result.map((event) =>
          eventSchema.parse({
            id: event.id,
            title: event.title,
            startTime: event.startTime,
            location: event.location,
            coverImage: event.coverImage || "/images/events/vcs-mixer.jpg", // Fallback image
          }),
        );

        setEvents(parsedEvents);
      } catch (err: any) {
        if (err.message.includes("401") || err.message.includes("403")) {
          // Handle unauthorized or forbidden errors
          toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("user_id");
          router.push("/login");
        } else {
          setError(err.message || "Đã xảy ra lỗi khi tải sự kiện");
          toast.error(err.message || "Đã xảy ra lỗi khi tải sự kiện");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [router]);

  // Format date and time for display
  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    const formattedDate = date.toLocaleDateString("vi-VN", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
    const formattedTime = date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return { date: formattedDate, time: formattedTime };
  };

  if (loading) {
    return <div>Đang tải sự kiện...</div>;
  }

  if (error) {
    return <div>Lỗi: {error}</div>;
  }

  return (
    <section className="w-full py-6">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900">Khám phá sự kiện</h2>
        <p className="text-gray-600 mt-2">
          Khám phá các sự kiện phổ biến gần bạn, duyệt theo danh mục, hoặc xem
          qua một số lịch cộng đồng tuyệt vời.
        </p>
        <div className="flex">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mt-6">
              Sự kiện phổ biến
            </h3>
            <p className="text-gray-500">TP. Hồ Chí Minh</p>
          </div>
          <div className="mt-6 relative">
            <Button className="w-[115px] absolute left-[580px] cursor-pointer hover:bg-gray-300 hover:text-bl">
              <Link href="/">Xem tất cả →</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {events.map((event) => {
            const { date, time } = formatDateTime(event.startTime);
            return (
              <div key={event.id} className="flex space-x-4 cursor-pointer">
                <div className="w-24 h-24 relative">
                  <Image
                    src={event.coverImage}
                    alt={event.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {event.title}
                  </h4>
                  <p className="text-gray-600 text-sm py-2">
                    {time} {date}
                  </p>
                  <p className="text-gray-500 text-sm">{event.location}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EventList;
