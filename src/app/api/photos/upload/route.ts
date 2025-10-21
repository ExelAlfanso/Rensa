import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/mongodb";
import Photo from "@/models/Photo";
import sharp from "sharp";

async function compressImageUnder10MB(buffer: Buffer): Promise<Buffer> {
  let quality = 90; // start high
  let output = await sharp(buffer)
    .withMetadata()
    .rotate(0)
    .resize({ width: 2000 }) // limit dimensions
    .jpeg({ quality })
    .toBuffer();

  // Decrease quality until under 10MB
  while (output.length > 10 * 1024 * 1024 && quality > 10) {
    quality -= 10;
    output = await sharp(buffer)
      .withMetadata()
      .rotate(0)
      .resize({ width: 2000 })
      .jpeg({ quality })
      .toBuffer();
  }

  return output;
}
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const userId = formData.get("userId") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const style = formData.get("style") as string;
    const color = formData.get("color") as string;
    const exif = JSON.parse(formData.get("exif") as string);
    const camera = exif.Brand as string;
    const tags = JSON.parse(formData.get("tags") as string);
    console.log("Received camera brand:", camera);
    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    // Convert File -> Buffer -> Base64 for Cloudinary
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const compressedBuffer = await compressImageUnder10MB(buffer);

    const base64File = `data:${file.type};base64,${compressedBuffer.toString(
      "base64"
    )}`;

    await connectDB();

    const uploadRes = await cloudinary.uploader.upload(base64File, {
      folder: `user_uploads/${userId}`,
      resource_type: "image",
      image_metadata: true,
      quality: "auto",
      fetch_format: "auto",
      transformation: [{ width: 2000, crop: "limit" }],
    });

    const { secure_url, width, height, format, bytes, created_at } = uploadRes;

    const photo = await Photo.create({
      userId,
      url: secure_url,
      title,
      description,
      category,
      style,
      color,
      tags,
      camera,
      metadata: {
        width,
        height,
        format,
        size: bytes,
        exif: exif,
        uploadedAt: created_at,
      },
    });

    return NextResponse.json({ success: true, photo });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ success: false, error: err }, { status: 500 });
  }
}
