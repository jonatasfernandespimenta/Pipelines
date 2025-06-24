"use client"

import { tv } from "tailwind-variants";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger" | "icon";
  size?: "small" | "medium" | "large";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const buttonStyles = tv({
  base: "font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center",
  variants: {
    variant: {
      primary: "bg-cx-blue text-gray-04 hover:bg-cx-blue/90 focus:ring-cx-blue",
      secondary: "bg-gray-04 text-gray-500 border border-gray-03 hover:bg-gray-03 focus:ring-gray-03",
      danger: "bg-support-error text-white hover:bg-support-error/90 focus:ring-support-error",
      icon: "bg-support-error text-white rounded-full hover:bg-support-error/90 focus:ring-support-error",
    },
    size: {
      small: "px-2 py-1 text-sm",
      medium: "px-4 py-2 text-base",
      large: "px-6 py-3 text-lg",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "medium",
  },
});

export default function Button({
  children,
  onClick,
  variant = "primary",
  size = "medium",
  className,
  disabled = false,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonStyles({ variant, size, className })}
    >
      {children}
    </button>
  );
}
