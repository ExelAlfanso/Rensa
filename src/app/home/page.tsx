"use client";

import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LoadingOverlay from "@/components/LoadingOverlay";
import UploadButton from "@/components/UploadButton";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import IconButton from "@/components/IconButton";

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
      <h1 className="">hi</h1>
      <Link href={"/login"} className="btn btn-primary">
        Login
      </Link>
      <Link href={"/register"} className="btn btn-primary">
        Sign Up
      </Link>
      <div className="flex flex-col gap-5">
        <Button type={"primary"}>Text Button</Button>
        <Button type={"secondary"}>Text Button</Button>
        <Button type={"tertiary"}>Text Button</Button>
      </div>
      <div className="flex flex-col gap-5">
        <IconButton type={"primary"} iconPosition="left">
          Text Button
        </IconButton>
        <IconButton type={"secondary"} iconPosition="left">
          Text Button
        </IconButton>
        <IconButton type={"tertiary"} iconPosition="left">
          Text Button
        </IconButton>
        <IconButton type={"primary"} iconPosition="right">
          Text Button
        </IconButton>
        <IconButton type={"secondary"} iconPosition="right">
          Text Button
        </IconButton>
        <IconButton type={"tertiary"} iconPosition="right">
          Text Button
        </IconButton>
      </div>
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
      <LogoutButton />
      <UploadButton userId={session?.user.id}></UploadButton>
    </section>
  );
}
