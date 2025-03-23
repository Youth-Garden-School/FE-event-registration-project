"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Star } from "lucide-react";
import { ThemeToggle } from "../theme-toggle";

export default function Header() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const gmt7Offset = 7 * 60;
      const localOffset = now.getTimezoneOffset();
      const gmt7Time = new Date(
        now.getTime() + (gmt7Offset + localOffset) * 60 * 1000,
      );

      const hours = gmt7Time.getHours().toString().padStart(2, "0");
      const minutes = gmt7Time.getMinutes().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes} GMT+7`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-colors duration-300">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* Left Section: Star Icon */}
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-foreground transition-colors hover:text-foreground/80"
          >
            <Star className="h-5 w-5" />
            <span className="font-semibold">Regista</span>
          </Link>
        </div>

        {/* Right Section: Time, Explore Link, and Sign In Button */}
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
          <ThemeToggle />
          <Button
            variant="outline"
            size="sm"
            className="transition-colors"
            asChild
          >
            <Link href="/login">Đăng nhập</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
