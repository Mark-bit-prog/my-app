import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="bg-[#F2F0F1] w-full">
      <div className="lg:flex lg:pt-5 lg:px-20">
        <div className="pt-12 px-5 lg:w-8/12 lg:mt-10">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black">
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </h1>
            <p className="mt-[20] text-md text-zinc-500">
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense
              of style.
            </p>

            <Link
              href={"/shop"}
              className="flex items-center justify-center w-full lg:w-[210] h-[55] mt-5 bg-black text-white p-2 rounded-full"
            >
              Shop Now
            </Link>
          </div>
          <div className="my-5 lg:flex">
            <div className="flex gap-10 my-10 max-w-[380] lg:max-w-full mx-auto lg:mx-1 justify-center">
              <div>
                <p className="text-3xl lg:text-5xl font-medium">200+</p>
                <p className="text-xs lg:text-base text-zinc-500">
                  International Brands
                </p>
              </div>
              {/* Line */}
              <span className="w-[0.5] bg-zinc-400"></span>
              <div>
                <p className="text-3xl lg:text-5xl font-medium">2,000+</p>
                <p className="text-xs lg:text-base text-zinc-500">
                  High-Quality Products
                </p>
              </div>
              {/* Line only for big screens */}
              <div className="w-[0.5] bg-zinc-400 hidden lg:flex"></div>

              <div className="flex-col w-[103] mx-auto hidden lg:flex">
                <p className="text-3xl lg:text-5xl font-medium">30,000+</p>
                <p className="text-xs lg:text-base text-zinc-500">
                  Happy Customers
                </p>
              </div>
            </div>
            {/* Mobile screen */}
            <div className="flex-col w-[103] mx-auto lg:hidden">
              <p className="text-3xl font-medium">30,000+</p>
              <p className="text-xs lg:font-extralight lg:text-base text-zinc-500">
                Happy Customers
              </p>
            </div>
          </div>
        </div>
        <Image
          width={100}
          height={100}
          className="w-full h-full sm:mt-auto sm:w-2/4 lg:h-3/4 lg:w-2/4"
          src="/images/hero-img.svg"
          alt="photo"
        />
      </div>
      {/* Brands */}
      <div className="h-[150] py-[30] md:flex md:justify-center bg-black">
        <div className="items-center flex justify-center gap-10 lg:gap-36 px-3 md:p-0">
          {/* Top row */}
          <Image
            width={150}
            height={50}
            className="w-[100]"
            src="/images/brand_1.png"
            alt="photo"
          ></Image>
          <Image
            width={150}
            height={50}
            className="w-[80]"
            src="/images/brand_2.png"
            alt="photo"
          ></Image>
          <Image
            width={150}
            height={50}
            className="w-[100]"
            src="/images/brand_3.png"
            alt="photo"
          ></Image>

          {/* Mobile version */}
          <Image
            width={150}
            height={50}
            className="hidden md:flex"
            src="/images/brand_4.png"
            alt="photo"
          ></Image>
          <Image
            width={150}
            height={150}
            className="hidden md:flex"
            src="/images/brand_5.png"
            alt="photo"
          ></Image>
        </div>

        {/* Low row */}
        <div className="md:hidden items-center flex justify-evenly mt-5 md:m-0 gap-3 px-3">
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
