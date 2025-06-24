import { BaseFieldProps, getCommonInputProps } from "./types";

export default function TextareaInput({ field, value, onChange }: BaseFieldProps) {
  const commonProps = getCommonInputProps(field);

  return (
    <textarea
      {...commonProps}
      value={value || ''}
      onChange={(e) => onChange(field.fieldName, e.target.value)}
      rows={3}
      className={`${commonProps.className} resize-none`}
    />
  );
}
