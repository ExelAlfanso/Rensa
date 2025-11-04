import { PhotoDocument } from "@/models/Photo";
import { UserDocument } from "@/models/User";

export type PopulatedPhoto = Omit<PhotoDocument, "userId"> & {
  userId: Pick<UserDocument, "_id" | "username" | "avatar">;
};
