"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Calendar, Users, CheckCircle } from "lucide-react";

export default function HeroSection() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleFollowClick = () => {
    if (!isFollowing) {
      setIsFollowing(true);
    } else {
      setShowDropdown((prev) => !prev);
    }
  };

  const handleUnfollow = () => {
    setIsFollowing(false);
    setShowDropdown(false);
    setToastMessage("Bạn đã hủy đăng ký thành công!");
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  // Đóng dropdown nếu click ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="relative w-full py-16 px-6 bg-background">
      <div className="max-w-4xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between">
        <div className="w-full md:w-3/5 space-y-5 mt-8 md:mt-0 text-center md:text-left">
          <h1 className="text-4xl font-bold">AI</h1>

          <div className="flex items-center justify-center md:justify-start gap-3 border-b border-gray-300 pb-2 w-[300px] md:w-[400px]">
            <div className="flex items-center gap-2 font-medium text-primary">
              <Calendar size={18} className="text-gray-500" /> 1N
            </div>
            <div className="font-medium text-gray-500 text-sm">sự kiện</div>
            <div className="flex items-center gap-2 font-medium text-primary">
              <Users size={18} className="text-gray-500" /> 9N
            </div>
            <div className="font-medium text-gray-500 text-sm">
              người theo dõi
            </div>
          </div>

          <div className="relative inline-block" ref={dropdownRef}>
            <Button
              onClick={handleFollowClick}
              className={`h-11 rounded-full px-8 font-medium transition ${
                isFollowing ? "bg-gray-200 text-black hover:bg-gray-300" : ""
              }`}
            >
              {isFollowing ? "Đã theo dõi" : "Theo dõi"}
            </Button>

            {isFollowing && showDropdown && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-md z-50 w-40 text-left">
                <button
                  onClick={handleUnfollow}
                  className="w-full px-4 py-2 text-sm text-600 hover:bg-gray-100 text-left"
                >
                  Hủy đăng ký
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="w-full md:w-2/5 flex justify-center md:justify-end">
          <div className="relative w-72 h-72 md:w-96 md:h-96 bg-secondary rounded-xl overflow-hidden">
            <Image
              src="https://ext.same-assets.com/2185237885/1932650201.png"
              alt="AI"
              width={384}
              height={384}
              className="h-full w-full object-cover"
              unoptimized
            />
          </div>
        </div>
      </div>

      {/* ✅ Toast */}
      {toastVisible && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded shadow-md flex items-center z-50">
          <CheckCircle className="w-5 h-5 mr-2 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}
    </section>
  );
}
