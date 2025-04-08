import { ResponsiveGenericToolbar } from "@/components/nav/ResponsiveGenericToolbar";
import { serverPBClient, getServerCurrentUser } from "@/lib/pb/server-client";
import { ShopSection } from "./__components/ShopSection";
import { beautyProducts } from "@/data/api/shop";


export default async function ShopPage() {
  // const pb = await serverPBClient();
  // const cuccrentUser = await getServerCurrentUser(pb);
  // const appointments = await (await serverPBClient()).from("users").getFullList();
  return (
    <ResponsiveGenericToolbar links={[]}>
      <div className="w-full mt-16 min-h-screen h-full flex   ">
        <ShopSection products={beautyProducts} />
      </div>
    </ResponsiveGenericToolbar>
  );
}
