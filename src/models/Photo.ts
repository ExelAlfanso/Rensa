import { model, Schema, Document, models, Types } from "mongoose";

export interface PhotoDocument extends Document {
  _id: string;
  userId: Types.ObjectId;
  url: string;
  likes: Types.ObjectId;
  metadata: {
    width: number;
    height: number;
    format: string;
    size: number;
    exif: { type: Schema.Types.Mixed };
    uploadedAt: Date;
  };
  title: string;
  caption: string;
}

const PhotoSchema = new Schema<PhotoDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    url: {
      type: String,
      required: true,
    },
    title: { type: String, required: true },
    caption: { type: String, default: "" },
    metadata: {
      width: Number,
      height: Number,
      format: String,
      size: Number,
      exif: { type: Schema.Types.Mixed },
      uploadedAt: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default models?.Photo || model<PhotoDocument>("Photo", PhotoSchema);
