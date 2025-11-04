import { connectDB } from "@/lib/mongodb";
import Photo, { PhotoDocument } from "@/models/Photo";
import { FilterQuery } from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  // Structured filters
  const filtersParam = searchParams.get("filters") || "";
  const filters = filtersParam ? filtersParam.split(",") : [];
  const filter: FilterQuery<PhotoDocument> =
    filters.length > 0
      ? {
          $or: [
            { tags: { $in: filters } },
            { category: { $in: filters } },
            { color: { $in: filters } },
            { style: { $in: filters } },
          ],
        }
      : {};

  try {
    const skip = (page - 1) * limit;

    const [photos, total] = await Promise.all([
      Photo.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("userId", "username avatar")
        .lean(),
      Photo.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limit);
    const hasMore = page < totalPages;

    return NextResponse.json({
      photos,
      currentPage: page,
      totalPages,
      hasMore,
      total,
    });
  } catch (err) {
    console.error("Error fetching photos:", err);
    return NextResponse.json(
      {
        error: "Failed to fetch photos",
        details: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
