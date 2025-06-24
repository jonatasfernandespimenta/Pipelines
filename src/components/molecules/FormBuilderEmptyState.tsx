import { Text } from "../atoms";

interface FormBuilderEmptyStateProps {
  isOver: boolean;
}

export default function FormBuilderEmptyState({ isOver }: FormBuilderEmptyStateProps) {
  return (
    <div className="flex flex-col text-center py-12">
      <Text variant="body" className="text-gray-400 text-lg mb-2">
        Arraste os campos do painel lateral para construir seu formulário
      </Text>
      <Text variant="caption" className="text-gray-500">
        {isOver ? 'Solte o campo aqui!' : 'Comece arrastando um campo...'}
      </Text>
    </div>
  );
}
