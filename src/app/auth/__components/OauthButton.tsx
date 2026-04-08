"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface OauthButtonProps {
  returnTo: string;
}

export function OauthButton({ returnTo }: OauthButtonProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <p className="text-center font-sans text-sm text-base-content/70">
        Bookings are stored in this browser only. No account is required for the demo.
      </p>
      <Button
        asChild
        className="btn btn-wide h-12 w-full border-primary/40 bg-primary/15 font-sans font-semibold text-primary shadow-none hover:bg-primary/25"
      >
        <Link href={returnTo}>Continue</Link>
      </Button>
    </div>
  );
}
