import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  const uri = process.env.MONGODB_URI as string;
  if (!uri) throw new Error("MONGODB_URI not defined in .env.local");

  try {
    const db = await mongoose.connect(uri, { ssl: true, tls: true });
    isConnected = db.connections[0].readyState === 1;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error", err);
    throw err;
  }
}
