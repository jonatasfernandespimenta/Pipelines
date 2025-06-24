import { BaseFieldProps, getCommonInputProps } from "./types";

export default function TextInput({ field, value, onChange, disabled }: BaseFieldProps) {
  const commonProps = getCommonInputProps(field, disabled);

  return (
    <input
      {...commonProps}
      type={field.fieldType}
      value={value || ''}
      onChange={(e) => onChange(field.fieldName, e.target.value)}
    />
  );
}
