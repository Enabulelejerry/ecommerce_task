import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import { SubmitButton } from "@/components/form/Buttons";
import CheckboxInput from "@/components/form/CheckboxInput";
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
  fetchAdminProductDetails,
  updateProductAction,
  updateProductImageAction,
} from "@/utils/actions";
import ImageInputContainer from "@/components/form/ImageInputContainer";
import { Label } from "@/components/ui/label";

async function EditProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const product = await fetchAdminProductDetails(id);
  const categories = await fetchAdminCat();
  const {
    name,
    company,
    description,
    featured,
    price,
    sizes,
    colors,
    qty,
    categoryId,
  } = product;
  const colorArray: string[] = JSON.parse(colors || "[]");
  const sizeArray: string[] = JSON.parse(sizes || "[]");
  const colorString = colorArray.join(", ");
  const sizeString = sizeArray.join(", ");
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">update product</h1>

      <div className="border p-8 rounded-md">
        <ImageInputContainer
          action={updateProductImageAction}
          name={name}
          image={product.image}
          text="update image"
        >
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="url" value={product.image} />
        </ImageInputContainer>

        <FormContainer action={updateProductAction}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <input type="hidden" name="id" value={id} />
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
          </div>

          <div className="grid gap-4 md:grid-cols-2 my-4">
            <FormInput
              type="text"
              name="sizes"
              label="Available Sizes (comma separated)"
              defaultValue={sizeString}
            />

            <FormInput
              type="text"
              name="colors"
              label="Available Colors (comma separated)"
              defaultValue={colorString}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 my-4">
            <FormInput
              type="number"
              name="qty"
              label="product quantity"
              defaultValue={qty}
            />
            <PriceInput defaultValue={price} />
          </div>

          <TextAreaInput
            name="description"
            labelText="product description"
            defaultValue={description}
          />

          <div>
            <Label htmlFor="categoryId">Category *</Label>
            <Select name="categoryId" defaultValue={categoryId ?? undefined}>
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
            <CheckboxInput
              name="featured"
              label="featured"
              defaultChecked={featured}
            />
          </div>
          <SubmitButton text="update product" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
}

export default EditProductPage;
