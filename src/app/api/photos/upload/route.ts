import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/mongodb";
import Photo from "@/models/Photo";

export async function POST(req: Request) {
  try {
    const { file, userId, title, caption } = await req.json();

    await connectDB();

    const uploadRes = await cloudinary.uploader.upload(file, {
      folder: `user_uploads/${userId}`,
      resource_type: "image",
      image_metadata: true,
    });
    const {
      secure_url,
      width,
      height,
      format,
      image_metadata,
      bytes,
      created_at,
    } = uploadRes;

    const photo = await Photo.create({
      userId,
      url: secure_url,
      title,
      caption,
      metadata: {
        width,
        height,
        format,
        size: bytes,
        exif: image_metadata,
        uploadedAt: created_at,
      },
    });

    return NextResponse.json({ success: true, photo });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ success: false, error: err }, { status: 500 });
  }
}
