import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password, confirmPassword } = await req.json();
    if (password != confirmPassword)
      return NextResponse.json(
        { message: "Invalid Password" },
        { status: 400 }
      );
    await connectDB();

    const userExists = await User.findOne({ email });
    if (userExists)
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 }
      );
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Error registering user" },
      { status: 500 }
    );
  }
}
