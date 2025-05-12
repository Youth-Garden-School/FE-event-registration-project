"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Settings, Ticket, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface NavItemProps {
  href: string;
  label: string;
  isActive: boolean;
  icon?: React.ReactNode;
}

const NavItem = ({ href, label, isActive, icon }: NavItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "border-b-2 border-current"
          : "text-inherit hover:text-opacity-80",
      )}
    >
      {icon}
      {label}
    </Link>
  );
};

export default function Header() {
  const [currentTime, setCurrentTime] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const pathname = usePathname();

  const isMainPage = pathname === "/";
  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    setIsAuthenticated(!!token);

    if (token) {
      fetch(
        "https://be-event-registration-project-jpv3.onrender.com/api/users/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          setAvatarUrl(data?.result?.avatarUrl || null);
        })
        .catch((err) => {
          console.error("Failed to fetch user avatar:", err);
        });
    }
  }, []);

  // Time updater
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Bangkok",
        hour12: false,
      });
      setCurrentTime(`${timeString} GMT+7`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_id");
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b px-4 transition-colors duration-300",
        isMainPage ? "bg-black text-white" : "bg-white text-black",
      )}
    >
      <div className="container mx-auto flex h-14 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-2 transition-colors",
              isMainPage ? "text-white" : "text-black",
            )}
          >
            <Image
              src="/images/logo.svg"
              alt="Logo"
              width={50}
              height={50}
              className="rounded-md"
            />
            <span className="font-semibold">Regista</span>
          </Link>
        </div>

        {/* Right Section */}
        {isAuthenticated ? (
          <>
            <nav className="flex items-center space-x-1">
              <NavItem
                href="/event"
                label="Sự kiện"
                icon={<Ticket className="h-4 w-4" />}
                isActive={pathname === "/event"}
              />
              <NavItem
                href="/calendars"
                label="Lịch"
                icon={<Calendar className="h-4 w-4" />}
                isActive={pathname === "/calendars"}
              />
              <NavItem
                href="/explore"
                label="Khám phá"
                icon={<Compass className="h-4 w-4" />}
                isActive={pathname === "/explore"}
              />
            </nav>

            <div className="flex items-center gap-4">
              <span
                className={cn(
                  "text-sm",
                  isMainPage ? "text-gray-300" : "text-gray-500",
                )}
              >
                {currentTime}
              </span>

              <Button
                className={cn(
                  "h-8 rounded-md text-sm",
                  isMainPage
                    ? "bg-white text-black hover:bg-gray-200"
                    : "bg-black text-white hover:bg-gray-800",
                )}
              >
                <Link href="/create-event">Tạo sự kiện</Link>
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "cursor-pointer",
                    isMainPage
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-500 hover:text-black",
                  )}
                >
                  <Link href="/settings/account">
                    <Settings className="h-5 w-5" />
                  </Link>
                </Button>

                <Avatar className="h-8 w-8 cursor-pointer">
                  <Link href="/user">
                    <AvatarImage
                      src={avatarUrl || "/placeholder.svg"}
                      alt="User"
                    />
                    <AvatarFallback>U</AvatarFallback>
                  </Link>
                </Avatar>

                <Button
                  size="sm"
                  className={cn(
                    "text-sm cursor-pointer",
                    isMainPage
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-black text-white hover:bg-gray-800",
                  )}
                  onClick={handleLogout}
                >
                  Đăng xuất
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <span
              className={cn(
                "text-sm",
                isMainPage ? "text-gray-300" : "text-gray-500",
              )}
            >
              {currentTime}
            </span>
            <Link
              href="/explore"
              className={cn(
                "text-sm transition-colors",
                isMainPage
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-500 hover:text-black",
              )}
            >
              Khám phá
            </Link>
            <Button
              variant="default"
              size="sm"
              className={cn(
                "border-none",
                isMainPage
                  ? "bg-white text-black hover:bg-gray-200"
                  : "bg-black text-white hover:bg-gray-800",
              )}
              asChild
            >
              <Link href="/login">Đăng nhập</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
