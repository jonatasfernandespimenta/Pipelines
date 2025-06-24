import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  variant?: 'default' | 'error';
}

export default function Select({
  label,
  error,
  options,
  variant = 'default',
  className = '',
  ...props
}: SelectProps) {
  const baseClasses = "w-full px-3 py-2 bg-gray-03 border rounded-lg text-white focus:outline-none transition-colors";
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
      <select
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-support-error text-sm">{error}</p>
      )}
    </div>
  );
}
