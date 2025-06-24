"use client";

import { FieldType } from "@/types/FieldType";
import Modal from "./Modal";
import FieldConfigForm from "./FieldConfigForm";

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
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Configurar Campo">
      <FieldConfigForm
        field={field}
        onSave={onSave}
        onCancel={onClose}
      />
    </Modal>
  );
}
