import Link from "next/link";

interface LinkIconButtonProps {
  href: string;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  Icon: React.ElementType;
}

const LinkIconButton: React.FC<LinkIconButtonProps> = ({
  href,
  className,
  onClick,
  children,
  Icon,
}) => {
  return (
    <Link href={href} className={className} onClick={onClick}>
      {Icon && <Icon size={32} className="text-primary hover:text-black-200" />}
      {children}
    </Link>
  );
};

export default LinkIconButton;
