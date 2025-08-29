import { Schema, model, models } from "mongoose";

const CommentSchema = new Schema(
  {
    photoId: { type: Schema.Types.ObjectId, ref: "Photo", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

export default models.Comment || model("Comment", CommentSchema);
