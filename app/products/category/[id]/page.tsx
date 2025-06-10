import EmptyList from "@/components/global/EmptyList";
import SectionTitle from "@/components/global/SectionTitle";
import ProductsGrid from "@/components/products/ProductsGrid";
import { getProductsByCategory } from "@/utils/actions";
import React from "react";

async function CategoryPage({ params }: { params: { id: string } }) {
  const category = await getProductsByCategory(params.id);
  if (category.products.length === 0) return <EmptyList />;

  return (
    <section className="pt-24 overflow-hidden ">
      <h1 className="text-3xl font-medium tracking-wider capitalize mb-8">
        {category.name} Products
      </h1>
      <ProductsGrid products={category.products} />
    </section>
  );
}

export default CategoryPage;
