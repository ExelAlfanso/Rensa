"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
import Link from "next/link";
// import GoogleLoginButton from "@/components/GoogleLoginButton";
import { useLoading } from "@/context/LoadingContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  // const router = useRouter();
  const { setLoading } = useLoading();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        callbackUrl: "/home",
      });
    } catch (err) {
      console.error(err);
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          {error && <div className="text-red">{error}</div>}
          <legend className="fieldset-legend">Login</legend>
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button className="btn btn-neutral mt-4">Login</button>
          {/* <div className="divider">or</div> */}
          {/* <GoogleLoginButton /> */}
          <Link href="/register" className="hover:underline">
            Don&apos;t have an account?
          </Link>
        </fieldset>
      </form>
    </section>
  );
}
