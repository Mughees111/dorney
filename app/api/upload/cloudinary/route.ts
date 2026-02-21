/**
 * Cloudinary Upload - POST
 * Accepts base64 or URL and uploads to Cloudinary
 * Requires admin auth
 */

import { NextRequest, NextResponse } from "next/server";
import { getAdminFromRequest } from "@/lib/auth";
import { uploadImage } from "@/lib/cloudinary";
import { z } from "zod";

const schema = z.object({
  file: z.string().min(1),
  folder: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const admin = getAdminFromRequest(req);
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { file, folder } = schema.parse(body);
    const result = await uploadImage(file, { folder: folder || "dorney" });
    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (e) {
    if (e instanceof z.ZodError)
      return NextResponse.json({ error: e.issues ?? e }, { status: 400 });
    console.error(e);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}
