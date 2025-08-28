import { NextResponse } from "next/server";
import { signOut } from "next-auth/react"; // only works client-side
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Not logged in" }, { status: 401 });
    }
    return NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Error logging out" }, { status: 300 });
  }
}
