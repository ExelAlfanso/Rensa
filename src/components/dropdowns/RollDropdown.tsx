import { CaretDownIcon } from "@phosphor-icons/react";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Text from "@/components/Text";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import Heading from "../Heading";
import { useAuthStore } from "@/stores/useAuthStore";
import api from "@/lib/axios";
import PrimaryButton from "../buttons/PrimaryButton";
import DropdownItem from "./DropdownItem";
import { useRollsStore } from "@/stores/useRollsStore";

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
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
  });
  const { rolls, fetchRolls, isLoading } = useRollsStore();
  const user = useAuthStore((state) => state.user);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useOutsideClick<HTMLDivElement>(() => closeAll());

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isOpen) {
      fetchRolls();
      updateDropdownPosition();
    }
  }, [isOpen]);

  const updateDropdownPosition = () => {
    const button = buttonRef.current;
    if (button) {
      const rect = button.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
      });
    }
  };

  return (
    <div>
      <button
        ref={buttonRef}
        onClick={handleClick}
        className="flex flex-row items-center gap-2 px-4 py-2 cursor-pointer rounded-3xl ring-0 outline-0 font-semibold"
      >
        <Text size="xs">All Photos</Text>
        <CaretDownIcon weight="bold" />
      </button>

      {createPortal(
        <div
          ref={dropdownRef}
          style={{
            position: "absolute",
            top: dropdownPosition.top,
            left: dropdownPosition.left,
            zIndex: 9999,
          }}
          className={`origin-top bg-white border border-gray-400 rounded-2xl shadow-lg text-primary w-100 p-4 
      transition-all duration-300 ease-out transform 
      ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}
    `}
        >
          <Heading alignment="center" size="m" className="py-2">
            Rolls
          </Heading>

          {user && rolls && rolls.length > 0 ? (
            rolls.map((roll) => (
              <DropdownItem href={`/rolls/${roll._id}`} key={roll._id}>
                {roll.name}
              </DropdownItem>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">No rolls found</li>
          )}

          <PrimaryButton className="w-full mt-2">New Roll</PrimaryButton>
        </div>,
        document.body
      )}
    </div>
  );
};

export default RollDropdown;
