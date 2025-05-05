import HeroSection from "@/components/common/eventai/HeroSection";
import PopularCalendars from "@/components/common/eventai/PopularCalendars";
import NearbyEvents from "@/components/common/eventai/NearbyEvents";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1">
        {/* Container gói toàn bộ và tạo lề trái/phải đều nhau */}
        <div className="max-w-7xl mx-auto px-4">
          <HeroSection />
          <PopularCalendars />
          <NearbyEvents />
        </div>
      </div>
    </main>
  );
}
