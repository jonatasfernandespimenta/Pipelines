import { FieldType } from "@/types/FieldType";

export interface BaseFieldProps {
  field: {
    fieldType: FieldType;
    fieldName: string;
    fieldLabel: string;
    fieldPlaceholder: string;
    fieldRequired: boolean;
    fieldOptions: string[];
  };
  value: any;
  onChange: (fieldName: string, value: any) => void;
}

export const getCommonInputProps = (field: BaseFieldProps['field']) => ({
  id: field.fieldName,
  name: field.fieldName,
  placeholder: field.fieldPlaceholder,
  required: field.fieldRequired,
  className: "w-full p-3 bg-gray-04 border border-gray-03 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cx-blue focus:border-transparent"
});
