import ProductsGrid from "./ProductsGrid";
import ProductsList from "./ProductsList";
import { LuLayoutGrid, LuLayoutList, LuList } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { fetchAllProducts } from "@/utils/actions";
import Link from "next/link";
import Pagination from "../global/Pagination";

async function ProductsContainer({
  layout,
  search,
  page,
}: {
  layout: string;
  search: string;
  page: number;
}) {
  const perPage = 12;
  const { products, totalProducts, totalPages } = await fetchAllProducts({
    search,
    page,
    perPage,
  });
  const searchTerm = search ? `&search=${search}` : "";
  return (
    <>
      {/* HEADER */}
      <section>
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-lg">
            {totalProducts} product {totalProducts > 1 && "s"}
          </h4>
          <div className="flex gap-x-4">
            <Button
              variant={layout === "grid" ? "default" : "ghost"}
              size="icon"
              asChild
            >
              <Link href={`/products?layout=grid&page=1${searchTerm}`}>
                <LuLayoutGrid />
              </Link>
            </Button>

            <Button
              variant={layout === "list" ? "default" : "ghost"}
              size="icon"
              asChild
            >
              <Link href={`/products?layout=list&page=1${searchTerm}`}>
                <LuList />
              </Link>
            </Button>
          </div>
        </div>
        <Separator className="mt-4" />
      </section>
      {/* PRODUCTS */}
      <div>
        {totalProducts === 0 ? (
          <h5>Sorry, no products matched your search...</h5>
        ) : layout === "grid" ? (
          <ProductsGrid products={products} />
        ) : (
          <ProductsList products={products} />
        )}
      </div>

      {/* PAGINATION */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        search={search}
        layout={layout}
      />
    </>
  );
}

export default ProductsContainer;
