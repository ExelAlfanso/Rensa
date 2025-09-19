import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/mongodb";
import Photo from "@/models/Photo";
//TODO: Change userID to user : {id, username, avatarUrl} so that it is easier to put in datas in photoinfocard.
//TODO: Make how to track saved/bookmarked number to be fetched in photoinfocard.
//TODO: Add data what camera was used
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const userId = formData.get("userId") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const exif = JSON.parse(formData.get("exif") as string);
    const tags = JSON.parse(formData.get("tags") as string);

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    // Convert File -> Buffer -> Base64 for Cloudinary
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64File = `data:${file.type};base64,${buffer.toString("base64")}`;

    await connectDB();

    const uploadRes = await cloudinary.uploader.upload(base64File, {
      folder: `user_uploads/${userId}`,
      resource_type: "image",
      image_metadata: true,
    });

    const { secure_url, width, height, format, bytes, created_at } = uploadRes;

    const photo = await Photo.create({
      userId,
      url: secure_url,
      title,
      description,
      tags,
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