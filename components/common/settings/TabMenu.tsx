"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";

export interface TabMenuProps {
  title: React.ReactNode;
  tabs: { id: string; label: string }[];
  defaultTab: string;
  customTitleClass?: string;
}

export function TabMenu({
  title,
  tabs,
  defaultTab,
  customTitleClass = "",
}: TabMenuProps) {
  const router = useRouter();
  const pathname = usePathname();

  const getCurrentTab = () => {
    const matchedTab = tabs.find((tab) => pathname.endsWith(tab.id));
    return matchedTab?.id || defaultTab;
  };

  const currentTab = getCurrentTab();

  const handleTabClick = (tabId: string) => {
    if (tabId !== currentTab) {
      router.push(`/settings/${tabId}`);
    }
  };

  return (
    <div className="tab-menu w-full">
      {/* Tiêu đề có thể thay đổi class */}
      <h2
        className={`font-bold text-xl text-black dark:text-white ${customTitleClass}`}
      >
        {title}
      </h2>

      {/* Các tab */}
      <div className="flex space-x-4 mt-4 border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`py-1 px-3 text-md font-medium transition-all duration-200
              ${
                tab.id === currentTab
                  ? "text-black dark:text-white border-b-2 border-black dark:border-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
