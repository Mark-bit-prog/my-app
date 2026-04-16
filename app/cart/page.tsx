"use client";

import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
    clearCart,
  } = useCart();

  if (cart.length === 0) {
    return <p className="text-center py-12">Кошик порожній</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Кошик</h1>

      {cart.map((item) => (
        <div
          key={item.product.id}
          className="flex items-center justify-between border-b py-4"
        >
          <div>
            <h2 className="font-bold">{item.product.name}</h2>
            <p className="text-gray-600">${item.product.price}</p>
          </div>

          {/* Кількість */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => decreaseQuantity(item.product.id)}
              className="w-8 h-8 bg-gray-200 rounded"
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => increaseQuantity(item.product.id)}
              className="w-8 h-8 bg-gray-200 rounded"
            >
              +
            </button>
          </div>

          {/* Сума за товар */}
          <p className="font-bold">
            ${(item.product.price * item.quantity).toFixed(2)}
          </p>

          {/* Видалити */}
          <button
            onClick={() => removeFromCart(item.product.id)}
            className="text-red-500 hover:text-red-700"
          >
            Видалити
          </button>
        </div>
      ))}

      {/* Підсумок */}
      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={clearCart}
          className="text-gray-500 hover:text-gray-700"
        >
          Очистити кошик
        </button>
        <div className="text-right">
          <p className="text-2xl font-bold">Разом: ${totalPrice.toFixed(2)}</p>
          <button className="mt-4 bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600">
            Оформити замовлення
          </button>
        </div>
      </div>
    </div>
  );
}
