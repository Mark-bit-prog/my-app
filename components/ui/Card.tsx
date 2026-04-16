"use client";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

type product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

const Card = ({ product }: { product: product }) => {
  const { addToCart } = useCart();
  return (
    <div
      key={product.id}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <Image
        src={product.image}
        alt={product.name}
        width={400}
        height={400}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h2 className="text-xl font-bold">{product.name}</h2>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
      </div>
      <div className="p-6 flex justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            addToCart(product);
            console.log(`Added ${product.name} to cart`);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
