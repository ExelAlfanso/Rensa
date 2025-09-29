"use client";
import React from "react";
import Button from "../buttons/Button";
import Logo from "../icons/Logo";
import Heading from "../Heading";
import ProfileButton from "@/components/buttons/ProfileIconButton";
import BookmarkButton from "../buttons/BookmarkButton";
import Link from "next/link";
import NotificationDropdown from "../dropdowns/Notification/NotificationDropdown";
import SearchInputField from "../inputfields/SearchInputField";
import { useRouter } from "next/navigation";
import AccountDropdown from "../dropdowns/AccountDropdown";
import { useSession } from "next-auth/react";

//TODO: Make the navbar responsive

const ExploreNavBar = () => {
  const { data: session } = useSession();

  const router = useRouter();
  return (
    <nav className="z-20 left-1/2 top-5 -translate-x-1/2 fixed w-[90%] lg:w-[70%] xl:w-[80%] h-14 md:h-18 text-black rounded-[48px] flex items-center justify-between bg-white-200 shadow-lg">
      <div className="flex flex-row items-center gap-1 lg:gap-4 ml-2 lg:ml-6">
        <Logo size={"s"}></Logo>
        <Link className="hidden lg:block" href="/home">
          <Heading size="s">Rensa</Heading>
        </Link>
        <SearchInputField className=""></SearchInputField>
      </div>
      <div className="flex flex-row items-center justify-center gap-6 mr-6">
        <span className="inline-flex items-center gap-2">
          {session ? (
            <>
              <Button
                onClick={() => router.push("/upload")}
                color={"secondary"}
              >
                Create
              </Button>
              <span className="hidden lg:flex ">
                <NotificationDropdown></NotificationDropdown>
                <BookmarkButton></BookmarkButton>
              </span>
              <ProfileButton src={"/profile.jpg"} alt={""}></ProfileButton>
              <AccountDropdown
                src="/profile.jpg"
                user={session?.user}
              ></AccountDropdown>
            </>
          ) : (
            <>
              <Button onClick={() => router.push("/login")} color={"primary"}>
                Login
              </Button>
              <Button
                onClick={() => router.push("/register")}
                color={"tertiary"}
              >
                Sign Up
              </Button>
            </>
          )}
        </span>
      </div>
    </nav>
  );
};

export default ExploreNavBar;
