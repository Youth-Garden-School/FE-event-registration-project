import Image from "next/image";
import { Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface Event {
  id: string;
  title: string;
  organizer: string;
  startTime: string;
  coverImage: string;
}

export default function ProfilePage() {
  // Mock data - replace with actual data fetching in a real application
  const profileData = {
    name: "Đoàn Vĩnh Khang",
    bio: "tháng 3 năm 2025",
    createAllEvent: 5,
    registration: 0,
    avatarUrl: "/placeholder.svg?height=200&width=200",
  };

  const pastEvents: Event[] = [
    {
      id: "1",
      title: "123",
      organizer: "Đoàn Vĩnh Khang",
      startTime: "20:30 Th 3, 8 thg 4",
      coverImage: "/placeholder.svg?height=100&width=100&text=GUEST-LIST",
    },
    {
      id: "2",
      title: "dvf",
      organizer: "Đoàn Vĩnh Khang",
      startTime: "6:30 Th 5, 27 thg 3",
      coverImage: "/placeholder.svg?height=100&width=100&text=BLAST",
    },
  ];

  return (
    <div className="container max-w-3xl mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row items-start gap-6">
        <Avatar className="w-24 h-24 md:w-32 md:h-32 bg-blue-300">
          <AvatarImage
            src={profileData.avatarUrl || "/placeholder.svg"}
            alt={profileData.name}
          />
          <AvatarFallback className="text-2xl">
            {profileData.name.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-3">
          <h1 className="text-3xl font-bold">{profileData.name}</h1>

          <div className="flex items-center text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Đã tham gia {profileData.bio}</span>
          </div>

          <div className="flex gap-4">
            <div>
              <span className="font-semibold">
                {profileData.createAllEvent}
              </span>{" "}
              <span className="text-muted-foreground">Đã tổ chức</span>
            </div>
            <div>
              <span className="font-semibold">{profileData.registration}</span>{" "}
              <span className="text-muted-foreground">Đã tham dự</span>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      <div>
        <h2 className="text-2xl font-semibold mb-6">Sự kiện đã qua</h2>

        <div className="space-y-6">
          {pastEvents.map((event) => (
            <div key={event.id} className="flex gap-4">
              <div className="shrink-0">
                <Image
                  src={event.coverImage || "/placeholder.svg"}
                  alt={event.title}
                  width={100}
                  height={100}
                  className="rounded-md object-cover"
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-medium">{event.title}</h3>

                <div className="flex items-center text-sm text-muted-foreground">
                  <Avatar className="h-5 w-5 mr-1 bg-blue-300">
                    <AvatarFallback>{event.organizer.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>Bởi {event.organizer}</span>
                </div>

                <div className="text-sm text-muted-foreground">
                  {event.startTime}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
