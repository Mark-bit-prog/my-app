"use client";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
// import { prisma } from "@/lib/prisma";

type product = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  stock: number;
  // OrderItem: number | 0;
};

const Card = ({ product }: { product: product }) => {
  // const products = await prisma.product.findMany();

  const { addToCart } = useCart();
  return (
    <div
      key={product.id}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      {product.imageUrl ? (
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={400}
          height={400}
          className="w-full h-64 object-cover"
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No Image Available</span>
        </div>
      )}
      {/*  */}
      <div className="p-6">
        <h2 className="text-xl font-bold">{product.name}</h2>
        <p className="text-gray-600 my-2">
          {product.description ?? "No description available"}
        </p>
        <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
      </div>
      <div className="p-6">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            addToCart(product);
            // console.log(`Added ${product.name} to cart`);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
