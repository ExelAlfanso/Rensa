"use client";

import { PlusIcon } from "@phosphor-icons/react";
import React from "react";
import { useCreateRoll } from "@/providers/CreateRollProvider";

const CreateNewRollCard: React.FC = () => {
  const { openCreator } = useCreateRoll();
  return (
    <button
      onClick={() => openCreator()}
      className="relative bg-white shadow-md rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-200 w-[170px] h-[290px] md:w-[265px] p-3 border border-gray-300 cursor-pointer flex items-center justify-center group"
    >
      <div className="absolute inset-0 rounded-2xl bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />

      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 rounded-xl transition-colors group-hover:bg-gray-200">
        <PlusIcon
          size={40}
          weight="bold"
          className="text-gray-600 group-hover:text-black transition-colors"
        />
        <p className="mt-2 font-medium text-gray-700 group-hover:text-black">
          Create New Roll
        </p>
      </div>
    </button>
  );
};

export default CreateNewRollCard;
