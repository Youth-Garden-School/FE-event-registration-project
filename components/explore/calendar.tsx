"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { UserCheck } from "lucide-react";
import { apiRequest } from "./api";
import { Toast } from "@/components/ui/toast";

interface Calendar {
  id: number;
  name: string;
  description?: string;
  image?: string;
  followStatus: string; // "Theo dõi" or "Đã theo dõi"
  location?: string;
}

const CalendarList = () => {
  const [calendars, setCalendars] = useState<Calendar[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCalendars = async () => {
      try {
        const data = await apiRequest<Calendar[]>("get", "/calendars");
        setCalendars(
          data.map((item) => ({
            id: item.id,
            name: item.name,
            description: item.description || "No description available",
            image: item.image || "/images/events/vcs-mixer.jpg",
            followStatus: item.followStatus || "Theo dõi",
            location: item.location,
          })),
        );
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
    <div className="container mx-auto py-10 max-w-[930px]">
      <h1 className="text-2xl font-semibold mb-6">Lịch nổi bật</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {calendars.map((calendar) => (
          <FollowCard
            key={calendar.id}
            calendar={calendar}
            setCalendars={setCalendars}
          />
        ))}
      </div>
    </div>
  );
};

const FollowCard = ({
  calendar,
  setCalendars,
}: {
  calendar: Calendar;
  setCalendars: React.Dispatch<React.SetStateAction<Calendar[]>>;
}) => {
  const [isFollowing, setIsFollowing] = useState(
    calendar.followStatus === "Đã theo dõi",
  );

  const toggleFollow = useCallback(async () => {
    try {
      const endpoint = isFollowing
        ? `/calendars/${calendar.id}/unfollow`
        : `/calendars/${calendar.id}/follow`;
      await apiRequest("post", endpoint);
      setIsFollowing(!isFollowing);
      setCalendars((prev) =>
        prev.map((c) =>
          c.id === calendar.id
            ? { ...c, followStatus: isFollowing ? "Theo dõi" : "Đã theo dõi" }
            : c,
        ),
      );
      Toast({
        title: "Success",
      });
    } catch (error) {
      Toast({
        title: "Error",
        variant: "destructive",
      });
    }
  }, [isFollowing, calendar.id, setCalendars]);

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow cursor-pointer relative group w-[250px] h-[160px] overflow-hidden p-3 flex flex-col justify-between">
      <div className="absolute top-2 right-2">
        <FollowButton isFollowing={isFollowing} toggleFollow={toggleFollow} />
      </div>
      <div className="items-center">
        <Image
          src={calendar.image || "/images/events/vcs-mixer.jpg"}
          alt={calendar.name}
          width={50}
          height={50}
          className="rounded-md"
        />
        <h3 className="text-base font-medium truncate py-3">{calendar.name}</h3>
        {calendar.location && (
          <p className="text-xs text-gray-500">🌍 {calendar.location}</p>
        )}
        <p className="text-gray-600 text-sm truncate">
          {calendar.description || "No description"}
        </p>
      </div>
    </Card>
  );
};

const FollowButton = ({
  isFollowing,
  toggleFollow,
}: {
  isFollowing: boolean;
  toggleFollow: () => void;
}) => {
  return isFollowing ? (
    <UserCheck
      size={20}
      className="text-gray-500 cursor-pointer"
      onClick={toggleFollow}
    />
  ) : (
    <Button
      className="w-[80px] h-[32px] rounded-full text-sm flex items-center gap-2 cursor-pointer"
      onClick={toggleFollow}
    >
      Theo dõi
    </Button>
  );
};

export default CalendarList;
