import React from "react";
import Link from "next/dist/client/link";
import { footerLinks } from "@/config/links";
import { TbMail } from "react-icons/tb";
// import { BiLogoVisa } from "react-icons/bi";
import Image from "next/image";

const Footer = () => {
  return (
    <div>
      <div className="relative w-full">
        {/* Underlying Blocks (Two Columns) */}
        <div className="flex-col h-full w-full">
          <div className="bg-white h-[200]"></div>
          <div className="bg-[#F0F0F0] h-[200]"></div>
        </div>

        {/* Overlay Block */}
        <div className="absolute inset-0 z-10 flex items-center justify-center text-white">
          <div className="flex-col max-w-6xl m-4 p-6 bg-black rounded-xl">
            <p className="text-white font-bold text-2xl sm:text-5xl">
              STAY UP TO DATE ABOUT OUR LATEST OFFERS
            </p>

            <label
              htmlFor="email"
              className="relative block p-3 mt-6 rounded-full text-gray-400 focus-within:text-gray-600 bg-white"
            >
              <TbMail className="pointer-events-none w-5 h-5 absolute top-1/2 transform -translate-y-1/2 left-4" />

              <input
                type="email"
                name="email"
                id="email"
                autoComplete="mail"
                placeholder="Enter your email address"
                className="form-input w-full pl-[30]"
              />
            </label>
            <button className="relative block p-3 mt-5 w-full rounded-full focus-within:text-gray-600 bg-white text-black">
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </div>
      <div className="bg-[#F0F0F0] p-4">
        <p className="text-3xl sm:text-5xl font-black">SHOP.COM</p>
        <p className="font-sm font-extralight my-3 text-gray-500">
          We have clothes that suits your style and which you’re proud to wear.
          From women to men.
        </p>

        <ul className="flex gap-3 my-5">
          <li>
            <Link href={"/"}>
              <Image
                width={30}
                height={30}
                className=""
                src="/images/twitter_logo.png"
                alt="logo"
              ></Image>
            </Link>
          </li>
          <li>
            <Link href={"/"}>
              <Image
                width={30}
                height={30}
                className=""
                src="/images/facebook_logo.png"
                alt="logo"
              ></Image>
            </Link>
          </li>
          <li>
            <Link href={"/"}>
              <Image
                width={30}
                height={30}
                className=""
                src="/images/insta_logo.png"
                alt="logo"
              ></Image>
            </Link>
          </li>
          <li>
            <Link href={"/"}>
              <Image
                width={30}
                height={30}
                className=""
                src="/images/git_logo.png"
                alt="logo"
              ></Image>
            </Link>
          </li>
        </ul>

        <ul className="hidden gap-5 mx-auto sm:flex">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </ul>

        <hr />
        <p className="font-sm font-extralight my-3 text-gray-500 text-center">
          © 2026, All rights reserved
        </p>
        {/* <div>
          <BiLogoVisa />
        </div> */}
      </div>
    </div>
  );
};

export default Footer;
