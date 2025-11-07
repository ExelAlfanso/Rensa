import { connectDB } from "@/lib/mongodb";
import Roll from "@/models/Roll";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  try {
    const deletedRoll = await Roll.findByIdAndDelete(id);
    if (!deletedRoll) {
      return NextResponse.json("Roll not found", { status: 404 });
    }
    return NextResponse.json(
      { success: true, message: "Roll deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting roll:", error);
    return NextResponse.json("Error deleting roll", { status: 500 });
  }
}
