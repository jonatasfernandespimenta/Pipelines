import { BaseFieldProps, getCommonInputProps } from "./types";

export default function SelectInput({ field, value, onChange, disabled }: BaseFieldProps) {
  const commonProps = getCommonInputProps(field, disabled);

  return (
    <select
      {...commonProps}
      value={value || ''}
      onChange={(e) => onChange(field.fieldName, e.target.value)}
      className={`${commonProps.className} cursor-pointer`}
    >
      <option value="">{field.fieldPlaceholder}</option>
      {field.fieldOptions.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
