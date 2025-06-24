"use client";

import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { FieldType } from "@/types/FieldType";
import { Input, Select, Textarea, Checkbox } from "../atoms";
import Modal from "./Modal";

interface FormField {
  id: string;
  fieldType: FieldType;
  fieldName: string;
  fieldLabel: string;
  fieldPlaceholder: string;
  fieldRequired: boolean;
  fieldOptions: string[];
}

interface FieldConfigFormProps {
  field: FormField | null;
  onSave: (field: FormField) => void;
  onCancel: () => void;
}

const FIELD_TYPE_OPTIONS = [
  { value: FieldType.Text, label: "Texto" },
  { value: FieldType.Number, label: "Número" },
  { value: FieldType.Password, label: "Senha" },
  { value: FieldType.Textarea, label: "Texto Longo" },
  { value: FieldType.Select, label: "Seleção" },
  { value: FieldType.Checkbox, label: "Checkbox" },
  { value: FieldType.Radio, label: "Radio" },
  { value: FieldType.Date, label: "Data" },
  { value: FieldType.Time, label: "Hora" },
];

export default function FieldConfigForm({ field, onSave, onCancel }: FieldConfigFormProps) {
  const [formData, setFormData] = useState<FormField>({
    id: "",
    fieldType: FieldType.Text,
    fieldName: "",
    fieldLabel: "",
    fieldPlaceholder: "",
    fieldRequired: false,
    fieldOptions: [],
  });
  const [optionsText, setOptionsText] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (field) {
      setFormData(field);
      setOptionsText(field.fieldOptions.join("\n"));
    }
  }, [field]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fieldName.trim()) {
      newErrors.fieldName = "Nome do campo é obrigatório";
    }

    if (!formData.fieldLabel.trim()) {
      newErrors.fieldLabel = "Label do campo é obrigatório";
    }

    const needsOptions = formData.fieldType === FieldType.Select || formData.fieldType === FieldType.Radio;
    if (needsOptions && !optionsText.trim()) {
      newErrors.fieldOptions = "Opções são obrigatórias para este tipo de campo";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const updatedField = {
      ...formData,
      fieldOptions: formData.fieldType === FieldType.Select || formData.fieldType === FieldType.Radio
        ? optionsText.split("\n").filter(option => option.trim() !== "")
        : [],
    };

    onSave(updatedField);
    toast.success('Campo atualizado com sucesso!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleFieldChange = (key: keyof FormField, value: any) => {
    setFormData(prev => ({
      ...prev,
      [key]: value,
    }));

    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: "" }));
    }
  };

  const needsOptions = formData.fieldType === FieldType.Select || formData.fieldType === FieldType.Radio;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Select
        label="Tipo do Campo"
        value={formData.fieldType}
        onChange={(e) => handleFieldChange("fieldType", e.target.value as FieldType)}
        options={FIELD_TYPE_OPTIONS}
        error={errors.fieldType}
      />

      <Input
        label="Nome do Campo"
        type="text"
        value={formData.fieldName}
        onChange={(e) => handleFieldChange("fieldName", e.target.value)}
        placeholder="Ex: taskName"
        required
        error={errors.fieldName}
      />

      <Input
        label="Label do Campo"
        type="text"
        value={formData.fieldLabel}
        onChange={(e) => handleFieldChange("fieldLabel", e.target.value)}
        placeholder="Ex: Nome da tarefa"
        required
        error={errors.fieldLabel}
      />

      <Input
        label="Placeholder"
        type="text"
        value={formData.fieldPlaceholder}
        onChange={(e) => handleFieldChange("fieldPlaceholder", e.target.value)}
        placeholder="Ex: Digite o nome da tarefa"
        error={errors.fieldPlaceholder}
      />

      {needsOptions && (
        <Textarea
          label="Opções (uma por linha)"
          value={optionsText}
          onChange={(e) => setOptionsText(e.target.value)}
          placeholder="Opção 1&#10;Opção 2&#10;Opção 3"
          rows={4}
          required
          error={errors.fieldOptions}
        />
      )}

      <Checkbox
        id="fieldRequired"
        checked={formData.fieldRequired}
        onChange={(e) => handleFieldChange("fieldRequired", e.target.checked)}
        label="Campo obrigatório"
      />

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 bg-gray-03 text-white rounded-lg hover:bg-gray-02 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-cx-blue text-white rounded-lg hover:bg-opacity-80 transition-colors"
        >
          Salvar
        </button>
      </div>
    </form>
  );
}
