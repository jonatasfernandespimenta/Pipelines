import { ItemTypes } from "@/utils/Contants";
import { useDrop } from "react-dnd";
import { useState, useCallback } from "react";
import { FieldRenderer } from "./form-fields";
import { FieldType } from "@/types/FieldType";
import DraggableFormField from "./DraggableFormField";
import DropZone from "./DropZone";

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

  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: [ItemTypes.FIELD, ItemTypes.FORM_FIELD],
    drop: (item: any, monitor) => {
      if (item.fieldTemplate) {
        // Adding a new field from the sidebar
        const newField: FormField = {
          ...item.fieldTemplate,
          id: `field-${Date.now()}-${Math.random()}`,
          fieldName: `${item.fieldTemplate.fieldName}_${Date.now()}`,
        };

        if (item.insertIndex !== undefined) {
          // Insert at specific position
          setFormFields(prev => {
            const newFields = [...prev];
            newFields.splice(item.insertIndex, 0, newField);
            return newFields;
          });
        } else {
          // Add to the end
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
      className="flex flex-col bg-gray-05 w-full overflow-y-auto"
      style={{ padding: '32px' }}
    >
      <div
        ref={dropRef as any}
        className={`bg-gray-04 rounded min-h-96 transition-colors ${isOver ? 'border-2 border-dashed border-cx-blue bg-gray-03' : ''
          }`}
        style={{ padding: '32px', minWidth: '512px' }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-2xl font-semibold">Construtor de Formulário</h2>
          {formFields.length > 0 && (
            <button
              onClick={() => {
                setFormFields([]);
                setFormValues({});
              }}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Limpar Formulário
            </button>
          )}
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
                />
                <DropZone
                  onDrop={handleDropZoneDrop}
                  index={index + 1}
                  isLast={index === formFields.length - 1}
                />
              </div>
            ))}

            <div className="mt-8 pt-6 border-t border-gray-03">
              <button
                onClick={() => console.log('Form Data:', formValues)}
                className="w-full py-3 bg-cx-blue text-white rounded-lg hover:bg-opacity-80 transition-colors font-medium"
              >
                Visualizar Dados do Formulário
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
