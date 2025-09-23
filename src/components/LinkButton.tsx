import Link from "next/link";

interface LinkButtonProps {
  href: string;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  Icon: React.ElementType;
}

const LinkButton: React.FC<LinkButtonProps> = ({
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

export default LinkButton;
