"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Bell, Calendar, Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface NavItemProps {
  href: string;
  label: string;
  isActive?: boolean;
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

  // Check authentication status
  useEffect(() => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    setIsAuthenticated(!!token);
  }, []);

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Bangkok", // GMT+7
        hour12: false,
      });
      setCurrentTime(`${timeString} GMT+7`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    setIsAuthenticated(false);
    // Optionally redirect to login page
    window.location.href = "/login";
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-[#f0f2fa] px-4 transition-colors duration-300",
        !isAuthenticated &&
          "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      )}
    >
      <div className="container mx-auto flex h-14 items-center justify-between">
        {/* Left Section: Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-foreground transition-colors hover:text-foreground/80"
          >
            <Star className="h-5 w-5" />
            <span className="font-semibold">Regista</span>
          </Link>
        </div>

        {/* Right Section */}
        {isAuthenticated ? (
          <>
            <nav className="flex items-center space-x-1">
              <NavItem href="/events" label="Sự kiện" isActive={true} />
              <NavItem
                href="/calendar"
                label="Lịch"
                icon={<Calendar className="h-4 w-4" />}
              />
              <NavItem href="/explore" label="Khám phá" />
            </nav>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">{currentTime}</span>

              <Button variant="outline" className="h-8 rounded-md text-sm">
                Tạo sự kiện
              </Button>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-gray-500">
                  <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-500">
                  <Bell className="h-5 w-5" />
                </Button>
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-sm"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground transition-colors">
              {currentTime}
            </span>
            <Link
              href="/explore"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Khám phá
            </Link>
            <Button
              variant="outline"
              size="sm"
              className="transition-colors"
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
