import SecondaryButton from "../SecondaryButton";
import { LinkButtonProps } from "./LinkPrimaryButton";

const LinkSecondaryButton: React.FC<LinkButtonProps> = ({
  href,
  className,
  children,
}) => {
  return (
    <SecondaryButton href={href} className={className}>
      {children}
    </SecondaryButton>
  );
};

export default LinkSecondaryButton;
