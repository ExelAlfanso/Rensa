import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "./mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

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
          throw new Error("No User found");
        }
        const isValid = await bcrypt.compare(
          credentials!.password,
          user.password
        );
        if (!isValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id.toString(),
          name: user.username,
          email: user.email,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async redirect() {
      return "/home";
    },
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
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
        session.accessToken = token.accessToken as string | undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};
