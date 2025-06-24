"use client"

import { useState } from "react";
import Text from "../atoms/Text";
import Badge from "../atoms/Badge";
import { FiMoreVertical, FiPlus, FiSettings } from "react-icons/fi";
import { Divider } from "../atoms";
import Modal from "./Modal";
import CreateCardForm from "./CreateCardForm";

interface ColumnHeaderProps {
  title: string;
  count: number;
  className?: string;
  canCreateCard?: boolean;
  onCreateCard?: (cardData: Record<string, any>) => void;
}

export default function ColumnHeader({ title, count, className, canCreateCard, onCreateCard }: ColumnHeaderProps) {
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

        <div className="flex flex-row items-center ml-auto space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <FiSettings className="text-lg mr-2 cursor-pointer hover:text-cx-blue transition-colors duration-300" />
          <FiMoreVertical className="text-lg mr-2 cursor-pointer hover:text-cx-blue transition-colors duration-300" />
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
