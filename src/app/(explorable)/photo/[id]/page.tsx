import { connectDB } from "@/lib/mongodb";
import Photo from "@/models/Photo";
import mongoose from "mongoose";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PhotoDocument } from "@/models/Photo";
import MasonryGalleryPage from "@/sections/MasonryGallerySection";
import ExploreNavBar from "@/components/navbar/ExploreNavBar";
import Heading from "@/components/Heading";
import PhotoInfoCard from "@/components/cards/PhotoInfoCard";

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

  return (
    <div className="bg-white-500">
      <div className="flex flex-row items-center justify-center gap-[67px] pt-35 ">
        <div className="flex items-center justify-center max-w-3xl h-[500px]">
          <Image
            src={photo?.url ?? ""}
            alt={photo?.title ?? "Photo"}
            width={photo?.metadata?.width}
            height={photo?.metadata?.height}
            className="rounded-3xl"
          ></Image>
        </div>
        <PhotoInfoCard
          title={photo?.title}
          description={photo?.description}
          metadata={photo?.metadata}
          userId={photo?.userId.toString() || ""}
        />
      </div>
      <div className="flex flex-col items-start justify-start min-h-screen bg-white-500 px-[260px]">
        {/* <ExploreNavBar></ExploreNavBar> */}
        <Heading className="text-primary" size="s">
          We thought you will like this
        </Heading>
        <MasonryGalleryPage></MasonryGalleryPage>
      </div>
    </div>
  );
}
