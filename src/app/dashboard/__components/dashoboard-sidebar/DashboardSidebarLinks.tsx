import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";

import { routes } from "./routes";
import Link from "next/link";

interface DashboardSidebarLinksProps {}

export function DashboardSidebarLinks({}: DashboardSidebarLinksProps) {
  const { state, setOpen, setOpenMobile, isMobile } = useSidebar();
   const pathname = usePathname();
     const {user} = useParams<{user:string}>();
  // const { pathname } = useLocation();
  // const {viewer} = useViewer()
  // const {user} = useParams({from:"/$user"})
  // if(!viewer){
  //   return null
  // }

  return (
    <SidebarGroup className="h-full bg-base-100 ">
      <SidebarGroupLabel>
        {user}
      </SidebarGroupLabel>
      <SidebarMenu className="gap-5">
        {routes.map((item) => {
          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild>
                <TooltipProvider>
                  <Tooltip defaultOpen={false} delayDuration={10} disableHoverableContent>
                    <TooltipTrigger
                      asChild
                      className={
                        pathname === `${user}${item.href}`
                          ? `flex w-full gap-3 rounded-lg bg-primary p-1 text-secondary`
                          : `flex w-full gap-3 rounded-sm p-1 hover:bg-base-300`
                      }>
                      <Link
                        className="flex items-center gap-[10%]"
                        href={`${user}${item.href}`}
                        onClick={() => {
                          if (isMobile) {
                            setOpen(false);
                            setOpenMobile(false);
                          }
                        }}>
                        <button className="size-6">{item.icon}</button>
                        {(state === "expanded" || isMobile) && (
                          <span className="text-center text-lg"> {item.name}</span>
                        )}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">{item.name}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
