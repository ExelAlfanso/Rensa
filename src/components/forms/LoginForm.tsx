import Link from "next/link";
// import GoogleLoginButton from "@/components/GoogleLoginButton";
import React, { FormEvent, useState } from "react";
import Button from "@/components/buttons/Button";
import InputField from "@/components/inputfields/InputField";
import Logo from "@/components/icons/Logo";
import { useLoading } from "@/context/LoadingContext";
import { signIn } from "next-auth/react";
import PasswordInputField from "../inputfields/PasswordInputField";

// TODO: CONTINUE LOGIN FORM

const LoginForm = () => {
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
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
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
        className="flex flex-col items-center justify-center h-full gap-16 mb-5 w-xl"
      >
        <div className="flex flex-col items-center justify-center">
          <Logo />
          <h1 className="font-serif text-3xl text-black">Login</h1>
        </div>
        <fieldset className="w-full p-4 fieldset">
          {error && <div className=" text-orange-950">{error}</div>}
          <InputField
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <PasswordInputField
            name="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Button type={"submit"} color="primary" className="h-[62px] my-7">
            Login
          </Button>
          {/* <div className="divider">or</div> */}
          {/* <GoogleLoginButton /> */}
        </fieldset>
      </form>
      <div className="flex flex-col items-center justify-center gap-5">
        <Link href="/register" className="text-gray-700">
          Forgot password?
        </Link>
        <span className="flex items-center justify-center gap-1 text-gray-700">
          No account?
          <Link href="/register" className="text-orange-500">
            Create one
          </Link>
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
