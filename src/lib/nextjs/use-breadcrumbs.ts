import { usePathname } from "next/navigation";

export function useNextjsBreadCrumbs(){
  const pathname = usePathname();

  const route_history = pathname
    .split("/")
    .filter((x) => x && x.length > 0);

  const breadcrumb_routes = route_history.reduce(
    (acc: { name: string; path: string }[], route) => {
      const prev_path = acc[acc.length - 1]?.path ?? "";
      acc.push({ name: route, path: `${prev_path}/${route}` });
      return acc;
    },
    [],
  );
  return { breadcrumb_routes };
}
