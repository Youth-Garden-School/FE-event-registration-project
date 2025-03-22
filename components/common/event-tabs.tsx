"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import EventList from "./event-list";
import { upcomingEvents, pastEvents } from "@/lib/data";
import NoEventsComponent from "./no-event";

export default function EventTabs() {
  return (
    <Tabs defaultValue="upcoming" className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-white text-[32px] font-semibold leading-[38.4px]">
          Sự kiện
        </h1>

        <TabsList className="bg-[#ffffff14] rounded-[8px] text-white leading-[24px] p-[2px]">
          <TabsTrigger
            value="upcoming"
            className="flex items-center justify-center border-[0.8px] border-solid border-[#0000] text-white text-[14px] font-medium leading-[21px] p-[5px_8px] text-center data-[state=active]:bg-[#3a3a3c] data-[state=active]:rounded-md"
          >
            Sắp tới
          </TabsTrigger>
          <TabsTrigger
            value="past"
            className="flex items-center justify-center border-[0.8px] border-solid border-[#0000] text-white text-[14px] font-medium leading-[21px] p-[5px_8px] text-center data-[state=active]:bg-[#3a3a3c] data-[state=active]:rounded-md"
          >
            Đã qua
          </TabsTrigger>
        </TabsList>
      </div>

      {/* Thêm lớp chứa cho cả hai TabsContent với chiều cao cố định */}
      <div className="h-[780px] relative">
        <TabsContent value="upcoming" className="mt-0 absolute w-full h-full">
          {upcomingEvents.length > 0 ? (
            <EventList events={upcomingEvents} />
          ) : (
            <NoEventsComponent
              message="Không có sự kiện sắp tới"
              subMessage="Bạn chưa tổ chức hoặc tham gia sự kiện nào sắp tới."
            />
          )}
        </TabsContent>

        <TabsContent value="past" className="mt-0 absolute w-full h-full">
          {pastEvents.length > 0 ? (
            <EventList events={pastEvents} />
          ) : (
            <NoEventsComponent
              message="Không có sự kiện trước đây"
              subMessage="Bạn chưa tổ chức hoặc tham gia sự kiện nào."
            />
          )}
        </TabsContent>
      </div>
    </Tabs>
  );
}
