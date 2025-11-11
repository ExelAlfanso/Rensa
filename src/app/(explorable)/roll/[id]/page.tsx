import Heading from "@/components/Heading";
import MasonryGallerySection from "@/sections/MasonryGallerySection/MasonryGallerySection";
import { fetchRollById } from "@/services/RollServices";
import { DotsThreeCircleIcon } from "@phosphor-icons/react/dist/ssr";

export default async function RollPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  let rollData = null;
  const { id } = await params;
  try {
    const res = await fetchRollById(id);
    rollData = res.data.data;
  } catch (err) {
    console.error("Error fetching roll data:", err);
  }
  return (
    <div className="min-h-screen w-full bg-white">
      <span className="flex flex-row items-center justify-center mt-30">
        <Heading className="text-black">{rollData?.name}</Heading>
        <DotsThreeCircleIcon
          className="text-black cursor-pointer hover:text-gray-800"
          size={32}
        />
      </span>
      <MasonryGallerySection rollId={id} />
    </div>
  );
}
