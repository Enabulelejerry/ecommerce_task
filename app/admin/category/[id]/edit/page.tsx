import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import ImageInput from "@/components/form/ImageInput";
import {
  fetchAdminCategoryDetails,
  updateCategoryAction,
} from "@/utils/actions";
import React from "react";

async function EditCategory({ params }: { params: { id: string } }) {
  const { id } = params;
  const category = await fetchAdminCategoryDetails(id);
  const { name } = category;
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">
        create Category
      </h1>
      <div className="border p-8 rounded-md">
        <FormContainer action={updateCategoryAction}>
          <FormInput
            type="text"
            name="name"
            label="category name"
            defaultValue={name}
          />
          <input type="hidden" name="id" value={id} />
          <SubmitButton text="update category" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
}

export default EditCategory;
