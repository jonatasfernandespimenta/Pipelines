import { ItemTypes } from "@/utils/Contants";
import { useDrop } from "react-dnd";
import { useState, useCallback } from "react";
import { FieldRenderer } from "./form-fields";
import { FieldType } from "@/types/FieldType";
import DraggableFormField from "./DraggableFormField";
import DropZone from "./DropZone";
import FieldConfigModal from "./FieldConfigModal";
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

export function FormBuilderForm() {
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
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
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
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
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
        <div className="flex items-center justify-between mb-6 flex-shrink-0">
          <h2 className="text-white text-2xl font-semibold">Construtor de Formulário</h2>
          <div className="flex gap-3">
            {formFields.length > 0 && (
              <>
                <button
                  onClick={saveForm}
                  className="px-4 py-2 bg-support-success text-white rounded transition-colors hover:bg-opacity-80"
                >
                  Salvar Formulário
                </button>
                <button
                  onClick={() => {
                    setFormFields([]);
                    setFormValues({});
                  }}
                  className="px-4 py-2 bg-support-error text-white rounded transition-colors hover:bg-opacity-80"
                >
                  Limpar Formulário
                </button>
              </>
            )}
          </div>
        </div>

        {formFields.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-2">
              Arraste os campos do painel lateral para construir seu formulário
            </p>
            <p className="text-gray-500 text-sm">
              {isOver ? 'Solte o campo aqui!' : 'Comece arrastando um campo...'}
            </p>
          </div>
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
  )
}
