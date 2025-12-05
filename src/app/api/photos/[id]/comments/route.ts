import Comment from "@/models/Comment";
import User from "@/models/User"; //
import { NextResponse } from "next/server";

/*
    POST /api/photos/:id/comments
    Make a comment on a photo
*/
export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const { text, userId } = await request.json();
  try {
    const newComment = await Comment.create({
      photoId: id,
      userId,
      text,
    });

    return NextResponse.json(
      { success: true, message: "Commented on photo " + id, data: newComment },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create comment" },
      {
        status: 500,
      }
    );
  }
}

/*
    GET /api/photos/:id/comments?offset=0
    Supports offset-based pagination
*/

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  // Read offset from query string
  const { searchParams } = new URL(request.url);
  const offset = Number(searchParams.get("offset") || 0);
  const limit = 5;

  try {
    const comments = await Comment.find({ photoId: id })
      .populate("userId", "username avatarUrl")
      .sort({ createdAt: 1 }) // older first ; OR -1 if you want newest first
      .skip(offset)
      .limit(limit);

    const total = await Comment.countDocuments({ photoId: id });

    return NextResponse.json(
      {
        success: true,
        message: `Fetched ${comments.length} comments from photo ${id}`,
        data: {
          comments,
          hasMore: offset + comments.length < total,
          total,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}
