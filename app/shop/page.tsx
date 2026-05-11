import Card from "@/components/ui/Card";
import { prisma } from "@/lib/prisma";

type ShopPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const rawQuery = params.query;
  const query = Array.isArray(rawQuery) ? rawQuery[0] : rawQuery;
  const searchQuery = query?.trim() || "";

  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      ...(searchQuery && {
        OR: [
          {
            name: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
          {
            category: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
        ],
      }),
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="max-w-5xl mx-auto px-8 py-12">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {searchQuery ? `Search results for "${searchQuery}"` : "Shop Page"}
          </h1>
          {searchQuery && (
            <p className="text-gray-500 mt-2">
              {products.length} product{products.length === 1 ? "" : "s"} found
            </p>
          )}
        </div>
      </div>

      {products.length === 0 ? (
        <div className="border rounded-lg p-8 text-center mt-8">
          <h2 className="text-xl font-bold mb-2">No products found</h2>
          <p className="text-gray-500">
            Try searching by product name, category, or description.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 w-full">
          {products.map((product) => (
            <Card
              key={product.id}
              product={{
                ...product,
                description: product.description || "No description",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
