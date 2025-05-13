"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import { apiClient, API_BASE_URL } from "@/components/common/apiClient";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "./formSchema";
import EventFormHeader from "./eventFormHeader";
import EventTimePicker from "./eventTimePicker";
import EventDetails from "./eventDetail";
import EventOptions from "./eventOption";

export default function EventForm() {
  const router = useRouter();
  const params = useParams();
  const eventId = params?.id as string;

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [currentCoverImage, setCurrentCoverImage] = useState<string | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);

  const defaultImage =
    "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=672,height=160/gallery-images/ry/bd098b7b-aae7-495c-9b4d-2ff4c014a61e";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      startDate: new Date(new Date().setHours(9, 0, 0, 0)),
      endDate: new Date(new Date().setHours(10, 0, 0, 0)),
      location: "",
      description: "",
      requireApproval: false,
      capacity: "Không giới hạn",
    },
  });

  const {
    formState: { errors },
  } = form;

  // Fetch event data
  useEffect(() => {
    async function fetchEvent() {
      if (!eventId) {
        setError("Không tìm thấy ID sự kiện. Vui lòng kiểm tra URL.");
        setIsLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("ACCESS_TOKEN");
        if (!token) throw new Error("Vui lòng đăng nhập để chỉnh sửa sự kiện");

        const response = await apiClient.get<{ result: any }>(
          `${API_BASE_URL}/events/${eventId}`,
          token,
        );
        const event = response.result || response;

        if (!event) throw new Error("Không tìm thấy dữ liệu sự kiện");

        const startDateTime = parseISO(event.startTime);
        const endDateTime = parseISO(event.endTime);

        form.reset({
          title: event.title || "",
          startDate: startDateTime,
          endDate: endDateTime,
          location: event.location || "",
          description: event.description || "",
          requireApproval: event.requiresApproval || false,
          capacity: event.capacity || "Không giới hạn",
        });

        setCurrentCoverImage(event.coverImage || defaultImage);
        setIsLoading(false);
      } catch (err: any) {
        console.error("Error fetching event:", err);
        setError(`Không thể tải thông tin sự kiện: ${err.message}`);
        setIsLoading(false);
      }
    }

    fetchEvent();
  }, [eventId, form]);

  const sanitizeFileName = (name: string) => {
    return name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9._-]/g, "")
      .toLowerCase();
  };

  const handleFileSelected = async (selectedFile: File) => {
    try {
      // Validate file
      if (
        !["image/jpeg", "image/png", "image/gif"].includes(selectedFile.type)
      ) {
        throw new Error("Chỉ hỗ trợ ảnh JPG, PNG, GIF");
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        throw new Error("Ảnh phải nhỏ hơn 5MB");
      }

      // Set file and preview
      setFile(selectedFile);
      const tempUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(tempUrl);
      setError(null);
      setSuccess("Ảnh đã được chọn. Vui lòng gửi form để cập nhật.");
    } catch (err: any) {
      console.error("File Selection Error:", err);
      setError(err.message);
      setFile(null);
      setPreviewUrl(null);
    }
  };

  const extractSupabaseFilePath = (url: string): string | null => {
    if (!url.includes("supabase")) return null;
    const parts = url.split("/storage/v1/object/public/images/");
    return parts[1] || null;
  };

  async function onSubmit(values) {
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    if (Object.keys(errors).length > 0) {
      setError("Vui lòng kiểm tra lại các trường thông tin.");
      setIsSubmitting(false);
      return;
    }

    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      if (!token) throw new Error("Vui lòng đăng nhập để cập nhật sự kiện");

      let coverImageUrl = currentCoverImage || defaultImage;

      // Handle image upload if a new file is selected
      if (file) {
        // Delete existing image from Supabase if it's a Supabase URL
        if (currentCoverImage) {
          const filePath = extractSupabaseFilePath(currentCoverImage);
          if (filePath) {
            const { error: deleteError } = await supabase.storage
              .from("images")
              .remove([filePath]);
            if (deleteError) {
              console.warn("Failed to delete old image:", deleteError.message);
            }
          }
        }

        // Upload new image
        const sanitizedName = sanitizeFileName(file.name);
        const fileName = `${Date.now()}_${sanitizedName}`;
        const { error: uploadError } = await supabase.storage
          .from("images")
          .upload(fileName, file, { cacheControl: "3600", upsert: false });

        if (uploadError)
          throw new Error(`Tải ảnh thất bại: ${uploadError.message}`);

        const { data: urlData } = supabase.storage
          .from("images")
          .getPublicUrl(fileName);

        if (!urlData.publicUrl) throw new Error("Không thể lấy URL ảnh");

        coverImageUrl = urlData.publicUrl;
        setUploadedUrl(coverImageUrl);
      }

      // Prepare payload for API
      const payload = {
        title: values.title,
        description: values.description || "",
        coverImage: coverImageUrl,
        startTime: format(values.startDate, "yyyy-MM-dd'T'HH:mm:ss"),
        endTime: format(values.endDate, "yyyy-MM-dd'T'HH:mm:ss"),
        location: values.location || "",
        isOnline: values.location?.startsWith("http") || false,
        eventColor: "#FF5733",
        fontStyle: "Arial",
        themeMode: "LIGHT",
        style: "MINIMAL",
        seasonalTheme: "SPRING",
        requiresApproval: values.requireApproval,
      };

      // Update event via API
      await apiClient.put(`${API_BASE_URL}/events/${eventId}`, payload, token);

      setSuccess("Sự kiện đã được cập nhật thành công!");
      setUploadedUrl(null);
      setPreviewUrl(null);
      setFile(null);
      router.push("/event");
    } catch (err: any) {
      console.error("Error updating event:", err);
      setError(err.message || "Đã xảy ra lỗi khi cập nhật sự kiện");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return <div>Đang tải thông tin sự kiện...</div>;
  }

  if (error && !isSubmitting) {
    return (
      <div>
        <p className="text-red-500">{error}</p>
        <Button
          onClick={() => router.push("/event")}
          className="mt-4 bg-amber-700 hover:bg-amber-800"
        >
          Quay lại danh sách sự kiện
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto p-4">
      <div className="w-full md:w-2/5 mr-8">
        <div
          className="overflow-hidden rounded-3xl bg-black w-[400px] h-[400px] cursor-pointer"
          onClick={() => document.getElementById("imageInput")?.click()}
        >
          <Image
            src={previewUrl || currentCoverImage || defaultImage}
            alt="Event cover"
            className="w-full h-full object-cover"
            width={400}
            height={400}
          />
        </div>
        <input
          id="imageInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const selectedFile = e.target.files?.[0];
            if (selectedFile) handleFileSelected(selectedFile);
          }}
        />
      </div>

      <div className="w-full md:w-3/5">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        {Object.keys(errors).length > 0 && (
          <div className="text-red-500 mb-4">
            {Object.entries(errors).map(([field, error]) => (
              <p key={field}>{error.message}</p>
            ))}
          </div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Tên sự kiện"
                      className="text-4xl font-medium border-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <EventFormHeader />
            <EventTimePicker />
            <EventDetails form={form} />
            <EventOptions form={form} />
            <Button
              type="submit"
              className="w-full bg-amber-700 hover:bg-amber-800 cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Đang cập nhật..." : "Cập nhật sự kiện"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
