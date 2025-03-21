import EventList from "@/components/common/event-list";
import EventTabs from "@/components/common/event-tabs";
import { events } from "@/lib/data";

export default function Home() {
  return (
    <div className="w-[820px] mx-auto px-10 py-15">
      <div className="flex items-center gap-10 mb-8">
        <h1 className="text-white w-[788px] text-[32px] font-semibold leading-[38.4px]">
          Sự kiện
        </h1>
        <EventTabs />
      </div>
      <EventList events={events} />
    </div>
  );
}
