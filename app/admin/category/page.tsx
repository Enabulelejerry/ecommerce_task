import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  deleteCategoryAction,
  deleteSliderAction,
  fetchAdminCat,
  fetchAdminSlider,
} from "@/utils/actions";
import { formatDate } from "@/utils/format";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";

async function CategoryPage() {
  const cats = await fetchAdminCat();
  //   if(sliders.length === 0) return <EmptyList />
  return (
    <div>
      <div className="flex justify-end mb-4">
        <Link href="/admin/category/create">
          <Button className="capitalize font-normal">create Category</Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cats.map((cat) => {
            return (
              <TableRow key={cat.id}>
                <TableCell>{cat.name}</TableCell>
                <TableCell>{formatDate(cat.createdAt)}</TableCell>
                <TableCell className="flex items-center gap-x-2">
                  <Link href={`/admin/category/${cat.id}/edit`}>
                    <IconButton actionType="edit" />
                  </Link>
                  <DeleteCat catId={cat.id} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

function DeleteCat({ catId }: { catId: string }) {
  const deleteCategory = deleteCategoryAction.bind(null, { catId });
  return (
    <FormContainer action={deleteCategory}>
      <IconButton actionType="delete" />
    </FormContainer>
  );
}

export default CategoryPage;
