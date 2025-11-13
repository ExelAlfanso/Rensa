import { connectDB } from "@/lib/mongodb";
import Photo from "@/models/Photo";
import Roll from "@/models/Roll";
import User from "@/models/User";
import { NextResponse } from "next/server";

/*
  GET /api/profile/[id]
  Fetch user profile by ID along with their rolls and preview photos
*/
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    await connectDB();
    const rolls = await Roll.find({ userId: id }).lean();
    const rollsWithPreviews = await Promise.all(
      rolls.map(async (roll) => {
        const randomPhotos = await Photo.aggregate([
          { $match: { _id: { $in: roll.photos } } },
          { $sample: { size: 4 } },
          { $project: { url: 1, _id: 1 } },
        ]);

        return {
          ...roll,
          previewPhotos: randomPhotos.map((p) => p.url),
        };
      })
    );
    const user = await User.findById(id).select("username email").lean();
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Sucessfully fetched user profile!",
        data: {
          user,
          rolls: rollsWithPreviews,
        },
      },
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
