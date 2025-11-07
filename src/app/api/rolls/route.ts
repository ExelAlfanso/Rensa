import { NextResponse } from "next/server";
import Roll from "@/models/Roll";
import { connectDB } from "@/lib/mongodb";

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("userId");
  try {
    const rolls = await Roll.find({ userId: id }).lean();
    if (!rolls || rolls.length === 0) {
      return NextResponse.json([], { status: 200 });
    }
    return NextResponse.json(
      { success: true, message: "Fetched rolls successfully", data: rolls },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
