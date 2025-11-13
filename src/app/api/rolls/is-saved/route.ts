import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { getToken } from "next-auth/jwt";
import Roll from "@/models/Roll";

const secret = process.env.NEXTAUTH_SECRET!;

/**
 * GET /api/rolls/is-saved?photoId=<photoId>
 * Returns { isSaved: boolean, rollIds: string[], rolls: { _id, name }[] }
 */
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Auth check
    const token = await getToken({ req, secret });
    if (!token?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const photoId = searchParams.get("photoId");

    if (!photoId) {
      return NextResponse.json(
        { success: false, message: "Missing photoId" },
        { status: 400 }
      );
    }

    // Find rolls of the user that contain this photo
    const rolls = await Roll.find({ userId: token.id, photos: photoId }).select(
      "_id name"
    );

    return NextResponse.json(
      {
        success: true,
        message: "Fetched saved rolls successfully",
        data: {
          isSaved: rolls.length > 0,
          rollIds: rolls.map((r) => r._id),
          rolls, // optional: return roll names
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error checking saved rolls:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
