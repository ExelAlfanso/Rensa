"use client";

import { signOut } from "next-auth/react";
import React from "react";

interface ComponentNameProps {
  id?: string;
}

const ComponentName: React.FC<ComponentNameProps> = ({ id }) => {
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

export default ComponentName;
