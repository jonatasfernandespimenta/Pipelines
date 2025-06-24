import FormBuilderContent from "./FormBuilderContent";
import { FormBuilderForm } from "./FormBuilderForm";

export function FormBuilder() {
  return (
    <div className="flex flex-row bg-gray-04">
      <FormBuilderContent />
      <FormBuilderForm />
    </div>
  )
}
