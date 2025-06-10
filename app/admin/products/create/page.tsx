import { SubmitButton } from "@/components/form/Buttons";
import CheckboxInput from "@/components/form/CheckboxInput";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import ImageInput from "@/components/form/ImageInput";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createProductAction,
  fetchAdminCat,
  fetchAdminCategoryDetails,
} from "@/utils/actions";
import { faker } from "@faker-js/faker";

async function CreateProductPage() {
  const categories = await fetchAdminCat();
  const name = faker.commerce.productName();
  const company = faker.company.name();
  const description = faker.lorem.paragraph({ min: 10, max: 12 });
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">create product</h1>
      <div className="border p-8 rounded-md">
        <FormContainer action={createProductAction}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <FormInput
              type="text"
              name="name"
              label="product name"
              defaultValue={name}
            />

            <FormInput
              type="text"
              name="company"
              label="company"
              defaultValue={company}
            />
            <PriceInput />
            <ImageInput />
          </div>

          <div className="grid gap-4 md:grid-cols-2 my-4">
            <FormInput
              type="text"
              name="sizes"
              label="Available Sizes (comma separated)"
              placeholder="e.g. S, M, L, XL"
            />

            <FormInput
              type="text"
              name="colors"
              label="Available Colors (comma separated)"
              placeholder="e.g. Red, Blue, Black"
            />
          </div>
          <FormInput type="number" name="qty" label="product quantity" />
          <TextAreaInput
            name="description"
            labelText="product description"
            defaultValue={description}
          />
          <div>
            <Label htmlFor="categoryId">Category *</Label>
            <Select name="categoryId">
              <SelectTrigger id="categoryId" className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => {
                  return (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <div className="mt-6">
            <CheckboxInput name="featured" label="featured" />
          </div>
          <SubmitButton text="Create Product" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
}

export default CreateProductPage;
