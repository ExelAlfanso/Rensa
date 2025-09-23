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
    <li>
      <Link href={href} className={`px-5 w-full hover:bg-white-600`}>
        {children}
      </Link>
    </li>
  );
};

export default DropdownItem;
