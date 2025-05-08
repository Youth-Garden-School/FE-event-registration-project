"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

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
  return (
    <div className="p-1">
      <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-start max-w-xs">
        <Image
          src={calendar.image || "/images/events/vcs-mixer.jpg"}
          alt={calendar.name}
          width={100}
          height={100}
          className="w-16 h-16 mb-4 rounded-md"
        />
        <h2 className="text-lg font-semibold">{calendar.name}</h2>
        <p className="text-gray-500">
          {calendar.description || "No description available"}
        </p>
      </div>
    </div>
  );
};

export default MyCalendarList;
