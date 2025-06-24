"use client"

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Text from "../atoms/Text";
import Button from "../atoms/Button";
import { FiX } from "react-icons/fi";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className={`relative bg-gray-04 rounded-lg shadow-xl border border-gray-03 w-full max-w-md mx-4 ${className || ""}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-03">
          <Text variant="heading" className="text-white">
            {title}
          </Text>
          <Button
            variant="icon"
            size="small"
            onClick={onClose}
            className="w-8 h-8 bg-transparent hover:bg-gray-03 text-gray-500 hover:text-white"
          >
            <FiX className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );

  // Render modal in portal
  return createPortal(modalContent, document.body);
}
