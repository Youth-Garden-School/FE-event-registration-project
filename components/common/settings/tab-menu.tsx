// components/common/settings/tab-menu.tsx
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface TabMenuProps {
  title: string;
  tabs: { id: string; label: string }[];
  defaultTab?: string;
  className?: string;
}

export function TabMenu({ title, tabs, defaultTab, className }: TabMenuProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id);

  return (
    <div className={cn("w-full", className)}>
      <div className="px-4 py-4">
        {" "}
        {/* Đã giảm px-6 thành px-4 để căn trái hơn */}
        <h1 className="text-3xl font-bold mb-6 text-black">{title}</h1>
        {/* Căn lề trái và giảm độ rộng */}
        <div className="flex justify-start items-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={cn(
                "pb-2 mx-4 font-medium text-base relative transition-colors border-b-2 text-left", // Căn lề trái cho nút
                activeTab === tab.id
                  ? "text-black border-black"
                  : "text-[#7f8ea3]/90 border-transparent hover:text-black/70",
              )}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
