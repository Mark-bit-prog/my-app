import { navLinks } from "@/config/links";
import { footerLinks } from "@/config/links";
import { LuAlignJustify } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import { useEffect, useState } from "react";

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0" onClick={() => setIsOpen(false)} />
      )}

      <button onClick={() => setIsOpen(!isOpen)} className="flex p-3 md:hidden">
        {!isOpen && <LuAlignJustify className="text-2xl" />}
        {isOpen && <IoClose className="text-2xl" />}
      </button>

      {isOpen && (
        <ul className="absolute z-40 h-screen w-5/6 inset-x-0 top-10 mt-10 bg-white pt-5 flex flex-col gap-1">
          <span className="h-[1] w-100 bg-gray-200"></span>
          {navLinks.map((link) => (
            <Link
              className="text-2xl p-4"
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <span className="h-[1] w-100 bg-gray-200"></span>
          {footerLinks.map((link) => (
            <Link
              className="text-2xl p-4 text-gray-500"
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href={"/login"}
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center w-4/5 mt-5 mx-auto h-[55] bg-black text-white p-2 rounded-full"
          >
            Login
          </Link>
        </ul>
      )}
    </>
  );
};

export default BurgerMenu;
