import { Share2 } from "lucide-react";

interface EventDescriptionProps {
  description: string;
}

export function EventDescription({ description }: EventDescriptionProps) {
  return (
    <div className="p-5 border-t border-gray-100">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium text-lg">Thông tin sự kiện</h3>
        <button className="text-gray-500 hover:bg-gray-100 p-2 rounded-full">
          <Share2 className="h-5 w-5" />
        </button>
      </div>
      <div className="text-gray-700">
        <p>{description}</p>
      </div>
    </div>
  );
}
