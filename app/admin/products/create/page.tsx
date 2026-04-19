"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProductSchema } from "@/lib/validators";
import ImageUpload from "@/components/ui/ImageUpload";

export default function CreateProduct() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: "",
    isActive: true,
    stock: 0,
  });

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form data:", form); // перевір чи є imageUrl
    console.log("imageUrl:", form.imageUrl); // чи не порожній

    const parsed = createProductSchema.safeParse({
      ...form,
      price: Number(form.price),
      // description: form.description,
      // imageUrl: form.imageUrl,
      // isActive: form.isActive,
      stock: Number(form.stock),
    });

    if (!parsed.success) {
      setError("Invalid input");
      return;
    }

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });

    if (!res.ok) {
      setError("Failed to create product");
      return;
    }

    router.push("/admin/products");
  };

  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      <h1 className="text-3xl font-bold mb-10 uppercase">
        Create new product:
      </h1>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        {error && <p className="text-red-500 p-3">{error}</p>}
        {/* Завантаження фото */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Product Image:
          </label>
          <ImageUpload
            currentImage={form.imageUrl}
            onUpload={(url) => setForm((prev) => ({ ...prev, imageUrl: url }))}
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Title:</label>
          <input
            placeholder="Title"
            className="w-full p-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setForm((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Price:</label>
          <input
            placeholder="Price"
            type="number"
            className="w-full p-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setForm((prev) => ({ ...prev, price: e.target.value }))
            }
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Stock:</label>
          <input
            placeholder="Stock"
            type="number"
            className="w-full p-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setForm((prev) => ({ ...prev, stock: Number(e.target.value) }))
            }
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Description:
          </label>
          <textarea
            placeholder="Description"
            className="w-full p-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setForm((prev) => ({ ...prev, description: e.target.value }))
            }
          />
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, isActive: e.target.checked }))
            }
          />
          <span>Show product on website</span>
        </label>

        <div className="flex gap-4 justify-end">
          <button
            className="w-20 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 font-medium"
            type="button"
            onClick={() => router.push("/admin/products")}
          >
            Cancel
          </button>
          <button
            className="w-20 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 font-medium"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
