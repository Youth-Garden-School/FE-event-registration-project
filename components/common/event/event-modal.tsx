"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  ExternalLink,
  LinkIcon,
  MapPin,
  Share2,
  Users,
  Video,
} from "lucide-react";
import { registerEvent, cancelRegistration } from "@/lib/api-event";
import type { EventWithUI } from "@/style/events-stype";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCancel?: (removed: EventWithUI) => void;
  event: EventWithUI;
}

export function EventModal({
  isOpen,
  onClose,
  onCancel,
  event,
}: EventModalProps) {
  const router = useRouter();
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [loadingCancel, setLoadingCancel] = useState(false);

  // Kiểm tra xem người dùng có quyền quản lý sự kiện không
  const canManageEvent =
    event.isUserEvent || event.createdBy === "current-user-id";

  if (!isOpen || !event) return null;

  // Xác định trạng thái đăng ký từ props
  const isRegistered = Boolean(event.myRegistrationId);

  // Format ngày tháng tiếng Việt
  const formatDate = (date: Date) => {
    const dayOfWeek = format(date, "EEEE", { locale: vi });
    const dayOfMonth = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${dayOfWeek}, ${dayOfMonth} tháng ${month} năm ${year}`;
  };

  // Bỏ chức năng đăng ký online
  const isOnlineEvent = false;

  // Xác định ảnh banner
  const eventImage =
    event.posterImage ||
    event.coverImage ||
    event.image ||
    "/placeholder.svg?height=400&width=400";

  // Xử lý đăng ký sự kiện
  const handleRegister = async () => {
    setLoadingRegister(true);
    try {
      await registerEvent(event.id);
      router.refresh();
      onClose();
    } catch (e: any) {
      alert("Đăng ký thất bại: " + e.message);
    } finally {
      setLoadingRegister(false);
    }
  };

  // Xử lý hủy đăng ký
  const handleCancelRegistration = async () => {
    if (!event.myRegistrationId) return;
    setLoadingCancel(true);
    try {
      await cancelRegistration(event.myRegistrationId);
      onCancel?.(event);
      router.refresh();
      onClose();
    } catch (e: any) {
      alert("Hủy không thành công: " + e.message);
    } finally {
      setLoadingCancel(false);
    }
  };

  // Helper để sao chép liên kết
  const handleCopyLink = (url: string, msg = "Đã sao chép liên kết!") => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert(msg);
      })
      .catch(() => {});
  };

  const eventUrl = `${window.location.origin}/event-join/${event.id}`;
  const mapsQuery = encodeURIComponent(
    event.fullAddress ?? `${event.location}, ${event.city}`,
  );
  const mapsEmbed = `https://maps.google.com/maps?q=${mapsQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

  // Lấy tất cả người tham dự
  const attendees = event.attendees || [];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 overflow-hidden"
          onClick={onClose}
        >
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm flex justify-between items-center p-3 border-b shadow-sm">
              <button
                onClick={onClose}
                className="rounded-full p-1 hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                >
                  <path d="m13 17 5-5-5-5M6 17l5-5-5-5"></path>
                </svg>
              </button>

              <div className="flex items-center gap-2 flex-1 justify-between">
                <div className="flex items-center w-full">
                  <button
                    className="btn flex items-center text-sm bg-gray-100 hover:bg-gray-200 rounded-md px-2 py-1 mr-2"
                    onClick={() => handleCopyLink(eventUrl)}
                  >
                    <LinkIcon className="h-4 w-4 mr-1" />
                    <span>Sao chép liên kết</span>
                  </button>

                  <button
                    onClick={() => {
                      router.push(`/event-join/${event.id}`);
                      onClose();
                    }}
                    className="btn flex items-center text-sm bg-gray-100 hover:bg-gray-200 rounded-md px-2 py-1"
                  >
                    <span>Trang sự kiện</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      className="h-4 w-4 ml-1"
                    >
                      <path d="M7 17 17 7M7 7h10v10"></path>
                    </svg>
                  </button>

                  <div className="flex-1"></div>
                </div>

                <div className="flex items-center gap-1">
                  <button disabled className="rounded-md bg-gray-100 p-1">
                    <ChevronUp className="h-4 w-4 text-gray-400" />
                  </button>
                  <button className="rounded-md bg-gray-100 hover:bg-gray-200 p-1">
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Thêm thông báo quản lý sự kiện nếu người dùng có quyền */}
            {canManageEvent && (
              <div className="bg-gray-100 p-3 flex justify-between items-center">
                <div className="text-gray-800">
                  Bạn có quyền quản lý sự kiện này.
                </div>
                <Button
                  onClick={() => {
                    router.push(`/events/${event.id}/manage`);
                    onClose();
                  }}
                  className="bg-gray-800 hover:bg-gray-900 text-white"
                >
                  Quản lý <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            )}

            {/* Event Banner */}
            <div className="p-4">
              <div className="rounded-xl overflow-hidden">
                <Image
                  src={eventImage || "/placeholder.svg"}
                  alt={event.title}
                  width={400}
                  height={400}
                  className="w-full object-cover"
                />
              </div>
            </div>

            {/* Event Title */}
            <div className="px-5">
              <h1 className="text-2xl font-bold text-gray-900">
                {event.title}
              </h1>
              {event.featured && (
                <div className="bg-red-100 text-red-700 border-red-200 text-xs mt-2 inline-block px-2.5 py-0.5 rounded-full border">
                  Nổi bật trong {event.featuredLocation || "TP. Hồ Chí Minh"}
                </div>
              )}

              {/* Organizers */}
              {event.organizers && event.organizers.length > 0 ? (
                <div className="flex items-center gap-1 mt-3 text-sm text-gray-600">
                  <div className="flex -space-x-2 mr-2">
                    {event.organizers.slice(0, 2).map((organizer: any) => (
                      <div
                        key={organizer.id}
                        className="w-6 h-6 rounded-full border-2 border-white overflow-hidden"
                      >
                        {organizer.avatar ? (
                          <Image
                            src={organizer.avatar || "/placeholder.svg"}
                            alt={organizer.name}
                            width={24}
                            height={24}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs">
                            {organizer.name.charAt(0)}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <span>
                    Được tổ chức bởi{" "}
                    {event.organizers.map((org: any) => org.name).join(" & ")}
                  </span>
                </div>
              ) : event.hosts && event.hosts.length > 0 ? (
                <div className="flex items-center gap-1 mt-3 text-sm text-gray-600">
                  <span>Được tổ chức bởi</span>
                  <div className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-purple-200 flex items-center justify-center text-xs overflow-hidden mr-1">
                      {event.hosts[0].charAt(0)}
                    </div>
                    <span className="font-medium">{event.hosts[0]}</span>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Event Date and Time */}
            <div className="px-5 py-3 flex flex-col gap-3 border-t border-gray-100 mt-4">
              <div className="flex items-start gap-3">
                <div className="bg-gray-100 rounded-full p-2 mt-1">
                  <Calendar className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <div className="font-medium">
                    {formatDate(new Date(event.startTime))}
                  </div>
                  <div className="text-gray-600">
                    {event.displayTime ||
                      format(new Date(event.startTime), "HH:mm", {
                        locale: vi,
                      })}
                  </div>
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
                    {isOnlineEvent ? "Sự kiện trực tuyến" : event.location}
                  </div>
                  <div className="text-gray-600">
                    {isOnlineEvent ? "Tham gia qua Zoom" : event.city}
                  </div>
                </div>
              </div>
            </div>

            {/* Registration Section */}
            <div className="p-5 border-t border-gray-100">
              {!isRegistered ? (
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <h3 className="font-medium text-lg mb-4">Đăng kí</h3>
                  <p className="text-gray-600 mb-4">
                    Chào mừng! Để tham gia sự kiện, vui lòng đăng kí bên dưới.
                  </p>

                  {/* Đã loại bỏ thông tin người dùng theo yêu cầu */}

                  <Button
                    onClick={handleRegister}
                    disabled={loadingRegister}
                    className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-lg"
                  >
                    {loadingRegister ? "Đang xử lý..." : "Đăng kí một chạm"}
                  </Button>
                </div>
              ) : (
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                      <span className="text-pink-500">😊</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">Bạn đã có chỗ</h3>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4 mb-4">
                    <Button variant="outline" className="flex-1 gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Thêm vào lịch</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-10 h-10 p-0 flex items-center justify-center"
                    >
                      <span className="text-lg">🇻🇳</span>
                    </Button>
                  </div>

                  <p className="text-gray-600 text-sm mt-2">
                    Không thể tham dự? Hãy thông báo cho người tổ chức bằng cách{" "}
                    <button
                      onClick={handleCancelRegistration}
                      disabled={loadingCancel}
                      className="text-pink-500 font-medium hover:underline"
                    >
                      {loadingCancel ? "đang hủy..." : "hủy đăng kí của bạn"}
                    </button>
                    .
                  </p>

                  <div className="mt-6 border-t border-gray-100 pt-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">
                        Chuẩn bị sẵn sàng cho sự kiện
                      </h4>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-sm">
                      Hoàn thành trang cá nhân · Nhắc nhở: Email
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Event Description */}
            <div className="p-5 border-t border-gray-100">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-lg">Thông tin sự kiện</h3>
                <button className="text-gray-500 hover:bg-gray-100 p-2 rounded-full">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
              <div className="text-gray-700">
                <p>{event.description}</p>
              </div>
            </div>

            {/* Location Section */}
            {/* Chỉ hiển thị địa điểm vật lý, đã bỏ chức năng đăng ký online */}
            <div className="p-5 border-t border-gray-100">
              <h3 className="font-medium text-lg mb-3">Địa điểm</h3>
              <div>
                <div className="mb-3">
                  <div className="font-medium">{event.location}</div>
                </div>

                <div className="relative w-full rounded-lg overflow-hidden border border-gray-200">
                  <div className="h-[200px]">
                    <iframe
                      src={mapsEmbed}
                      className="absolute top-0 left-0 w-full h-full border-0"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Bản đồ địa điểm: ${event.location}`}
                    />
                  </div>

                  <div className="p-3 bg-white">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 p-0 h-auto hover:bg-transparent hover:underline flex items-center"
                      onClick={() => window.open(mapsLink, "_blank")}
                    >
                      <span>Xem bản đồ lớn hơn</span>
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Attendees Section - Hiển thị tất cả người tham dự */}
            {attendees.length > 0 && (
              <div className="p-5 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-gray-600" />
                  <span className="font-medium">
                    {attendees.length} người tham dự
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {attendees.slice(0, 8).map((attendee, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-xs overflow-hidden"
                    >
                      <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-700 font-medium">
                        {attendee.user?.email?.charAt(0).toUpperCase() || "?"}
                      </div>
                    </div>
                  ))}
                  {attendees.length > 8 && (
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                      +{attendees.length - 8}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="p-5 border-t border-gray-100 flex justify-between text-sm text-gray-500">
              <button className="hover:text-gray-700">
                Liên hệ người tổ chức
              </button>
              <button className="hover:text-gray-700">Báo cáo sự kiện</button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
