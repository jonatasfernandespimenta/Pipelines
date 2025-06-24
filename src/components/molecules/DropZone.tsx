"use client";

import { useDrop } from "react-dnd";
import { ItemTypes } from "@/utils/Contants";

interface DropZoneProps {
  onDrop: (item: any) => void;
  index: number;
  isLast?: boolean;
}

export default function DropZone({ onDrop, index, isLast = false }: DropZoneProps) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.FIELD,
    drop: (item: any) => {
      onDrop({ ...item, insertIndex: index });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={drop as any}
      className={`transition-all duration-200 ${isOver && canDrop
          ? "h-12 border-2 border-dashed border-cx-blue bg-cx-blue bg-opacity-10 rounded-lg mb-4"
          : "h-2"
        } ${isLast ? "h-4" : ""}`}
    >
      {isOver && canDrop && (
        <div className="flex items-center justify-center h-full">
          <span className="text-cx-blue text-sm font-medium">
            Solte aqui para inserir o campo
          </span>
        </div>
      )}
    </div>
  );
}
