"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/common/eventai/HeroSection";
import PopularCalendars from "@/components/common/eventai/PopularCalendars";
import NearbyEvents from "@/components/common/eventai/NearbyEvents";
import EventTabs2 from "@/components/common/eventai/event-tabs2";
import SubscriptionCard from "@/components/common/eventai/SubscriptionCard";

// Hook kiểm tra đăng nhập
function useAuthByToken() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    setIsLoggedIn(!!token);
  }, []);

  return isLoggedIn;
}

export default function Home() {
  const isLoggedIn = useAuthByToken();

  return (
    <main className="min-h-screen flex flex-col px-4 lg:px-6">
      <div className="flex-1 max-w-7xl w-full mx-auto">
        {/* Grid layout 12 cột để canh chỉnh chính xác */}
        <div className="col-span-12 grid grid-cols-12 gap-6">
          {/* HeroSection và PopularCalendars chiếm full width */}
          <div className="col-span-12">
            <HeroSection />
          </div>

          <div className="col-span-12">
            <PopularCalendars />
          </div>

          {/* Loading state */}
          {isLoggedIn === null ? (
            <div className="col-span-12">Loading...</div>
          ) : isLoggedIn ? (
            // Cả 2 phần EventTabs và SubscriptionCard vào cùng 1 hàng
            <div className="col-span-12 grid grid-cols-12 gap-6">
              {/* EventTabs chiếm 7/12 và căn giữa */}
              <div className="col-span-12 lg:col-span-7 flex justify-center px-6">
                <EventTabs2 />
              </div>

              {/* SubscriptionCard chiếm 5/12 và căn giữa */}
              <div className="col-span-12 lg:col-span-5 flex justify-center">
                <SubscriptionCard />
              </div>
            </div>
          ) : (
            // Nếu chưa đăng nhập: NearbyEvents full width
            <div className="col-span-12">
              <NearbyEvents />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
