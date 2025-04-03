"use client"
import { hairStyles } from "@/data/hair-styles";
import Image from "next/image";
import { useState } from "react";

export function HairStylesSection() {
  const [activeTab, setActiveTab] = useState("cornrows");
  const tabs = Object.keys(hairStyles);
  return (
    <section id="hairstyles" className="section-padding py-12 px-8 z-10 b">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="text-sm uppercase text-primary tracking-widest">Hair Artistry</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2">Signature Hairstyles</h2>
          <p className="mt-4 tmax-w-2xl mx-auto">
            Explore our expertly crafted hairstyles, designed to enhance your natural beauty and
            express your unique personality.
          </p>
        </div>

        {/* Style tabs */}
        <div className="flex flex-wrap justify-center font-sans gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`btn transition-all ${
                activeTab === tab
                  ? "btn btn-primary"
                  : "btn btn-outline border-[1px]"
              }`}
              onClick={() => {
                console.log(tab);
                setActiveTab(tab)}}>
              {hairStyles[tab as keyof typeof hairStyles].title}
            </button>
          ))}
        </div>

        {/* Style showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div className="relative group">
            <div className="absolute inset-0 border-2 border-primary transform translate-x-3 translate-y-3 rounded-lg transition-all group-hover:translate-x-1 group-hover:translate-y-1"></div>
            <Image
              src={hairStyles[activeTab as keyof typeof hairStyles].image}
              alt={hairStyles[activeTab as keyof typeof hairStyles].title}
                width={800}
                height={800}
              className="rounded-lg w-full h-[400px] object-cover relative z-10"
            />
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-3xl font-serif font-bold mb-4">
              {hairStyles[activeTab as keyof typeof hairStyles].title}
            </h3>
            <p className=" mb-6">
              {hairStyles[activeTab as keyof typeof hairStyles].description}
            </p>
            <ul className="space-y-3 mb-8 font-sans">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span className="">Professional styling by expert stylists</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span className="">High-quality hair products and extensions</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span className="">
                  Customizable to your preferences and face shape
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span className="">Aftercare guidance for long-lasting results</span>
              </li>
            </ul>
            <a href="#booking" className="btn btn-primary">
              Book This Style
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
