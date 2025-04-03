"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { DashboardSidebarHeader } from "./DashboardSidebarHeader";
import { DashboardSidebarLinks } from "./DashboardSidebarLinks";
import { DashboardTheme } from "./DashboardTheme";
import { Suspense } from "react";
// import { DashboardSidebarUser } from "./DashboardSidebarUser";

import { RouterPendingComponent } from "@/components/global/RouterPendingComponent";
import { NextjsBreadCrumbs } from "@/lib/nextjs/NextjsBreadCrumbs";

interface DashboardLayoutProps {
  children: React.ReactNode;
  // session: {user:string}
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar className="" collapsible="icon">
        <SidebarHeader>
          <DashboardSidebarHeader />
        </SidebarHeader>
        <SidebarContent>
          <DashboardSidebarLinks />
        </SidebarContent>
        <SidebarFooter className="gap-5">
          <DashboardTheme />
          {/* <DashboardSidebarUser session={session} /> */}
          <div className="h-10" />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="fixed z-40 flex h-10 items-center gap-2 bg-base-100 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            {/* <TSRBreadCrumbs /> */}
            <NextjsBreadCrumbs />
          </div>
        </header>
        {/* main content */}
        <div data-test="dashboard-layout" className="h-full mt-12 p-2 min-h-screen ">
          <Suspense fallback={<RouterPendingComponent />}>{children}</Suspense>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
