import { NextResponse } from "next/server";
import Roll from "@/models/Roll";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: Request) {
  await connectDB();
  const { rollId, photoId } = await req.json();
  try {
    const roll = await Roll.findById(rollId);
    if (!roll) {
      return NextResponse.json(
        { success: false, message: "Roll not found" },
        { status: 404 }
      );
    }
    roll.photos.push(photoId);
    await roll.save();
    return NextResponse.json(
      { success: true, message: "Photo added to roll successfully", roll },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to add photo to roll" },
      { status: 500 }
    );
  }
}
