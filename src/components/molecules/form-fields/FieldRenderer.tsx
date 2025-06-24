import { FieldType } from "@/types/FieldType";
import { BaseFieldProps } from "./types";
import TextInput from "./TextInput";
import TextareaInput from "./TextareaInput";
import SelectInput from "./SelectInput";
import CheckboxInput from "./CheckboxInput";
import RadioInput from "./RadioInput";

const FIELD_COMPONENTS = {
  [FieldType.Text]: TextInput,
  [FieldType.Number]: TextInput,
  [FieldType.Password]: TextInput,
  [FieldType.Date]: TextInput,
  [FieldType.Time]: TextInput,
  [FieldType.Textarea]: TextareaInput,
  [FieldType.Select]: SelectInput,
  [FieldType.Checkbox]: CheckboxInput,
  [FieldType.Radio]: RadioInput,
} as const;

export default function FieldRenderer(props: BaseFieldProps) {
  const FieldComponent = FIELD_COMPONENTS[props.field.fieldType];
  const isDisabled = props.disabled || props.field.fieldDisabled;

  if (!FieldComponent) {
    console.warn(`Unsupported field type: ${props.field.fieldType}`);
    return null;
  }

  return (
    <div className="mb-4 mt-4">
      {/* Show label for all field types except checkbox and radio which handle their own labels */}
      {![FieldType.Checkbox, FieldType.Radio].includes(props.field.fieldType) && (
        <label
          htmlFor={props.field.fieldName}
          className={`block text-sm font-medium text-white mb-2 ${isDisabled ? 'opacity-50' : ''}`}
        >
          {props.field.fieldLabel}
          {props.field.fieldRequired && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <FieldComponent {...props} />
    </div>
  )
}
