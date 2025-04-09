"use client";

import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";

interface ImageUploaderProps {
  onFileSelected?: (file: File) => void;
  onUploadSuccess?: (url: string) => void;
}

export interface ImageUploaderRef {
  upload: () => Promise<void>;
}

const ImageUploader = forwardRef<ImageUploaderRef, ImageUploaderProps>(
  ({ onFileSelected, onUploadSuccess }, ref) => {
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (!selectedFile) {
        setError("Không có file được chọn");
        return;
      }
      if (
        !["image/jpeg", "image/png", "image/gif"].includes(selectedFile.type)
      ) {
        setError("Chỉ hỗ trợ file .jpg, .png hoặc .gif");
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError("File phải nhỏ hơn 5MB");
        return;
      }

      setFile(selectedFile);
      setError(null);
      onFileSelected?.(selectedFile);
    };

    const handleUpload = async () => {
      if (!file) {
        throw new Error("Vui lòng chọn một file trước");
      }

      setIsUploading(true);
      setError(null);

      try {
        const fileName = `images/${Date.now()}_${file.name}`;

        const { data, error: uploadError } = await supabase.storage
          .from("images")
          .upload(fileName, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          throw new Error(`Upload failed: ${uploadError.message}`);
        }

        const { data: urlData } = supabase.storage
          .from("images")
          .getPublicUrl(fileName);

        const publicUrl = urlData.publicUrl;

        if (!publicUrl) {
          throw new Error("Không thể lấy URL của file");
        }

        onUploadSuccess?.(publicUrl);
        setFile(null);
      } catch (err: any) {
        console.error("Supabase Storage Error:", err);
        setError(`Upload thất bại: ${err.message || "Unknown error"}`);
        throw err; // Ném lỗi lên để parent xử lý
      } finally {
        setIsUploading(false);
      }
    };

    // Expose hàm upload cho parent qua ref
    useImperativeHandle(ref, () => ({
      upload: handleUpload,
    }));

    if (!isMounted) return null;

    return (
      <div className="flex items-center gap-2">
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isUploading}
          className="w-auto"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  },
);

ImageUploader.displayName = "ImageUploader";

export default ImageUploader;
