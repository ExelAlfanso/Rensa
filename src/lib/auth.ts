import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "./mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import { DefaultSession, DefaultUser } from "next-auth";
import jwt from "jsonwebtoken";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      provider?: string;
    } & DefaultSession["user"];
    accessToken?: string;
  }

  interface User extends DefaultUser {
    id: string;
    accessToken?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({ email: credentials?.email });
        if (!user) {
          console.log("❌ No user found for", credentials?.email);
          throw new Error("No User found");
        }
        const isValid = await bcrypt.compare(
          credentials!.password,
          user.password
        );
        if (!isValid) {
          console.log("❌ Invalid password for", credentials?.email);
          throw new Error("Invalid password");
        }
        console.log("✅ User authenticated:", user.email);
        const accessToken = jwt.sign(
          {
            id: user._id.toString(),
            email: user.email,
          },
          process.env.NEXTAUTH_SECRET!,
          { expiresIn: "7d" }
        );
        console.log("accessToken:", accessToken);
        return {
          id: user._id.toString(),
          name: user.username,
          email: user.email,
          accessToken,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // rotate token only once every 24 hours
  },
  callbacks: {
    async redirect() {
      return "/explore";
    },
    async jwt({ token, account, user }) {
      // console.log("JWT callback:", { token, account, user });
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }
      if (user?.accessToken) {
        token.accessToken = user.accessToken;
      }
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...(session.user as any),
          id: token.id as string,
          name: token.name,
          email: token.email,
          provider: token.provider,
        };
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};
