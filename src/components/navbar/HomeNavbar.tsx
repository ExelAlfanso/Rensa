"use client";
import React from "react";
import Logo from "../icons/Logo";
import Heading from "../Heading";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import LinkTertiaryButton from "../buttons/LinkButtons/LinkTertiaryButton";
import LinkPrimaryButton from "../buttons/LinkButtons/LinkPrimaryButton";
import Link from "next/link";

//TODO: Make the navbar responsive

const HomeNavbar = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <nav className="z-20 left-1/2 top-5 -translate-x-1/2 fixed w-[90%] lg:w-[70%] xl:w-[80%] h-14 md:h-18 text-black rounded-[48px] flex items-center justify-between bg-white-200 shadow-lg">
      <div className="flex flex-row items-center gap-1 lg:gap-4 ml-2 lg:ml-6">
        <Logo size={"s"}></Logo>
        <Link href="/home">
          <Heading size="s">Rensa</Heading>
        </Link>
      </div>
      <div className="flex flex-row items-center justify-center gap-6 mr-6">
        <span className="inline-flex items-center gap-2">
          {user ? (
            <>
              <LinkTertiaryButton href={"/explore"}>
                Discover
              </LinkTertiaryButton>
              <LinkPrimaryButton href={"/upload"}>
                Get Started
              </LinkPrimaryButton>
              <span className="hidden lg:flex "></span>
            </>
          ) : (
            <>
              <LinkPrimaryButton href={"/login"}>Login</LinkPrimaryButton>
              <LinkTertiaryButton href={"/register"}>
                Sign Up
              </LinkTertiaryButton>
            </>
          )}
        </span>
      </div>
    </nav>
  );
};

export default HomeNavbar;
