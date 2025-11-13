import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { logoutLimiter } from "@/lib/rateLimiter";

/*
  POST /api/auth/logout
  User logout endpoint
*/

export async function POST(req: Request) {
  try {
    // 🌐 Get client IP for rate limiting
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";

    // 🚦 Check rate limit
    const { success, remaining, limit, reset } = await logoutLimiter.limit(ip);
    if (!success) {
      return NextResponse.json(
        { message: "Too many logout attempts. Please try again later." },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
          },
        }
      );
    }

    // 🛡️ Verify user session
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Not logged in" }, { status: 401 });
    }

    // 🧹 Clear auth cookie (important)
    const res = NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );
    res.cookies.set({
      name: "accessToken",
      value: "",
      maxAge: 0,
      path: "/",
    });

    return res;
  } catch (err) {
    return NextResponse.json({ message: "Error logging out" }, { status: 300 });
  }
}
