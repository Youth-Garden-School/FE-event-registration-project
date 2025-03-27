"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import EventList from "./event-list";
import { upcomingEvents, pastEvents } from "@/lib/events-data";
import NoEventsComponent from "./no-event";

export default function EventTabs() {
  const handleEventClick = (eventId: string) => {
    console.log("Clicked event:", eventId);
    // Xử lý khi click vào sự kiện / Handle event click
  };

  return (
    <Tabs defaultValue="upcoming" className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-gray-900 dark:text-white text-[32px] font-semibold leading-[38.4px]">
          Sự kiện
        </h1>

        <TabsList className="bg-gray-100 dark:bg-[#ffffff14] rounded-[8px] text-gray-900 dark:text-white leading-[24px] p-[2px]">
          <TabsTrigger
            value="upcoming"
            className="flex items-center justify-center border-[0.8px] border-solid border-[#0000] text-gray-900 dark:text-white text-[14px] font-medium leading-[21px] p-[5px_8px] text-center data-[state=active]:bg-white dark:data-[state=active]:bg-[#3a3a3c] data-[state=active]:rounded-md"
          >
            Sắp tới
          </TabsTrigger>
          <TabsTrigger
            value="past"
            className="flex items-center justify-center border-[0.8px] border-solid border-[#0000] text-gray-900 dark:text-white text-[14px] font-medium leading-[21px] p-[5px_8px] text-center data-[state=active]:bg-white dark:data-[state=active]:bg-[#3a3a3c] data-[state=active]:rounded-md"
          >
            Đã qua
          </TabsTrigger>
        </TabsList>
      </div>

      <div className="relative">
        <TabsContent value="upcoming" className="mt-0">
          {upcomingEvents.length > 0 ? (
            <EventList
              events={upcomingEvents}
              onEventClick={handleEventClick}
            />
          ) : (
            <NoEventsComponent
              message="Không có sự kiện sắp tới"
              subMessage="Bạn chưa tổ chức hoặc tham gia sự kiện nào sắp tới."
            />
          )}
        </TabsContent>

        <TabsContent value="past" className="mt-0">
          {pastEvents.length > 0 ? (
            <EventList events={pastEvents} onEventClick={handleEventClick} />
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
