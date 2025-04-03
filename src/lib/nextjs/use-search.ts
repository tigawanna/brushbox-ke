import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useSearch(key: string) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
const { replace } = useRouter();
  function updateParams(newValue: string) {
    const params = new URLSearchParams(searchParams);
    if (newValue) {
      params.set(key, newValue);
    } else {
      params.delete(key);
    }
    replace(`${pathname}?${params.toString()}`);
  }
  const value = searchParams.get(key)
  return [value, updateParams] as const
}
