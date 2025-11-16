"use client";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import TertiaryButton from "@/components/buttons/TertiaryButton";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { useToast } from "./ToastProvider";
import api from "@/lib/axios";
import Button from "@/components/buttons/Button";

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
  removeRoll: (rollId: string) => Promise<void>;
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
  onRollDelete?: (rollId: string) => void;
}

export const EditRollProvider = ({
  children,
  onRollUpdate,
  onRollDelete,
}: EditRollProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [roll, setRoll] = useState<EditRollState | null>(null);
  const [name, setName] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
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
  const removeRoll = async (rollId: string) => {
    try {
      await api.delete(`/rolls/${rollId}`);
      showToast("Roll deleted successfully", "success");

      if (onRollDelete) onRollDelete(rollId);

      closeEditor();
    } catch (err) {
      showToast("Failed to delete roll", "error");
      console.error("Failed to delete roll:", err);
    }
  };
  const saveChanges = async (rollId: string, name: string) => {
    try {
      await api.patch(`/api/rolls/${rollId}`, { name });

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
      value={{ isOpen, roll, openEditor, closeEditor, saveChanges, removeRoll }}
    >
      {children}

      {isOpen && roll && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 text-black">
          <div className="bg-white rounded-2xl p-6 w-[380px] shadow-xl">
            {!isDeleting ? (
              <>
                <h2 className="mb-4 text-xl font-semibold">Edit Roll</h2>
                <label className="text-sm font-medium">Roll Name</label>
                <input
                  className="w-full px-3 py-2 mt-1 mb-3 border rounded-lg"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="flex justify-between gap-2 mt-5">
                  <Button
                    className="bg-red-600 text-white hover:bg-red-700"
                    onClick={() => setIsDeleting(true)}
                  >
                    Delete
                  </Button>
                  <div className="flex flex-row gap-2">
                    <TertiaryButton onClick={closeEditor}>
                      Cancel
                    </TertiaryButton>
                    <PrimaryButton
                      onClick={() => {
                        closeEditor();
                        saveChanges(roll.rollId, name);
                      }}
                    >
                      Save
                    </PrimaryButton>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2 className="mb-4 text-xl font-semibold">
                  Are you sure you want to delete this roll?
                </h2>
                <div className="flex justify-end gap-2 mt-5">
                  <Button
                    className="bg-red-600 text-white hover:bg-red-700"
                    onClick={() => {
                      closeEditor();
                      removeRoll(roll.rollId);
                    }}
                  >
                    Yes
                  </Button>
                  <TertiaryButton onClick={() => setIsDeleting(false)}>
                    No
                  </TertiaryButton>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </EditRollContext.Provider>
  );
};
