"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SocialIcon } from "./social-icon";
import { adplistData } from "@/lib/header-calendar-data";

export default function ADPListProfile() {
  const [isFollowing, setIsFollowing] = useState(false);

  const {
    name,
    description,
    coverImage,
    logoImage,
    timeZone,
    currentTime,
    socialLinks,
  } = adplistData;

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto bg-white">
      {/* Cover Image with responsive aspect ratio */}
      <div
        className="relative w-full rounded-2xl overflow-hidden"
        style={{ paddingBottom: "28.6%" }}
      >
        <Image
          src={coverImage || "/placeholder.svg"}
          alt="Ảnh bìa cho lịch"
          fill
          priority
          sizes="(max-width: 450px) 450px, (max-width: 650px) 650px, (max-width: 820px) 820px, (max-width: 1000px) 1000px, 1250px"
          className="object-cover"
        />
      </div>

      {/* Logo and Follow Button */}
      <div className="relative p-4 md:px-6 flex justify-between items-end -mt-12 md:-mt-16">
        <div className="relative">
          <Link href="/adplistcommunity">
            <div className="w-16 h-16 md:w-24 md:h-24 rounded-lg overflow-hidden border-4 border-white bg-white">
              <Image
                src={logoImage || "/placeholder.svg"}
                alt={`${name} Logo`}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
        </div>

        <div className=" flex end gap-2">
          <Button
            className={
              isFollowing
                ? "bg-red-500 hover:bg-red-600"
                : "bg-[#0071e3] hover:bg-[#0071e3]/90"
            }
            onClick={toggleFollow}
          >
            {isFollowing ? "Hủy đăng ký" : "Theo dõi"}
          </Button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="px-4 md:px-6 py-4 md:py-6">
        <div className="flex flex-col gap-3">
          <Link href="/adplistcommunity">
            <h1 className="text-2xl md:text-3xl font-bold">{name}</h1>
          </Link>

          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="h-4 w-4 mr-2" />
            <span>Thời gian theo múi giờ {timeZone}</span>
            <span className="ml-1 text-gray-400 font-mono">
              — {currentTime}
            </span>
          </div>

          <div className="text-gray-600 mt-1">
            <p>{description}</p>
          </div>

          {/* Social Links */}
          <div className="flex gap-3 mt-2">
            {socialLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                target="_blank"
                rel="nofollow noopener"
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label={link.name}
              >
                <SocialIcon icon={link.icon} className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Separator className="mt-2" />
    </div>
  );
}
