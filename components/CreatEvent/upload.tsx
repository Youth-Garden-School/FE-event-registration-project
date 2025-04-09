// app/upload/page.tsx
"use client";

import ImageUploader from "@/components/UploadImage/imageSupabase";
import { useState } from "react";

export default function UploadPage() {
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const handleUploadSuccess = (url: string) => {
    console.log("Uploaded URL:", url);
    setUploadedUrl(url);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Upload Image</h1>
      <ImageUploader onUploadSuccess={handleUploadSuccess} />
      {uploadedUrl && (
        <div className="mt-4">
          <p className="text-green-500">Upload thành công! URL:</p>
          <a
            href={uploadedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {uploadedUrl}
          </a>
          <img
            src={uploadedUrl}
            alt="Uploaded image"
            className="mt-2 max-w-xs rounded-lg"
          />
        </div>
      )}
    </div>
  );
}
