import { ResponsiveGenericToolbar } from "@/components/shared/nav/ResponsiveGenericToolbar";

interface pageProps {}

export default async function page({}: pageProps) {
  return (
    <ResponsiveGenericToolbar links={[]}>
      <div className="w-full min-h-screen h-full flex flex-col items-center justify-center">
        appintemts
      </div>
    </ResponsiveGenericToolbar>
  );
}
