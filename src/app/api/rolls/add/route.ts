import { connectDB } from "@/lib/mongodb";
import Roll from "@/models/Roll";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { rollIds, photoId } = await req.json();

    if (!rollIds?.length || !photoId) {
      return NextResponse.json(
        { message: "Missing rollIds or photoId" },
        { status: 400 }
      );
    }

    const result = await Roll.updateMany(
      { _id: { $in: rollIds } },
      { $addToSet: { photos: photoId } }
    );

    return NextResponse.json({
      message: "Photo added to selected rolls",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("❌ Failed to add photo to rolls:", error);
    return NextResponse.json(
      { message: "Failed to add photo to rolls" },
      { status: 500 }
    );
  }
}
