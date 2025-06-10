import { fetchFeaturedProducts } from "@/utils/actions";
import React from "react";
import EmptyList from "../global/EmptyList";
import SectionTitle from "../global/SectionTitle";
import ProductsGrid from "../products/ProductsGrid";
import Link from "next/link";
import { Button } from "../ui/button";

async function FeaturedProducts() {
  const products = await fetchFeaturedProducts();
  if (products.length === 0) return <EmptyList />;
  return (
    <section className="pt-24 overflow-hidden ">
      <SectionTitle text="featured products" />
      <ProductsGrid products={products} />

      <div className="flex justify-center mt-8">
        <Link href="/products">
          <Button
            variant="outline"
            className="text-white bg-primary hover:bg-primary/10"
          >
            View All Products
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default FeaturedProducts;
