import { NextResponse } from "next/server";
import Roll from "@/models/Roll";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: Request) {
  await connectDB();
  const { rollName, userId } = await req.json();
  try {
    const newRoll = new Roll({ name: rollName, userId: userId, photos: [] });
    await newRoll.save();
    return NextResponse.json(newRoll, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to create roll" },
      { status: 500 }
    );
  }
}
