"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

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
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    if (href === "back") {
      e.preventDefault();
      router.back();
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <Link
      href={href === "back" ? "#" : href}
      onClick={handleClick}
      className={className}
    >
      {Icon && <Icon size={32} className="text-primary hover:text-black-200" />}
      {children}
    </Link>
  );
};

export default LinkIconButton;
