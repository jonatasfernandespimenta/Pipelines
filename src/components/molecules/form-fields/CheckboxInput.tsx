import Text from "../../atoms/Text";
import { BaseFieldProps } from "./types";

export default function CheckboxInput({ field, value, onChange, disabled }: BaseFieldProps) {
  const isDisabled = disabled || field.fieldDisabled;

  return (
    <div className="flex items-center space-x-2">
      <input
        id={field.fieldName}
        name={field.fieldName}
        type="checkbox"
        checked={value || false}
        disabled={isDisabled}
        onChange={(e) => onChange(field.fieldName, e.target.checked)}
        className={`w-4 h-4 text-cx-blue bg-gray-04 border-gray-03 rounded focus:ring-cx-blue focus:ring-2 ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      />
      <Text variant="body" className={`text-white ${isDisabled ? 'opacity-50' : ''}`}>
        {field.fieldLabel}
      </Text>
    </div>
  );
}
