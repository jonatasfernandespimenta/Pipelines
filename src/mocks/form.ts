import { FieldType } from "@/types/FieldType";

export const initialForm = {
  fields: [
    {
      fieldType: FieldType.Text,
      fieldName: "taskName",
      fieldLabel: "Nome da tarefa",
      fieldPlaceholder: "Digite o nome da tarefa",
      fieldRequired: true,
      fieldOptions: [],
    },
    {
      fieldType: FieldType.Text,
      fieldName: "taskDescription",
      fieldLabel: "Descrição da tarefa",
      fieldPlaceholder: "Digite a descrição da tarefa",
      fieldRequired: false,
      fieldOptions: [],
    },
  ]
}
