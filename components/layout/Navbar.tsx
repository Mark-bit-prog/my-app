"use client";
import Link from "next/dist/client/link";
import { navLinks } from "@/config/links";

export default function Navbar() {
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

      <ul className="flex p-3 gap-5 sm:hidden">
        <li>
          {/* Burger Icon */}
          <a href="#" className="text-xl font-bold capitalize">
            =
          </a>
        </li>
      </ul>
    </nav>
  );
}
