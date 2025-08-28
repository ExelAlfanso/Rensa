"use client";

import { signOut } from "next-auth/react";
import React from "react";

interface LogoutButtonProps {
  id?: string;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ id }) => {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      id={id}
      className={"btn btn-primary"}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
