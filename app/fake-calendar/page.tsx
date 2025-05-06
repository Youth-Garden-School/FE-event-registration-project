"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { calendarData } from "@/data/data-mock";

export default function Home() {
  const router = useRouter();
  const calendarId = calendarData.id; // Lấy ID lịch từ dữ liệu mẫu

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-lg">
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4 overflow-hidden">
            <Image
              src="/placeholder.svg?height=96&width=96"
              alt="Design Buddies"
              width={96}
              height={96}
              className="object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Design Buddies
          </h1>
          <p className="text-gray-600 text-center">
            Cộng đồng thiết kế lớn nhất thế giới với các sự kiện trực tuyến và
            trực tiếp
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => router.push(`/featured-calendar/${calendarId}`)}
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 h-auto text-lg"
          >
            Lịch Sự Kiện Nổi Bật
          </Button>

          <Button
            onClick={() => router.push(`/setting-event/${calendarId}`)}
            className="w-full bg-gray-800 hover:bg-gray-900 py-3 h-auto text-lg"
          >
            Quản Lý Sự Kiện
          </Button>
        </div>
      </div>
    </div>
  );
}
