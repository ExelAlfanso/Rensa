import { connectDB } from "@/lib/mongodb";
import Photo from "@/models/Photo";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const filtersParam = searchParams.get("filters") || "";
  const filters = filtersParam ? filtersParam.split(",") : [];

  const filter = filters.length > 0 ? { tags: { $in: filters } } : {};

  try {
    const skip = (page - 1) * limit;

    // Execute both queries in parallel for better performance
    const [photos, total] = await Promise.all([
      Photo.find(filter)
        .sort({ createdAt: -1 }) // Show newest first
        .skip(skip)
        .limit(limit)
        .lean(),
      Photo.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limit);
    const hasMore = page < totalPages;

    return NextResponse.json({
      photos, // Changed from 'data' to 'photos'
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
