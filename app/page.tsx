import Hero from "@/components/sections/Hero";
// import Image from "next/image";
import { LuArrowRight, LuArrowLeft } from "react-icons/lu";
import { BsFillStarFill, BsCheckCircleFill } from "react-icons/bs";

export default function Home() {
  return (
    <main>
      <div className="bg-gray-100">
        <Hero />
      </div>
      <div>
        <div className="max-w-6xl py-12 px-8">
          <p className="text-4xl font-black text-center uppercase">
            New arrivals
          </p>

          <button className="w-full h-[60] mt-5 bg-white border text-black p-2 rounded-full">
            View All
          </button>
        </div>
        <hr className="mx-10" />
        <div className="max-w-6xl py-12 px-8">
          <p className="text-4xl font-black text-center uppercase">
            Top selling
          </p>
          <button className="w-full h-[60] mt-5 bg-white border text-black p-2 rounded-full">
            View All
          </button>
        </div>
        <div className="flex-col max-w-6xl py-5 px-2 m-4 bg-[#F0F0F0] rounded-xl">
          <p className="text-3xl sm:text-5xl mt-8 font-black text-center uppercase">
            BROWSE BY dress STYLE
          </p>

          <div className="mt-8 mb-3 mx-auto flex-col">
            <div className="sm:flex">
              <div className="h-[190] w-[260] sm:w-[300] mt-8 mx-auto sm:mx-3 md:flex-initial mb-3 bg-no-repeat bg-[url(/images/style_1.png)] bg-right bg-white rounded-xl">
                <p className="p-5 text-2xl font-semibold">Casual</p>
              </div>
              <div className="h-[190] w-[260] sm:w-[300] mt-8 mx-auto sm:mx-3 sm:flex-1  mb-3 bg-no-repeat bg-[url(/images/style_2.png)] bg-right bg-white rounded-xl">
                <p className="p-5 text-2xl font-semibold">Formal</p>
              </div>
            </div>
            <div className="sm:flex">
              <div className="h-[190] w-[260] sm:w-[300] mt-8 mx-auto sm:mx-3 sm:flex-1 mb-3 bg-no-repeat bg-[url(/images/style_3.png)] bg-right bg-white rounded-xl">
                <p className="p-5 text-2xl font-semibold">Party</p>
              </div>
              <div className="h-[190] w-[260] sm:w-[300] mt-8 mx-auto sm:mx-3 md:flex-initial  mb-3 bg-no-repeat bg-[url(/images/style_4.png)] bg-right  bg-white rounded-xl">
                <p className="p-5 text-2xl font-semibold">Gym</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex max-w-6xl p-5">
          <p className="text-2xl sm:text-5xl font-black text-left uppercase">
            OUR HAPPY CUSTOMERS
          </p>

          <div className="flex gap-2 mt-auto">
            <LuArrowLeft className="text-3xl" />
            <LuArrowRight className="text-3xl" />
          </div>
        </div>
        <div className="flex-col max-w-6xl m-4 p-5 border rounded-xl">
          <span className="flex gap-2">
            <BsFillStarFill className="text-yellow-300" />
            <BsFillStarFill className="text-yellow-300" />
            <BsFillStarFill className="text-yellow-300" />
            <BsFillStarFill className="text-yellow-300" />
            <BsFillStarFill className="text-yellow-300" />
          </span>
          <div className="flex gap-2 my-4">
            <p className="font-bold ">Sarah M.</p>
            <BsCheckCircleFill className="text-xl text-[#01AB31] flex-wrap" />
          </div>
          <p className="text-zinc-500">
            &quot;I&apos;m blown away by the quality and style of the clothes I
            received from Shop.co. From casual wear to elegant dresses, every
            piece I&apos;ve bought has exceeded my expectations.”
          </p>
        </div>
      </div>
    </main>
  );
}
