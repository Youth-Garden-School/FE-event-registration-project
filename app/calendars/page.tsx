"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import CardSlider from "@/components/common/cardslider";
import MyCalendarList from "@/components/common/MyCalendarList";
import FollowedCalendars from "@/components/common/FollowedCalendars";
import { Button } from "@/components/ui/button";

const Calendars = () => {
  const router = useRouter();
  const [calendarCount, setCalendarCount] = useState<number | null>(null); // null = chưa load

  const handleCreate = () => {
    router.push("/create-calendar");
  };

  const handleCalendarLoad = (count: number) => {
    setCalendarCount(count);
  };

  const cards = [
    {
      title: "Tạo lịch của bạn",
      description: "Hãy bắt đầu tạo sự kiện riêng của bạn.",
      imageUrl: "/images/placeholder/calendar.jpg",
    },
    {
      title: "Chia sẻ với bạn bè",
      description: "Mời bạn bè tham gia lịch sự kiện.",
      imageUrl: "/images/placeholder/friends.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center space-y-8">
      {/* 👉 CardSlider chỉ hiện nếu chưa có lịch */}
      {calendarCount === 0 && (
        <div className="w-full max-w-2xl">
          <h1 className="text-xl font-bold mb-10">Lịch</h1>
          <CardSlider cards={cards} />
          <div className="flex justify-end mt-4">
            <Button
              onClick={handleCreate}
              className="bg-gray-300 text-black px-4 py-2 rounded-lg shadow-md hover:bg-gray-400"
            >
              + Tạo
            </Button>
          </div>
        </div>
      )}

      {/* Danh sách lịch của tôi */}
      <div className="w-full max-w-2xl">
        <h1 className="text-xl font-bold mb-2">Lịch của tôi</h1>
        <MyCalendarList onLoad={handleCalendarLoad} />
      </div>

      {/* Lịch đã theo dõi */}
      <FollowedCalendars />
    </div>
  );
};

export default Calendars;
