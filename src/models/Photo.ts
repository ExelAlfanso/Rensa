import { model, Schema, models } from "mongoose";

const PhotoSchema = new Schema(
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
    },
    caption: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

export default models?.Photo || model("Photo", PhotoSchema);
