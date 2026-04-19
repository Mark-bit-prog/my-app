import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function ProductsPage() {
  const products = await prisma.product.findMany();

  return (
    <div className="max-w-6xl mx-auto px-8 py-12 flex flex-col">
      <h1 className="text-3xl font-bold mb-10">All products:</h1>

      <div className="m-3">
        {/* All products mapping */}
        {products.map((p) => (
          <div key={p.id} className="flex mb-4">
            <div>
              <p className="text-lg font-semibold">
                {p.name} - ${p.price}
              </p>
              <p className="text-gray-600 mt-4">{p.description}</p>
            </div>

            <Link
              className="ml-auto my-auto p-2 shadow-lg bg-black text-white rounded-md"
              href={`/admin/products/${p.id}`}
            >
              Edit
            </Link>
          </div>
        ))}
      </div>

      <hr className="my-6" />

      <div className="flex gap-5">
        <Link
          className="p-2 ml-auto bg-blue-500 text-white rounded-md"
          href="/admin"
        >
          Cancel
        </Link>
        <Link
          className="p-2 bg-blue-500 text-white rounded-md justify-end"
          href="/admin/products/create"
        >
          Add new product
        </Link>
      </div>
    </div>
  );
}
