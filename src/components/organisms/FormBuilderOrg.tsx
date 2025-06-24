import { ItemTypes } from "@/utils/Contants";
import { useDrop } from "react-dnd";
import { useState, useCallback } from "react";
import { FieldRenderer } from "../molecules/form-fields";
import { FieldType } from "@/types/FieldType";
import DraggableFormField from "../molecules/DraggableFormField";
import DropZone from "../molecules/DropZone";
import FieldConfigModal from "../molecules/FieldConfigModal";
import FormBuilderHeader from "../molecules/FormBuilderHeader";
import FormBuilderEmptyState from "../molecules/FormBuilderEmptyState";
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

export function FormBuilderOrg() {
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [editingField, setEditingField] = useState<FormField | null>(null);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);

  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: [ItemTypes.FIELD, ItemTypes.FORM_FIELD],
    drop: (item: any, monitor) => {
      if (item.fieldTemplate) {
        const newField: FormField = {
          ...item.fieldTemplate,
          id: `field-${Date.now()}-${Math.random()}`,
          fieldName: `${item.fieldTemplate.fieldName}_${Date.now()}`,
        };

        if (item.insertIndex !== undefined) {
          setFormFields(prev => {
            const newFields = [...prev];
            newFields.splice(item.insertIndex, 0, newField);
            return newFields;
          });
        } else {
          setFormFields(prev => [...prev, newField]);
        }
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const handleFieldChange = (fieldName: string, value: any) => {
    setFormValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const removeField = (fieldId: string) => {
    setFormFields(prev => prev.filter(field => field.id !== fieldId));
    toast.info('Campo removido com sucesso!', {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const editField = (fieldId: string) => {
    const field = formFields.find(f => f.id === fieldId);
    if (field) {
      setEditingField(field);
      setIsConfigModalOpen(true);
    }
  };

  const saveFieldConfig = (updatedField: FormField) => {
    setFormFields(prev =>
      prev.map(field =>
        field.id === updatedField.id ? updatedField : field
      )
    );
  };

  const saveForm = () => {
    const formData = {
      fields: formFields.map(field => ({
        fieldType: field.fieldType,
        fieldName: field.fieldName,
        fieldLabel: field.fieldLabel,
        fieldPlaceholder: field.fieldPlaceholder,
        fieldRequired: field.fieldRequired,
        fieldOptions: field.fieldOptions,
      }))
    };

    console.log('Saved Form Configuration:', JSON.stringify(formData, null, 2));
    toast.success('Formulário salvo com sucesso! Verifique o console para ver a configuração.', {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const clearForm = () => {
    setFormFields([]);
    setFormValues({});
    toast.info('Formulário limpo com sucesso!', {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const moveField = useCallback((dragIndex: number, hoverIndex: number) => {
    setFormFields(prev => {
      const newFields = [...prev];
      const draggedField = newFields[dragIndex];
      newFields.splice(dragIndex, 1);
      newFields.splice(hoverIndex, 0, draggedField);
      return newFields;
    });
  }, []);

  const handleDropZoneDrop = (item: any) => {
    if (item.fieldTemplate) {
      const newField: FormField = {
        ...item.fieldTemplate,
        id: `field-${Date.now()}-${Math.random()}`,
        fieldName: `${item.fieldTemplate.fieldName}_${Date.now()}`,
      };

      setFormFields(prev => {
        const newFields = [...prev];
        newFields.splice(item.insertIndex, 0, newField);
        return newFields;
      });
    }
  };

  return (
    <div
      className="flex flex-col bg-gray-05 w-full h-screen"
      style={{ padding: '32px' }}
    >
      <div
        ref={dropRef as any}
        className={`bg-gray-04 rounded min-h-96 flex-1 overflow-y-auto transition-colors ${isOver ? 'border-2 border-dashed border-cx-blue bg-gray-03' : ''
          }`}
        style={{ padding: '32px', minWidth: '512px' }}
      >
        <FormBuilderHeader
          hasFields={formFields.length > 0}
          onSaveForm={saveForm}
          onClearForm={clearForm}
        />

        {formFields.length === 0 ? (
          <FormBuilderEmptyState isOver={isOver} />
        ) : (
          <div className="space-y-1">
            <DropZone onDrop={handleDropZoneDrop} index={0} />
            {formFields.map((field, index) => (
              <div key={field.id}>
                <DraggableFormField
                  field={field}
                  index={index}
                  value={formValues[field.fieldName] || ''}
                  onChange={handleFieldChange}
                  onRemove={removeField}
                  onMove={moveField}
                  onEdit={editField}
                />
                <DropZone
                  onDrop={handleDropZoneDrop}
                  index={index + 1}
                  isLast={index === formFields.length - 1}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <FieldConfigModal
        isOpen={isConfigModalOpen}
        field={editingField}
        onClose={() => {
          setIsConfigModalOpen(false);
          setEditingField(null);
        }}
        onSave={saveFieldConfig}
      />
    </div>
  );
}
