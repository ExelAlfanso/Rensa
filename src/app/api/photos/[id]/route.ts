import { connectDB } from "@/lib/mongodb";
import Photo from "@/models/Photo";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    await connectDB();
    const photo = await Photo.findById(id).lean();
    return NextResponse.json({
      success: true,
      message: "Successfully fetched photo.",
      data: {
        photo,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch photo " + error },
      { status: 500 }
    );
  }
}
