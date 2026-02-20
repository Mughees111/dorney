/**
 * Cloudinary configuration for image uploads
 * Used in admin panel and API routes
 */

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };

export async function uploadImage(
  file: string | Buffer,
  options?: {
    folder?: string;
    public_id?: string;
    transformation?: object;
  }
): Promise<{ url: string; secure_url: string; public_id: string }> {
  const result = await cloudinary.uploader.upload(file as string, {
    folder: options?.folder || "dorney",
    ...options,
  });
  return {
    url: result.url,
    secure_url: result.secure_url,
    public_id: result.public_id,
  };
}
