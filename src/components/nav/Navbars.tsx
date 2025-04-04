"use client";
import { motion, AnimatePresence } from "motion/react";
import { CurrentUser } from "./CurrentUser";
import Link from "next/link";
import { UsersResponse } from "@/lib/pb/pb-types";


type Route = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

type DesktopNavProps = {
  routes: Route[];
  isScrolled: boolean;
  isHomePage?: boolean;
  user?: UsersResponse;
};



export function DesktopNav({ routes, isScrolled,isHomePage,user }: DesktopNavProps) {
  return (
    <div className="w-full mx-auto flex items-center justify-between">
      {isHomePage ? (
        <a
          href="#"
          className="text-primary font-heading text-xl md:text-2xl font-medium">
          Brushbox
        </a>
      ) : (
        <Link
          href="/"
          className="text-primary p-2 font-heading rounded-4xl text-xl md:text-3xl font-medium">
          Brushbox
        </Link>
      )}

      <div className="hidden md:flex space-x-8 items-center ">
        {routes.map((route, index) => (
          <motion.a
            key={route.name}
            href={route.href}
            className={`text-sm font-medium text-pri hover:text-accent transition-colors underline-animation ${
              isScrolled ? "text-base-content" : "text-primary"
            }`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
            whileHover={{ scale: 1.05 }}>
            {route.name.charAt(0).toUpperCase() + route.name.slice(1)}
          </motion.a>
        ))}
        {/* <ModeToggle /> */}
        <CurrentUser user={user}/>
      </div>
    </div>
  );
}

type MobileNavProps = {
  routes: Route[];
  isOpen: boolean;
  onItemClick: () => void;
  isHomePage?: boolean;
  user?: UsersResponse;
};

export function MobileNav({ routes, onItemClick,isHomePage,user }: MobileNavProps) {
  return (
    <AnimatePresence>
      <div className="flex flex-col justify-center gap-4">
        {isHomePage ? (
          <a
            href="#"
            onClick={onItemClick}
            className="text-primary font-heading text-xl md:text-2xl font-medium">
            Brushbox
          </a>
        ) : (
          <Link
            href="/"
            className="text-primary p-2 font-heading rounded-4xl text-xl md:text-3xl font-medium">
            Brushbox
          </Link>
        )}
        <motion.div
          className="md:hidden  backdrop-blur-md shadow-soft overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}>
          <div className="px-6 py-4 flex flex-col space-y-4">
            {routes.map((route, index) => (
              <motion.a
                key={route.name}
                className="text-sm font-medium text-base-content hover:text-accent transition-colors py-2 flex items-center gap-2"
                onClick={onItemClick}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}>
                <span className="text-primary/70">{route.icon}</span>
                <span>{route.name.charAt(0).toUpperCase() + route.name.slice(1)}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
        <div className="flex justify-evenly">
          {/* <ModeToggle /> */}
          <CurrentUser user={user} />
        </div>
      </div>
    </AnimatePresence>
  );
}
