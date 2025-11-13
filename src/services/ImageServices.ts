import api from "@/lib/axios";
import { PopulatedPhoto } from "@/types/PopulatedPhoto";
// import { Filters } from "@/sections/FilterSection";
export async function fetchImagesFromPicSum(page: number) {
  const newImages = Array.from({ length: 10 }, () => {
    const h = 300 + Math.floor(Math.random() * 200);
    return `https://picsum.photos/200/${h}?random=${Math.random()}`;
  });
  return {
    data: newImages,
    urls: newImages,
    nextPage: page < 10 ? page + 1 : undefined, // Add a max page limit
  };
}

// Match your Mongoose schema
export interface PhotoMetadata {
  width: number;
  height: number;
  format: "jpg" | "jpeg";
  size: number;
  exif?: {
    [key: string]: string;
  };
  uploadedAt: string | Date;
}

export interface Photo {
  _id: string;
  userId: string;
  url: string;
  bookmarks: number;
  bookmarkedBy: string[];
  title: string;
  description: string;
  tags: string[];
  metadata: PhotoMetadata;
  createdAt?: string;
  updatedAt?: string;
}

// Shape of API response from your backend
interface BackendPhotosResponse {
  photos: PopulatedPhoto[];
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
  total: number;
}

// SINGLE unified response type for React Query
export interface FetchPhotosResponse {
  data: PopulatedPhoto[] | string[]; // Can be either Photo objects or string URLs
  urls: string[]; // Always array of URLs
  nextPage: number | undefined; // MUST be optional
}

// Fetch photos from your MongoDB backend
export async function fetchImagesFromDB(
  page: number,
  filters: string[] | undefined
): Promise<FetchPhotosResponse> {
  try {
    const params: Record<string, string | number | undefined> = {
      page,
      limit: 10,
      filters: filters ? filters.join(",") : undefined,
    };
    // console.log("📤 Sending request to /photos/getPhotos with params:", params);

    const res = await api.get<BackendPhotosResponse>("/photos/getPhotos", {
      params,
    });

    // console.log("Fetched photos from DB:", res.data);

    return {
      data: res.data.photos,
      urls: res.data.photos.map((photo) => photo.url),
      nextPage: res.data.hasMore ? page + 1 : undefined,
    };
  } catch (error) {
    console.error("Error fetching photos:", error);
    throw error;
  }
}

// Search photos by tags
export async function searchPhotosByTags(
  tags: string[],
  page: number = 1
): Promise<FetchPhotosResponse> {
  const res = await api.get<BackendPhotosResponse>("/photos/search", {
    params: {
      tags: tags.join(","),
      page,
      limit: 10,
    },
  });

  return {
    data: res.data.photos,
    urls: res.data.photos.map((photo) => photo.url),
    nextPage: res.data.hasMore ? page + 1 : undefined,
  };
}

// 🆕 Fetch photos by Roll ID
export async function fetchImagesFromRoll(
  rollId: string,
  page: number,
  filters?: string[]
): Promise<FetchPhotosResponse> {
  try {
    const params: Record<string, string | number | undefined> = {
      page,
      limit: 10,
      filters: filters ? filters.join(",") : undefined,
    };

    // Assuming your backend route looks like: /rolls/:rollId/photos
    const res = await api.get(`/rolls/${rollId}/photos`, {
      params,
    });
    return {
      data: res.data.data.photos,
      urls: res.data.data.photos.map((photo: PopulatedPhoto) => photo.url),
      nextPage: res.data.data.hasMore ? page + 1 : undefined,
    };
  } catch (error) {
    console.error("Error fetching photos from roll:", error);
    throw error;
  }
}
