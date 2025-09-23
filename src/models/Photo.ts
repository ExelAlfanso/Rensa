import { model, Schema, Document, models, Types } from "mongoose";

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

export interface PhotoDocument extends Document {
  _id: string;
  userId: Types.ObjectId;
  url: string;
  bookmarks: number;
  bookmarkedBy: Types.ObjectId[];
  title: string;
  description: string;
  tags: string[];
  metadata: PhotoMetadata;
}

const PhotoSchema = new Schema<PhotoDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookmarks: {
      type: Number,
      default: 0,
    },
    bookmarkedBy: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    url: {
      type: String,
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    metadata: {
      width: Number,
      height: Number,
      format: String,
      size: Number,
      exif: { type: Schema.Types.Mixed },
      uploadedAt: Date,
    },
    tags: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

export default models?.Photo || model<PhotoDocument>("Photo", PhotoSchema);
