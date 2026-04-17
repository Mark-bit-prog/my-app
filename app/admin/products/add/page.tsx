"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProductSchema } from "@/lib/validators";

export default function CreateProduct() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = createProductSchema.safeParse({
      ...form,
      price: Number(form.price),
    });

    if (!parsed.success) {
      setError("Invalid input");
      return;
    }

    await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(parsed.data),
    });

    router.push("/admin/products");
  };

  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      <h1 className="text-3xl font-bold mb-10 uppercase">
        Create new product:
      </h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        {error && <p>{error}</p>}

        <input
          placeholder="Name"
          className="p-2 rounded-md drop-shadow"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Price"
          className="p-2 rounded-md drop-shadow"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <textarea
          placeholder="Description"
          className="p-2 rounded-md drop-shadow"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <button className="p-2 bg-blue-500 text-white rounded-md" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}
