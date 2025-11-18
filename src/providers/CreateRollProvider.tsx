"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { useToast } from "./ToastProvider";
import api from "@/lib/axios";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import TertiaryButton from "@/components/buttons/TertiaryButton";
import { useAuthStore } from "@/stores/useAuthStore";

interface CreateRollState {
  name: string;
}

interface CreateRollContextType {
  isOpen: boolean;
  openCreator: () => void;
  closeCreator: () => void;
  createRoll: (name: string) => Promise<void>;
}

const CreateRollContext = createContext<CreateRollContextType | undefined>(
  undefined
);

export const useCreateRoll = () => {
  const ctx = useContext(CreateRollContext);
  if (!ctx)
    throw new Error("useCreateRoll must be used within CreateRollProvider");
  return ctx;
};

interface CreateRollProviderProps {
  children: ReactNode;
  onRollCreate?: (roll: { _id: string; name: string }) => void;
}

export const CreateRollProvider = ({
  children,
  onRollCreate,
}: CreateRollProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthStore();
  const [name, setName] = useState("");
  const { showToast } = useToast();

  const openCreator = () => {
    setName("");
    setIsOpen(true);
  };

  const closeCreator = () => {
    setIsOpen(false);
    setName("");
  };

  const createRoll = async (name: string) => {
    try {
      const res = await api.post("/rolls", { name, userId: user?.id });

      showToast("Roll created successfully", "success");

      if (onRollCreate) {
        onRollCreate(res.data.data);
      }

      closeCreator();
    } catch (err) {
      console.error("Failed to create roll:", err);
      showToast("Failed to create roll", "error");
    }
  };

  return (
    <CreateRollContext.Provider
      value={{ isOpen, openCreator, closeCreator, createRoll }}
    >
      {children}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 text-black">
          <div className="bg-white rounded-2xl p-6 w-[380px] shadow-xl">
            <h2 className="mb-4 text-xl font-semibold">Create New Roll</h2>

            <label className="text-sm font-medium">Roll Name</label>
            <input
              className="w-full px-3 py-2 mt-1 mb-3 border rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div className="flex justify-end gap-2 mt-5">
              <TertiaryButton onClick={closeCreator}>Cancel</TertiaryButton>
              <PrimaryButton
                onClick={() => {
                  closeCreator();
                  createRoll(name);
                }}
              >
                Create
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}
    </CreateRollContext.Provider>
  );
};
