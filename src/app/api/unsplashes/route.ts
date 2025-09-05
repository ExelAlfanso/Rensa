import { NextResponse } from "next/server";
import unsplash from "@/lib/unsplash";

export async function GET() {
  try {
    const result = await unsplash.photos.getRandom({ count: 10 });
    if (result.type === "success") {
      return NextResponse.json(result.response);
    } else {
      return NextResponse.json(
        { error: "Failed to fetch image" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
