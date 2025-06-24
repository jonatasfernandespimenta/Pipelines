"use client";

import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "@/utils/Contants";
import { FieldRenderer } from "./form-fields";
import { FieldType } from "@/types/FieldType";
import { IconButton } from "../atoms";

interface FormField {
  id: string;
  fieldType: FieldType;
  fieldName: string;
  fieldLabel: string;
  fieldPlaceholder: string;
  fieldRequired: boolean;
  fieldOptions: string[];
}

interface DraggableFormFieldProps {
  field: FormField;
  index: number;
  value: any;
  onChange: (fieldName: string, value: any) => void;
  onRemove: (fieldId: string) => void;
  onMove: (dragIndex: number, hoverIndex: number) => void;
  onEdit: (fieldId: string) => void;
}

export default function DraggableFormField({
  field,
  index,
  value,
  onChange,
  onRemove,
  onMove,
  onEdit,
}: DraggableFormFieldProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.FORM_FIELD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset?.y ?? 0) - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      onMove(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.FORM_FIELD,
    item: () => {
      return { id: field.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1;
  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
      className="relative group"
    >
      <div className="flex absolute -top-2 -right-2 flex-row items-center justify-between gap-1">
        <IconButton
          icon="✎"
          variant="primary"
          size="small"
          onClick={() => onEdit(field.id)}
          tooltip="Editar campo"
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        />
        <IconButton
          icon="×"
          variant="danger"
          size="small"
          onClick={() => onRemove(field.id)}
          tooltip="Remover campo"
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        />
        {/* Drag handle */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity cursor-move z-10" title="Arrastar campo">
          <div className="w-4 h-4 text-gray-400 hover:text-white">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 3V5H7V3H9M13 3V5H11V3H13M17 3V5H15V3H17M7 7V9H5V7H7M11 7V9H9V7H11M15 7V9H13V7H15M19 7V9H17V7H19M7 11V13H5V11H7M11 11V13H9V11H11M15 11V13H13V11H15M19 11V13H17V11H19M7 15V17H5V15H7M11 15V17H9V15H11M15 15V17H13V15H15M19 15V17H17V15H17M7 19V21H5V19H7M11 19V21H9V19H11M15 19V21H13V19H15M17 19V21H15V19H17Z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="p-4 bg-gray-04 rounded-lg border-2 border-transparent hover:border-cx-blue transition-colors">
        <FieldRenderer
          field={field}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
