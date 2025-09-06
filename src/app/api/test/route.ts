import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ status: "✅ MongoDB connected" });
  } catch (err) {
    console.error("❌ MongoDB connection error", err);
    return NextResponse.json({ status: "❌ MongoDB failed" }, { status: 500 });
  }
}
