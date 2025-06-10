import Link from "next/link";

type Props = {
  currentPage: number;
  totalPages: number;
  search: string;
  layout: string;
};

export default function Pagination({
  currentPage,
  totalPages,
  search,
  layout,
}: Props) {
  if (totalPages <= 1) return null;

  const buildUrl = (page: number) => {
    const params = new URLSearchParams({
      layout,
      search,
      page: page.toString(),
    });
    return `/products?${params.toString()}`;
  };

  return (
    <div className="flex justify-center gap-2 mt-8">
      {Array.from({ length: totalPages }, (_, i) => {
        const pageNum = i + 1;
        return (
          <Link
            key={pageNum}
            href={buildUrl(pageNum)}
            className={`px-3 py-1 border rounded ${
              pageNum === currentPage
                ? "bg-primary text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {pageNum}
          </Link>
        );
      })}
    </div>
  );
}
