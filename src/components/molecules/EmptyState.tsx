import Text from "../atoms/Text";

interface EmptyStateProps {
  message: string;
  className?: string;
}

export default function EmptyState({ message, className }: EmptyStateProps) {
  return (
    <div className={`text-center text-gray-500 mt-20 ${className || ""}`}>
      <Text variant="body">
        {message}
      </Text>
    </div>
  );
}
