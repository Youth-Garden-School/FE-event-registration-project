"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { CheckCircle } from "lucide-react";

const SubscriptionCard = () => {
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
    <div className="relative w-full md:w-1/3 bg-card rounded-lg p-6 h-fit">
      <div className="flex items-start mb-4">
        <div className="bg-pink-100 p-2 rounded-full">
          <Image
            src="https://ext.same-assets.com/2185237885/3671249817.png"
            alt="AI Icon"
            width={28}
            height={28}
            unoptimized
          />
        </div>
      </div>

      <h3 className="text-lg font-bold mt-3 mb-1">AI</h3>
      <p className="fs-sm text-secondary-alpha mb-4">
        Theo dõi để cập nhật những sự kiện mới nhất, lịch và các thông tin khác.
      </p>

      <div className="space-y-3 relative" ref={dropdownRef}>
        <Button
          onClick={handleFollowClick}
          className={`w-full ${
            isFollowing ? "bg-gray-200 text-black hover:bg-gray-300" : ""
          }`}
        >
          {isFollowing ? "Đã theo dõi" : "Theo dõi"}
        </Button>

        {isFollowing && showDropdown && (
          <div className="absolute left-0 top-full mt-2 w-full bg-white border border-gray-200 shadow-md rounded-md z-50">
            <button
              onClick={handleUnfollow}
              className="w-full px-4 py-2 text-sm text-600 hover:bg-gray-100 text-left"
            >
              Hủy đăng ký
            </button>
          </div>
        )}
      </div>

      {/* Toast */}
      {toastVisible && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded shadow-md flex items-center z-50">
          <CheckCircle className="w-5 h-5 mr-2 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default SubscriptionCard;
