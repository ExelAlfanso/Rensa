import Image from "next/image";
import { motion } from "motion/react";
import { rollDropdownItemVariants } from "@/components/animations/dropdownAnimations";
interface RollDropdownItemProps {
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
  setNewRollName: React.Dispatch<React.SetStateAction<string>>;
  handleSave: () => void;
  newRollName: string;
}

const RollDropdownInputItem: React.FC<RollDropdownItemProps> = ({
  setIsCreating,
  setNewRollName,
  handleSave,
  newRollName,
}) => {
  return (
    <motion.li
      variants={rollDropdownItemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="mx-3 my-2 bg-gray-100 rounded-3xl"
    >
      <div className="w-full flex flex-row items-center justify-start gap-2 px-4 py-2 md:px-8 md:py-2 ">
        <div className="w-10 h-10 md:w-12 md:h-12 relative">
          <Image
            src={"/images/default-roll.jpg"}
            alt={"New Roll"}
            fill
            className="rounded-2xl w-full h-full object-cover"
          />
        </div>
        <input
          type="text"
          value={newRollName}
          onChange={(e) => setNewRollName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") {
              setIsCreating(false);
              setNewRollName("");
            }
          }}
          placeholder="Enter roll name..."
          className="rounded-xl text-[13px] md:text-[18px] font-figtree outline-none font-semibold w-38"
        />
      </div>
    </motion.li>
  );
};

export default RollDropdownInputItem;
