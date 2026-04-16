"use client";
import Link from "next/dist/client/link";
import { navLinks } from "@/config/links";
import { useCart } from "@/context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import { FaBars } from "react-icons/fa";

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="flex items-center justify-between p-2 sm:p-9 bg-white shadow">
      <Link href="/" className="text-xl font-bold capitalize">
        SHOP.COM
      </Link>
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
        <FaShoppingCart />
      </Link>

      <ul className="flex p-3 gap-5 sm:hidden">
        <li>
          {/* Burger Icon */}
          <Link href="#" className="text-xl font-bold capitalize">
            <FaBars />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
