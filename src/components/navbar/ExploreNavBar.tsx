import React from "react";
import Button from "../buttons/Button";
import SearchInputField from "../inputfields/SearchInputFIeld";
import Logo from "../icons/Logo";
import Heading from "../Heading";
import ProfileButton from "@/components/buttons/ProfileIconButton";
import NotificationButton from "../buttons/NotificationButton";
import BookmarkButton from "../buttons/BookmarkButton";
const ExploreNavBar = () => {
  return (
    <nav className="z-10 top-5 fixed w-346 h-18 text-black rounded-[48px] flex items-center justify-between bg-white-200 shadow-lg">
      <div className="flex flex-row items-center gap-4 ml-6">
        <Logo size={32}></Logo>
        <Heading size="s">Rensa</Heading>
        <SearchInputField
          onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
            throw new Error("Function not implemented.");
          }}
        ></SearchInputField>
      </div>
      <div className="flex flex-row items-center justify-center gap-6 mr-6">
        <Button color={"secondary"}>Create</Button>
        <NotificationButton></NotificationButton>
        <BookmarkButton></BookmarkButton>
        <ProfileButton src={"/profile.jpg"} alt={""}></ProfileButton>
      </div>
    </nav>
  );
};

export default ExploreNavBar;
