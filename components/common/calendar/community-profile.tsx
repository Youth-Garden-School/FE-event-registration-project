// community-profile.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getCalendarById, Calendar } from "@/lib/api-calendar";

interface CommunityProfileProps {
  calendarId?: string;
}

export function CommunityProfile({ calendarId }: CommunityProfileProps) {
  const [data, setData] = useState<Calendar | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (!calendarId) return;
    setLoading(true);
    setError(null);

    getCalendarById(calendarId)
      .then((cal) => setData(cal))
      .catch((err) => setError(err.message || "Lỗi khi tải dữ liệu"))
      .finally(() => setLoading(false));
  }, [calendarId]);

  if (loading) {
    return <div className="py-8 text-center">Đang tải thông tin lịch…</div>;
  }
  if (error) {
    return (
      <div className="py-8 text-center text-red-500">
        {`Lỗi: ${error}`}
      </div>
    );
  }

  // Fallback nếu chưa có data
  const name = data?.name ?? "—";
  const description = data?.description ?? "";
  const coverImage = data?.coverImage ?? "/placeholder.svg?height=400&width=1400";
  const avatarImage =
    data?.avatarImage ?? "/placeholder.svg?height=96&width=96";

  return (
    <div className="relative w-full max-w-6xl mx-auto bg-white">
      {/* Cover */}
      <div
        className="relative w-full rounded-2xl overflow-hidden"
        style={{ paddingBottom: "28.6%" }}
      >
        <Image
          src={coverImage}
          alt={`Cover cho ${name}`}
          fill
          priority
          sizes="(max-width: 450px) 450px, (max-width: 650px) 650px, (max-width: 820px) 820px, (max-width: 1000px) 1000px, 1250px"
          className="object-cover"
        />
      </div>

      {/* Logo & Follow */}
      <div className="relative p-4 md:px-6 flex justify-between items-end -mt-12 md:-mt-16">
        <Link
          href={calendarId ? `/featured-calendar/${calendarId}` : "/featured-calendar"}
        >
          <div className="w-16 h-16 md:w-24 md:h-24 rounded-lg overflow-hidden border-4 border-white bg-white">
            <Image
              src={avatarImage}
              alt={`${name} Logo`}
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
        <Button
          className={
            isFollowing
              ? "bg-red-500 hover:bg-red-600"
              : "bg-[#0071e3] hover:bg-[#0071e3]/90"
          }
          onClick={() => setIsFollowing((f) => !f)}
        >
          {isFollowing ? "Bỏ theo dõi" : "Theo dõi"}
        </Button>
      </div>

      {/* Nội dung */}
      <div className="px-4 md:px-6 py-4 md:py-6">
        <Link
          href={calendarId ? `/featured-calendar/${calendarId}` : "/featured-calendar"}
        >
          <h1 className="text-2xl md:text-3xl font-bold">{name}</h1>
        </Link>

        <div className="text-gray-600 mt-2">
          <p>{description}</p>
        </div>
      </div>

      <Separator className="mt-2" />
    </div>
  );
}
