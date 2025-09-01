"use client";

import LogoutButton from "@/components/buttons/LogoutButton";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LoadingOverlay from "@/components/LoadingOverlay";
import Button from "@/components/buttons/Button";
import InputField from "@/components/inputfields/InputField";
import IconButton from "@/components/buttons/IconButton";

export default function HomePage() {
  const { data: session, status } = useSession();
  if (status === "loading") return <LoadingOverlay></LoadingOverlay>;
  return (
    <section className="flex items-center justify-center min-h-screen gap-5 ">
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

      <div className="flex flex-col gap-5">
        <Button color={"primary"}>Text Button</Button>
        <Button color={"secondary"}>Text Button</Button>
        <Button color={"tertiary"}>Text Button</Button>
      </div>
      <div className="flex flex-col gap-5">
        <IconButton color={"primary"} iconPosition="left">
          Text Button
        </IconButton>
        <IconButton color={"secondary"} iconPosition="left">
          Text Button
        </IconButton>
        <IconButton color={"tertiary"} iconPosition="left">
          Text Button
        </IconButton>
        <IconButton color={"primary"} iconPosition="right">
          Text Button
        </IconButton>
        <IconButton color={"secondary"} iconPosition="right">
          Text Button
        </IconButton>
        <IconButton color={"tertiary"} iconPosition="right">
          Text Button
        </IconButton>
      </div>
      <div className="flex flex-col">
        <InputField
          type={"email"}
          onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
            throw new Error("Function not implemented.");
          }}
        ></InputField>
        <InputField
          type={"password"}
          onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
            throw new Error("Function not implemented.");
          }}
        ></InputField>
      </div>
    </section>
  );
}
