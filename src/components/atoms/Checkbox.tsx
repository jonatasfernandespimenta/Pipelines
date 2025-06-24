import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Checkbox({
  label,
  error,
  className = '',
  ...props
}: CheckboxProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <input
          type="checkbox"
          className={`mr-2 ${className}`}
          {...props}
        />
        {label && (
          <label className="text-white text-sm">
            {label}
          </label>
        )}
      </div>
      {error && (
        <p className="text-support-error text-sm">{error}</p>
      )}
    </div>
  );
}
