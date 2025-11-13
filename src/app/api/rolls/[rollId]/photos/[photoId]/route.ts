import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Roll from "@/models/Roll";
import { getToken } from "next-auth/jwt";

/*
  POST /api/rolls/[rollId]/photos/[photoId]
  Add a photo to selected roll
*/
export async function POST(
  req: Request,
  context: { params: Promise<{ rollId: string; photoId: string }> }
) {
  try {
    await connectDB();

    const { rollId, photoId } = await context.params;

    if (!rollId?.length || !photoId) {
      return NextResponse.json(
        { success: false, message: "Missing rollId or photoId" },
        { status: 400 }
      );
    }

    const result = await Roll.updateMany(
      { _id: { $in: rollId } },
      { $addToSet: { photos: photoId } }
    );

    return NextResponse.json({
      success: true,
      message: "Photo added to selected roll",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("❌ Failed to add photo to roll:", error);
    return NextResponse.json(
      { success: false, message: "Failed to add photo to roll" },
      { status: 500 }
    );
  }
}

/*
  DELETE /api/rolls/[rollId]/photos/[photoId] 
  Remove a photo from selected roll
*/

const secret = process.env.NEXTAUTH_SECRET!;

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ rollId: string; photoId: string }> }
) {
  const { rollId, photoId } = await context.params;

  try {
    await connectDB();
    const user = await getToken({ req, secret });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const roll = await Roll.findById(rollId);
    if (!roll) {
      return NextResponse.json(
        { success: false, message: "Roll not found" },
        { status: 404 }
      );
    }

    if (roll.userId.toString() !== user.id) {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    roll.photos = roll.photos.filter((id: string) => id.toString() !== photoId);
    await roll.save();

    return NextResponse.json({
      success: true,
      message: "Photo removed from roll",
    });
  } catch (error) {
    console.error("Failed to remove photo from roll:", error);
    return NextResponse.json(
      { success: false, message: "Failed to remove photo" },
      { status: 500 }
    );
  }
}
