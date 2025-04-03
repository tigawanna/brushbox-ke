"use client"
import Link  from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useNextjsBreadCrumbs } from "./use-breadcrumbs";

// interface NextjsBreadCrumbsProps {}

export function NextjsBreadCrumbs() {
  const { breadcrumb_routes } = useNextjsBreadCrumbs();
  if (breadcrumb_routes.length < 2) return null;
  return (
    <div className="gap-0.1 flex w-full flex-wrap p-1 px-3 md:justify-end">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumb_routes.map((crumb) => {
            if (
              breadcrumb_routes.length - 1 ===
              breadcrumb_routes?.indexOf(crumb)
            ) {
              return (
                <BreadcrumbItem key={crumb.path}>
                  <BreadcrumbPage className="hover:text-accent-text line-clamp-1 cursor-pointer text-xs hover:max-w-fit hover:duration-300 hover:animate-in hover:fade-in">
                    {crumb.name}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              );
            }
            return (
              <div className="flex items-center gap-2" key={crumb.path}>
                <BreadcrumbItem key={crumb.path}>
                  <Link
                    href={crumb.path}
                    className="hover:text-accent-text line-clamp-1 cursor-pointer text-xs hover:max-w-fit hover:duration-300 hover:animate-in hover:fade-in"
                  >
                    {crumb.name}
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
