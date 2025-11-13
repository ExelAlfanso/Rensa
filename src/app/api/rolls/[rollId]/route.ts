import { connectDB } from "@/lib/mongodb";
import Roll from "@/models/Roll";
import { NextResponse } from "next/server";

/*
    GET /api/rolls/[rollId]
    Fetch a specific roll by ID
    Returns { success: boolean, message: string, data: roll }
*/
export async function GET(
  req: Request,
  context: { params: Promise<{ rollId: string }> }
) {
  const { rollId } = await context.params;

  try {
    await connectDB();
    const roll = await Roll.findById(rollId).lean();
    if (!roll) {
      return NextResponse.json(
        { success: false, message: "Roll not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, message: "Fetched roll successfully", data: roll },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching roll:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
