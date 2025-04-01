import { Share2 } from "lucide-react";
import { events } from "@/lib/events-calendar-data";

interface EventInformationProps {
  eventId: string | number;
}

export function EventInformation({ eventId }: EventInformationProps) {
  // Find the event from data
  const event = events.find((e) => e.id.toString() === eventId.toString());

  if (!event) return null;

  const { description } = event;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium text-lg">Thông tin sự kiện</h3>
        <button className="text-gray-500 hover:bg-gray-100 p-2 rounded-full">
          <Share2 className="h-5 w-5" />
        </button>
      </div>

      <div className="prose max-w-none text-gray-700">
        <p>{description}</p>
      </div>
    </div>
  );
}
