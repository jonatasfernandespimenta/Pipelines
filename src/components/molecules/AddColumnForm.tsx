"use client";

import { useState } from "react";
import { Input, Checkbox, Button } from "../atoms";
import Modal from "./Modal";

interface AddColumnFormData {
  columnName: string;
  isFinalStep: boolean;
  canCreateCards: boolean;
}

interface AddColumnFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (columnData: AddColumnFormData) => void;
}

export default function AddColumnForm({ isOpen, onClose, onSubmit }: AddColumnFormProps) {
  const [formData, setFormData] = useState<AddColumnFormData>({
    columnName: "",
    isFinalStep: false,
    canCreateCards: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.columnName.trim()) {
      newErrors.columnName = "Nome da coluna é obrigatório";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit(formData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      columnName: "",
      isFinalStep: false,
      canCreateCards: false,
    });
    setErrors({});
    onClose();
  };

  const handleFieldChange = (field: keyof AddColumnFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Nova Coluna">
      <div className="p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Nome da Coluna"
            type="text"
            value={formData.columnName}
            onChange={(e) => handleFieldChange("columnName", e.target.value)}
            placeholder="Ex: Em Progresso, Revisão, Concluído"
            required
            error={errors.columnName}
          />

          <div className="space-y-4">
            <Checkbox
              id="isFinalStep"
              checked={formData.isFinalStep}
              onChange={(e) => handleFieldChange("isFinalStep", e.target.checked)}
              label="Esta é uma etapa final"
            />
            <p className="text-sm text-gray-400 ml-6">
              Marque se esta coluna representa o fim do processo (ex: "Concluído", "Finalizado")
            </p>
          </div>

          <div className="space-y-4">
            <Checkbox
              id="canCreateCards"
              checked={formData.canCreateCards}
              onChange={(e) => handleFieldChange("canCreateCards", e.target.checked)}
              label="Permitir criação de cards diretamente nesta coluna"
            />
            <p className="text-sm text-gray-400 ml-6">
              Marque se usuários podem criar novos cards diretamente nesta coluna
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={handleClose}
              variant="secondary"
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
            >
              Criar Coluna
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
