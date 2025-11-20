import mongoose from "mongoose";
import Roll from "../src/models/Roll.ts";
import User from "../src/models/User.ts";
import dotenv from "dotenv";
dotenv.config();

async function up() {
  await mongoose.connect(process.env.MONGODB_URI || "");

  const users = await User.find({});

  for (const user of users) {
    const exists = await Roll.findOne({ userId: user._id, name: "All Photos" });
    if (!exists) {
      await Roll.create({
        userId: user._id,
        name: "All Photos",
        description: "",
        photos: [],
      });
    }
  }

  console.log("Migration complete: Added All Photos roll.");
  process.exit(0);
}

up();
