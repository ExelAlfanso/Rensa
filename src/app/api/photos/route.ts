import { connectDB } from "@/lib/mongodb";
import Photo, { PhotoDocument } from "@/models/Photo";
import { FilterQuery, SortOrder } from "mongoose";
import { NextResponse } from "next/server";

/*
  GET /api/photos?page=1&limit=10&filters=tag1,tag2
  Fetch paginated photos with optional filters
*/

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const sortField = searchParams.get("sort") || "latest";

  const sortOptions: Record<string, SortOrder> =
    sortField === "popular"
      ? { bookmarks: -1, createdAt: -1 }
      : { createdAt: -1 };

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
        .sort(sortOptions)
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
