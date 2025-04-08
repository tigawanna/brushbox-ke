"use client";
import { BeautyProduct } from "@/data/api/shop";
import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

interface ShopSectionProps {
  products: BeautyProduct[];
}

export function ShopSection({ products }: ShopSectionProps) {
  const categories: BeautyProduct["category"][] = [
    "skincare",
    "makeup",
    "haircare",
    "fragrance",
    "tools",
  ];
 const [selectedCategory, setSelectedCategory] = useState<BeautyProduct["category"] | "all">("all");
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <section className="container px-4 py-8">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          className={`btn btn-sm ${selectedCategory === "all" ? "btn-primary" : "btn-ghost"}`}
          onClick={() => setSelectedCategory("all")}>
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`btn btn-sm ${selectedCategory === category ? "btn-primary" : "btn-ghost"}`}
            onClick={() => setSelectedCategory(category)}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-primary/20 rounded-t-lg w-full">
            <figure className="overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="r h-48  w-full object-cover  hover:scale-125 transition-transform duration-300"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-2xl font-bold">{product.name}</h2>
              <p className="text-sm text-base-content/70">{product.brandName}</p>
              <p className="text-sm line-clamp-1">{product.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-primary font-bold">${product.price.toFixed(2)}</span>
                <button
                  className={`btn btn-primary btn-sm ${!product.inStock ? "btn-disabled" : ""}`}>
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
