import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Roll from "@/models/Roll";
import Photo from "@/models/Photo";
import { Types } from "mongoose";
import { getToken } from "next-auth/jwt";

interface RollLean {
  _id: Types.ObjectId;
  photos: Types.ObjectId[];
}

/**
 * GET /api/rolls/[id]/photos?page=1&limit=10
 * Fetch all photos belonging to a specific roll (paginated)
 */

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    await connectDB();

    // Parse pagination params
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    // Verify roll exists
    const roll = (await Roll.findById(id)
      .populate("photos")
      .lean()) as RollLean | null;
    if (!roll) {
      return NextResponse.json(
        { success: false, message: "Roll not found" },
        { status: 404 }
      );
    }

    // Fetch photos belonging to this roll
    // If `roll.photos` contains ObjectIds, we can query directly.
    const photos = await Photo.find({ _id: { $in: roll.photos } })
      .populate("userId", "username avatar")
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Photo.countDocuments({ _id: { $in: roll.photos } });
    const totalPages = Math.ceil(total / limit);
    const hasMore = page < totalPages;

    return NextResponse.json(
      {
        success: true,
        message: "Fetched roll photos successfully",
        data: { photos, currentPage: page, totalPages, hasMore, total },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching photos from roll:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

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
