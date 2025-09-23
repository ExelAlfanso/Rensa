import Photo from "@/models/Photo";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    const { action, userId } = await request.json();
    const photo = await Photo.findById(id);
    if (!photo) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }
    if (action === "increment") {
      if (!photo.bookmarkedBy.includes(userId)) {
        photo.bookmarkedBy.push(userId);
        photo.bookmarks += 1;
      }
    } else if (action === "decrement") {
      if (photo.bookmarkedBy.includes(userId)) {
        photo.bookmarkedBy = photo.bookmarkedBy.filter(
          (uid: string) => uid === userId
        );
        photo.bookmarks -= 1;
      }
    }
    await photo.save();
    return NextResponse.json({
      bookmarks: photo.bookmarks,
      isBookmarked: photo.bookmarkedBy.includes(userId),
    });
  } catch (err) {
    console.error("Error updating bookmark:", err);
    return NextResponse.json(
      { error: "Failed to update bookmark" },
      { status: 500 }
    );
  }
}
