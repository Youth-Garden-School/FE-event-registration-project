"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowUp,
  Instagram,
  Linkedin,
  X,
  Youtube,
  Globe,
  Check,
} from "lucide-react";
import { ReactNode } from "react";

// Custom component to handle social media input with icon, domain, and placeholder
function InputGroupWithIcon({
  icon,
  domain,
  placeholder,
}: {
  icon: ReactNode;
  domain: string;
  placeholder: string;
}) {
  return (
    <div className="flex items-center border rounded-md overflow-hidden">
      <div className="bg-gray-100 p-2.5 border-r border-gray-200">{icon}</div>
      {/* Only show domain if it has a value */}
      {domain ? (
        <span className="px-3 py-2 text-sm text-gray-500 bg-gray-200 flex-1">
          {domain}
        </span>
      ) : null}
      <input
        type="text"
        placeholder={placeholder}
        className="flex-1 px-3 py-2 text-sm outline-none"
      />
    </div>
  );
}

export function ProfileSection() {
  const [avatarSrc, setAvatarSrc] = useState<string | undefined>(undefined);

  // Hàm xử lý khi người dùng chọn ảnh
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setAvatarSrc(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const socialLinks = [
    {
      icon: <Instagram className="h-5 w-5 text-gray-500" />,
      domain: "instagram.com/",
      placeholder: "tên người dùng",
    },
    {
      icon: <X className="h-5 w-5 text-gray-500" />,
      domain: "x.com/",
      placeholder: "tên người dùng",
    },
    {
      icon: <Youtube className="h-5 w-5 text-gray-500" />,
      domain: "youtube.com/@",
      placeholder: "tên người dùng",
    },
    {
      icon: <Linkedin className="h-5 w-5 text-gray-500" />,
      domain: "linkedin.com/in/",
      placeholder: "tên người dùng",
    },
    {
      icon: <Globe className="h-5 w-5 text-gray-500" />,
      domain: "",
      placeholder: "Trang web của bạn",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-gray-500"
        >
          <path d="M9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0v-8a3 3 0 1 0-6 0v1" />
          <path d="M7 16.5a6 6 0 0 0 10 0" />
        </svg>
      ),
      domain: "tiktok.com/@",
      placeholder: "tên người dùng",
    },
  ];

  return (
    <section>
      <h2 className="text-xl font-semibold mb-2">Trang cá nhân của bạn</h2>
      <p className="text-gray-500 mb-6">
        Chọn cách bạn hiển thị là người tổ chức hoặc người tham dự.
      </p>

      {/* Họ - Tên - Ảnh đại diện */}
      <div className="flex flex-col md:flex-row md:items-center gap-6 mb-4">
        <div className="md:w-1/5">
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Họ
          </label>
          <Input type="text" placeholder="/" />
        </div>

        <div className="md:w-1/5">
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Tên
          </label>
          <Input type="text" placeholder="/" />
        </div>

        <div className="md:w-1/5 flex flex-col items-center justify-center">
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Ảnh đại diện
          </label>
          <div className="relative w-20 h-20 rounded-full bg-purple-50 flex items-center justify-center overflow-hidden">
            <Avatar className="w-20 h-20">
              <AvatarImage src={avatarSrc} alt="Profile" />
              <AvatarFallback className="bg-purple-50 text-purple-500 text-xl">
                😊
              </AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 bg-black text-white rounded-full p-1 cursor-pointer">
              <ArrowUp className="h-4 w-4" />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Tên người dùng */}
      <div className="mb-6 md:w-1/3">
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Tên người dùng
        </label>
        <div className="flex items-center">
          <div className="bg-gray-100 p-2.5 rounded-l-md border-y border-l border-gray-200">
            <span className="text-gray-500">@</span>
          </div>
          <Input type="text" className="rounded-l-none" />
        </div>
      </div>

      {/* Tiểu sử */}
      <div className="mb-6 md:w-1/3">
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Tiểu sử
        </label>
        <Textarea
          placeholder="Chia sẻ một chút về nền tảng và sở thích của bạn."
          className="min-h-[100px]"
        />
      </div>

      {/* Mạng xã hội */}
      <div className="mb-6 md:w-2/3">
        <h3 className="text-sm font-medium mb-4 text-gray-700">
          Liên kết mạng xã hội
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {socialLinks.map((item, index) => (
            <InputGroupWithIcon
              key={index}
              icon={item.icon}
              domain={item.domain}
              placeholder={item.placeholder}
            />
          ))}
        </div>
      </div>

      {/* Nút lưu */}
      <div className="mt-8">
        <Button
          variant="outline"
          className="bg-gray-800 text-white hover:bg-gray-700 px-6 rounded-full flex items-center gap-2"
        >
          <Check className="h-4 w-4" />
          <span>Lưu thay đổi</span>
        </Button>
      </div>
    </section>
  );
}
