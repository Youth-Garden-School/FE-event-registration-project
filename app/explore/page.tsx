import Calendar from "@/components/explore/calendar";
import EventList from "@/components/explore/event";
import LocalEvents from "@/components/explore/local";
import ListList from "@/components/explore/list";

export default function Featuredcalendars() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <EventList />
      <ListList />
      <Calendar />
      <LocalEvents />
    </div>
  );
}
