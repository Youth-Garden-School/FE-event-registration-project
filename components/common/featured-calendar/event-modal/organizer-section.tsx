import Image from "next/image";
import { ExternalLink, X } from "lucide-react";

interface OrganizerSectionProps {
  organizers?: Array<{
    id: string;
    name: string;
    role?: string;
    avatar?: string;
  }>;
  hosts?: string[];
}

export function OrganizerSection({ organizers, hosts }: OrganizerSectionProps) {
  // Use organizers if available, otherwise fallback to hosts
  const hasOrganizers = organizers && organizers.length > 0;

  return (
    <div className="p-5 border-t border-gray-100">
      <h3 className="font-medium text-lg mb-3">Được tổ chức bởi</h3>

      {/* Detailed organizer list (style 2) */}
      {hasOrganizers && (
        <div className="space-y-3">
          {organizers.map((organizer) => (
            <div
              key={organizer.id}
              className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                  {organizer.avatar ? (
                    <Image
                      src={organizer.avatar || "/placeholder.svg"}
                      alt={organizer.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-base font-medium">
                      {organizer.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-medium">{organizer.name}</div>
                  {organizer.role && (
                    <div className="text-sm text-gray-500">
                      {organizer.role}
                    </div>
                  )}
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 p-1.5 hover:bg-gray-100 rounded-full">
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Fallback to single organizer if no organizers array */}
      {!hasOrganizers && hosts && hosts.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-lg overflow-hidden">
              {hosts[0].charAt(0)}
            </div>
            <div>
              <div className="font-medium">{hosts[0]}</div>
              <div className="text-sm text-gray-500">Người tổ chức sự kiện</div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full">
              <ExternalLink className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
