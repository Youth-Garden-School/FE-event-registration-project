// components/common/settings/TabMenu.tsx
import React from "react";

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
  return (
    <div className="tab-menu w-full">
      {/* Tiêu đề có thể thay đổi class */}
      <h2 className={`font-bold text-xl ${customTitleClass}`}>{title}</h2>

      {/* Các tab */}
      <div className="flex space-x-4 mt-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`py-1 px-3 text-md font-medium transition-all duration-200 ${
              tab.id === defaultTab
                ? "text-black border-b-2 border-black" // Tab đang chọn có màu đen và thêm border dưới
                : "text-gray-600 hover:text-black" // Tab chưa chọn có màu xám và đổi màu khi hover
            }`}
            onClick={() => console.log(`Tab clicked: ${tab.id}`)} // Có thể thêm chức năng khi click tab
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
