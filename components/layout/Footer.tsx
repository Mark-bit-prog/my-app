import React from "react";
import Link from "next/dist/client/link";
import { footerLinks } from "@/config/links";

const Footer = () => {
  return (
    <div className="flex p-10 bg-gray-300">
      <p className="text-lg font-bold">Footer</p>

      <ul className="hidden gap-5 mx-auto sm:flex">
        {footerLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Footer;
