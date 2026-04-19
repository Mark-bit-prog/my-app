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
      <nav className="flex items-center justify-between h-[64] p-2 sm:p-9 bg-white shadow">
        {/* Burger Icon */}
        <ul className="flex p-3 sm:hidden">
          <li>
            <Link href="#" className=" capitalize">
              <LuAlignJustify className="text-2xl" />
            </Link>
          </li>
        </ul>

        <Link href="/" className="text-2xl font-[1000] capitalize mr-auto">
          SHOP.COM
        </Link>

        <ul className="flex p-3 sm:hidden gap-[12]">
          <li className="text-2xl font-[1000]">
            <LuSearch />
          </li>
          <li className="text-2xl font-[1000]">
            <LuShoppingCart />
          </li>
          <li className="text-2xl font-[1000]">
            <LuCircleUserRound />
          </li>
        </ul>
        <ul className="hidden gap-5 mx-auto sm:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </ul>
        <Link href="/cart" className="hidden sm:flex items-center relative">
          <div className=" w-5 h-6" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
          <LuShoppingCart />
        </Link>
      </nav>
    </div>
  );
}
