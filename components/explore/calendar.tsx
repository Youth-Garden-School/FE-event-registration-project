"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { UserCheck } from "lucide-react";
import { apiRequest } from "./api";
import { Toast } from "@/components/ui/toast";

// ----- Interfaces -----
interface Calendar {
  id: number;
  name: string;
  description?: string;
  avatarImage?: string;
  followStatus: string;
  location?: string;
  events?: EventProps[];
}

interface EventProps {
  id: number;
  title: string;
  startTime: string;
  location?: string;
  avatarImage?: string;
}

// ----- FollowButton -----
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

// ----- FollowCard -----
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
        description: isFollowing ? "Unfollowed calendar" : "Followed calendar",
      });
    } catch (_) {
      Toast({
        title: "Error",
        description: `Failed to ${isFollowing ? "unfollow" : "follow"} calendar`,
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
          src={calendar.avatarImage || "/images/events/vcs-mixer.jpg"}
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

// ----- CalendarList -----
const CalendarList = () => {
  const [calendars, setCalendars] = useState<Calendar[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCalendars = async () => {
    try {
      const data = await apiRequest<Calendar[]>("get", "/calendars");
      const accessToken = localStorage.getItem("ACCESS_TOKEN");

      const enrichedCalendars = await Promise.all(
        data.map(async (calendar) => {
          let events: EventProps[] = [];
          try {
            const eventResponse = await apiRequest<any>(
              "get",
              `/calendars/${calendar.id}/events`,
              accessToken,
            );
            events = eventResponse.result.map((event: any) => ({
              id: event.id,
              title: event.title,
              startTime: event.startTime,
              location: event.location,
              avatarImage: event.coverImage || "/images/events/vcs-mixer.jpg",
            }));
          } catch {
            // Silent fail: errors from event fetching are ignored //
          }
          return {
            ...calendar,
            description: calendar.description || "No description available",
            avatarImage: calendar.avatarImage || "/images/events/vcs-mixer.jpg",
            followStatus: calendar.followStatus || "Theo dõi",
            events,
          };
        }),
      );
      setCalendars(enrichedCalendars);
    } catch (_) {
      Toast({
        title: "Error",
        description: "Failed to fetch calendars",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalendars();
  }, []);

  if (loading) return <div>Đang tải...</div>;

  return (
    <section className="w-full py-6 ">
      <div className="container mx-auto px-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Lịch nổi bật</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {calendars.map((calendar) => (
            <FollowCard
              key={calendar.id}
              calendar={calendar}
              setCalendars={setCalendars}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CalendarList;
