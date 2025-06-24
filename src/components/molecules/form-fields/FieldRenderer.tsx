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

  if (!FieldComponent) {
    console.warn(`Unsupported field type: ${props.field.fieldType}`);
    return null;
  }

  return (
    <div className="mb-4 mt-4">
      <FieldComponent {...props} />
    </div>
  )
}
