import { CaretDownIcon } from "@phosphor-icons/react";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Text from "@/components/Text";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import Heading from "../../Heading";
import PrimaryButton from "../../buttons/PrimaryButton";
import { useRollsStore } from "@/stores/useRollsStore";
import RollDropdownItem from "./RollDropdownItem";
import SearchInputField from "../../inputfields/SearchInputField";
import { useAuthStore } from "@/stores/useAuthStore";
import RollDropdownInputItem from "./RollDropdownInputItem";

interface RollDropdownProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  closeAll: () => void;
}

const RollDropdown: React.FC<RollDropdownProps> = ({
  isOpen,
  setIsOpen,
  closeAll,
}) => {
  const [selectedRolls, setSelectedRolls] = useState<string[]>([]);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
  });
  const [isCreating, setIsCreating] = useState(false);
  const [newRollName, setNewRollName] = useState("");
  const { rolls, fetchRolls, isLoading, createRoll } = useRollsStore();
  const user = useAuthStore((state) => state.user);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const dropdownRef = useOutsideClick<HTMLDivElement>(() => {
    if (buttonRef.current?.contains(event?.target as Node)) return;
    closeAll();
  });
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (isCreating && listRef.current) {
      const list = listRef.current;
      list.scrollTo({
        top: list.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [isCreating]);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isOpen) {
      fetchRolls();
      updateDropdownPosition();
    } else {
      setSelectedRolls([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!dropdownRef.current) return;

      const rect = dropdownRef.current.getBoundingClientRect();
      const completelyOutOfView =
        rect.bottom < 0 || rect.top > window.innerHeight;

      if (completelyOutOfView) setIsOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const updateDropdownPosition = () => {
    const button = buttonRef.current;
    const dropdown = dropdownRef.current;

    if (button && dropdown) {
      const buttonRect = button.getBoundingClientRect();
      const dropdownRect = dropdown.getBoundingClientRect();

      setDropdownPosition({
        top: buttonRect.bottom + window.scrollY + 4,
        left:
          buttonRect.left +
          window.scrollX +
          buttonRect.width / 2 -
          dropdownRect.width / 2,
      });
    }
  };

  const handleCreate = () => {
    setIsCreating(true);
    setNewRollName("");
  };

  const handleSave = async () => {
    if (!newRollName.trim()) return;
    console.log("Saving new roll:", newRollName);
    try {
      await createRoll({
        name: newRollName,
      });
    } catch (error) {
      console.error("Failed to create roll:", error);
    } finally {
      setIsCreating(false);
      setNewRollName("");
    }
  };
  const dropdownContent = (
    <div
      ref={dropdownRef}
      onClick={(e) => e.stopPropagation()}
      style={{
        position: "absolute",
        top: dropdownPosition.top,
        left: dropdownPosition.left,
        zIndex: 9999,
        visibility:
          dropdownPosition.top === 0 && dropdownPosition.left === 0
            ? "hidden"
            : "visible",
      }}
      className="origin-top flex flex-col item-start justify-center gap-4 bg-white border border-gray-400 rounded-2xl shadow-lg text-primary w-[200px] md:w-[328px] py-4 ease-out transform"
    >
      <Heading alignment="center" size="m" className="py-2">
        Rolls
      </Heading>

      <SearchInputField className="ml-2 w-[178px] md:w-[309px]" />

      <ul ref={listRef} className="w-full max-h-60 overflow-y-auto">
        {isLoading ? (
          <div className="w-full h-32 relative flex items-center justify-center">
            <div className="loading loading-spinner" />
          </div>
        ) : (
          <>
            {rolls.length > 0 ? (
              rolls.map((roll) => (
                <RollDropdownItem
                  roll={roll}
                  key={roll._id}
                  setSelectedRolls={setSelectedRolls}
                />
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No rolls found</li>
            )}
            {isCreating && (
              <RollDropdownInputItem
                setIsCreating={setIsCreating}
                setNewRollName={setNewRollName}
                handleSave={handleSave}
                newRollName={newRollName}
              ></RollDropdownInputItem>
            )}
          </>
        )}
      </ul>

      <PrimaryButton
        className="mx-4 mt-2"
        onClick={isCreating ? handleSave : handleCreate}
        disabled={isLoading}
      >
        {isCreating ? "Save Roll" : "New Roll"}
      </PrimaryButton>
    </div>
  );
  return (
    <div>
      <button
        ref={buttonRef}
        onClick={handleClick}
        className="flex flex-row items-center gap-2 px-4 py-2 font-semibold cursor-pointer rounded-3xl ring-0 outline-0"
      >
        <Text size="xs">All Photos</Text>
        <CaretDownIcon weight="bold" />
      </button>

      {isOpen && createPortal(dropdownContent, document.body)}
    </div>
  );
};

export default RollDropdown;
