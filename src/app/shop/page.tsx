import { ResponsiveGenericToolbar } from "@/components/nav/ResponsiveGenericToolbar";
import { ShopSection } from "./__components/ShopSection";
import { beautyProducts } from "@/data/api/shop";

export default async function ShopPage() {
  return (
    <ResponsiveGenericToolbar links={[]}>
      <div className="mt-16 flex h-full min-h-screen w-full">
        <ShopSection products={beautyProducts} />
      </div>
    </ResponsiveGenericToolbar>
  );
}
