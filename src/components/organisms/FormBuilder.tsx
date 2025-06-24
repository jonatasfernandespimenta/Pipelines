import FormBuilderContent from "../molecules/FormBuilderContent";
import { FormBuilderForm } from "../molecules/FormBuilderForm";

export function FormBuilder() {
  return (
    <div className="flex flex-row bg-gray-04">
      <FormBuilderContent />

      <FormBuilderForm />
    </div>
  )
}
