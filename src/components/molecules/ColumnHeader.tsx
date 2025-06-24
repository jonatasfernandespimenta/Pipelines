"use client"

import { useState } from "react";
import Text from "../atoms/Text";
import Badge from "../atoms/Badge";
import { FiMoreVertical, FiPlus, FiSettings, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Divider } from "../atoms";
import Modal from "./Modal";
import CreateCardForm from "./CreateCardForm";

interface ColumnHeaderProps {
  title: string;
  count: number;
  className?: string;
  canCreateCard?: boolean;
  onCreateCard?: (cardData: Record<string, any>) => void;
  onMoveLeft?: () => void;
  onMoveRight?: () => void;
  canMoveLeft?: boolean;
  canMoveRight?: boolean;
}

export default function ColumnHeader({
  title,
  count,
  className,
  canCreateCard,
  onCreateCard,
  onMoveLeft,
  onMoveRight,
  canMoveLeft,
  canMoveRight
}: ColumnHeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateCard = (cardData: Record<string, any>) => {
    onCreateCard?.(cardData);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="bg-cx-blue rounded-t-2xl p-1" />
      <div className={`bg-gray-04 rounded p-4 mb-2 flex items-center flex-row group ${className || ""}`}>
        <Text variant="subheading">{title}</Text>
        <div className="ml-2">
          <Badge variant="primary" size="small">
            {count}
          </Badge>
        </div>

        <div className="flex flex-row items-center ml-auto space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {/* Move arrows */}
          <button
            onClick={onMoveLeft}
            disabled={!canMoveLeft}
            className={`p-2 rounded-lg transition-all duration-200 ${canMoveLeft
                ? 'text-white hover:text-cx-blue hover:bg-gray-03 hover:scale-110 cursor-pointer'
                : 'text-gray-500 cursor-not-allowed opacity-50'
              }`}
            title="Mover coluna para a esquerda"
          >
            <FiChevronLeft className="text-lg" />
          </button>

          <button
            onClick={onMoveRight}
            disabled={!canMoveRight}
            className={`p-2 rounded-lg transition-all duration-200 ${canMoveRight
                ? 'text-white hover:text-cx-blue hover:bg-gray-03 hover:scale-110 cursor-pointer'
                : 'text-gray-500 cursor-not-allowed opacity-50'
              }`}
            title="Mover coluna para a direita"
          >
            <FiChevronRight className="text-lg" />
          </button>

          <div className="w-px h-6 bg-gray-500 mx-2"></div>

          <button className="p-2 rounded-lg text-white hover:text-cx-blue hover:bg-gray-03 transition-all duration-200 hover:scale-110">
            <FiSettings className="text-lg" />
          </button>
          <button className="p-2 rounded-lg text-white hover:text-cx-blue hover:bg-gray-03 transition-all duration-200 hover:scale-110">
            <FiMoreVertical className="text-lg" />
          </button>
        </div>

        {
          canCreateCard && (
            <div className="flex flex-row items-center justify-center">
              <Divider />
              <FiPlus
                className="text-lg ml-2 cursor-pointer hover:text-cx-blue transition-colors duration-300"
                onClick={() => setIsModalOpen(true)}
              />
            </div>
          )
        }
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={`Create New Card in ${title}`}
      >
        <CreateCardForm
          onSubmit={handleCreateCard}
          onCancel={handleCloseModal}
        />
      </Modal>
    </>
  );
}
