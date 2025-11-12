import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { loginLimiter } from "@/lib/rateLimiter";

export async function POST(req: Request) {
  try {
    await connectDB();

    //parse body
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required",
        },
        { status: 400 }
      );
    }

    // 🌐 Identify the request source (for rate limiting)
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";

    // 🚦 Check rate limit
    const { success, remaining, limit, reset } = await loginLimiter.limit(ip);
    if (!success) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many login attempts. Please try again later.",
        },
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

    //find user by email
    const user = await User.findOne({ email });

    //compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!user || !isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    //generate jwt token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    //set token in httpOnly cookie
    const res = NextResponse.json({
      success: true,
      message: "Login succcessful!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

    // Set HttpOnly cookie
    res.cookies.set({
      name: "accessToken",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });
    return res;
  } catch (err) {
    console.error(err);
  }
}
