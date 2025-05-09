"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { cities } from "./dataLocal";
import { useRouter } from "next/navigation";

const regions = [
  "Châu Á & Thái Bình Dương",
  "Châu Phi",
  "Châu Âu",
  "Bắc Mỹ",
  "Nam Mỹ",
];

export default function LocalEvents() {
  const [selectedRegion, setSelectedRegion] = useState(
    "Châu Á & Thái Bình Dương",
  );
  const router = useRouter();

  const filteredCities = cities.filter(
    (city) => city.region === selectedRegion,
  );

  return (
    <div className="mx-auto p-6">
      <h2 className="text-2xl font-semibold">Khám phá sự kiện địa phương</h2>

      {/* Tabs */}
      <div className="flex space-x-4 mt-4">
        {regions.map((region, index) => (
          <Button
            key={index}
            onClick={() => setSelectedRegion(region)}
            variant={selectedRegion === region ? "default" : "ghost"}
            className={cn(
              "text-sm font-medium cursor-pointer",
              selectedRegion !== region && "text-gray-500",
            )}
          >
            {region}
          </Button>
        ))}
      </div>

      {/* City list */}
      <div className="grid grid-cols-4 gap-3 mt-6">
        {filteredCities.map((city) => (
          <div
            key={city.id}
            className="flex items-center space-x-1 p-3 cursor-pointer hover:bg-gray-300 rounded-2xl"
            onClick={() => router.push(`/featured-calendar/${city.id}`)} // Use `id`, not `name`
          >
            <div
              className={cn(
                city.color,
                "w-10 h-10 flex items-center justify-center text-white rounded-full text-lg",
              )}
            >
              {city.icon}
            </div>
            <div className="pl-2">
              <h4 className="font-medium">{city.name}</h4>
              {/* <p className="text-sm text-gray-500">{city.events} Sự kiện</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
