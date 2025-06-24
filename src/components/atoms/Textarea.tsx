import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  variant?: 'default' | 'error';
}

export default function Textarea({
  label,
  error,
  variant = 'default',
  className = '',
  ...props
}: TextareaProps) {
  const baseClasses = "w-full px-3 py-2 bg-gray-03 border rounded-lg text-white focus:outline-none transition-colors resize-vertical";
  const variantClasses = {
    default: "border-gray-02 focus:border-cx-blue",
    error: "border-support-error focus:border-support-error"
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-white text-sm font-medium">
          {label}
          {props.required && <span className="text-support-error ml-1">*</span>}
        </label>
      )}
      <textarea
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        {...props}
      />
      {error && (
        <p className="text-support-error text-sm">{error}</p>
      )}
    </div>
  );
}
