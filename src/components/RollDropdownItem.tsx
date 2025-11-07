import DropdownItem from "./dropdowns/DropdownItem";
import Image from "next/image";
interface RollDropdownItemProps {
  roll: {
    _id: string;
    name: string;
    imageUrl: string;
  };
}

const RollDropdownItem: React.FC<RollDropdownItemProps> = ({ roll }) => {
  return (
    <DropdownItem
      href={`/rolls/${roll._id}`}
      key={roll._id}
      className="flex flex-row items-center justify-center   gap-2"
    >
      <Image
        src={roll.imageUrl}
        alt={roll.name}
        width={40}
        height={40}
        className="w-10 h-10 rounded-full object-cover"
      />
      {roll.name}
    </DropdownItem>
  );
};

export default RollDropdownItem;
