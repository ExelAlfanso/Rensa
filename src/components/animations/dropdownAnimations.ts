// src/components/animations/dropdownAnimations.ts
import { Variants } from "motion/react";

// Animation for a single dropdown item
export const rollDropdownItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
  exit: { opacity: 0 },
};

// Optional parent list animation for staggering
export const rollDropdownListVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05, // delay between each item
    },
  },
};
