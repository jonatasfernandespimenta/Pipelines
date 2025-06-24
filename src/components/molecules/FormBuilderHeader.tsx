import { Button, Label } from "../atoms";

interface FormBuilderHeaderProps {
  hasFields: boolean;
  onSaveForm: () => void;
  onClearForm: () => void;
}

export default function FormBuilderHeader({
  hasFields,
  onSaveForm,
  onClearForm,
}: FormBuilderHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6 flex-shrink-0">
      <Label variant="heading">Construtor de Formulário</Label>
      <div className="flex gap-3">
        {hasFields && (
          <>
            <Button
              variant="success"
              onClick={onSaveForm}
            >
              Salvar Formulário
            </Button>
            <Button
              variant="danger"
              onClick={onClearForm}
            >
              Limpar Formulário
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
