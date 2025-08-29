import { model, Schema, models } from "mongoose";
const LikeSchema = new Schema(
  {
    photoId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default models?.Like || model("Like", LikeSchema);
