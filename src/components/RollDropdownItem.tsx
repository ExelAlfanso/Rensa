import DropdownItem from "./dropdowns/DropdownItem";
import Image from "next/image";
import Text from "./Text";
import SearchInputField from "./inputfields/SearchInputField";
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
      className="flex flex-row items-center justify-start gap-2 px-4 py-2 md:px-8 md:py-4"
    >
      <div className="w-10 h-10 md:w-12 md:h-12 relative">
        <Image
          src={roll.imageUrl}
          alt={roll.name}
          fill
          className="rounded-2xl w-full h-full object-cover"
        />
      </div>
      <Text className="font-semibold" size="s">
        {roll.name}
      </Text>
    </DropdownItem>
  );
};

export default RollDropdownItem;
