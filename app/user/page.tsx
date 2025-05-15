"use client";
import Image from "next/image";
import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { apiClient, API_BASE_URL } from "@/components/common/apiClient";

interface Event {
  id: string;
  title: string;
  organizer: string;
  startTime: string;
  coverImage: string;
}

interface ProfileData {
  username: string;
  bio: string;
  createdAt: string;
  email: string;
  avatarUrl: string;
}

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData>({
    username: "",
    bio: "",
    createdAt: "",
    email: "",
    avatarUrl: "/placeholder.svg?height=200&width=200",
  });
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const ACCESS_TOKEN =
    typeof window !== "undefined"
      ? localStorage.getItem("ACCESS_TOKEN") || ""
      : "";

  const formatDate = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleDateString("vi-VN");
  };

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "numeric",
    };
    return date.toLocaleString("vi-VN", options);
  };

  const fetchProfile = async () => {
    try {
      const data = await apiClient.get<{ result: any }>(
        `${API_BASE_URL}/users/me`,
        ACCESS_TOKEN,
      );
      setProfileData({
        username: data.result.username,
        bio: data.result.bio || "Tháng 3 năm 2025",
        createdAt: data.result.createdAt || "",
        email: data.result.email || "",
        avatarUrl:
          data.result.avatarUrl || "/placeholder.svg?height=200&width=200",
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const data = await apiClient.get<{ result: any[] }>(
        `${API_BASE_URL}/events`,
        ACCESS_TOKEN,
      );

      const now = new Date();

      const past = (data.result || []).filter((event) => {
        return new Date(event.startTime) < now;
      });

      const events: Event[] = past.map((event) => ({
        id: event.id,
        title: event.title,
        organizer: event.organizer || "Đoàn Vĩnh Khang",
        startTime: formatDateTime(event.startTime),
        coverImage: event.coverImage || "/placeholder.svg?height=100&width=100",
      }));

      setPastEvents(events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchProfile(), fetchEvents()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="  flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <div className="w-16 h-16 border-4 border-t-gray-600 border-b-gray-600 border-l-gray-200 border-r-gray-200 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">
            Đang tải cài đặt sự kiện ...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row items-start gap-6">
        <Avatar className="w-24 h-24 md:w-32 md:h-32 bg-blue-300">
          <AvatarImage src={profileData.avatarUrl} alt={profileData.username} />
          <AvatarFallback className="text-2xl">
            {profileData.username.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-3">
          <h1 className="text-3xl font-bold">{profileData.username}</h1>
          <div className="flex items-center text-muted-foreground">
            <User className="h-4 w-4 mr-2" />
            <span>Tiểu sử: {profileData.bio}</span>
          </div>
          <div className="gap-4">
            <div>
              <span className="text-muted-foreground">
                Ngày tạo tài khoản:{" "}
              </span>{" "}
              <span className="text-muted-foreground">
                {profileData.createdAt
                  ? formatDate(profileData.createdAt)
                  : "N/A"}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Email: </span>{" "}
              <span className="text-muted-foreground">
                {profileData.email || "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      <div>
        <h2 className="text-2xl font-semibold mb-6">Sự kiện đã qua</h2>

        <div className="space-y-6">
          {pastEvents.length > 0 ? (
            pastEvents.map((event) => (
              <div key={event.id} className="flex gap-4">
                <div className="shrink-0">
                  <Image
                    src={event.coverImage}
                    alt={event.title}
                    width={100}
                    height={100}
                    className="rounded-md object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-medium">{event.title}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Avatar className="h-5 w-5 mr-1 bg-blue-300">
                      <AvatarFallback>
                        {event.organizer.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span>Bởi {event.organizer}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {event.startTime}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">
              Không có sự kiện nào đã qua.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
