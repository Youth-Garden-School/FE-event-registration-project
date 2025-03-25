"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Star } from "lucide-react";

export default function Header() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Adjust for GMT+7
      const gmt7Offset = 7 * 60; // 7 hours in minutes
      const localOffset = now.getTimezoneOffset(); // Local timezone offset in minutes
      const gmt7Time = new Date(
        now.getTime() + (gmt7Offset + localOffset) * 60 * 1000,
      );

      const hours = gmt7Time.getHours().toString().padStart(2, "0");
      const minutes = gmt7Time.getMinutes().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes} GMT+7`);
    };

    updateTime(); // Initial update
    const interval = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <header className="w-full py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left Section: Star Icon */}
        <div className="flex items-center">
          <Link href="/" className="text-gray-600 text-sm  hover:text-black">
            <Star className="w-5 h-5 text-gray-500 cursor-pointer" />
          </Link>
        </div>

        {/* Right Section: Time, Explore Link, and Sign In Button */}
        <div className="flex items-center gap-4">
          <span className="text-gray-600 text-sm">{currentTime}</span>
          <Link
            href="/explore"
            className="text-gray-600 text-sm  hover:text-black"
          >
            Khám phá
          </Link>
          <Button
            className="hover:bg-black hover:text-white text-center items-center"
            variant="outline"
            size="sm"
            asChild
          >
            <Link href="/login">Đăng nhập</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
