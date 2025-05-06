import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface EventTitleProps {
  title: string;
  featured?: boolean;
  featuredLocation?: string;
  hosts?: string[];
  organizers?: Array<{
    id: string;
    name: string;
    role?: string;
    avatar?: string;
  }>;
}

export function EventTitle({
  title,
  featured,
  featuredLocation,
  hosts,
  organizers,
}: EventTitleProps) {
  // Use organizers if available, otherwise fallback to hosts
  const hasOrganizers = organizers && organizers.length > 0;

  return (
    <div className="px-5">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      {featured && (
        <Badge
          variant="outline"
          className="bg-red-100 text-red-700 border-red-200 text-xs mt-2"
        >
          Nổi bật trong {featuredLocation || "TP. Hồ Chí Minh"}
        </Badge>
      )}

      {/* Compact organizer display (style 1) */}
      {hasOrganizers && (
        <div className="flex items-center gap-1 mt-3 text-sm text-gray-600">
          <div className="flex -space-x-2 mr-2">
            {organizers.slice(0, 2).map((organizer) => (
              <div
                key={organizer.id}
                className="w-6 h-6 rounded-full border-2 border-white overflow-hidden"
              >
                {organizer.avatar ? (
                  <Image
                    src={organizer.avatar || "/placeholder.svg"}
                    alt={organizer.name}
                    width={24}
                    height={24}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs">
                    {organizer.name.charAt(0)}
                  </div>
                )}
              </div>
            ))}
          </div>
          <span>
            Được tổ chức bởi {organizers.map((org) => org.name).join(" & ")}
          </span>
        </div>
      )}

      {/* Fallback to hosts if no organizers */}
      {!hasOrganizers && hosts && hosts.length > 0 && (
        <div className="flex items-center gap-1 mt-3 text-sm text-gray-600">
          <span>Được tổ chức bởi</span>
          <div className="flex items-center">
            <div className="w-5 h-5 rounded-full bg-purple-200 flex items-center justify-center text-xs overflow-hidden mr-1">
              {hosts[0].charAt(0)}
            </div>
            <span className="font-medium">{hosts[0]}</span>
          </div>
        </div>
      )}
    </div>
  );
}
