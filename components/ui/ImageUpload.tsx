"use client";

import { useState } from "react";
// import { supabase } from "@/lib/supabase";
import Image from "next/image";

type ImageUploadProps = {
  onUpload: (url: string) => void; // передає URL після завантаження
  currentImage?: string;
};

export default function ImageUpload({
  onUpload,
  currentImage,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    // Відправляємо через API route замість напряму в Supabase
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.url) {
      setPreview(data.url);
      onUpload(data.url);
    }

    setUploading(false);
  };

  return (
    <div className="flex flex-col gap-3">
      {preview && (
        <Image
          src={preview}
          alt="Product preview"
          width={200}
          height={200}
          className="rounded-lg object-cover"
        />
      )}

      <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm text-center">
        {uploading ? "Uploading..." : "Upload Image"}
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
          disabled={uploading}
        />
      </label>
    </div>
  );
}
