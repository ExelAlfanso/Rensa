import Link from "next/link";

interface DropdownItemProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}
const DropdownItem: React.FC<DropdownItemProps> = ({
  href,
  children,
  className,
}) => {
  return (
    <li className={`w-full`}>
      <Link
        href={href}
        className={`${className} px-3 py-2 focus:text-white focus:bg-white-800 hover:bg-white-600 flex`}
      >
        {children}
      </Link>
    </li>
  );
};

export default DropdownItem;
