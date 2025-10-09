"use client";
import { useState } from "react";
import Link from "next/link";
import AuthFormLayout from "./AuthFormLayout";
import InputField from "@/components/inputfields/InputField";
import { useLoading } from "@/hooks/useLoading";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import api from "@/lib/axios";
import PrimaryButton from "../buttons/PrimaryButton";
import TextInputField from "../inputfields/TextInputField";

export default function RegisterForm() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();
  const { setLoading } = useLoading();

  const validateForm = () => {
    if (form.password !== form.confirmPassword) return "Passwords do not match";
    if (!form.email.trim()) return "Email is required";
    if (!form.password.trim()) return "Password is required";
    if (!form.username.trim()) return "Username is required";
    if (!form.email.includes("@")) return "Invalid email format";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errorMsg = validateForm();
    if (errorMsg) return setError(errorMsg);

    setLoading(true);
    try {
      await api.post("/auth/register", form);
      const res = await signIn("credentials", {
        email: form.email,
        password: form.password,
        callbackUrl: "/home",
      });
      if (res) router.push("/");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      } else {
        setError("Unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthFormLayout
      title="Register"
      onSubmit={handleSubmit}
      error={error}
      button={
        <PrimaryButton className="h-[52px] md:h-[62px] my-7" type="submit">
          Register
        </PrimaryButton>
      }
      footer={
        <span className="flex items-center justify-center gap-1 text-gray-700">
          Have an account?
          <Link href="/login" className="text-orange-500">
            Login
          </Link>
        </span>
      }
    >
      <TextInputField
        type="text"
        name="username"
        placeholder="Username"
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <TextInputField
        type="email"
        name="email"
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <TextInputField
        type="password"
        name="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <TextInputField
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
      />
    </AuthFormLayout>
  );
}
