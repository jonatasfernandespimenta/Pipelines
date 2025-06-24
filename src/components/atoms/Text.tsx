import { tv } from "tailwind-variants";
import { ReactNode } from "react";

interface TextProps {
  children: ReactNode;
  variant?: "heading" | "subheading" | "body" | "caption" | "label";
  className?: string;
}

const textStyles = tv({
  variants: {
    base: "transition-colors duration-300",
    variant: {
      heading: "text-2xl font-bold",
      subheading: "text-lg font-bold",
      body: "text-base",
      caption: "text-sm",
      label: "text-sm font-medium",
    },
  },
  defaultVariants: {
    variant: "body",
    color: "primary",
  },
});

export default function Text({
  children,
  variant = "body",
  className,
}: TextProps) {
  return (
    <span className={textStyles({ variant, className })}>
      {children}
    </span>
  );
}
