"use client";

import { Suspense, type ReactNode } from "react";
import dynamic from "next/dynamic";

interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

const NoSSR = ({ children, fallback }: ClientOnlyProps) => {
  return <Suspense fallback={fallback ?? null}>{children}</Suspense>;
};

// Create a wrapper that disables SSR
export const ClientOnly = dynamic(() => Promise.resolve(NoSSR), {
  ssr: false,
}) as typeof NoSSR;

