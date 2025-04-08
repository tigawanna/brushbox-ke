export interface BeautyProduct {
  id: string;
  name: string;
  category: "skincare" | "makeup" | "haircare" | "fragrance" | "tools";
  price: number;
  description: string;
  inStock: boolean;
  brandName: string;
  image: string;
}

export const beautyProducts: BeautyProduct[] = [
  {
    id: "bb-001",
    name: "Radiance Renewal Serum",
    category: "skincare",
    price: 48.99,
    description: "Vitamin C enriched facial serum for bright, glowing skin",
    inStock: true,
    brandName: "LuxGlow",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80",
  },

  {
    id: "bb-003",
    name: "Silk Repair Hair Mask",
    category: "haircare",
    price: 34.99,
    description: "Deep conditioning treatment for damaged hair",
    inStock: true,
    brandName: "HairLuxe",
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80",
  },
  {
    id: "bb-006",
    name: "Ocean Breeze Eau de Parfum",
    category: "fragrance",
    price: 78.99,
    description: "Fresh aquatic scent with citrus notes",
    inStock: true,
    brandName: "Essence",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80",
  },
  {
    id: "bb-008",
    name: "Ceramic Styling Iron",
    category: "tools",
    price: 129.99,
    description: "Professional-grade hair straightener with temperature control",
    inStock: true,
    brandName: "StylePro",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80",
  },
  {
    id: "bb-007",
    name: "Charcoal Clarifying Mask",
    category: "skincare",
    price: 29.99,
    description: "Deep cleansing mask for oily and combination skin",
    inStock: true,
    brandName: "PureSkin",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80",
  },
  {
    id: "bb-004",
    name: "Rose Quartz Facial Roller",
    category: "tools",
    price: 28.99,
    description: "Natural stone facial massage tool for skincare routine",
    inStock: true,
    brandName: "BeautyTools",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80",
  },

  {
    id: "bb-009",
    name: "Argan Oil Hair Serum",
    category: "haircare",
    price: 32.99,
    description: "Nourishing hair serum for frizz control and shine",
    inStock: true,
    brandName: "HairLuxe",
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80",
  },
  {
    id: "bb-010",
    name: "Moonlight Jasmine Perfume",
    category: "fragrance",
    price: 85.99,
    description: "Elegant floral fragrance with jasmine and vanilla notes",
    inStock: true,
    brandName: "Essence",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80",
  },

  {
    id: "bb-012",
    name: "Matte Liquid Lipstick Set",
    category: "makeup",
    price: 45.99,
    description: "Long-lasting matte lipstick set in 3 classic shades",
    inStock: true,
    brandName: "BeautyBloom",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80",
  },

  {
    id: "bb-014",
    name: "Hyaluronic Acid Serum",
    category: "skincare",
    price: 42.99,
    description: "Intensive hydrating serum for plump, moisturized skin",
    inStock: true,
    brandName: "PureSkin",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80",
  },
];
