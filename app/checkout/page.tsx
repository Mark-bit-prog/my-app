"use client";

import { useForm } from "react-hook-form";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
};

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    // Відправляємо замовлення в базу
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        totalPrice,
        items: cart,
      }),
    });

    if (!res.ok) {
      console.error("Order failed");
      return;
    }

    clearCart();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-24">
        <h1 className="text-3xl font-bold text-green-500 mb-4">
          Thank you for your order! 🎉
        </h1>
        <button
          onClick={() => router.push("/")}
          className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600"
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-gray-600 mb-4">Cart is empty</p>
        {/* <button
          onClick={() => router.push("/shop")}
          className="bg-blue-500 text-white px-8 py-3 rounded-lg"
        >
          Go to Shop
        </button> */}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Форма */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                {...register("firstName", { required: "Required" })}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                {...register("lastName", { required: "Required" })}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Required" })}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              {...register("phone", { required: "Required" })}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              {...register("address", { required: "Required" })}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              {...register("city", { required: "Required" })}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 font-medium disabled:opacity-50"
          >
            {isSubmitting ? "Processing..." : "Place Order"}
          </button>
        </form>

        {/* Підсумок */}
        <div className="bg-gray-50 rounded-lg p-6 h-fit">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="flex justify-between items-center border-b py-3"
            >
              <div>
                <p className="font-medium">{item.product.name}</p>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>
              <p className="font-bold">
                ${(item.product.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
          <div className="mt-6 flex justify-between">
            <p className="text-lg font-bold">Total:</p>
            <p className="text-2xl font-bold text-blue-500">
              ${totalPrice.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
