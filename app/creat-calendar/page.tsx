"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Upload, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(1, { message: "Tên lịch không được để trống" }),
  description: z.string().optional(),
  color: z.string(),
  publicUrl: z.string().optional(),
  location: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateCalendar() {
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState("#3b82f6");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      color: "#3b82f6",
      publicUrl: "",
      location: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log({ ...data, coverImage, profileImage });
  };

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
    <div className="max-w-3xl mx-auto p-6 m-10 bg-gray-200 rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Tạo lịch</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Cover Image */}
          <div className="relative w-full h-64 bg-background rounded-lg overflow-hidden">
            {coverImage ? (
              <img
                src={coverImage || "/placeholder.svg"}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            ) : null}
            <Button
              variant="secondary"
              className="absolute top-4 right-4 cursor-pointer"
              type="button"
              onClick={() => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = "image/*";
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      setCoverImage(e.target?.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                };
                input.click();
              }}
            >
              Thay đổi ảnh bìa
            </Button>

            {/* Profile Image */}
            <div className="absolute bottom-2 left-8 cursor-pointer">
              <div className="relative w-20 h-20 bg-gradient-to-br from-pink-300 to-blue-300 rounded-lg overflow-hidden">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : null}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute inset-0 w-full h-full"
                  type="button"
                  onClick={() => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = "image/*";
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          setProfileImage(e.target?.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    };
                    input.click();
                  }}
                >
                  <Upload className="text-white opacity-70" />
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-background rounded-2xl p-6">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Tên lịch"
                      className="border-0 border-b border-gray-200 rounded-none px-0 text-lg focus-visible:ring-0 focus-visible:border-gray-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Thêm mô tả ngắn."
                      className="mt-4 border-0 resize-none px-0 focus-visible:ring-0 text-gray-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-6">Tùy chỉnh</h2>

            {/* Colors */}
            <div className="mb-6">
              <FormLabel className="block mb-2 ">Màu sắc</FormLabel>
              <div className="flex gap-2 flex-wrap ">
                {colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer${
                      selectedColor === color
                        ? "ring-2 ring-offset-2 ring-gray-400"
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
                      className="data-[state=active]:bg-white rounded-md cursor-pointer "
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

          <Button
            type="submit"
            className="bg-gray-800 hover:bg-gray-700 cursor-pointer"
          >
            <Check className="mr-2 h-4 w-4" /> Tạo lịch
          </Button>
        </form>
      </Form>
    </div>
  );
}
