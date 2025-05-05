"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { formSchema } from "./FormSchema";
import CalendarDetails from "./CalendarDetails";
import CalendarCustomization from "./CalendarCustomization";
import { Check } from "lucide-react";
import { apiClient, API_BASE_URL } from "@/components/common/apiClient";
import ImageUploader from "@/components/UploadImage/imageSupabase";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function CreateCalendar() {
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null);
  const [coverUploadedUrl, setCoverUploadedUrl] = useState<string | null>(null);
  const [profilePreviewUrl, setProfilePreviewUrl] = useState<string | null>(
    null,
  );
  const [profileUploadedUrl, setProfileUploadedUrl] = useState<string | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const coverUploaderRef = useRef<{ upload: () => Promise<void> }>(null);
  const profileUploaderRef = useRef<{ upload: () => Promise<void> }>(null);
  const router = useRouter();

  const defaultCoverImage =
    "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=672,height=160/gallery-images/ry/bd098b7b-aae7-495c-9b4d-2ff4c014a61e";
  const defaultProfileImage =
    "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=80,height=80/gallery-images/ry/bd098b7b-aae7-495c-9b4d-2ff4c014a61e";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      color: "#3b82f6",
      publicUrl: "",
      location: "",
    },
  });

  const handleCoverFileSelected = (file: File) => {
    const tempUrl = URL.createObjectURL(file);
    setCoverPreviewUrl(tempUrl);
    setError(null);
  };

  const handleProfileFileSelected = (file: File) => {
    const tempUrl = URL.createObjectURL(file);
    setProfilePreviewUrl(tempUrl);
    setError(null);
  };

  async function onSubmit(data) {
    console.log("Form submitted with values:", data);
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("Vui lòng đăng nhập để tạo lịch");
      }

      let coverImageUrl = coverUploadedUrl || defaultCoverImage;
      let profileImageUrl = profileUploadedUrl || defaultProfileImage;

      // Upload cover image if selected
      if (coverPreviewUrl && coverUploaderRef.current) {
        console.log("Uploading cover image...");
        await coverUploaderRef.current.upload();
        coverImageUrl = coverUploadedUrl || defaultCoverImage;
        console.log("Cover image uploaded successfully, URL:", coverImageUrl);
      }

      // Upload profile image if selected
      if (profilePreviewUrl && profileUploaderRef.current) {
        console.log("Uploading profile image...");
        await profileUploaderRef.current.upload();
        profileImageUrl = profileUploadedUrl || defaultProfileImage;
        console.log(
          "Profile image uploaded successfully, URL:",
          profileImageUrl,
        );
      }

      // Map form values to API payload
      const payload = {
        name: data.name,
        color: data.color,
        description: data.description || "",
        publicUrl: data.publicUrl ? `lu.ma/${data.publicUrl}` : "",
        location: data.location || "",
        coverImage: coverImageUrl,
        profileImage: profileImageUrl,
      };

      console.log("Sending API request with payload:", payload);
      const response = await apiClient.post(
        `${API_BASE_URL}/calendars`,
        payload,
        token,
      );
      console.log("API response:", response);
      setSuccess("Lịch đã được tạo thành công!");
      toast.success("Lịch đã được tạo thành công!");
      form.reset();
      setCoverPreviewUrl(null);
      setCoverUploadedUrl(null);
      setProfilePreviewUrl(null);
      setProfileUploadedUrl(null);
      router.push("/calendars");
    } catch (err) {
      const message = err.message || "Đã xảy ra lỗi khi tạo lịch";
      console.error("Submission error:", err);
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 m-10 bg-gray-200 rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Tạo lịch</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Cover Image */}
          <div className="relative w-full h-64 bg-background rounded-lg overflow-hidden">
            <img
              src={coverUploadedUrl || coverPreviewUrl || defaultCoverImage}
              alt="Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4">
              <ImageUploader
                ref={coverUploaderRef}
                onFileSelected={handleCoverFileSelected}
                onUploadSuccess={(url) => {
                  setCoverUploadedUrl(url);
                  toast.success("Ảnh bìa đã được tải lên!");
                }}
              />
            </div>
            {/* Profile Image */}
            <div className="absolute bottom-2 left-8">
              <div className="relative w-20 h-20 bg-gradient-to-br from-pink-300 to-blue-300 rounded-lg overflow-hidden">
                <img
                  src={
                    profileUploadedUrl ||
                    profilePreviewUrl ||
                    defaultProfileImage
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <ImageUploader
                    ref={profileUploaderRef}
                    onFileSelected={handleProfileFileSelected}
                    onUploadSuccess={(url) => {
                      setProfileUploadedUrl(url);
                      toast.success("Ảnh hồ sơ đã được tải lên!");
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <CalendarDetails form={form} />
          <CalendarCustomization
            form={form}
            selectedColor={form.watch("color")}
            setSelectedColor={(color) => form.setValue("color", color)}
          />
          <Button
            type="submit"
            className="bg-gray-800 hover:bg-gray-700 cursor-pointer"
            disabled={isSubmitting}
          >
            <Check className="mr-2 h-4 w-4" />{" "}
            {isSubmitting ? "Đang tạo..." : "Tạo lịch"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
