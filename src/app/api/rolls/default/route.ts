import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Roll from "@/models/Roll";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

/*
    GET /api/rolls/default
    Returns the default roll ("All Photos") for the authenticated user (current session for security)
*/
export async function GET() {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const defaultRoll = await Roll.findOne({
      name: "All Photos",
      userId: session.user.id,
    }).lean();

    return NextResponse.json(
      {
        success: true,
        message: "Fetched default roll successfully",
        data: defaultRoll,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch default roll",
      },
      { status: 500 }
    );
  }
}
