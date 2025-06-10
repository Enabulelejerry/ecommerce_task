// app/components/Header.tsx or app/layout.tsx

import { fetchCats } from "@/utils/actions";
import LinksDropdown from "../navbar/LinksDropdown";

export default async function Header() {
  const categories = await fetchCats(); // ✅ await is allowed here

  return (
    <div>
      <LinksDropdown categories={categories} />
    </div>
  );
}
