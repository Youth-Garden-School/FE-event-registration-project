"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImportLumaEventModal } from "@/components/add-event/import-event-modal";
import { EventEmptyState } from "@/components/add-event/event-empty-state";
import { EventCard } from "@/components/add-event/event-card";
import { events } from "@/lib/events-calendar-data";
import { ContactsTab } from "@/components/tabs/contacts-tab";
import { MessagesTab } from "@/components/tabs/messages-tab";
import { PaymentsTab } from "@/components/tabs/payments-tab";
import { DetailsTab } from "@/components/tabs/details-tab";
import { SettingsTab } from "@/components/tabs/settings-tab";
import Image from "next/image";

export default function AddEventPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [showImportLumaModal, setShowImportLumaModal] = useState(false);
  const [showEventMenu, setShowEventMenu] = useState(false);

  // Filter events for upcoming and past
  const currentDate = new Date();
  const upcomingEvents = events.filter(
    (event) => new Date(event.date) >= currentDate,
  );
  const pastEvents = events.filter(
    (event) => new Date(event.date) < currentDate,
  );

  // Get the events based on active tab
  const displayEvents = activeTab === "upcoming" ? upcomingEvents : pastEvents;

  const handleCreateEvent = () => {
    // Chuyển hướng đến trang tạo sự kiện mới
    router.push("/creat-event");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center text-gray-600 overflow-hidden">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="Design Buddies"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <h1 className="text-3xl font-medium text-gray-700">
              Design Buddies
            </h1>
          </div>
          <div className="ml-auto">
            <Button
              variant="outline"
              className="text-gray-600"
              onClick={() => router.push("/")}
            >
              Trang lịch <span className="ml-1">→</span>
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <Tabs defaultValue="events" className="w-full">
            <TabsList className="border-b w-full justify-start rounded-none bg-transparent p-0 h-auto">
              <TabsTrigger
                value="events"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-gray-900 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Sự kiện
              </TabsTrigger>
              <TabsTrigger
                value="contacts"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-gray-900 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Danh bạ
              </TabsTrigger>
              <TabsTrigger
                value="messages"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-gray-900 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Bản tin
              </TabsTrigger>
              <TabsTrigger
                value="payments"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-gray-900 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Thanh toán
              </TabsTrigger>
              <TabsTrigger
                value="details"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-gray-900 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Thông tin chi tiết
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-gray-900 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Cài đặt
              </TabsTrigger>
            </TabsList>

            <TabsContent value="events" className="pt-4">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <h2 className="text-xl font-medium text-gray-800">Sự kiện</h2>
                  <div className="relative ml-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => setShowEventMenu(!showEventMenu)}
                    >
                      <span className="text-lg">+</span>
                    </Button>

                    {showEventMenu && (
                      <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-md shadow-lg border z-10">
                        <div className="py-1">
                          <button
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            onClick={() => {
                              handleCreateEvent();
                              setShowEventMenu(false);
                            }}
                          >
                            <span className="mr-2">+</span>
                            Tạo sự kiện mới
                          </button>
                          <button
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            onClick={() => {
                              setShowImportLumaModal(true);
                              setShowEventMenu(false);
                            }}
                          >
                            <span className="mr-2">↗</span>
                            Thêm sự kiện Luma hiện có
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-auto"
                >
                  <TabsList className="bg-gray-100 rounded-[8px] text-gray-900 leading-[24px] p-[2px]">
                    <TabsTrigger
                      value="upcoming"
                      className="flex items-center justify-center border-[0.8px] border-solid border-[#0000] text-gray-900 text-[14px] font-medium leading-[21px] p-[5px_8px] text-center data-[state=active]:bg-white data-[state=active]:rounded-md"
                    >
                      Sắp tới
                    </TabsTrigger>
                    <TabsTrigger
                      value="past"
                      className="flex items-center justify-center border-[0.8px] border-solid border-[#0000] text-gray-900 text-[14px] font-medium leading-[21px] p-[5px_8px] text-center data-[state=active]:bg-white data-[state=active]:rounded-md"
                    >
                      Đã qua
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {displayEvents.length > 0 ? (
                <div className="space-y-4">
                  {displayEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <EventEmptyState
                  onAddEvent={handleCreateEvent}
                  isPast={activeTab === "past"}
                />
              )}
            </TabsContent>

            <TabsContent value="contacts">
              <ContactsTab />
            </TabsContent>

            <TabsContent value="messages">
              <MessagesTab />
            </TabsContent>

            <TabsContent value="payments">
              <PaymentsTab />
            </TabsContent>

            <TabsContent value="details">
              <DetailsTab />
            </TabsContent>

            <TabsContent value="settings">
              <SettingsTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Modals */}
      <ImportLumaEventModal
        isOpen={showImportLumaModal}
        onClose={() => setShowImportLumaModal(false)}
      />
    </div>
  );
}
