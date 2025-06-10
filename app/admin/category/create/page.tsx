import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import ImageInput from "@/components/form/ImageInput";
import { createCategoryAction } from "@/utils/actions";
import React from "react";

function CreateCategory() {
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">
        create Category
      </h1>
      <div className="border p-8 rounded-md">
        <FormContainer action={createCategoryAction}>
          <FormInput type="text" name="name" label="category name" />
          <SubmitButton text="Create category" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
}

export default CreateCategory;
