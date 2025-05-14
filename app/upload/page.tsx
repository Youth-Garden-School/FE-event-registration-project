"use client";

import ImageUploader, {
  ImageUploaderRef,
} from "@/components/UploadImage/imageSupabase";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

export default function UploadCard() {
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null); // URL ảnh chính
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // URL ảnh tạm thời
  const [message, setMessage] = useState<string | null>(null); // Thông báo
  const uploaderRef = useRef<ImageUploaderRef>(null); // Updated ref type

  const defaultImage =
    "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=400,height=400/gallery-images/ry/bd098b7b-aae7-495c-9b4d-2ff4c014a61e";

  const handleFileSelected = (file: File) => {
    const tempUrl = URL.createObjectURL(file);
    setPreviewUrl(tempUrl);
    setMessage(null); // Reset thông báo khi chọn file mới
  };

  const handleUploadSuccess = (url: string) => {
    console.log("Uploaded URL:", url);
    setUploadedUrl(url);
    setPreviewUrl(null);
    setMessage("Upload thành công!");
  };

  const handleSave = async () => {
    if (uploaderRef.current) {
      try {
        const url = await uploaderRef.current.upload(); // Now expecting a string return
        handleUploadSuccess(url); // Use the returned URL
      } catch (error) {
        setMessage(
          "Upload thất bại: " +
            (error instanceof Error ? error.message : "Unknown error"),
        );
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="block relative w-[400px] h-[400px]">
        <div className="overflow-hidden rounded-3xl bg-black w-full h-full">
          <img
            src={uploadedUrl || previewUrl || defaultImage}
            alt="Card image"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute pt-2 left-4 flex items-center gap-2 ">
          <ImageUploader
            ref={uploaderRef}
            onFileSelected={handleFileSelected}
            onUploadSuccess={handleUploadSuccess}
          />
          {previewUrl && (
            <Button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 cursor-pointer"
            >
              Lưu
            </Button>
          )}
        </div>

        {message && (
          <div className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
