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
import { useState, useRef } from "react";
import { format } from "date-fns";
import ImageUploader from "@/components/UploadImage/imageSupabase";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function EventForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const uploaderRef = useRef<{ upload: () => Promise<void> } | null>(null);
  const router = useRouter();

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

  const handleFileSelected = (file: File) => {
    const tempUrl = URL.createObjectURL(file);
    setPreviewUrl(tempUrl);
    setError(null);
    setSuccess("Ảnh đã được chọn, nhấn 'Tạo sự kiện' để tải lên.");
  };

  async function onSubmit(values) {
    console.log("Form submitted with values:", values);
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    if (Object.keys(errors).length > 0) {
      console.error("Form validation errors:", errors);
      setError("Vui lòng kiểm tra lại các trường thông tin.");
      setIsSubmitting(false);
      return;
    }

    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      if (!token) {
        throw new Error("Vui lòng đăng nhập để tạo sự kiện");
      }

      let coverImageUrl = defaultImage;
      if (previewUrl && uploaderRef.current) {
        console.log("Uploading image...");
        try {
          const url = await uploaderRef.current.upload();
          coverImageUrl = url;
          console.log("Image uploaded successfully, URL:", url);
        } catch (uploadErr) {
          console.error("Image upload error:", uploadErr);
          throw new Error(`Tải ảnh thất bại: ${uploadErr.message}`);
        }
      } else {
        console.log("No image selected, using default:", coverImageUrl);
      }

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

      console.log("Sending API request with payload:", payload);
      const response = await apiClient.post(
        `${API_BASE_URL}/events`,
        payload,
        token,
      );
      console.log("API response:", response);
      setSuccess("Sự kiện đã được tạo thành công!");
      form.reset();
      setPreviewUrl(null);
      setUploadedUrl(null);
      router.push("/event");
    } catch (err) {
      const message = err.message || "Đã xảy ra lỗi khi tạo sự kiện";
      console.error("Submission error:", err);
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto p-4">
      <div className="w-full md:w-2/5 mr-8">
        <div className="overflow-hidden rounded-3xl bg-black w-[400px] h-[400px]">
          <Image
            src={uploadedUrl || previewUrl || defaultImage}
            alt="Event cover"
            className="w-full h-full object-cover"
            width={400}
            height={400}
          />
        </div>
        <div className="mt-4">
          <ImageUploader
            ref={uploaderRef}
            onFileSelected={handleFileSelected}
            onUploadSuccess={async (url) => {
              console.log("Upload success, setting uploadedUrl:", url);
              setUploadedUrl(url);
              setSuccess("Ảnh đã được tải lên thành công!");
            }}
          />
        </div>
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
