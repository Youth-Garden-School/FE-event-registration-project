"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { events } from "@/lib/events-calendar-data";
import { EventLeftColumn } from "@/components/common/featured-calendar/event/event-left-column";
import { EventHeader } from "@/components/common/featured-calendar/event/event-header";
import { EventRegistration } from "@/components/common/featured-calendar/event/event-registration";
import { EventInformation } from "@/components/common/featured-calendar/event/event-information";
import { EventLocation } from "@/components/common/featured-calendar/event/event-location";

export default function EventPage() {
  const params = useParams();
  const eventId = params.id as string;
  const [isRegistered, setIsRegistered] = useState(false);

  const eventExists = events.some((e) => e.id.toString() === eventId);

  if (!eventExists) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Không tìm thấy sự kiện</h1>
        <Link href="/" className="text-blue-500 hover:underline">
          Quay lại trang chủ
        </Link>
      </div>
    );
  }

  const handleRegister = () => {
    setIsRegistered(true);
  };

  const handleRegistrationChange = (registered: boolean) => {
    setIsRegistered(registered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main content */}
      <main className="max-w-6xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left column - Event banner and organizers */}
          <div className="md:col-span-5 lg:col-span-4">
            <EventLeftColumn eventId={eventId} />
          </div>

          {/* Right column - Event details */}
          <div className="md:col-span-7 lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Event Header - Title, Date, Location */}
              <EventHeader eventId={eventId} />

              {/* Registration Section */}
              <EventRegistration
                eventId={eventId}
                onRegisterChange={handleRegistrationChange}
              />

              {/* Event Information */}
              <EventInformation eventId={eventId} />

              {/* Location Section */}
              <EventLocation
                eventId={eventId}
                isRegistered={isRegistered}
                onRegister={handleRegister}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
