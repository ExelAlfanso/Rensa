import Link from "next/link";
// import GoogleLoginButton from "@/components/GoogleLoginButton";
import React, { useState } from "react";
import Button from "../buttons/Button";
import InputField from "../inputfields/InputField";
import Logo from "../icons/Logo";
import { useLoading } from "@/hooks/useLoading";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import api from "@/lib/axios";

// TODO: ON HOLD BECAUSE REPLACING LOGO AND SHIT
const RegisterForm = () => {
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
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
    setLoading(true);
    try {
      await api.post("/auth/register", form);
      const res = await signIn("credentials", {
        email: form.email,
        password: form.password,
        callbackUrl: "/home",
      });
      if (res) router.push("/");
    } catch (err: unknown) {
      console.error("Register failed:", err);

      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center h-full gap-16 mb-5 w-xl"
      >
        <div className="flex flex-col items-center justify-center">
          <Logo size={100} />
          <h1 className="font-forum text-3xl text-black">Register</h1>
        </div>
        <fieldset className="w-full p-4 fieldset">
          {error && <div className="text-orange-900">{error}</div>}
          <div className="flex flex-col gap-4">
            <InputField
              type="text"
              name="username"
              placeholder="Username"
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
            <InputField
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <InputField
              type="text"
              name="password"
              placeholder="Password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <InputField
              type="text"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
            />
          </div>
          <Button className="h-[62px] my-7" color={"primary"} type={"submit"}>
            Register
          </Button>
          {/* <div className="divider">or</div> */}
          {/* <GoogleLoginButton /> */}
        </fieldset>
      </form>
      <div className="flex flex-col items-center justify-center gap-5">
        <span className="flex items-center justify-center gap-1 text-gray-700">
          Have an account?
          <Link href="/login" className="text-orange-500 ">
            Login
          </Link>
        </span>
      </div>
    </div>
  );
};

export default RegisterForm;
