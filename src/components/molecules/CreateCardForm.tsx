"use client"

import { useState } from "react";
import Button from "../atoms/Button";
import Text from "../atoms/Text";
import { initialForm } from "@/mocks/form";
import { FieldType } from "@/types/FieldType";
import { FieldRenderer } from "./form-fields";

interface FormField {
  fieldType: FieldType;
  fieldName: string;
  fieldLabel: string;
  fieldPlaceholder: string;
  fieldRequired: boolean;
  fieldOptions: string[];
}

interface CreateCardFormProps {
  onSubmit: (cardData: Record<string, any>) => void;
  onCancel: () => void;
  formFields?: FormField[];
}

export default function CreateCardForm({ onSubmit, onCancel, formFields = initialForm.fields }: CreateCardFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = formFields.filter(field => field.fieldRequired);
    const missingFields = requiredFields.filter(field => !formData[field.fieldName]?.toString().trim());

    if (missingFields.length > 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      onSubmit(formData);
      setFormData({});
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    const requiredFields = formFields.filter(field => field.fieldRequired);
    return requiredFields.every(field => formData[field.fieldName]?.toString().trim());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {formFields.map((field) => (
        <div key={field.fieldName} className="mb-2">
          <FieldRenderer
            field={field}
            value={formData[field.fieldName]}
            onChange={handleInputChange}
          />
        </div>
      ))}

      <div className="flex gap-2 justify-end">
        <Button
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
          type="button"
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          disabled={!isFormValid() || isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Creating..." : "Create Card"}
        </Button>
      </div>
    </form>
  );
}
