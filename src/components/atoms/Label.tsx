import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  variant?: 'default' | 'heading' | 'subtitle';
}

export default function Label({
  children,
  required = false,
  variant = 'default',
  className = '',
  ...props
}: LabelProps) {
  const variantClasses = {
    default: "text-white text-sm font-medium",
    heading: "text-white text-2xl font-semibold",
    subtitle: "text-white text-lg font-medium"
  };

  return (
    <label className={`block ${variantClasses[variant]} ${className}`} {...props}>
      {children}
      {required && <span className="text-support-error ml-1">*</span>}
    </label>
  );
}
