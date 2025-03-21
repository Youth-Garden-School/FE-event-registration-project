"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EventTabs() {
  return (
    <Tabs defaultValue="upcoming" className="w-auto">
      <TabsList className="bg-[#ffffff14] rounded-[8px] text-white leading-[24px] p-[2px]">
        <TabsTrigger
          value="upcoming"
          className="flex items-center justify-center border-[0.8px] border-solid border-[#0000] text-white  text-[14px] font-medium leading-[21px] p-[5px_8px] text-center"
        >
          Sắp tới
        </TabsTrigger>
        <TabsTrigger
          value="past"
          className="flex items-center justify-center border-[0.8px] border-solid border-[#0000] text-white  text-[14px] font-medium leading-[21px] p-[5px_8px] text-center"
        >
          Đã qua
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
