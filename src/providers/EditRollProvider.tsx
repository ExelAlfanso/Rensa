"use client";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import TertiaryButton from "@/components/buttons/TertiaryButton";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { useToast } from "./ToastProvider";

interface EditRollState {
  rollId: string;
  name: string;
}

interface EditRollContextType {
  isOpen: boolean;
  roll: EditRollState | null;
  openEditor: (roll: EditRollState) => void;
  closeEditor: () => void;
  saveChanges: (rollId: string, name: string) => Promise<void>;
}

const EditRollContext = createContext<EditRollContextType | undefined>(
  undefined
);

export const useEditRoll = () => {
  const ctx = useContext(EditRollContext);
  if (!ctx) throw new Error("useEditRoll must be used within EditRollProvider");
  return ctx;
};

interface EditRollProviderProps {
  children: ReactNode;
  onRollUpdate?: (roll: EditRollState) => void;
}

export const EditRollProvider = ({
  children,
  onRollUpdate,
}: EditRollProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [roll, setRoll] = useState<EditRollState | null>(null);
  const [name, setName] = useState("");
  const { showToast } = useToast();

  const openEditor = (roll: EditRollState) => {
    setRoll(roll);
    setName(roll.name);
    setIsOpen(true);
  };

  const closeEditor = () => {
    setIsOpen(false);
    setRoll(null);
    setName("");
  };

  const saveChanges = async (rollId: string, name: string) => {
    try {
      await fetch(`/api/rolls/${rollId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (onRollUpdate) onRollUpdate({ rollId, name });

      closeEditor();
      showToast("Roll updated successfully", "success");
    } catch (err) {
      showToast("Failed to update roll", "error");
      console.error("Failed to update roll:", err);
    }
  };

  return (
    <EditRollContext.Provider
      value={{ isOpen, roll, openEditor, closeEditor, saveChanges }}
    >
      {children}

      {isOpen && roll && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 text-black">
          <div className="bg-white rounded-2xl p-6 w-[380px] shadow-xl">
            <h2 className="mb-4 text-xl font-semibold">Edit Roll</h2>

            <label className="text-sm font-medium">Roll Name</label>
            <input
              className="w-full px-3 py-2 mt-1 mb-3 border rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div className="flex justify-end gap-2 mt-5">
              <TertiaryButton onClick={closeEditor}>Cancel</TertiaryButton>
              <PrimaryButton onClick={() => saveChanges(roll.rollId, name)}>
                Save
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}
    </EditRollContext.Provider>
  );
};
