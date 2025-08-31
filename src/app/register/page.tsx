"use client";

import RegisterForm from "@/components/RegisterForm";
import Image from "next/image";

export default function Register() {
  return (
    <section className="min-h-screen flex flex-row">
      <div className="relative w-1/4">
        <Image src={"/forest.jpg"} fill alt={""}></Image>
      </div>
      <div className=" bg-gray-100 w-3/4 flex items-center justify-center">
        <RegisterForm></RegisterForm>
      </div>
    </section>
  );
}
