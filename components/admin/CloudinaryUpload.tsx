"use client";

import { useState, useRef } from "react";

interface CloudinaryUploadProps {
  onUpload: (url: string) => void;
  folder?: string;
  disabled?: boolean;
}

export function CloudinaryUpload({
  onUpload,
  folder = "dorney",
  disabled,
}: CloudinaryUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        const res = await fetch("/api/upload/cloudinary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ file: base64, folder }),
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload failed");
        onUpload(data.url);
        if (inputRef.current) inputRef.current.value = "";
      };
      reader.readAsDataURL(file);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        disabled={disabled || uploading}
        className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:font-medium file:text-white file:cursor-pointer hover:file:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/25"
      />
      {uploading && <p className="text-sm text-gray-500 mt-1.5">Uploading…</p>}
      {error && <p className="text-sm text-red-600 mt-1.5">{error}</p>}
    </div>
  );
}
