import Button from "@/components/Button";
import LogoutButton from "@/components/LogoutButton";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  return (
    <section className="min-h-screen flex items-center justify-center gap-5">
      {" "}
      <Link href={"/login"} className="btn btn-primary">
        Login
      </Link>
      <Link href={"/register"} className="btn btn-primary">
        Sign Up
      </Link>
      <LogoutButton />
    </section>
  );
}
