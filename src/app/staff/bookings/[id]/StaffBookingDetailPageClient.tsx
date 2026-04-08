"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ResponsiveGenericToolbar } from "@/components/nav/ResponsiveGenericToolbar";
import { useLocalBookings } from "@/hooks/common/use-local-bookings";
import { Button } from "@/components/ui/button";
import { StaffBookingDetailCard } from "../../__components/StaffBookingDetailCard";
import { motion } from "motion/react";

export function StaffBookingDetailPageClient() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const { bookings, loading, refresh } = useLocalBookings();

  const row = bookings.find((b) => b.id === id) ?? null;

  if (loading) {
    return (
      <ResponsiveGenericToolbar links={[]}>
        <div className="relative min-h-screen w-full">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_45%_at_50%_-15%,rgba(212,175,55,0.14),transparent_55%)]"
            aria-hidden
          />
          <div className="relative flex min-h-screen items-center justify-center pt-20">
            <div className="flex flex-col items-center gap-4">
              <span className="loading loading-spinner loading-lg text-primary" />
              <p className="font-sans text-sm text-base-content/50">Loading booking…</p>
            </div>
          </div>
        </div>
      </ResponsiveGenericToolbar>
    );
  }

  if (!row) {
    return (
      <ResponsiveGenericToolbar links={[]}>
        <div className="relative mx-auto max-w-3xl px-4 pb-20 pt-24 md:px-6 lg:max-w-4xl">
          <Button
            asChild
            variant="ghost"
            className="mb-8 font-sans text-primary hover:bg-primary/10"
          >
            <Link href="/staff" className="gap-2">
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back to staff dashboard
            </Link>
          </Button>
          <p className="font-sans text-base text-base-content/70">
            This booking could not be found. It may have been removed or the link is invalid.
          </p>
        </div>
      </ResponsiveGenericToolbar>
    );
  }

  return (
    <ResponsiveGenericToolbar links={[]}>
      <div className="relative min-h-screen w-full overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,175,55,0.12),transparent_55%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-primary/[0.06] blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-16 bottom-1/4 h-56 w-56 rounded-full bg-accent/[0.05] blur-3xl"
          aria-hidden
        />

        <div className="relative mx-auto max-w-3xl px-4 pb-20 pt-20 md:px-6 md:pt-24 lg:max-w-4xl">
          <Button
            asChild
            variant="ghost"
            className="mb-8 font-sans text-primary hover:bg-primary/10"
          >
            <Link href="/staff" className="gap-2">
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back to staff dashboard
            </Link>
          </Button>

          <div className="mb-8 md:mb-10">
            <div className="mb-6 h-px w-20 gold-gradient md:w-28" />
            <p className="mb-2 font-sans text-xs font-medium uppercase tracking-[0.25em] text-primary/90">
              Booking detail
            </p>
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-primary md:text-4xl">
              {row.preferred_name}
            </h1>
            <p className="mt-2 font-sans text-sm text-base-content/55">
              Review notes, workflow, and contact for this visit.
            </p>
          </div>

          <motion.div
            key={row.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <StaffBookingDetailCard row={row} onSaved={refresh} />
          </motion.div>
        </div>
      </div>
    </ResponsiveGenericToolbar>
  );
}
