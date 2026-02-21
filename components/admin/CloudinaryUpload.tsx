"use client";

import { useState, useRef } from "react";

interface CloudinaryUploadProps {
  onUpload: (url: string) => void;
  onUploadingChange?: (uploading: boolean) => void;
  folder?: string;
  disabled?: boolean;
}

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

export function CloudinaryUpload({
  onUpload,
  onUploadingChange,
  folder = "dorney",
  disabled,
}: CloudinaryUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const setUploadingState = (value: boolean) => {
    setUploading(value);
    onUploadingChange?.(value);
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploadingState(true);
    try {
      const base64 = await readFileAsDataURL(file);
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
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploadingState(false);
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
