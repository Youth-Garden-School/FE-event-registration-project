import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Check } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface CalendarCustomizationProps {
  form: UseFormReturn<any>; // Bạn nên thay `any` bằng interface chính xác nếu có
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}

export default function CalendarCustomization({
  form,
  selectedColor,
  setSelectedColor,
}: CalendarCustomizationProps) {
  const colors = [
    "#9ca3af", // gray
    "#ec4899", // pink
    "#a855f7", // purple
    "#4f46e5", // indigo
    "#3b82f6", // blue
    "#22c55e", // green
    "#eab308", // yellow
    "#f97316", // orange
    "#ef4444", // red
    "#38bdf8", // light blue
  ];

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-6">Tùy chỉnh</h2>

      {/* Colors */}
      <div className="mb-6">
        <FormLabel className="block mb-2">Màu sắc</FormLabel>
        <div className="flex gap-2 flex-wrap">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer${
                selectedColor === color
                  ? " ring-2 ring-offset-2 ring-gray-400"
                  : ""
              }`}
              style={{ backgroundColor: color }}
              onClick={() => {
                setSelectedColor(color);
                form.setValue("color", color);
              }}
            >
              {selectedColor === color && (
                <Check className="text-white" size={16} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Public URL */}
      <div className="mb-6">
        <FormLabel className="block mb-2">URL công khai</FormLabel>
        <div className="flex">
          <div className="bg-gray-100 px-3 py-2 rounded-l-md flex items-center text-gray-500">
            lu.ma/
          </div>
          <FormField
            control={form.control}
            name="publicUrl"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input {...field} className="rounded-l-none" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Location */}
      <div>
        <FormLabel className="block mb-2">Địa điểm</FormLabel>
        <div className="bg-gray-200 rounded-lg p-1 mb-2">
          <Tabs defaultValue="city">
            <TabsList className="grid grid-cols-2 bg-transparent">
              <TabsTrigger
                value="city"
                className="data-[state=active]:bg-white rounded-md cursor-pointer"
              >
                Thành phố
              </TabsTrigger>
              <TabsTrigger
                value="global"
                className="data-[state=active]:bg-white rounded-md cursor-pointer"
              >
                Toàn cầu
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="relative">
          <div className="h-40 bg-gray-100 rounded-lg mb-2">
            <img
              className="w-[672px] h-[160px] rounded-2xl"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/A_large_blank_world_map_with_oceans_marked_in_blue.PNG/1024px-A_large_blank_world_map_with_oceans_marked_in_blue.PNG"
              alt=""
            />
          </div>
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <MapPin
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <Input
                      {...field}
                      placeholder="Chọn một thành phố"
                      className="pl-10"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
