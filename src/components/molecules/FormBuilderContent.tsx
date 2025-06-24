import FieldTypeContainer from "../atoms/FieldTypeContainer";
import { FieldRenderer } from "./form-fields";
import { FieldType } from "@/types/FieldType";

const FIELD_TEMPLATES = [
  {
    fieldType: FieldType.Text,
    fieldLabel: "Campo de Texto",
    fieldPlaceholder: "Digite o texto...",
    fieldRequired: false,
    fieldOptions: [],
    fieldName: "textField",
  },
  {
    fieldType: FieldType.Number,
    fieldLabel: "Campo Numérico",
    fieldPlaceholder: "Digite um número...",
    fieldRequired: false,
    fieldOptions: [],
    fieldName: "numberField",
  },
  {
    fieldType: FieldType.Password,
    fieldLabel: "Campo de Senha",
    fieldPlaceholder: "Digite a senha...",
    fieldRequired: false,
    fieldOptions: [],
    fieldName: "passwordField",
  },
  {
    fieldType: FieldType.Textarea,
    fieldLabel: "Área de Texto",
    fieldPlaceholder: "Digite um texto longo...",
    fieldRequired: false,
    fieldOptions: [],
    fieldName: "textareaField",
  },
  {
    fieldType: FieldType.Select,
    fieldLabel: "Lista Suspensa",
    fieldPlaceholder: "Selecione uma opção...",
    fieldRequired: false,
    fieldOptions: ["Opção 1", "Opção 2", "Opção 3"],
    fieldName: "selectField",
  },
  {
    fieldType: FieldType.Checkbox,
    fieldLabel: "Caixa de Seleção",
    fieldPlaceholder: "",
    fieldRequired: false,
    fieldOptions: ["Aceito os termos"],
    fieldName: "checkboxField",
  },
  {
    fieldType: FieldType.Radio,
    fieldLabel: "Botões de Rádio",
    fieldPlaceholder: "",
    fieldRequired: false,
    fieldOptions: ["Opção A", "Opção B", "Opção C"],
    fieldName: "radioField",
  },
  {
    fieldType: FieldType.Date,
    fieldLabel: "Campo de Data",
    fieldPlaceholder: "Selecione uma data...",
    fieldRequired: false,
    fieldOptions: [],
    fieldName: "dateField",
  },
  {
    fieldType: FieldType.Time,
    fieldLabel: "Campo de Hora",
    fieldPlaceholder: "Selecione uma hora...",
    fieldRequired: false,
    fieldOptions: [],
    fieldName: "timeField",
  },
];

export default function FormBuilderContent() {
  return (
    <div
      className="flex flex-col bg-gray-03 text-white h-screen"
      style={{ width: '400px', padding: '24px' }}
    >
      <h2 className="text-white text-2xl font-semibold mb-6 text-center flex-shrink-0">
        Tipos de Campos
      </h2>

      <div className="space-y-4 flex-1 overflow-y-auto pr-2">
        {FIELD_TEMPLATES.map((fieldTemplate, index) => (
          <FieldTypeContainer
            key={index}
            isDragging={false}
            fieldData={{
              id: `field-template-${index}`,
              text: fieldTemplate.fieldLabel,
              fieldTemplate
            }}
          >
            <div className="p-3 bg-gray-04 rounded-lg border border-gray-02 hover:border-cx-blue transition-colors cursor-move">
              <div className="pointer-events-none opacity-75">
                <FieldRenderer
                  field={{
                    ...fieldTemplate,
                    fieldDisabled: true
                  }}
                  value=""
                  onChange={() => { }}
                  disabled={true}
                />
              </div>
            </div>
          </FieldTypeContainer>
        ))}
      </div>
    </div>
  )
}
