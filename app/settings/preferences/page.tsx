"use client";
import React, { useState, useEffect } from "react";
import { TabMenu } from "@/components/common/settings/TabMenu"; // Import TabMenu
import AppearanceSection from "@/components/common/settings/preferences/AppearanceSection";
import { SectionWrapper } from "@/components/common/settings/SectionWrapper";
import { PreferenceEvents } from "@/components/common/settings/preferences/event";
export default function AppearancePage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true); // Thêm mờ khi cuộn
      } else {
        setIsScrolled(false); // Xóa mờ khi ở đầu trang
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex justify-center min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors">
      <div className="flex flex-col w-full max-w-4xl px-4 py-10">
        {/* Thêm phần nền mờ cho TabMenu */}
        <div
          className={`sticky top-0 z-10 w-full transition-all duration-200 ${
            isScrolled ? "backdrop-blur-sm" : ""
          }`} // Mờ ra full width khi cuộn, không có nền màu đen
        >
          <TabMenu
            title={
              <span
                className={`font-bold transition-all duration-200 ${
                  isScrolled ? "text-xl" : "text-2xl"
                }`}
              >
                Cài đặt
              </span>
            }
            tabs={[
              { id: "account", label: "Tài khoản" },
              { id: "preferences", label: "Tùy chọn" },
              { id: "payment", label: "Thanh toán" },
            ]}
            defaultTab="account"
            customTitleClass={isScrolled ? "text-sm" : "text-xl"} // Kích thước chữ thay đổi khi cuộn
          />
        </div>
        <div className="flex-1 mt-4">
          <SectionWrapper>
            <AppearanceSection />
          </SectionWrapper>
          <PreferenceEvents />
        </div>
      </div>
    </div>
  );
}
