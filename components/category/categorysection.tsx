import Link from "next/link";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { FaTag } from "react-icons/fa";

function CategorySection({
  categories,
}: {
  categories: { id: string; name: string }[];
}) {
  return (
    <>
      <DropdownMenuSeparator />

      <div className="px-2 py-1">
        <p className="text-xs text-muted-foreground font-semibold uppercase px-2 pb-1 tracking-wide">
          Categories
        </p>

        <div className="space-y-1">
          {categories.map((cat) => (
            <DropdownMenuItem key={cat.id} asChild>
              <Link
                href={`/products/category/${cat.id}`}
                className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-accent transition text-sm"
              >
                <FaTag className="w-4 h-4 text-green-600" />
                <span className="capitalize">{cat.name}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </div>
      </div>
    </>
  );
}

export default CategorySection;
