import { NextResponse } from "next/server";
import Roll from "@/models/Roll";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: Request) {
  await connectDB();
  const { name, imageUrl, userId } = await req.json();
  try {
    const newRoll = new Roll({
      name: name,
      userId: userId,
      photos: [],
      imageUrl: imageUrl || "/images/image6.JPG",
    });
    await newRoll.save();
    return NextResponse.json(
      {
        success: true,
        message: "Roll created successfully",
        data: {
          _id: newRoll._id.toString(),
          name: newRoll.name,
          userId: newRoll.userId,
          imageUrl: newRoll.imageUrl,
          photos: newRoll.photos,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to create roll" },
      { status: 500 }
    );
  }
}
