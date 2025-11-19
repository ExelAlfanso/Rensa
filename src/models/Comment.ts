import { Schema, model, models } from "mongoose";

const CommentSchema = new Schema(
  {
    photoId: {
      type: Schema.Types.ObjectId,
      ref: "Photo",
      required: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
  },
  { timestamps: true }
);

export default models.Comment || model("Comment", CommentSchema);
