import MasonryGalleryPage from "@/sections/MasonryGallerySection/MasonryGallerySection";
import Heading from "@/components/Heading";
import PhotoInfoCard from "@/components/cards/PhotoInfoCard";
import ImagePreview from "@/components/ImagePreview";

import { redirect } from "next/navigation";
import { api } from "@/lib/axios";

/**
 * Render the photo details page for the photo identified by route params.
 *
 * If the photo cannot be fetched, redirects to the `/not-found` route. When present,
 * the page displays an image preview, a photo information card (including bookmarks,
 * bookmarked-by list, title, description, metadata, and author id), and a related
 * masonry gallery section.
 *
 * @param params - A promise that resolves to an object containing the route `id` of the photo
 * @returns A React element representing the photo details page
 */
export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let photo = null;
  try {
    const res = await api.get(`/photos/photo/${id}`);

    photo = res.data;
  } catch (error) {
    console.error("Error fetching photo:", error);
  }

  if (!photo) {
    redirect("/not-found");
  }
  return (
    <div className="bg-white-500 w-full flex flex-col items-center justify-center px-[25px] md:px-[30px] lg:px-[70px] xl:px-[90px] 2xl:px-[260px] gap-10">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-[67px] pt-35 ">
        <div className="flex flex-col items-center justify-center gap-2 md:items-start md:justify-start">
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
          bookmarkedBy={
            photo?.bookmarkedBy?.map((id: string) => id.toString()) || []
          }
          title={photo?.title}
          description={photo?.description}
          metadata={photo?.metadata}
          userId={photo?.userId?._id.toString() || ""}
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