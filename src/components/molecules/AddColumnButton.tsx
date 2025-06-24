"use client"

import { FaPlus } from "react-icons/fa";
import Button from "../atoms/Button";
import Text from "../atoms/Text";

interface AddColumnButtonProps {
  onClick?: () => void;
  className?: string;
}

export default function AddColumnButton({ onClick, className }: AddColumnButtonProps) {
  return (
    <div className={className}>
      <Button
        onClick={onClick}
        variant="secondary"
        className="bg-gray-05 rounded p-4 mb-2 border-2 w-[500px] h-auto text-white border-gray-03 cursor-pointer hover:bg-brand-color-green hover:text-gray-03 transition-colors duration-300"
      >
        <FaPlus className="mr-2" />
        <Text variant="subheading">Nova Coluna</Text>
      </Button>
    </div>
  );
}
