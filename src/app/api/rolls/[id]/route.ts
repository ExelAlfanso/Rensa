import { NextResponse } from "next/server";
import Roll from "@/models/Roll";
import { connectDB } from "@/lib/mongodb";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    await connectDB();
    const roll = await Roll.findById(id).lean();
    if (!roll) {
      return NextResponse.json([], { status: 200 });
    }
    return NextResponse.json(
      { success: true, message: "Fetched roll successfully", data: roll },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// 🧾 DELETE entire roll or remove specific photos
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const trimmedId = id.trim();

  try {
    await connectDB();

    const contentType = req.headers.get("content-type");
    let body = {};

    // Check if the request has JSON body (means delete photo(s), not the roll)
    if (contentType && contentType.includes("application/json")) {
      body = await req.json();
    }

    const { photoIds } = body as { photoIds?: string[] };

    if (photoIds && photoIds.length > 0) {
      // 🖼 Remove specific photo(s) from roll
      const updatedRoll = await Roll.findByIdAndUpdate(
        trimmedId,
        { $pull: { photos: { $in: photoIds } } }, // remove those photoIds
        { new: true }
      ).lean();

      if (!updatedRoll) {
        return NextResponse.json(
          { success: false, message: "Roll not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Photos removed successfully!",
        data: updatedRoll,
      });
    } else {
      // 🗑 Delete entire roll if no photoIds provided
      const deletedRoll = await Roll.findByIdAndDelete(trimmedId);
      if (!deletedRoll) {
        return NextResponse.json(
          { success: false, message: "Roll not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Roll deleted successfully!",
      });
    }
  } catch (error) {
    console.error("Error deleting roll or photos:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    await connectDB();
    const { photoIds } = await request.json();
    const updatedRoll = await Roll.findByIdAndUpdate(
      id,
      { $addToSet: { photos: { $each: photoIds } } },
      { new: true }
    ).lean();
    if (!updatedRoll) {
      return NextResponse.json(
        { success: false, message: "Roll not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Photos added to roll successfully!",
      data: updatedRoll,
    });
  } catch (error) {
    console.error("Error adding photos to roll:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
