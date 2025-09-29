import { connectDB } from "@/lib/mongodb";
import Photo from "@/models/Photo";
import mongoose from "mongoose";
import { notFound } from "next/navigation";
import { PhotoDocument } from "@/models/Photo";
import MasonryGalleryPage from "@/sections/MasonryGallerySection";
import Heading from "@/components/Heading";
import PhotoInfoCard from "@/components/cards/PhotoInfoCard";
import ImagePreview from "@/components/ImagePreview";
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
  const photo = await Photo.findById(id).lean<PhotoDocument>();

  if (!photo) notFound();
  return (
    <div className="bg-white-500 w-full flex flex-col items-center justify-center px-[25px] md:px-[30px] lg:px-[70px] xl:px-[90px] 2xl:px-[260px] pt-10 gap-10">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-[67px] pt-35 ">
        <div className="flex flex-col items-center justify-center md:items-start md:justify-start gap-2">
          <ImagePreview
            src={photo?.url ?? ""}
            alt={photo?.title ?? "Photo"}
            width={photo?.metadata?.width}
            height={photo?.metadata?.height}
          />
        </div>
        <PhotoInfoCard
          id={id}
          initialBookmarks={photo?.bookmarks}
          bookmarkedBy={photo?.bookmarkedBy?.map((id) => id.toString()) || []}
          title={photo?.title}
          description={photo?.description}
          metadata={photo?.metadata}
          userId={photo?.userId.toString() || ""}
        />
      </div>
      <div className="flex flex-col items-start justify-start min-h-screen bg-white-500">
        <Heading className="text-primary" size="s">
          We thought you will like this
        </Heading>
        <MasonryGalleryPage></MasonryGalleryPage>
      </div>
    </div>
  );
}
