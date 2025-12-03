import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/mongodb";
import Photo from "@/models/Photo";
import sharp from "sharp";
import { fastApi } from "@/lib/axios";

/**
 * Compresses and resizes an image buffer so the resulting file is at most 10 MB.
 *
 * Preserves metadata, limits the image width to 2000 pixels, and encodes the result as JPEG.
 * The function progressively reduces JPEG quality (down to a minimum of 10) until the size target is met.
 *
 * @param buffer - The input image data
 * @returns The resulting compressed image buffer (JPEG, metadata preserved, width ≤ 2000px) not larger than 10 MB
 */
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

/**
 * Handle photo upload requests: validate and compress the file, run an NSFW check, upload the image to Cloudinary, create a Photo record in the database, and return the created photo.
 *
 * The endpoint returns a client error (status 400) if no file is provided or if the NSFW check flags the image; on unexpected failures it returns a server error (status 500).
 *
 * @returns An object with `success: true` and the created `photo` on success. On client errors returns `success: false` and an `error` message (status 400 for missing file or NSFW content). On server errors returns `success: false` and the error (status 500).
 */
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
    // Validate file
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
    const formPhoto = new FormData();
    formPhoto.append("fil e", file);

    const res = await fastApi.post("/nsfw/predict", formPhoto, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const key = Object.keys(res.data)[0];
    if (res.data[key].Label === "NSFW") {
      return NextResponse.json(
        { success: false, error: "NSFW content detected. Upload rejected." },
        { status: 400 }
      );
    }

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