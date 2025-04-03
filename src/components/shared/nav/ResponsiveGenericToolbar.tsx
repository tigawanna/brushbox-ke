"use client";
import { useState, useEffect } from "react";
import { DesktopNav, MobileNav } from "./Navbars";
import { motion } from "motion/react";
import { homePageSections } from "./routes";
import { cn } from "@/lib/utils";

interface ResponsiveGenericToolbarProps {
  children: React.ReactNode;
}

export function ResponsiveGenericToolbar({ children }: ResponsiveGenericToolbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  const closeMobileMenu = () => {
    const checkbox = document.getElementById("my-drawer-3") as HTMLInputElement;
    checkbox.checked = false;
  };
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="drawer" data-test="sidebar-drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex h-full min-h-screen flex-col bg-base-100/70">
        {/* mobile Navbar */}

        <motion.nav
          className={cn("fixed top-0 left-0 right-0 z-50 p-3 md:px-12 flex-none md:hidden")}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}>
          <label
            htmlFor="my-drawer-3"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
            data-test="homepage-side-drawer-toggle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-6 w-6 stroke-current">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </label>
        </motion.nav>
        {/* <div className="flex-none md:hidden ">
        </div> */}
        {/* desktop Navbar */}
        <motion.nav
          className={cn(
            "fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 hidden md:flex",
            isScrolled
              ? "bg-base-100 backdrop-blur-md shadow-soft transition-colors"
              : "bg-transparent"
          )}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}>
          <div className="w-full mx-auto flex items-center justify-between">
            <a
              href="#"
              className="text-primary p-2 font-heading rounded-4xl text-xl md:text-3xl font-medium">
              Brushbox
            </a>
            <DesktopNav routes={homePageSections} isScrolled={isScrolled} />
          </div>
        </motion.nav>

        {/* Page content here */}
        {children}

      </div>
      <div className="drawer-side z-50">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul
          data-test="homepage-sidebar"
          className="menu min-h-full w-80 justify-between bg-base-200/70 p-4 pb-16">
          {/* Sidebar content here */}
          <MobileNav routes={homePageSections} isOpen onItemClick={() => closeMobileMenu()} />
        </ul>
      </div>
    </div>
  );
}
