// import Link from "next/link";
// import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="bg-[#F2F0F1] w-full">
      <div className="pt-12 px-5">
        <div>
          <h1 className="text-4xl sm:text-5xl font-black">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <p className="mt-[20] text-md text-zinc-500">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <button className="w-full h-[60] mt-5 bg-black text-white p-2 rounded-full">
            Shop Now
          </button>
        </div>
        <div className="flex gap-10 my-10 max-w-[380] mx-auto justify-center">
          <div>
            <p className="text-3xl font-semibold">200+</p>
            <p className="text-xs text-zinc-500">International Brands</p>
          </div>
          <span className="w-[0.5] bg-zinc-400"></span>
          <div>
            <p className="text-3xl font-semibold">2,000+</p>
            <p className="text-xs text-zinc-500">High-Quality Products</p>
          </div>
        </div>
        <div className="flex-col w-[103] mx-auto">
          <p className="text-3xl font-semibold">30,000+</p>
          <p className="text-xs text-zinc-500">Happy Customers</p>
        </div>
      </div>
      <Image
        width={100}
        height={100}
        className="w-full h-full"
        src="/images/Hero-img.svg"
        alt="photo"
      />
      <div className="h-[150] py-[40] bg-black">
        <div className="items-center flex justify-around gap-3 px-3">
          <Image
            width={150}
            height={50}
            className=""
            src="/images/brand_1.png"
            alt="photo"
          ></Image>
          <Image
            width={84}
            height={37}
            className=""
            src="/images/brand_2.png"
            alt="photo"
          ></Image>
          <Image
            width={140}
            height={100}
            className=""
            src="/images/brand_3.png"
            alt="photo"
          ></Image>
        </div>
        <div className="items-center flex justify-evenly mt-5 gap-3 px-3">
          <Image
            width={150}
            height={50}
            className=""
            src="/images/brand_4.png"
            alt="photo"
          ></Image>
          <Image
            width={150}
            height={50}
            className=""
            src="/images/brand_5.png"
            alt="photo"
          ></Image>
        </div>
      </div>
    </div>
  );
};

export default Hero;
