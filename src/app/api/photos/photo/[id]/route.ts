import { connectDB } from "@/lib/mongodb";
import Photo, { PhotoDocument } from "@/models/Photo";
import mongoose from "mongoose";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const { id } = params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return Response.json({ error: "Invalid photo ID" }, { status: 400 });
  }
  const photo = await Photo.findById(id)
    .populate("userId", "username avatar")
    .lean<PhotoDocument>();

  return Response.json(photo);
}
