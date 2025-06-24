import { tv } from "tailwind-variants";
import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "success" | "warning" | "error";
  size?: "small" | "medium";
  className?: string;
}

const badgeStyles = tv({
  base: "inline-flex items-center justify-center rounded font-medium",
  variants: {
    variant: {
      primary: "bg-cx-blue text-gray-04",
      secondary: "bg-gray-03 text-gray-700",
      success: "bg-brand-color-green text-gray-900",
      warning: "bg-yellow-500 text-gray-900",
      error: "bg-support-error text-white",
    },
    size: {
      small: "px-1 py-0.5 text-xs",
      medium: "px-2 py-1 text-sm",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "medium",
  },
});

export default function Badge({
  children,
  variant = "primary",
  size = "medium",
  className,
}: BadgeProps) {
  return (
    <span className={badgeStyles({ variant, size, className })}>
      {children}
    </span>
  );
}
