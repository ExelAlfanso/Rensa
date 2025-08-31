import Link from "next/link";
// import GoogleLoginButton from "@/components/GoogleLoginButton";
import React, { FormEvent, useState } from "react";
import Button from "./Button";
import InputField from "./InputField";
import Logo from "./Logo";
import { useLoading } from "@/context/LoadingContext";
import { signIn } from "next-auth/react";

// TODO: CONTINUE LOGIN FORM

const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
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
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-xl h-full flex items-center justify-center flex-col mb-5"
      >
        <div className="flex flex-col items-center justify-center">
          <Logo />
          <h1 className="font-serif text-3xl text-black">Login</h1>
        </div>
        <fieldset className="fieldset w-full p-4">
          {error && <div className="text-red">{error}</div>}
          <label className="label">Email</label>
          <InputField
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <label className="label">Password</label>
          <InputField
            type="text"
            name="password"
            placeholder="password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Button type={"primary"}>Login</Button>
          {/* <div className="divider">or</div> */}
          {/* <GoogleLoginButton /> */}
        </fieldset>
      </form>
      <div className="flex flex-col items-center justify-center gap-5">
        <Link href="/register" className="hover:underline text-gray-700">
          Forgot password?
        </Link>
        <span className="text-gray-700 flex items-center justify-center gap-1">
          No account?
          <Link href="/register" className="hover:underline text-orange-500">
            Create one
          </Link>
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
