import { connectDB } from "@/lib/mongodb";
import Photo from "@/models/Photo";
import mongoose from "mongoose";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PhotoDocument } from "@/models/Photo";

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connectDB();
  const { id } = await params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    notFound();
  }
  // TODO: complete photo page
  const photo = await Photo.findById(id).lean<PhotoDocument>();
  return (
    <div className="relative w-full max-w-3xl h-[500px]">
      <Image src={photo?.url ?? ""} fill alt={photo?.title ?? "Photo"}></Image>
      <h1>{photo?.title}</h1>
      <p>{photo?.caption}</p>
    </div>
  );
}
