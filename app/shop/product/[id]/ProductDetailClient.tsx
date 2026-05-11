"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { LuMinus, LuPlus, LuSlidersHorizontal } from "react-icons/lu";
import { useCart } from "@/context/CartContext";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  stock: number;
  category: string | null;
};

type Review = {
  id: number;
  rating: number;
  comment: string | null;
  createdAt: string;
  userName: string;
};

type RelatedProduct = {
  id: number;
  name: string;
  price: number;
  imageUrl: string | null;
  rating: number;
};

type Props = {
  product: Product;
  reviews: Review[];
  averageRating: number;
  relatedProducts: RelatedProduct[];
  isLoggedIn: boolean;
};

function Stars({ rating, size = "text-xl" }: { rating: number; size?: string }) {
  return (
    <div className="flex items-center gap-1 text-[#FFC633]">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={`${size} ${star <= Math.round(rating) ? "" : "opacity-25"}`}
        />
      ))}
    </div>
  );
}

export default function ProductDetailClient({
  product,
  reviews,
  averageRating,
  relatedProducts,
  isLoggedIn,
}: Props) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Large");
  const [selectedColor, setSelectedColor] = useState("#4f4631");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const displayRating = reviews.length > 0 ? averageRating : 0;
  const productImage = product.imageUrl || "/images/hero-img.svg";
  const oldPrice = product.price * 1.2;

  const submitReview = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    setIsSubmitting(true);

    const response = await fetch(`/api/products/${product.id}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating, comment }),
    });

    const data = await response.json();
    setIsSubmitting(false);

    if (!response.ok) {
      setMessage(data.message || "Could not add review");
      return;
    }

    setComment("");
    setRating(5);
    setMessage("Review added");
    router.refresh();
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-center gap-3 text-sm text-gray-500 border-t pt-8 mb-8">
        <Link href="/" className="hover:text-black">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-black">
          Shop
        </Link>
        <span>/</span>
        <span className="text-black">{product.category || product.name}</span>
      </div>

      <section className="grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div className="grid gap-4 sm:grid-cols-[120px_1fr]">
          <div className="order-2 grid grid-cols-3 gap-3 sm:order-1 sm:grid-cols-1">
            {[0, 1, 2].map((item) => (
              <button
                key={item}
                type="button"
                className={`aspect-square overflow-hidden rounded-[8px] bg-[#F0EEED] ${
                  item === 0 ? "border-2 border-black" : ""
                }`}
              >
                <Image
                  src={productImage}
                  alt={product.name}
                  width={160}
                  height={160}
                  className="h-full w-full object-contain p-3"
                />
              </button>
            ))}
          </div>

          <div className="order-1 flex aspect-square items-center justify-center rounded-[8px] bg-[#F0EEED] sm:order-2">
            <Image
              src={productImage}
              alt={product.name}
              width={620}
              height={620}
              priority
              className="h-full w-full object-contain p-8"
            />
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-[1000] uppercase leading-tight lg:text-5xl">
            {product.name}
          </h1>

          <div className="mt-4 flex items-center gap-3">
            <Stars rating={displayRating} size="text-2xl" />
            <p className="text-lg">
              {displayRating.toFixed(1)}
              <span className="text-gray-500">/5</span>
            </p>
          </div>

          <div className="mt-5 flex items-center gap-4">
            <p className="text-4xl font-bold">${product.price.toFixed(0)}</p>
            <p className="text-4xl font-bold text-gray-400 line-through">
              ${oldPrice.toFixed(0)}
            </p>
            <span className="rounded-full bg-red-100 px-4 py-2 text-red-500">
              -20%
            </span>
          </div>

          <p className="mt-5 border-b pb-6 text-lg leading-relaxed text-gray-500">
            {product.description}
          </p>

          <div className="border-b py-6">
            <p className="mb-4 text-gray-500">Select Colors</p>
            <div className="flex gap-4">
              {["#4f4631", "#314f4a", "#31344f"].map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-white"
                  style={{ backgroundColor: color }}
                  aria-label={`Select color ${color}`}
                >
                  {selectedColor === color ? "✓" : ""}
                </button>
              ))}
            </div>
          </div>

          <div className="border-b py-6">
            <p className="mb-4 text-gray-500">Choose Size</p>
            <div className="flex flex-wrap gap-3">
              {["Small", "Medium", "Large", "X-Large"].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`rounded-full px-8 py-3 ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "bg-[#F0F0F0] text-gray-500"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-[170px_1fr] gap-4">
            <div className="flex items-center justify-between rounded-full bg-[#F0F0F0] px-6">
              <button
                type="button"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                aria-label="Decrease quantity"
              >
                <LuMinus className="text-2xl" />
              </button>
              <span className="text-lg">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((value) => value + 1)}
                aria-label="Increase quantity"
              >
                <LuPlus className="text-2xl" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => addToCart(product, quantity)}
              className="rounded-full bg-black py-4 text-white"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="grid grid-cols-3 border-b text-center text-lg">
          <p className="pb-5 text-gray-500">Product Details</p>
          <p className="border-b-2 border-black pb-5 font-bold">
            Rating & Reviews
          </p>
          <p className="pb-5 text-gray-500">FAQs</p>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-3xl font-bold">
            All Reviews{" "}
            <span className="text-xl font-normal text-gray-500">
              ({reviews.length})
            </span>
          </h2>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F0F0F0]"
              aria-label="Filter reviews"
            >
              <LuSlidersHorizontal className="text-2xl" />
            </button>
            <button
              type="button"
              className="rounded-full bg-[#F0F0F0] px-6 py-3"
            >
              Latest
            </button>
            <a href="#write-review" className="rounded-full bg-black px-6 py-3 text-white">
              Write a Review
            </a>
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {reviews.length === 0 ? (
            <div className="rounded-[8px] border p-8 text-center text-gray-500 lg:col-span-2">
              No reviews yet. Be the first to review this product.
            </div>
          ) : (
            reviews.map((review) => (
              <article key={review.id} className="rounded-[8px] border p-8">
                <div className="flex items-start justify-between">
                  <Stars rating={review.rating} />
                  <span className="text-3xl leading-none text-gray-400">...</span>
                </div>
                <h3 className="mt-5 text-2xl font-bold">
                  {review.userName}{" "}
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs text-white">
                    ✓
                  </span>
                </h3>
                {review.comment && (
                  <p className="mt-4 text-lg leading-relaxed text-gray-500">
                    &quot;{review.comment}&quot;
                  </p>
                )}
                <p className="mt-8 font-medium text-gray-500">
                  Posted on{" "}
                  {new Date(review.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </article>
            ))
          )}
        </div>

        <div id="write-review" className="mt-8 rounded-[8px] border p-8">
          <h3 className="text-2xl font-bold">Write a Review</h3>
          {isLoggedIn ? (
            <form onSubmit={submitReview} className="mt-5 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-600">
                  Rating
                </label>
                <select
                  value={rating}
                  onChange={(event) => setRating(Number(event.target.value))}
                  className="w-full rounded-[8px] border px-4 py-3"
                >
                  {[5, 4, 3, 2, 1].map((value) => (
                    <option key={value} value={value}>
                      {value}/5
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-600">
                  Comment
                </label>
                <textarea
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  rows={4}
                  className="w-full rounded-[8px] border px-4 py-3"
                  placeholder="Share what you think about this product..."
                />
              </div>
              {message && <p className="text-sm text-gray-500">{message}</p>}
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full bg-black px-8 py-3 text-white disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          ) : (
            <p className="mt-4 text-gray-500">
              Please <Link href="/login" className="text-black underline">login</Link> to
              write a review.
            </p>
          )}
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="mt-20">
          <h2 className="text-center text-4xl font-[1000] uppercase lg:text-5xl">
            You Might Also Like
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((item) => (
              <Link key={item.id} href={`/shop/product/${item.id}`}>
                <div className="aspect-square rounded-[8px] bg-[#F0EEED] p-6">
                  <Image
                    src={item.imageUrl || "/images/hero-img.svg"}
                    alt={item.name}
                    width={320}
                    height={320}
                    className="h-full w-full object-contain"
                  />
                </div>
                <h3 className="mt-4 text-xl font-bold">{item.name}</h3>
                <div className="mt-2 flex items-center gap-2">
                  <Stars rating={item.rating} size="text-base" />
                  <span className="text-sm text-gray-500">
                    {item.rating.toFixed(1)}/5
                  </span>
                </div>
                <p className="mt-2 text-2xl font-bold">${item.price.toFixed(0)}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
