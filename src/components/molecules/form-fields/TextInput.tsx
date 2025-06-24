import { BaseFieldProps, getCommonInputProps } from "./types";

export default function TextInput({ field, value, onChange }: BaseFieldProps) {
  const commonProps = getCommonInputProps(field);

  return (
    <input
      {...commonProps}
      type={field.fieldType}
      value={value || ''}
      onChange={(e) => onChange(field.fieldName, e.target.value)}
    />
  );
}
