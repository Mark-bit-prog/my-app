"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { navLinks } from "@/config/links";
import { useCart } from "@/context/CartContext";
import {
  LuCircleUserRound,
  LuLogOut,
  LuSearch,
  LuShoppingCart,
} from "react-icons/lu";
import BurgerMenu from "../ui/BurgerMenu";

export default function Navbar() {
  const router = useRouter();
  const { totalItems } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const checkSession = async () => {
      const res = await fetch("/api/auth/session");
      const session = await res.json();

      setIsLoggedIn(Boolean(session?.user));
    };

    checkSession();
  }, []);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = searchQuery.trim();

    if (!query) {
      router.push("/shop");
      return;
    }

    router.push(`/shop?query=${encodeURIComponent(query)}`);
  };

  return (
    <div>
      <div className="bg-black h-[34] flex">
        <p className="text-white text-center text-xs sm:text-sm mx-auto my-auto">
          Sign up and get 20% off to your first order.
          <Link className="ml-2 underline text-md" href={"/register"}>
            Sign Up
          </Link>
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex items-center  h-[64] p-2 md:px-20 sm:p-9  bg-white shadow ">
        {/* Burger Icon */}
        <BurgerMenu />

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
        <form
          onSubmit={handleSearch}
          className="hidden md:mx-auto lg:flex font-light"
        >
          <label className="relative block p-3 rounded-full text-gray-400 focus-within:text-gray-600 bg-[#F0F0F0]">
            <button
              type="submit"
              className="absolute top-1/2 transform -translate-y-1/2 left-4"
              aria-label="Search products"
              title="Search products"
            >
              <LuSearch className="w-5 h-5" />
            </button>

            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search for products..."
              className="form-input w-96 pl-[40] bg-[#F0F0F0] focus:outline-none"
            />
          </label>
        </form>

        <div className="gap-5 p-2 ml-auto flex">
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

          <Link
            href={isLoggedIn ? "/orders" : "/login"}
            className="items-center relative"
            title={isLoggedIn ? "My orders" : "Login"}
          >
            <LuCircleUserRound className="text-2xl" />
          </Link>

          {isLoggedIn && (
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="items-center relative cursor-pointer"
              title="Log out"
              aria-label="Log out"
            >
              <LuLogOut className="text-2xl" />
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}
