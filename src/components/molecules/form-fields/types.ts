import { FieldType } from "@/types/FieldType";

export interface BaseFieldProps {
  field: {
    fieldType: FieldType;
    fieldName: string;
    fieldLabel: string;
    fieldPlaceholder: string;
    fieldRequired: boolean;
    fieldOptions: string[];
    fieldDisabled?: boolean;
  };
  value: any;
  onChange: (fieldName: string, value: any) => void;
  disabled?: boolean;
}

export const getCommonInputProps = (field: BaseFieldProps['field'], disabled?: boolean) => ({
  id: field.fieldName,
  name: field.fieldName,
  placeholder: field.fieldPlaceholder,
  required: field.fieldRequired,
  disabled: disabled || field.fieldDisabled,
  className: `w-full p-3 bg-gray-04 border border-gray-03 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cx-blue focus:border-transparent ${(disabled || field.fieldDisabled) ? 'opacity-50 cursor-not-allowed' : ''}`
});
