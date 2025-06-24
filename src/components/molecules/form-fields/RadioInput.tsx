import Text from "../../atoms/Text";
import { BaseFieldProps } from "./types";

export default function RadioInput({ field, value, onChange }: BaseFieldProps) {
  return (
    <div className="space-y-2">
      {field.fieldOptions.map((option, index) => (
        <div key={index} className="flex items-center space-x-2">
          <input
            id={`${field.fieldName}_${index}`}
            name={field.fieldName}
            type="radio"
            value={option}
            checked={value === option}
            onChange={(e) => onChange(field.fieldName, e.target.value)}
            className="w-4 h-4 text-cx-blue bg-gray-04 border-gray-03 focus:ring-cx-blue focus:ring-2"
          />
          <Text variant="body" className="text-white">
            {option}
          </Text>
        </div>
      ))}
    </div>
  );
}
