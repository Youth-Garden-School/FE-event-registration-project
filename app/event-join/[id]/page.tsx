"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Video, ExternalLink, Share2, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  getEventById,
  getMyRegistration,
  registerEvent,
  cancelRegistration,
  EventDetail,
  Registration,
} from "@/lib/api-events";

export default function EventPage() {
  const { id: eventId } = useParams() as { id: string };
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([getEventById(eventId), getMyRegistration(eventId)])
      .then(([evt, reg]) => {
        setEvent(evt);
        setRegistration(reg);
        setIsRegistered(!!reg);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Không tải được dữ liệu sự kiện.");
      })
      .finally(() => setLoading(false));
  }, [eventId]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Đang tải dữ liệu…</p>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl text-red-600 mb-4">
          {error || "Không tìm thấy sự kiện."}
        </h1>
        <Link href="/" className="text-blue-500 hover:underline">
          ← Quay về trang chủ
        </Link>
      </div>
    );
  }

  const handleRegister = async () => {
    try {
      const reg = await registerEvent(event.id);
      setRegistration(reg);
      setIsRegistered(true);
    } catch (err) {
      console.error("Register failed:", err);
      alert("Đăng ký thất bại, thử lại sau.");
    }
  };

  const handleCancel = async () => {
    if (!registration) return;
    try {
      await cancelRegistration(registration.id);
      setRegistration(null);
      setIsRegistered(false);
    } catch (err) {
      console.error("Cancel failed:", err);
      alert("Hủy đăng ký thất bại, thử lại sau.");
    }
  };

  const handleRegistrationChange = (registered: boolean) => {
    registered ? handleRegister() : handleCancel();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-5 lg:col-span-4">
            <EventLeftColumn event={event} />
          </div>
          <div className="md:col-span-7 lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <EventHeader event={event} />
              <EventRegistration
                isRegistered={isRegistered}
                onRegisterChange={handleRegistrationChange}
              />
              <EventInformation event={event} />
              <EventLocation
                event={event}
                isRegistered={isRegistered}
                onRegister={handleRegister}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Event Left Column
interface EventLeftColumnProps {
  event: EventDetail;
}

function EventLeftColumn({ event }: EventLeftColumnProps) {
  const organizers =
    event.organizers ||
    (event.hosts
      ? event.hosts.map((name: string, id: number) => ({ id, name }))
      : []);
  const attendees = event.attendeesList || [];
  const attendeeCount = event.attendees || attendees.length || 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Cover Image */}
      <div className="relative rounded-xl overflow-hidden">
        <div className="absolute inset-0 filter blur-md opacity-30">
          <Image
            src={event.coverImage || "/placeholder.svg?height=400&width=400"}
            alt={`${event.title} cover shadow`}
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative">
          <Image
            src={event.coverImage || "/placeholder.svg?height=400&width=400"}
            alt={event.title}
            width={400}
            height={400}
            className="w-full aspect-square object-cover rounded-xl"
          />
        </div>
      </div>

      {/* Organizers */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="text-sm text-gray-500 mb-3">Được tổ chức bởi</div>
        <div className="flex flex-col gap-2.5">
          {organizers.slice(0, 2).map((org: any, idx: number) => (
            <Link
              key={idx}
              href="#"
              className="flex items-center gap-2 hover:text-blue-600"
            >
              <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
                <Image
                  src={
                    org.avatar ||
                    `/placeholder.svg?height=24&width=24&text=${org.name.charAt(0)}`
                  }
                  alt={org.name}
                  width={24}
                  height={24}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="font-medium truncate">{org.name}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Attendees */}
      {attendeeCount > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500 mb-3">
            {attendeeCount} người tham dự
          </div>
          <div className="flex -space-x-2 mb-2">
            {attendees.slice(0, 6).map((att: any, i: number) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full border-2 border-white overflow-hidden"
              >
                <Image
                  src={
                    att.avatar ||
                    `/placeholder.svg?height=24&width=24&text=${att.initial || att.name.charAt(0)}`
                  }
                  alt={att.name}
                  width={24}
                  height={24}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {attendeeCount > 6 && (
              <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                +{attendeeCount - 6}
              </div>
            )}
          </div>
          {attendees.length >= 2 && (
            <div className="text-sm text-gray-600">
              {attendees[0].name}, {attendees[1].name} và{" "}
              {attendeeCount - 2} người khác
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-2">
        <Button
          variant="link"
          className="justify-start text-gray-600 hover:text-gray-900 p-0 h-auto"
        >
          Liên hệ người tổ chức
        </Button>
        <Button
          variant="link"
          className="justify-start text-gray-600 hover:text-gray-900 p-0 h-auto"
        >
          Báo cáo sự kiện
        </Button>
      </div>
    </div>
  );
}

// Event Header
interface EventHeaderProps {
  event: EventDetail;
}

function EventHeader({ event }: EventHeaderProps) {
  const { title, startTime, endTime, location, city, isOnline } = event;
  const isOnlineEvent =
    isOnline ||
    location.toLowerCase().includes("online") ||
    location.toLowerCase().includes("zoom");
  const formatDate = (d: string) =>
    format(new Date(d), "EEEE, d 'tháng' M", { locale: vi });

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
      <div className="mb-6">
        <div className="flex items-start gap-3 mb-3">
          <div className="bg-gray-100 rounded-full p-2 mt-1">
            <Calendar className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <div className="font-medium">{formatDate(startTime)}</div>
            <div className="text-gray-600">{`${new Date(
              startTime
            ).toLocaleTimeString("vi-VN")} – ${new Date(
              endTime
            ).toLocaleTimeString("vi-VN")}`}</div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="bg-gray-100 rounded-full p-2 mt-1">
            {isOnlineEvent ? (
              <Video className="h-5 w-5 text-blue-600" />
            ) : (
              <MapPin className="h-5 w-5 text-gray-600" />
            )}
          </div>
          <div>
            <div className="font-medium">
              {isOnlineEvent ? "Sự kiện trực tuyến" : location}
            </div>
            <div className="text-gray-600">
              {isOnlineEvent ? "Tham gia qua Zoom" : city}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Event Information
interface EventInformationProps {
  event: EventDetail;
}

function EventInformation({ event }: EventInformationProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium text-lg">Thông tin sự kiện</h3>
        <button className="text-gray-500 hover:bg-gray-100 p-2 rounded-full">
          <Share2 className="h-5 w-5" />
        </button>
      </div>
      <div className="prose max-w-none text-gray-700">
        <p>{event.description}</p>
      </div>
    </div>
  );
}

// Event Location
interface EventLocationProps {
  event: EventDetail;
  isRegistered: boolean;
  onRegister: () => void;
}

function EventLocation({ event, isRegistered, onRegister }: EventLocationProps) {
  const isOnlineEvent = event.isOnline;
  const mapUrl = () =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      event.location + ", " + event.city
    )}`;
  const embedUrl = () =>
    `https://maps.google.com/maps?q=${encodeURIComponent(
      event.location + ", " + event.city
    )}&output=embed`;

  const copyZoom = () => {};

  return (
    <div className="mb-8">
      <h3 className="font-medium text-lg mb-3">Địa điểm</h3>
      {isOnlineEvent ? (
        <div className="space-y-4">
          {isRegistered ? (
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <ExternalLink className="h-5 w-5 text-blue-600" />
                <a
                  href={event.zoomLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Tham gia Zoom
                </a>
              </div>
              <Button variant="outline" onClick={copyZoom} className="mt-2">
                Sao chép link
              </Button>
            </div>
          ) : (
            <Button
              onClick={onRegister}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
            >
              Đăng ký tham gia
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <iframe
            src={embedUrl()}
            width="100%"
            height="200"
            className="rounded-lg border"
            allowFullScreen
            loading="lazy"
          />
          <div className="flex gap-2">
            <Button asChild variant="link" className="flex-1 justify-center">
              <a href={mapUrl()} target="_blank" rel="noopener noreferrer">
                <MapPin className="h-4 w-4 mr-1" /> Xem bản đồ
              </a>
            </Button>
            {isRegistered ? (
              <Button onClick={onRegister} variant="outline" className="flex-1">
                Hủy tham gia
              </Button>
            ) : (
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" onClick={onRegister}>
                Đăng ký tham gia
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Event Registration
interface EventRegistrationProps {
  isRegistered: boolean;
  onRegisterChange: (registered: boolean) => void;
}

function EventRegistration({ isRegistered, onRegisterChange }: EventRegistrationProps) {
  return (
    <div className="mb-8">
      {isRegistered ? (
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-green-600" />
          <ChevronRight className="h-5 w-5 text-green-600" />
          <span className="font-medium text-green-600">Bạn đã đăng ký</span>
        </div>
      ) : (
        <Button
          onClick={() => onRegisterChange(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          Đăng ký ngay
        </Button>
      )}
    </div>
  );
}
