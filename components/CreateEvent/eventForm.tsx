"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "./formSchema";
import EventFormHeader from "./eventFormHeader";
import EventTimePicker from "./eventTimePicker";
import EventDetails from "./eventDetail";
import EventOptions from "./eventOption";
import { apiClient, API_BASE_URL } from "@/components/common/apiClient";
import { useState } from "react";
import { format } from "date-fns";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { z } from "zod";

// Lấy kiểu dữ liệu từ formSchema
type FormValues = z.infer<typeof formSchema>;

export default function EventForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const defaultImage =
    "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=672,height=160/gallery-images/ry/bd098b7b-aae7-495c-9b4d-2ff4c014a61e";

  const form = useForm<FormValues>({
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

  const sanitizeFileName = (name: string) => {
    return name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9._-]/g, "")
      .toLowerCase();
  };

  const handleFileSelected = async (file: File) => {
    try {
      const tempUrl = URL.createObjectURL(file);
      setPreviewUrl(tempUrl);
      setSuccess("Đang tải ảnh lên...");

      // Validate file
      if (
        !["image/jpeg", "image/png", "image/gif"].includes(file.type) ||
        file.size > 5 * 1024 * 1024
      ) {
        throw new Error("Chỉ hỗ trợ ảnh JPG, PNG, GIF nhỏ hơn 5MB");
      }

      // Upload to Supabase
      const sanitizedName = sanitizeFileName(file.name);
      const fileName = `${Date.now()}_${sanitizedName}`;
      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(fileName, file, { cacheControl: "3600", upsert: false });

      if (uploadError) throw new Error(uploadError.message);

      const { data: urlData } = supabase.storage
        .from("images")
        .getPublicUrl(fileName);

      if (!urlData.publicUrl) throw new Error("Không thể lấy URL ảnh");

      setUploadedUrl(urlData.publicUrl);
      setSuccess("Ảnh đã được tải lên thành công!");
    } catch (err: any) {
      console.error("Upload Error:", err);
      setError(err.message || "Tải ảnh thất bại");
      setUploadedUrl(null);
      setPreviewUrl(null);
    }
  };

  async function onSubmit(values: FormValues) {
    // Xác định kiểu cho values
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
      if (!token) throw new Error("Vui lòng đăng nhập để tạo sự kiện");

      const coverImageUrl = uploadedUrl || defaultImage;

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

      await apiClient.post(`${API_BASE_URL}/events`, payload, token);

      setSuccess("Sự kiện đã được tạo thành công!");
      form.reset();
      setUploadedUrl(null);
      setPreviewUrl(null);
      router.push("/event");
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi khi tạo sự kiện");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto p-4">
      <div className="w-full md:w-2/5 mr-8">
        <div
          className="overflow-hidden rounded-3xl bg-black w-[400px] h-[400px] cursor-pointer"
          onClick={() => document.getElementById("imageInput")?.click()}
        >
          <Image
            src={uploadedUrl || previewUrl || defaultImage}
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
            const file = e.target.files?.[0];
            if (file) handleFileSelected(file);
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
              {isSubmitting ? "Đang tạo..." : "Tạo sự kiện"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
