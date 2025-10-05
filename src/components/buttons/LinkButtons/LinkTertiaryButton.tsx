import TertiaryButton from "../TertiaryButton";
import { LinkButtonProps } from "./LinkPrimaryButton";

const LinkTertiaryButton: React.FC<LinkButtonProps> = ({
  href,
  className,
  children,
}) => {
  return (
    <TertiaryButton href={href} className={className}>
      {children}
    </TertiaryButton>
  );
};

export default LinkTertiaryButton;
