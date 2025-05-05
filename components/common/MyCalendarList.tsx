"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { UserCheck } from "lucide-react";
import { apiRequest } from "@/components/explore/api";
import { Toast } from "@/components/ui/toast";


interface Calendar {
  id: number;
  name: string;
  description?: string;
  image?: string;
  followStatus: string; // "Theo dõi" or "Đã theo dõi"
  location?: string;
}

const MyCalendarList = () => {
  const [calendars, setCalendars] = useState<Calendar[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCalendars = async () => {
      try {
        const data = await apiRequest<Calendar[]>("get", "/calendars");
        setCalendars(
          data.map((item : Calendar) => ({
            id: item.id,
            name: item.name,
            description: item.description || "No description available  fweiof hweifh wieuf hwieuf wieuf hweiuf hweiuf hweiu f",
            image: item.image || "/images/events/vcs-mixer.jpg",
            followStatus: item.followStatus || "Theo dõi",
            location: item.location,
          })),
        );
        console.log(data)
      } catch (error) {
        Toast({
          title: "Error",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchCalendars();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-wrap justify-start items-start ">
        {calendars.map((calendar) => (
            
            <LendarList
                key={calendar.id}
                calendar={calendar}

            />

        ))}
    </div>
  );
};

const LendarList = ({calendar}: {calendar: Calendar}) => {
  
  return (
    <div className="p-1">
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-start max-w-xs">
            <Image
            src={calendar.image || "/images/events/vcs-mixer.jpg"}
            alt={calendar.name}
            width={100}
            height={100}
            className=" w-16 h-16 mb-4 rounded-md"
            />
            <h2 className="text-lg font-semibold">{calendar.name}</h2>
        
            <p className="text-gray-500">
                {calendar.description || "No description"}
            </p>
        </div>
    </div>
  );
};


export default MyCalendarList;
