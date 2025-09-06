"use client";
import React from "react";
import Button from "../buttons/Button";
import Logo from "../icons/Logo";
import Heading from "../Heading";
import ProfileButton from "@/components/buttons/ProfileIconButton";
import BookmarkButton from "../buttons/BookmarkButton";
import CaretIcon from "../buttons/CaretButton";
import Link from "next/link";
import NotificationDropdown from "../dropdowns/Notification/NotificationDropdown";
import SearchInputField from "../inputfields/SearchInputField";
import { useRouter } from "next/navigation";

const ExploreNavBar = () => {
  const router = useRouter();
  return (
    <nav className="z-20 top-5 fixed w-346 h-18 text-black rounded-[48px] flex items-center justify-between bg-white-200 shadow-lg">
      <div className="flex flex-row items-center gap-4 ml-6">
        <Logo size={32}></Logo>
        <Link href="/home">
          <Heading size="s">Rensa</Heading>
        </Link>
        <SearchInputField></SearchInputField>
      </div>
      <div className="flex flex-row items-center justify-center gap-6 mr-6">
        <Button onClick={() => router.push("/upload")} color={"secondary"}>
          Create
        </Button>
        <NotificationDropdown></NotificationDropdown>
        <BookmarkButton></BookmarkButton>
        <span className="inline-flex items-center gap-2">
          <ProfileButton src={"/profile.jpg"} alt={""}></ProfileButton>
          <CaretIcon></CaretIcon>
        </span>
      </div>
    </nav>
  );
};

export default ExploreNavBar;
