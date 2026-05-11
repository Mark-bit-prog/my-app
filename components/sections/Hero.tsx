import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="bg-[#F2F0F1] w-full">
      <div className="mx-auto flex max-w-7xl flex-col overflow-hidden lg:flex-row lg:items-end lg:px-20 lg:pt-5">
        <div className="px-5 pt-12 sm:px-8 lg:mt-10 lg:w-7/12 lg:px-0 lg:pb-12">
          <div>
            <h1 className="max-w-3xl text-4xl font-black leading-[1.05] sm:text-5xl lg:text-7xl">
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-6 text-zinc-500 sm:text-base">
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense
              of style.
            </p>

            <Link
              href={"/shop"}
              className="mt-6 flex h-[55px] w-full items-center justify-center rounded-full bg-black p-2 text-white sm:max-w-[210px]"
            >
              Shop Now
            </Link>
          </div>
          <div className="my-8">
            <div className="mx-auto grid max-w-[420px] grid-cols-2 justify-items-center gap-y-6 sm:max-w-xl sm:grid-cols-3 lg:mx-0 lg:max-w-2xl lg:justify-items-start">
              <div className="w-full border-r border-zinc-400 pr-4 sm:border-r">
                <p className="text-3xl lg:text-5xl font-medium">200+</p>
                <p className="text-xs lg:text-base text-zinc-500">
                  International Brands
                </p>
              </div>
              <div className="w-full pl-4 sm:border-r sm:border-zinc-400 sm:px-6">
                <p className="text-3xl lg:text-5xl font-medium">2,000+</p>
                <p className="text-xs lg:text-base text-zinc-500">
                  High-Quality Products
                </p>
              </div>
              <div className="col-span-2 w-[150px] text-center sm:col-span-1 sm:w-full sm:pl-6 sm:text-left">
                <p className="text-3xl lg:text-5xl font-medium">30,000+</p>
                <p className="text-xs lg:text-base text-zinc-500">
                  Happy Customers
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-2 flex w-full max-w-[390px] justify-center px-4 sm:max-w-[460px] lg:mt-0 lg:w-5/12 lg:max-w-none lg:px-0">
          <Image
            width={390}
            height={448}
            priority
            className="h-auto w-full object-contain lg:max-h-[560px]"
            src="/images/hero-img.svg"
            alt="Models wearing casual clothes"
          />
        </div>
      </div>
      {/* Brands */}
      <div className="bg-black px-5 py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:gap-x-12 lg:gap-x-28">
          <Image
            width={150}
            height={50}
            className="h-auto w-[100px] sm:w-[130px]"
            style={{ height: "auto" }}
            src="/images/brand_1.png"
            alt="Versace"
          ></Image>
          <Image
            width={150}
            height={50}
            className="h-auto w-[80px] sm:w-[110px]"
            style={{ height: "auto" }}
            src="/images/brand_2.png"
            alt="Zara"
          ></Image>
          <Image
            width={150}
            height={50}
            className="h-auto w-[100px] sm:w-[130px]"
            style={{ height: "auto" }}
            src="/images/brand_3.png"
            alt="Gucci"
          ></Image>
          <Image
            width={150}
            height={50}
            className="h-auto w-[120px] sm:w-[150px]"
            style={{ height: "auto" }}
            src="/images/brand_4.png"
            alt="Prada"
          ></Image>
          <Image
            width={150}
            height={50}
            className="h-auto w-[140px] sm:w-[170px]"
            style={{ height: "auto" }}
            src="/images/brand_5.png"
            alt="Calvin Klein"
          ></Image>
        </div>
      </div>
    </div>
  );
};

export default Hero;
