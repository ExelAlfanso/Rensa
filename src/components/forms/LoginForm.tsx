"use client";
import { useState, FormEvent } from "react";
import Link from "next/link";
import AuthFormLayout from "./AuthFormLayout";
import InputField from "@/components/inputfields/InputField";
import PasswordInputField from "@/components/inputfields/PasswordInputField";
import { useLoading } from "@/hooks/useLoading";
import { signIn } from "next-auth/react";
import PrimaryButton from "../buttons/PrimaryButton";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { setLoading } = useLoading();

  const validateForm = () => {
    if (!form.email.trim()) return "Email is required";
    if (!form.password.trim()) return "Password is required";
    if (!form.email.includes("@")) return "Invalid email format";
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errorMsg = validateForm();
    if (errorMsg) return setError(errorMsg);

    setLoading(true);
    try {
      await signIn("credentials", {
        email: form.email,
        password: form.password,
        callbackUrl: "/explore",
      });
    } catch {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthFormLayout
      title="Login"
      onSubmit={handleSubmit}
      error={error}
      button={
        // <Button
        //   type="submit"
        //   color="primary"
        //   className="h-[52px] md:h-[62px] my-7"
        // >
        //   Login
        // </Button>
        <PrimaryButton className="h-[52px] md:h-[62px] my-7" type="submit">
          Login
        </PrimaryButton>
      }
      footer={
        <>
          <Link href="/forgot-password" className="text-gray-700">
            Forgot password?
          </Link>
          <span className="flex items-center justify-center gap-1 text-gray-700">
            No account?
            <Link href="/register" className="text-orange-500">
              Create one
            </Link>
          </span>
        </>
      }
    >
      <InputField
        type="email"
        name="email"
        placeholder="Email or Username"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <PasswordInputField
        name="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
    </AuthFormLayout>
  );
}
