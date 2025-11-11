import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Roll from "@/models/Roll";
import Photo from "@/models/Photo";
import { Types } from "mongoose";

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
        photos,
        currentPage: page,
        totalPages,
        hasMore,
        total,
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
