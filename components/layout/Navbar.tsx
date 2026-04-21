"use client";
import Link from "next/dist/client/link";
import { navLinks } from "@/config/links";
import { useCart } from "@/context/CartContext";
import {
  LuShoppingCart,
  LuSearch,
  LuCircleUserRound,
  LuAlignJustify,
} from "react-icons/lu";

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <div>
      <div className="bg-black h-[34] flex">
        <p className="text-white text-center text-xs sm:text-sm mx-auto my-auto">
          Sign up and get 20% off to your first order.
          <Link className="ml-2 underline text-md" href={"/login"}>
            Sign Up
          </Link>
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex items-center  h-[64] p-2 md:px-20 sm:p-9  bg-white shadow ">
        {/* Burger Icon */}
        <button className="capitalize flex p-3 md:hidden">
          <LuAlignJustify className="text-2xl" />
        </button>

        <Link href="/" className="text-2xl lg:text-4xl font-[1000] capitalize">
          SHOP.COM
        </Link>
        <ul className="hidden gap-5 md:ml-20 md:mr-auto md:flex font-light">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </ul>

        {/* Search bar */}
        <ul className="hidden md:mx-auto lg:flex font-light">
          <label className="relative block p-3 rounded-full text-gray-400 focus-within:text-gray-600 bg-[#F0F0F0]">
            <LuSearch className="pointer-events-none w-5 h-5 absolute top-1/2 transform -translate-y-1/2 left-4" />

            <input
              placeholder="Search for products..."
              className="form-input w-96 pl-[40] bg-[#F0F0F0]  focus:outline-none"
            />
          </label>
        </ul>

        <div className="gap-5 p-3 ml-auto flex">
          <Link href="/cart" className="lg:hidden">
            <LuSearch className="text-2xl" />
          </Link>
          <Link href="/cart" className="flex items-center relative">
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
            <LuShoppingCart className="text-2xl" />
          </Link>

          <Link href="/login" className="items-center relative">
            <LuCircleUserRound className="text-2xl" />
          </Link>
        </div>
      </nav>
    </div>
  );
}
