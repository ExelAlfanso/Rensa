"use client";

import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LoadingOverlay from "@/components/LoadingOverlay";
import UploadButton from "@/components/UploadButton";

export default function Home() {
  const { data: session, status } = useSession();
  if (status === "loading") return <LoadingOverlay></LoadingOverlay>;
  return (
    <section className="min-h-screen flex items-center justify-center gap-5">
      {session && (
        <div>
          <h1>Welcome, {session?.user.name}</h1>
          <p>Email: {session?.user.email}</p>
          <p>ID: {session?.user.id}</p>
          <p>Provider: {session?.user.provider}</p>
        </div>
      )}
      <Link href={"/login"} className="btn btn-primary">
        Login
      </Link>
      <Link href={"/register"} className="btn btn-primary">
        Sign Up
      </Link>
      <LogoutButton />
      <UploadButton userId={session?.user.id}></UploadButton>
    </section>
  );
}
