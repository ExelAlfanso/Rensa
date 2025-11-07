import { CaretDownIcon } from "@phosphor-icons/react";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Text from "@/components/Text";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import Heading from "../Heading";
import PrimaryButton from "../buttons/PrimaryButton";
import { useRollsStore } from "@/stores/useRollsStore";
import RollDropdownItem from "../RollDropdownItem";
import SearchInputField from "../inputfields/SearchInputField";

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
  // const user = useAuthStore((state) => state.user);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useOutsideClick<HTMLDivElement>(() => {
    // 👇 don't close if the click is on the button
    if (buttonRef.current?.contains(event?.target as Node)) return;
    closeAll();
  });

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

  useEffect(() => {
    console.log("Rolls from store:", rolls);
  }, [rolls]);

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

      {isOpen &&
        createPortal(
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
            className={`origin-top flex flex-col item-start justify-center gap-4 bg-white border border-gray-400 rounded-2xl shadow-lg text-primary w-[200px] md:w-[328px] py-4 ease-out transform `}
          >
            <Heading alignment="center" size="m" className="py-2">
              Rolls
            </Heading>
            <SearchInputField className="ml-2 w-[178px] md:w-[309px]"></SearchInputField>

            <ul className="w-full overflow-auto max-h-60">
              {rolls.length > 0 ? (
                rolls.map((roll) => (
                  <RollDropdownItem roll={roll} key={roll._id} />
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500">No rolls found</li>
              )}
            </ul>

            <PrimaryButton className="mx-4 mt-2">New Roll</PrimaryButton>
          </div>,
          document.body
        )}
    </div>
  );
};

export default RollDropdown;
