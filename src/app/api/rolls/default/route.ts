import { connectDB } from "@/lib/mongodb";
import Roll from "@/models/Roll";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  try {
    const defaultRoll = await Roll.findOne({ name: "All Photos" }).lean();
    return NextResponse.json(
      {
        success: true,
        message: "Fetched default roll successfully",
        data: defaultRoll,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch default roll",
      },
      { status: 500 }
    );
  }
}
