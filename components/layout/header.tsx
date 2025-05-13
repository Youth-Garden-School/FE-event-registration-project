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

const ClientOnlyInfo = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const pathname = usePathname();
  const isMainPage = pathname === "/";
  useEffect(() => {
    const token = localStorage.getItem("ACCESS_TOKEN");

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
        .then((res) => res.json())
        .then((data) => {
          setAvatarUrl(data?.result?.avatarUrl || null);
        })
        .catch((err) => console.error("Failed to fetch user avatar:", err));
    }

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
    window.location.href = "/login";
  };

  return (
    <>
      <span className="text-sm text-gray-500">{currentTime}</span>
      <div className="flex items-center gap-2">
        <Button className="h-8 rounded-md text-sm" variant="default">
          <Link href="/create-event">Tạo sự kiện</Link>
        </Button>
        <Button variant="ghost" size="icon">
          <Link href="/settings/account">
            <Settings className="h-5 w-5" />
          </Link>
        </Button>
        <Avatar className="h-8 w-8 cursor-pointer">
          <Link href="/user">
            <AvatarImage src={avatarUrl || "/placeholder.svg"} alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Link>
        </Avatar>
        <Button size="sm" className="text-sm" onClick={handleLogout}>
          Đăng xuất
        </Button>
      </div>
    </>
  );
};

export default function Header() {
  const [hasMounted, setHasMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setHasMounted(true);
    const token = localStorage.getItem("ACCESS_TOKEN");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b px-4 transition-colors duration-300 bg-white text-black">
      <div className="container mx-auto flex h-14 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/REGISTA.svg"
              alt="Logo"
              width={50}
              height={50}
              className="rounded-md"
            />
            <span className="font-semibold">Regista</span>
          </Link>
        </div>

        {hasMounted && isAuthenticated ? (
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
            <ClientOnlyInfo />
          </>
        ) : hasMounted ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              {new Date().toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "Asia/Bangkok",
                hour12: false,
              })}{" "}
              GMT+7
            </span>
            <Link
              href="/explore"
              className="text-sm transition-colors text-gray-500 hover:text-black"
            >
              Khám phá
            </Link>
            <Button variant="default" size="sm" asChild>
              <Link href="/login">Đăng nhập</Link>
            </Button>
          </div>
        ) : null}
      </div>
    </header>
  );
}
