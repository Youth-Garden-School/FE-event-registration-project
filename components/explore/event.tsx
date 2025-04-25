import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import Link from "next/link";

// Schema validation với Zod
const eventSchema = z.object({
  id: z.string(),
  name: z.string(),
  date: z.string(),
  time: z.string(),
  location: z.string(),
  image: z.string().url(),
});

// Props validation
type EventProps = z.infer<typeof eventSchema>;

const events: EventProps[] = [
  {
    id: "1",
    name: "VCs x Builder Mixer",
    date: "Th 4, 26 thg 3",
    time: "18:00",
    location: "Tòa nhà Republic Plaza",
    image: "/images/events/vcs-mixer.jpg",
  },
  {
    id: "2",
    name: "Sui Vietnam Meetup: Afternoon Tea",
    date: "Th 5, 27 thg 3",
    time: "18:00",
    location: "Tòa nhà Republic Plaza",
    image: "/images/events/vcs-mixer.jpg",
  },
  {
    id: "3",
    name: "Chung kết Web3 Ideathon 2025",
    date: "Th 6, 28 thg 3",
    time: "13:30",
    location: "Trung tâm Hội nghị - Tiệc cưới",
    image: "/images/events/vcs-mixer.jpg",
  },
  {
    id: "4",
    name: "Theory of Next: Vietnam Chapter",
    date: "Th 6, 28 thg 3",
    time: "16:00",
    location: "Quận 2",
    image: "/images/events/vcs-mixer.jpg",
  },
  {
    id: "5",
    name: "Connecting Diasporas",
    date: "Th 6, 28 thg 3",
    time: "18:00",
    location: "TBA",
    image: "/images/events/vcs-mixer.jpg",
  },
  {
    id: "6",
    name: "HCMC Content Creator Meetup",
    date: "Th 6, 28 thg 3",
    time: "18:30",
    location: "The Hive Villa",
    image: "/images/events/vcs-mixer.jpg",
  },
];

const EventList: React.FC = () => {
  return (
    <section className="w-full py-6 ">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900">Khám phá sự kiện</h2>
        <p className="text-gray-600 mt-2">
          Khám phá các sự kiện phổ biến gần bạn, duyệt theo danh mục, hoặc xem
          qua một số lịch cộng đồng tuyệt vời.
        </p>
        <div className="flex ">
          <div className="">
            <h3 className="text-xl font-semibold text-gray-800 mt-6">
              Sự kiện phổ biến
            </h3>
            <p className="text-gray-500">TP. Hồ Chí Minh</p>
          </div>
          <div className="mt-6 relative">
            <Button className="w-[115px] absolute left-[580px] cursor-pointer hover:bg-gray-300 hover:text-bl">
              <Link href="/">Xem tất cả →</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {events.map((event) => (
            <div key={event.id} className="flex space-x-4 cursor-pointer">
              <div className="w-24 h-24 relative">
                <Image
                  src={event.image}
                  alt={event.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">
                  {event.name}
                </h4>
                <p className="text-gray-600 text-sm py-2">
                  {event.time} {event.date}
                </p>
                <p className="text-gray-500 text-sm">{event.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventList;
