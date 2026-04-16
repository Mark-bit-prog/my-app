"use client";
import { useForm } from "react-hook-form";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

// 1️⃣ Типи форми
type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
};

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 2️⃣ Ініціалізація react-hook-form
  const {
    register, // реєструє поле форми
    handleSubmit, // обробляє відправку
    formState: { errors }, // помилки валідації
  } = useForm<FormData>();

  // 3️⃣ Відправка форми
  const onSubmit = (data: FormData) => {
    console.log("Замовлення:", { data, cart, totalPrice });
    clearCart();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-24">
        <h1 className="text-3xl font-bold text-green-500 mb-4">
          Дякуємо за замовлення! 🎉
        </h1>
        <button
          onClick={() => router.push("/")}
          className="bg-blue-500 text-white px-8 py-3 rounded-lg"
        >
          На головну
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-gray-600 mb-4">Кошик порожній</p>
        <button
          onClick={() => router.push("/shop")}
          className="bg-blue-500 text-white px-8 py-3 rounded-lg"
        >
          До магазину
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Оформлення замовлення</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* 4️⃣ Форма */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Імʼя */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Імʼя
            </label>
            <input
              // register реєструє поле і додає валідацію
              {...register("firstName", { required: "Введіть імʼя" })}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* Показуємо помилку якщо поле не заповнене */}
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              {...register("email", {
                required: "Введіть email",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Невірний формат email",
                },
              })}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Телефон */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Телефон
            </label>
            <input
              {...register("phone", { required: "Введіть телефон" })}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Адреса */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Адреса
            </label>
            <input
              {...register("address", { required: "Введіть адресу" })}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 font-medium"
          >
            Підтвердити замовлення
          </button>
        </form>

        {/* 5️⃣ Підсумок */}
        <div className="bg-gray-50 rounded-lg p-6 h-fit">
          <h2 className="text-xl font-bold mb-6">Ваше замовлення</h2>
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="flex justify-between items-center border-b py-3"
            >
              <div>
                <p className="font-medium">{item.product.name}</p>
                <p className="text-sm text-gray-600">
                  Кількість: {item.quantity}
                </p>
              </div>
              <p className="font-bold">
                ${(item.product.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
          <div className="mt-6 flex justify-between">
            <p className="text-lg font-bold">Разом:</p>
            <p className="text-2xl font-bold text-blue-500">
              ${totalPrice.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
