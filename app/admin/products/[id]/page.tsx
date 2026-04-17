"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { updateProductSchema, idParamSchema } from "@/lib/validators";

interface Product {
  id: number;
  name: string;
  price: number | string;
  description: string;
}

export default function EditProduct() {
  const params = useParams();
  const router = useRouter();

  const parsedParams = idParamSchema.safeParse(params);

  const id = parsedParams.success ? parsedParams.data.id : null;

  const [form, setForm] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch("/api/products")
      .then((res) => res.json())
      .then((data: Product[]) => {
        const product = data.find((p) => p.id === id);
        setForm(product ?? null);
      });
  }, [id]);

  if (!parsedParams.success) {
    return <p className="bg-red-500">Invalid ID</p>;
  }

  if (!form) return <p>Loading...</p>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsed = updateProductSchema.safeParse({
      ...form,
      price: Number(form.price),
      description: form.description,
    });

    if (!parsed.success) {
      setError("Invalid input");
      return;
    }

    await fetch(`/api/products/${id}`, {
      method: "PATCH",
      body: JSON.stringify(parsed.data),
    });

    router.push("/admin/products");
  };

  const handleDelete = async () => {
    await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    router.push("/admin/products");
  };

  return (
    <div className="max-w-6xl mx-auto px-8 py-12 flex flex-col">
      <form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        <label className="block font-medium text-gray-700 mb-1">
          Product name:
        </label>
        <input
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <label className="mt-5 block font-medium text-gray-700 mb-1">
          Price:
        </label>
        <input
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        {/* <label className="mt-5 block font-medium text-gray-700 mb-1">
          Description:
        </label>
        <textarea
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        /> */}

        <div className="flex gap-4 mt-4 justify-end">
          <button
            className="w-20 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 font-medium"
            type="submit"
          >
            Save
          </button>

          <button
            className="w-20 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 font-medium"
            type="button"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}
