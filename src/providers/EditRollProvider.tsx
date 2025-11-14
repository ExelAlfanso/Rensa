"use client";

import { set } from "mongoose";
import React, { createContext, useState, useContext, ReactNode } from "react";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

interface EditRollState {
  rollId: string;
  name: string;
  //   description: string;
}

interface EditRollContextType {
  isOpen: boolean;
  roll: EditRollState | null;
  openEditor: (roll: EditRollState) => void;
  closeEditor: () => void;
  saveChanges: (
    rollId: string,
    name: string,
    description: string
  ) => Promise<void>;
}

// ─────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────

const EditRollContext = createContext<EditRollContextType | undefined>(
  undefined
);

export const useEditRoll = () => {
  const ctx = useContext(EditRollContext);
  if (!ctx) throw new Error("useEditRoll must be used within EditRollProvider");
  return ctx;
};

// ─────────────────────────────────────────────
// Provider
// ─────────────────────────────────────────────

export const EditRollProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [roll, setRoll] = useState<EditRollState | null>(null);

  const [name, setName] = useState("");
  //   const [description, setDescription] = useState("");

  const openEditor = (roll: EditRollState) => {
    setRoll(roll);
    setName(roll.name);
    // setDescription(roll.description);
    setIsOpen(true);
  };

  const closeEditor = () => {
    setIsOpen(false);
    setRoll(null);
    setName("");
    // setDescription("");
  };

  const saveChanges = async (rollId: string, name: string) => {
    try {
      await fetch(`/api/rolls/${rollId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      // Optional: refresh UI, invalidate queries, etc.
      closeEditor();
    } catch (err) {
      console.error("Failed to update roll:", err);
    }
  };

  return (
    <EditRollContext.Provider
      value={{
        isOpen,
        roll,
        openEditor,
        closeEditor,
        saveChanges,
      }}
    >
      {children}

      {/* UI PANEL / MODAL */}
      {isOpen && roll && (
        <div className="fixed inset-0 z-50 flex items-center justify-center text-black bg-black/50">
          <div className="bg-white rounded-2xl p-6 w-[380px] shadow-xl">
            <h2 className="mb-4 text-xl font-semibold">Edit Roll</h2>

            <label className="text-sm font-medium">Roll Name</label>
            <input
              className="w-full px-3 py-2 mt-1 mb-3 border rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* <label className="text-sm font-medium">Description</label> */}
            {/* <textarea
              className="w-full px-3 py-2 mt-1 border rounded-lg"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            /> */}

            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={closeEditor}
                className="px-4 py-2 text-black bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => saveChanges(roll.rollId, name)}
                className="px-4 py-2 text-white bg-black rounded-lg hover:bg-gray-800"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </EditRollContext.Provider>
  );
};
