import PrimaryButton from "../PrimaryButton";

export interface LinkButtonProps {
  href: string;
  className?: string;
  children?: React.ReactNode;
}
const LinkPrimaryButton: React.FC<LinkButtonProps> = ({
  href,
  className,
  children,
}) => {
  return (
    <PrimaryButton href={href} className={className}>
      {children}
    </PrimaryButton>
  );
};

export default LinkPrimaryButton;
