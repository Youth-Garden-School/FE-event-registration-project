"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // ✅ Import useRouter

import { apiRequest } from "@/components/explore/api";

interface Calendar {
  id: number;
  name: string;
  description?: string;
  image?: string;
  followStatus: string;
  location?: string;
}

interface MyCalendarListProps {
  onLoad: (count: number) => void;
}

const MyCalendarList = ({ onLoad }: MyCalendarListProps) => {
  const [calendars, setCalendars] = useState<Calendar[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCalendars = async () => {
      try {
        const data = await apiRequest<Calendar[]>("get", "/calendars");
        setCalendars(data);
        onLoad(data.length); // ✅ gửi số lượng lịch lên component cha
      } catch (error) {
        onLoad(0); // Gửi 0 nếu lỗi xảy ra
      } finally {
        setLoading(false);
      }
    };

    fetchCalendars();
  }, [onLoad]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-wrap justify-start items-start">
      {calendars.map((calendar) => (
        <LendarList key={calendar.id} calendar={calendar} />
      ))}
    </div>
  );
};

const LendarList = ({ calendar }: { calendar: Calendar }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/add-event?id=${calendar.id}`); // ✅ Điều hướng đến add-event với ID
  };

  return (
    <div
      onClick={handleClick}
      className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 cursor-pointer"
    >
      <div className="bg-white shadow-md rounded-xl p-4 h-full flex flex-col justify-between hover:shadow-lg transition-shadow">
        <div>
          <Image
            src={calendar.image || "/images/events/vcs-mixer.jpg"}
            alt={calendar.name}
            width={64}
            height={64}
            className="w-16 h-16 mb-3 rounded-md object-cover"
          />
          <h2 className="text-base font-semibold mb-1 line-clamp-1">
            {calendar.name}
          </h2>
        </div>
        <p className="text-gray-500 text-sm line-clamp-3 min-h-[3.75rem]">
          {calendar.description || "No description available"}
        </p>
      </div>
    </div>
  );
};

export default MyCalendarList;
