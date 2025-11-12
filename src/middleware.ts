// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET!;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ Only check /api/users/*
  if (pathname.startsWith("/api/users")) {
    const token = await getToken({ req, secret });

    if (!token) {
      // If it's an API route, return 401 instead of redirect
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Valid token → continue
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/users/:path*"], // includes /api/users/[id]
};
