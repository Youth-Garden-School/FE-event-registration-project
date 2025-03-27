import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { designBuddiesData } from "@/lib/header-calendar-data";
import { useState } from "react";
import { SocialIcon } from "./social-icon";

export default function DesignBuddiesProfile() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const {
    name,
    description,
    coverImage,
    logoImage,
    timeZone,
    currentTime,
    socialLinks,
  } = designBuddiesData;

  const toggleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white">
      {/* Banner Image */}
      <div className="relative w-full h-60 overflow-hidden rounded-lg">
        <Image
          src={coverImage}
          alt={`${name} Community Events`}
          width={1200}
          height={240}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-4 px-4">
        {/* Profile Icon */}
        <div className="flex-shrink-0">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-[#ffebee] rounded-lg flex items-center justify-center">
            <Image
              src={logoImage}
              alt={`${name} Logo`}
              width={60}
              height={60}
              className="w-16 h-16"
            />
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-grow">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <h1 className="text-2xl md:text-3xl font-bold text-[#002e59]">
              {name}
            </h1>
            <Button
              className={
                isSubscribed
                  ? "mt-2 md:mt-0 bg-red-500 hover:bg-red-600 text-white"
                  : "mt-2 md:mt-0 bg-[#0071d6] hover:bg-[#0071d6]/90 text-white"
              }
              onClick={toggleSubscribe}
            >
              {isSubscribed ? "Hủy đăng ký" : "Đăng ký"}
            </Button>
          </div>

          <div className="flex items-center gap-1 text-sm text-gray-500 mt-2">
            <Clock className="h-4 w-4" />
            <span>
              Times in {timeZone} — {currentTime}
            </span>
          </div>

          <p className="mt-4 text-[#00113a]">{description}</p>

          {/* Social Icons */}
          <div className="flex gap-3 mt-4">
            {socialLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                target="_blank"
                rel="nofollow noopener"
                className="text-gray-500 hover:text-[#0071d6]"
                aria-label={link.name}
              >
                <SocialIcon icon={link.icon} className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
