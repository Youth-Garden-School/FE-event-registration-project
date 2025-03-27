import Image from "next/image";
import type React from "react";

interface SocialIconProps {
  icon: string | React.ReactNode;
  className?: string;
}

export function SocialIcon({ icon, className = "h-5 w-5" }: SocialIconProps) {
  if (typeof icon === "string") {
    return (
      <div className={className}>
        <Image
          src={icon}
          alt="Social media icon"
          width={20}
          height={20}
          className="w-full h-full text-gray-800 hover:opacity-80 transition-opacity"
        />
      </div>
    );
  }
  return <div className={className}>{icon}</div>;
}
