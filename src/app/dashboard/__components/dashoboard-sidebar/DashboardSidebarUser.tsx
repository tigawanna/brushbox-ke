"use client";
"@ts-nocheck";
import { ChevronsUpDown, Loader } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { useTransition } from "react";

interface DashboardSidebarUser{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session:{user:Record<string,any>}
}
export function DashboardSidebarUser({session}: DashboardSidebarUser) {
  const viewer = session.user;
  const avatarUrl = viewer?.avatar_url ?? "/wojak-smirk-tuxedo.jpg";
  const { state, setOpenMobile, isMobile } = useSidebar();
  const [pending, startTransition] = useTransition();
  const signOutuser = async () => {
    startTransition(() => {
      // signOut();
    });
  };
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="">
              <Avatar className="h-8 w-8 rounded-full bg-base-content hover:bg-base-300">
                <AvatarImage src={avatarUrl} alt={viewer.login} />
                <AvatarFallback className="rounded-lg">{viewer.name?.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{viewer.login}</span>
                <span className="truncate text-xs">{viewer.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className=" min-w-56 rounded-lg p-2 text-base-content px-4"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={avatarUrl} alt={viewer.login} />
                  <AvatarFallback className="rounded-lg">{viewer.login?.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="flex items-center gap-1 truncate font-semibold">
                    {viewer.name}{" "}
                  </span>
                  <span className="truncate text-xs">{viewer.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {/* <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/profile" className="w-full">
                <DropdownMenuItem>
                  <BadgeCheck />
                  Account
                </DropdownMenuItem>
              </Link>

              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup> */}

            {/* <MutationButton
              className="btn-error max-w-[98%]"
              onClick={() => {
                logoutMutation.mutate();
                tsrNavigate({ to: "/auth", search: { returnTo: "/" } });
              }}
              label="Logout"
              mutation={logoutMutation}
            /> */}
            <div>
              <button
                disabled={pending}
                className="btn btn-error btn-wide max-w-[98%]"
                onClick={() => {
                  signOutuser();
                }}>
                Logout
                {pending && <Loader className="animate-spin h-5 w-5" />}
              </button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
