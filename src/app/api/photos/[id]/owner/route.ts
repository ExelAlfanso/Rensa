import { connectDB } from "@/lib/mongodb";
import Photo from "@/models/Photo";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    await connectDB();
    const photo = await Photo.findById(id).select("userId");
    return NextResponse.json({
      success: true,
      message: "Successfully fetched photo's owner.",
      data: {
        ownerId: photo.userId,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to connect to database " + error },
      { status: 500 }
    );
  }
}
