"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ModalHeader } from "./modal-header";
import { EventBanner } from "./event-banner";
import { EventTitle } from "./event-title";
import { EventDateTime } from "./event-date-time";
import { RegistrationSection } from "./registration-section";
import { EventDescription } from "./event-description";
import { LocationSection } from "./location-section";
import { OrganizerSection } from "./organizer-section";
import { AttendeesSection } from "./attendees-section";
import { ModalFooter } from "./modal-footer";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: any;
}

export function EventModal({ isOpen, onClose, event }: EventModalProps) {
  const [isRegistered, setIsRegistered] = useState(false);
  const router = useRouter();

  if (!event) return null;

  // Format date to Vietnamese
  const formatDate = (date: Date) => {
    const dayOfWeek = format(date, "EEEE", { locale: vi });
    const dayOfMonth = date.getDate();
    const month = date.getMonth() + 1;
    return `${dayOfWeek}, ${dayOfMonth} tháng ${month}`;
  };

  const handleRegister = () => {
    setIsRegistered(true);
  };

  const handleCancelRegistration = () => {
    setIsRegistered(false);
  };

  // Check if the event is online
  const isOnlineEvent =
    event.location?.toLowerCase().includes("online") ||
    event.location?.toLowerCase().includes("zoom") ||
    event.type === "online";

  // Update the isPosterEvent condition and use the event's posterImage
  const isPosterEvent = event.id === 3;

  const handleViewEventPage = () => {
    router.push(`/event-join/${event.id}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 overflow-hidden"
          onClick={onClose}
        >
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
          >
            <ModalHeader
              onClose={onClose}
              eventId={event.id}
              eventUrl={`/event-join/${event.id}`}
            />

            {isPosterEvent ? (
              <div className="p-4">
                <Image
                  src={event.posterImage || "/images/event-poster.png"}
                  alt={event.title}
                  width={400}
                  height={600}
                  className="w-full h-auto rounded-xl"
                />
              </div>
            ) : (
              <>
                <EventBanner
                  image={event.posterImage || event.image}
                  title={event.title}
                />
                <EventTitle
                  title={event.title}
                  featured={event.featured}
                  featuredLocation={event.featuredLocation}
                  hosts={event.hosts}
                  organizers={event.organizers}
                />
                <EventDateTime
                  date={event.date}
                  time={event.time}
                  location={event.location}
                  city={event.city}
                  isOnlineEvent={isOnlineEvent}
                  formatDate={formatDate}
                />
              </>
            )}

            <RegistrationSection
              isRegistered={isRegistered}
              onRegister={handleViewEventPage}
              onCancelRegistration={handleCancelRegistration}
            />

            {!isPosterEvent && (
              <>
                <EventDescription description={event.description} />
                <LocationSection
                  isOnlineEvent={isOnlineEvent}
                  isRegistered={isRegistered}
                  event={event}
                  onRegister={handleRegister}
                />
                <OrganizerSection
                  organizers={event.organizers}
                  hosts={event.hosts}
                />
              </>
            )}

            {isPosterEvent ? (
              <div className="p-4">
                <Image
                  src="/images/organizers-info.png"
                  alt="Thông tin người tổ chức"
                  width={400}
                  height={300}
                  className="w-full h-auto rounded-xl"
                />
              </div>
            ) : (
              event.attendees > 0 && (
                <AttendeesSection
                  attendees={event.attendees}
                  attendeesList={event.attendeesList}
                />
              )
            )}

            <ModalFooter />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
