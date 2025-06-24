import { FormBuilderOrg } from "../organisms";
import FormBuilderContent from "../molecules/FormBuilderContent";

export default function FormBuilderTemplate() {
  return (
    <div className="flex h-screen bg-gray-05">
      <FormBuilderContent />
      <FormBuilderOrg />
    </div>
  );
}
