"use client";

import ForestSection from "@/sections/ForestSection";
import LoginForm from "@/components/forms/LoginForm";
export default function Login() {
  return (
    <section className="flex flex-row min-h-screen">
      <div className="w-1/4">
        <ForestSection></ForestSection>
      </div>
      <div className="flex items-center justify-center w-3/4 bg-white-500 ">
        <LoginForm></LoginForm>
      </div>
    </section>
  );
}
