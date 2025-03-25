"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useCallback } from "react";
import { UserCheck } from "lucide-react";

interface Calendar {
  id: number;
  title: string;
  description: string;
  image: string;
  followStatus: string;
  location?: string;
}

// Dữ liệu tĩnh (có thể thay bằng API call)
const calendars: Calendar[] = [
  {
    id: 1,
    title: "Reading Rhythms GLOBAL",
    description:
      "Not a book club. A reading party. Read with friends to live music ...",
    image: "/images/events/vcs-mixer.jpg",
    followStatus: "Theo dõi",
  },
  {
    id: 2,
    title: "ADPList",
    description:
      "Your one-stop-shop for all things happening in the ADPList...",
    image: "/images/events/vcs-mixer.jpg",
    followStatus: "Theo dõi",
  },
  {
    id: 3,
    title: "Build Club",
    description:
      "Sydney - The best place in the world to learn AI. Curated with...",
    image: "/images/events/vcs-mixer.jpg",
    followStatus: "Theo dõi",
    location: "Sydney",
  },
  {
    id: 4,
    title: "Her Workplace",
    description:
      "The career network for the next generation of women and non-...",
    image: "/images/events/vcs-mixer.jpg",
    followStatus: "Theo dõi",
  },
  {
    id: 5,
    title: "Design Buddies",
    description:
      "Events for designers and all creatives across SF, online, and...",
    image: "/images/events/vcs-mixer.jpg",
    followStatus: "Theo dõi",
  },
  {
    id: 6,
    title: "South Park Commons",
    description:
      "South Park Commons helps you get from -1 to 0. To learn more ...",
    image: "/images/events/vcs-mixer.jpg",
    followStatus: "Đã theo dõi",
  },
  {
    id: 7,
    title: "The GenAI Collective",
    description:
      "The US's largest AI community: 25,000+ founders, researchers,...",
    image: "/images/events/vcs-mixer.jpg",
    followStatus: "Đã theo dõi",
  },
  {
    id: 8,
    title: "Generative AI San Francisco and Bay Area",
    description: "GenerativeAISF.com In-person ...",
    image: "/images/events/vcs-mixer.jpg",
    followStatus: "Đã theo dõi",
    location: "San Francisco",
  },
];

const CalendarList = () => (
  <div className="container mx-auto py-10 max-w-[930px]">
    <h1 className="text-2xl font-semibold mb-6">Lịch nổi bật</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {calendars.map((calendar) => (
        <FollowCard key={calendar.id} calendar={calendar} />
      ))}
    </div>
  </div>
);

const FollowCard = ({ calendar }: { calendar: Calendar }) => {
  const [isFollowing, setIsFollowing] = useState(
    calendar.followStatus === "Đã theo dõi",
  );

  const toggleFollow = useCallback(() => {
    setIsFollowing((prev) => !prev);
  }, []);

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow cursor-pointer relative group w-[250px] h-[160px] overflow-hidden p-3 flex flex-col justify-between">
      {/* Nút Theo dõi */}
      <div className="absolute top-[-25px] right-2">
        <FollowButton isFollowing={isFollowing} toggleFollow={toggleFollow} />
      </div>

      {/* Hình ảnh và Tiêu đề */}
      <div className="items-center">
        <Image
          src={calendar.image}
          alt={calendar.title}
          width={50}
          height={50}
          className="rounded-md"
        />
        <h3 className="text-base font-medium truncate py-3">
          {calendar.title}
        </h3>
        {calendar.location && (
          <p className="text-xs text-gray-500 ">🌍 {calendar.location}</p>
        )}
        <p className="text-gray-600 text-sm truncate">{calendar.description}</p>
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
      className="text-gray-500 cursor-pointer absolute top-10 right-2"
      onClick={toggleFollow}
    />
  ) : (
    <Button
      className="w-[80px] h-[32px] rounded-full text-sm flex items-center gap-2 absolute top-10 right-2 cursor-pointer"
      onClick={toggleFollow}
    >
      Theo dõi
    </Button>
  );
};

export default CalendarList;
