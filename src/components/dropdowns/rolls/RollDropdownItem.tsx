import Image from "next/image";
import Text from "../../Text";
import { useState } from "react";
import { CheckIcon } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { rollDropdownItemVariants } from "../../animations/dropdownAnimations";
interface RollDropdownItemProps {
  roll: {
    _id: string;
    name: string;
    imageUrl?: string;
  };
  setSelectedRolls: React.Dispatch<React.SetStateAction<string[]>>;
  isCreating?: boolean;
}

const RollDropdownItem: React.FC<RollDropdownItemProps> = ({
  roll,
  setSelectedRolls,
  isCreating,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    if (isCreating) return;
    setSelectedRolls((prev: string[]) => {
      if (isSelected) {
        return prev.filter((id) => id !== roll._id);
      }
      return [...prev, roll._id];
    });
    setIsSelected(!isSelected);
  };
  return (
    <motion.li
      variants={rollDropdownItemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      key={roll._id}
      className={`rounded-3xl cursor-pointer transition-colors duration-100 ${
        isSelected ? "bg-gray-200" : ""
      } mx-3 my-2`}
    >
      <button
        className="w-full flex flex-row items-center justify-start gap-2 px-4 py-2 md:px-8 md:py-2 "
        onClick={handleClick}
      >
        <div className="w-10 h-10 md:w-12 md:h-12 relative">
          <Image
            src={roll?.imageUrl || "/images/default-roll.jpg"}
            alt={roll?.name || "Untitled Roll"}
            fill
            className="rounded-2xl w-full h-full object-cover"
          />
        </div>
        <Text className="font-semibold" size="s">
          {roll?.name || "Untitled Roll"}
        </Text>
        <CheckIcon
          size={24}
          className={`ml-auto text-black transition-opacity duration-150 ${
            isSelected ? "opacity-100" : "opacity-0"
          }`}
          weight="bold"
        />
      </button>
    </motion.li>
  );
};

export default RollDropdownItem;
