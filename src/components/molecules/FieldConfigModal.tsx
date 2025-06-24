"use client";

import { useState, useEffect } from "react";
import { FieldType } from "@/types/FieldType";
import Modal from "./Modal";
import { toast } from 'react-toastify';

interface FormField {
  id: string;
  fieldType: FieldType;
  fieldName: string;
  fieldLabel: string;
  fieldPlaceholder: string;
  fieldRequired: boolean;
  fieldOptions: string[];
}

interface FieldConfigModalProps {
  isOpen: boolean;
  field: FormField | null;
  onClose: () => void;
  onSave: (field: FormField) => void;
}

export default function FieldConfigModal({
  isOpen,
  field,
  onClose,
  onSave,
}: FieldConfigModalProps) {
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

  useEffect(() => {
    if (field) {
      setFormData(field);
      setOptionsText(field.fieldOptions.join("\n"));
    }
  }, [field]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    onClose();
  };

  const handleFieldChange = (key: keyof FormField, value: any) => {
    setFormData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const needsOptions = formData.fieldType === FieldType.Select || formData.fieldType === FieldType.Radio;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Configurar Campo">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Tipo do Campo
          </label>
          <select
            value={formData.fieldType}
            onChange={(e) => handleFieldChange("fieldType", e.target.value as FieldType)}
            className="w-full px-3 py-2 bg-gray-03 border mb-4 border-gray-02 rounded-lg text-white focus:outline-none focus:border-cx-blue"
          >
            <option value={FieldType.Text}>Texto</option>
            <option value={FieldType.Number}>Número</option>
            <option value={FieldType.Password}>Senha</option>
            <option value={FieldType.Textarea}>Texto Longo</option>
            <option value={FieldType.Select}>Seleção</option>
            <option value={FieldType.Checkbox}>Checkbox</option>
            <option value={FieldType.Radio}>Radio</option>
            <option value={FieldType.Date}>Data</option>
            <option value={FieldType.Time}>Hora</option>
          </select>
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Nome do Campo *
          </label>
          <input
            type="text"
            value={formData.fieldName}
            onChange={(e) => handleFieldChange("fieldName", e.target.value)}
            className="w-full px-3 py-2 bg-gray-03 border mb-4 border-gray-02 rounded-lg text-white focus:outline-none focus:border-cx-blue"
            placeholder="Ex: taskName"
            required
          />
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Label do Campo *
          </label>
          <input
            type="text"
            value={formData.fieldLabel}
            onChange={(e) => handleFieldChange("fieldLabel", e.target.value)}
            className="w-full px-3 py-2 bg-gray-03 border mb-4 border-gray-02 rounded-lg text-white focus:outline-none focus:border-cx-blue"
            placeholder="Ex: Nome da tarefa"
            required
          />
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Placeholder
          </label>
          <input
            type="text"
            value={formData.fieldPlaceholder}
            onChange={(e) => handleFieldChange("fieldPlaceholder", e.target.value)}
            className="w-full px-3 py-2 bg-gray-03 border mb-4 border-gray-02 rounded-lg text-white focus:outline-none focus:border-cx-blue"
            placeholder="Ex: Digite o nome da tarefa"
          />
        </div>

        {needsOptions && (
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Opções (uma por linha) *
            </label>
            <textarea
              value={optionsText}
              onChange={(e) => setOptionsText(e.target.value)}
              className="w-full px-3 py-2 bg-gray-03 border mb-4 border-gray-02 rounded-lg text-white focus:outline-none focus:border-cx-blue"
              placeholder="Opção 1&#10;Opção 2&#10;Opção 3"
              rows={4}
              required={needsOptions}
            />
          </div>
        )}

        <div className="flex items-center">
          <input
            type="checkbox"
            id="fieldRequired"
            checked={formData.fieldRequired}
            onChange={(e) => handleFieldChange("fieldRequired", e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="fieldRequired" className="text-white text-sm">
            Campo obrigatório
          </label>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
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
    </Modal>
  );
}
