"use client";

import { useState } from "react";
import { Search, Edit, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

// Sample messages data
const messagesData = [
  {
    id: 1,
    sender: "Design Buddies",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "Chào mừng bạn đến với Design Buddies! Chúng tôi rất vui khi bạn tham gia cộng đồng của chúng tôi.",
    time: "10:30 AM",
    date: "Hôm nay",
    unread: true,
  },
  {
    id: 2,
    sender: "Sự kiện Badminton",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "Cảm ơn bạn đã đăng ký tham gia sự kiện Badminton Tournament. Chúng tôi rất mong được gặp bạn vào ngày mai!",
    time: "Hôm qua",
    date: "Hôm qua",
    unread: false,
  },
  {
    id: 3,
    sender: "Workshop Hệ thống Thiết kế",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "Nhắc nhở: Workshop Hệ thống Thiết kế sẽ diễn ra vào ngày mai lúc 19:00. Đừng quên chuẩn bị máy tính và các công cụ thiết kế của bạn!",
    time: "2 ngày trước",
    date: "2 ngày trước",
    unread: false,
  },
];

export function MessagesTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [messages] = useState(messagesData);

  // Filter messages based on search query and active tab
  const filteredMessages = messages.filter(
    (message) =>
      message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.content.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Bản tin</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
              2
            </span>
          </Button>
          <Button variant="outline" size="icon">
            <Edit className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Tìm kiếm tin nhắn"
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-gray-100 rounded-[8px] text-gray-900 leading-[24px] p-[2px] w-full">
          <TabsTrigger
            value="all"
            className="flex-1 flex items-center justify-center border-[0.8px] border-solid border-[#0000] text-gray-900 text-[14px] font-medium leading-[21px] p-[5px_8px] text-center data-[state=active]:bg-white data-[state=active]:rounded-md"
          >
            Tất cả
          </TabsTrigger>
          <TabsTrigger
            value="unread"
            className="flex-1 flex items-center justify-center border-[0.8px] border-solid border-[#0000] text-gray-900 text-[14px] font-medium leading-[21px] p-[5px_8px] text-center data-[state=active]:bg-white data-[state=active]:rounded-md"
          >
            Chưa đọc
          </TabsTrigger>
          <TabsTrigger
            value="archived"
            className="flex-1 flex items-center justify-center border-[0.8px] border-solid border-[#0000] text-gray-900 text-[14px] font-medium leading-[21px] p-[5px_8px] text-center data-[state=active]:bg-white data-[state=active]:rounded-md"
          >
            Đã lưu trữ
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-2">
        {filteredMessages.length > 0 ? (
          filteredMessages
            .filter(
              (message) =>
                activeTab === "all" ||
                (activeTab === "unread" && message.unread),
            )
            .map((message) => (
              <div
                key={message.id}
                className={`p-4 bg-white rounded-lg border hover:shadow-sm transition-shadow ${
                  message.unread ? "border-l-4 border-l-blue-500" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={message.avatar || "/placeholder.svg"}
                      alt={message.sender}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{message.sender}</h3>
                      <span className="text-xs text-gray-500">
                        {message.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">
                      {message.content}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">
                        {message.date}
                      </span>
                      {message.unread && (
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                          Chưa đọc
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <div className="text-center py-8 bg-white rounded-lg border">
            <p className="text-gray-500">Không tìm thấy tin nhắn nào</p>
          </div>
        )}
      </div>
    </div>
  );
}
