import { Globe, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface VisibilitySelectorProps {
  visibility: { label: string; icon: JSX.Element };
  setVisibility: (visibility: { label: string; icon: JSX.Element }) => void;
}

export default function VisibilitySelector({
  visibility,
  setVisibility,
}: VisibilitySelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 cursor-pointer">
          {visibility.icon}
          {visibility.label}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-down"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="cursor-pointer w-[290px] h-[75px]"
          onClick={() =>
            setVisibility({
              label: "Công khai",
              icon: <Globe className="h-4 w-4" />,
            })
          }
        >
          <Globe className="h-4 w-4" />
          <div>
            <h1 className="text-black">Công khai</h1>
            <p className="text-gray-500">
              Hiển thị trên lịch của bạn và có thể được nổi bật.
            </p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer w-[290px] h-[75px]"
          onClick={() =>
            setVisibility({
              label: "Riêng tư",
              icon: <User className="h-5 w-5 text-muted-foreground" />,
            })
          }
        >
          <User className="h-5 w-5 text-muted-foreground" />
          <div>
            <h1 className="text-black">Riêng tư</h1>
            <p className="text-gray-500">
              Không công khai. Chỉ những người có đường dẫn mới có thể đăng kí.
            </p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
