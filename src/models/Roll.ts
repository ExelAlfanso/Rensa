import mongoose, { model, Schema, Types } from "mongoose";

export interface RollDocument extends Document {
  _id: string;
  userId: Types.ObjectId;
  name: string;
  description: string;
  photos: Types.ObjectId[];
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const RollSchema = new Schema<RollDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    photos: { type: [Schema.Types.ObjectId], ref: "Photo", default: [] },
    imageUrl: { type: String, default: "/images/image6.JPG" },
  },
  {
    timestamps: true,
  }
);
const Roll = mongoose.models?.Roll || model<RollDocument>("Roll", RollSchema);
export default Roll;
