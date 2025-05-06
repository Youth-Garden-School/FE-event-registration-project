"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Calendar, Settings } from "lucide-react";
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
          ? "border-b-2 border-black text-black"
          : "text-gray-500 hover:text-gray-900",
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
  const pathname = usePathname();

  // 🔑 Check authentication token
  useEffect(() => {
    const token = localStorage.getItem("access_token"); // <- đã sửa key đúng
    setIsAuthenticated(!!token);
  }, []);

  // 🕒 Time updater
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

  // 🚪 Handle logout
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_id");
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b px-4 transition-colors duration-300",
        isAuthenticated ? "bg-white text-black" : "bg-black text-white",
      )}
    >
      <div className="container mx-auto flex h-14 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-2 transition-colors hover:text-gray-300",
              isAuthenticated ? "text-black" : "text-white",
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
                isActive={pathname === "/explore"}
              />
            </nav>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">{currentTime}</span>

              <Button
                variant="outline"
                className="h-8 rounded-md text-sm text-black hover:bg-gray-100"
              >
                <Link href="/create-event">Tạo sự kiện</Link>
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-500 cursor-pointer hover:text-black"
                >
                  <Settings className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-500 cursor-pointer hover:text-black"
                >
                  <Bell className="h-5 w-5" />
                </Button>
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>
                    <Link href="/user">U</Link>
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-sm text-black hover:bg-gray-100 cursor-pointer"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300">{currentTime}</span>
            <Link
              href="/explore"
              className="text-sm text-gray-300 transition-colors hover:text-white"
            >
              Khám phá
            </Link>
            <Button
              variant="default"
              size="sm"
              className="bg-white text-black hover:bg-gray-200 border-none"
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
