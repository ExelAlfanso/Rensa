import { PopulatedPhoto } from "@/types/PopulatedPhoto";

const getPhotoUrl = (photo: PopulatedPhoto | string): string => {
  return typeof photo === "string" ? photo : photo.url;
};

const getPhotoTitle = (
  photo: PopulatedPhoto | string,
  index: string | null
): string => {
  return typeof photo === "string"
    ? `Gallery image ${index !== null ? Number(index) + 1 : ""}`
    : photo.title || `Photo by user ${photo.userId}`;
};

const getPhotoKey = (
  photo: PopulatedPhoto | string,
  index: string | null
): string => {
  return typeof photo === "string" ? `${photo}-${index}` : photo._id;
};
const getPhotoUserId = (
  photo: PopulatedPhoto | string
): PopulatedPhoto["userId"] | null => {
  return typeof photo === "string" ? null : photo.userId;
};
export { getPhotoUrl, getPhotoTitle, getPhotoKey, getPhotoUserId };
