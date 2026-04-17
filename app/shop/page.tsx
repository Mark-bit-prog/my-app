import Card from "@/components/ui/Card";
import { prisma } from "@/lib/prisma";
// import { prisma } from "@/lib/prisma";
// import { products } from "@/data/products";

export default async function ShopPage() {
  const products = await prisma.product.findMany();
  // const { name, description, price, image } = products;

  return (
    <div className="max-w-5xl mx-auto px-8 py-12">
      <h1 className="text-3xl font-bold">Shop Page</h1>
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
    </div>
  );
}
