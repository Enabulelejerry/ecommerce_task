import React from "react";
import Container from "../global/container";
import Logo from "./Logo";
import NavSearch from "./NavSearch";
import CartButton from "./CartButton";
import DarkMode from "./DarkMode";
import LinksDropdown from "./LinksDropdown";
import { Suspense } from "react";
import { fetchCats } from "@/utils/actions";

async function Navbar() {
  const categories = await fetchCats();
  return (
    <nav className="border-b">
      <Container className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 flex-wrap py-8">
        {/* <Logo /> */}
        <h1 className="inline-flex items-center justify-center text-white text-3xl font-bold bg-primary rounded-full w-14 h-14">
          AF
        </h1>

        <Suspense>
          <NavSearch />
        </Suspense>
        <div className="flex gap-4 items-center">
          <CartButton />
          <DarkMode />
          <LinksDropdown categories={categories} />
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
