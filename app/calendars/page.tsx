"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CardSlider from "@/components/common/cardslider";
import MyCalendarList from "@/components/common/MyCalendarList";
import FollowedCalendars from "@/components/common/FollowedCalendars";

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
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center space-y-10">
      {/* 👉 CardSlider chỉ hiện nếu chưa có lịch */}
      {calendarCount === 0 && (
        <div className="w-full max-w-2xl space-y-4">
          <h1 className="text-2xl font-bold">Lịch</h1>
          <CardSlider cards={cards} />
          <div className="flex justify-end">
            <Button onClick={handleCreate} variant="outline">
              + Tạo lịch
            </Button>
          </div>
          <Separator />
        </div>
      )}

      {/* Danh sách lịch của tôi + Nút tạo lịch */}
      <div className="w-full max-w-2xl space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Lịch của tôi</h2>
          <Button onClick={handleCreate}>Tạo lịch</Button>
        </div>
        <MyCalendarList onLoad={handleCalendarLoad} />
        <Separator />
      </div>

      {/* Lịch đã theo dõi */}
      <div className="w-full max-w-2xl">
        <FollowedCalendars />
      </div>
    </div>
  );
};

export default Calendars;
