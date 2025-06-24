import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'info';
  size?: 'small' | 'medium' | 'large';
  tooltip?: string;
}

export default function IconButton({
  icon,
  variant = 'secondary',
  size = 'medium',
  tooltip,
  className = '',
  ...props
}: IconButtonProps) {
  const variantClasses = {
    primary: "bg-cx-blue text-white hover:bg-opacity-80",
    secondary: "bg-gray-03 text-white hover:bg-gray-02",
    danger: "bg-support-error text-white hover:bg-opacity-80",
    info: "bg-support-info text-white hover:bg-opacity-80"
  };

  const sizeClasses = {
    small: "w-6 h-6 text-xs",
    medium: "w-8 h-8 text-sm",
    large: "w-10 h-10 text-base"
  };

  return (
    <button
      className={`
        ${variantClasses[variant]} 
        ${sizeClasses[size]} 
        rounded flex items-center justify-center transition-colors z-10
        ${className}
      `}
      title={tooltip}
      {...props}
    >
      {icon}
    </button>
  );
}
