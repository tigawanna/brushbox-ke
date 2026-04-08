"use client";

import { ResponsiveGenericToolbar } from "@/components/nav/ResponsiveGenericToolbar";
import { BookingCard } from "./__components/BookingCard";
import { BookingsDialog, DeleteBookingsDialog } from "./__components/BookingsDialog";
import { useLocalBookings } from "@/hooks/common/use-local-bookings";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { motion } from "motion/react";

const demoLocalNote = "Demo version: data stays in this browser only.";

export function BookingPageClient() {
  const { bookings, loading, refresh } = useLocalBookings();

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
              <p className="font-sans text-sm text-base-content/50">Loading bookings…</p>
            </div>
          </div>
        </div>
      </ResponsiveGenericToolbar>
    );
  }

  if (bookings.length === 0) {
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
            <div className="mb-10 md:mb-12">
              <div className="mb-6 h-px w-20 gold-gradient md:w-28" />
              <p className="mb-2 font-sans text-xs font-medium uppercase tracking-[0.25em] text-primary/90">
                Your visits
              </p>
              <h1 className="font-serif text-4xl font-semibold tracking-tight text-primary md:text-5xl">
                Booking dashboard
              </h1>
              <p className="mt-3 max-w-lg font-sans text-base leading-relaxed text-base-content/65">
                Manage upcoming appointments, review details, and add new bookings when you need them.
              </p>
              <p className="mt-3 font-sans text-xs text-warning/85 max-w-lg">{demoLocalNote}</p>
            </div>

            <Card className="border-primary/20 bg-base-200/40 shadow-[0_0_48px_-24px_rgba(0,0,0,0.8)] backdrop-blur-md">
              <CardContent className="flex flex-col items-center gap-5 px-6 py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/25 bg-primary/10">
                  <Calendar className="h-8 w-8 text-primary/90" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="font-serif text-2xl text-primary">No bookings yet</h2>
                  <p className="mt-2 max-w-sm font-sans text-sm text-base-content/55">
                    Schedule your first appointment to see it listed here with full details.
                  </p>
                </div>
                <BookingsDialog onSaved={refresh} />
              </CardContent>
            </Card>
          </div>
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
          <div className="mb-10 md:mb-12">
            <div className="mb-6 h-px w-20 gold-gradient md:w-28" />
            <p className="mb-2 font-sans text-xs font-medium uppercase tracking-[0.25em] text-primary/90">
              Your visits
            </p>
            <h1 className="font-serif text-4xl font-semibold tracking-tight text-primary md:text-5xl">
              Booking dashboard
            </h1>
            <p className="mt-3 max-w-lg font-sans text-base leading-relaxed text-base-content/65">
              Manage upcoming appointments, review details, and add new bookings when you need them.
            </p>
            <p className="mt-3 font-sans text-xs text-warning/85 max-w-lg">{demoLocalNote}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button
                asChild
                className="rounded-full border border-primary/40 bg-primary/15 font-sans text-primary hover:bg-primary/25"
              >
                <Link href="/staff">Preview staff view</Link>
              </Button>
              <BookingsDialog onSaved={refresh} />
            </div>
          </div>

          <div className="flex flex-col gap-8 md:gap-10">
            {bookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-wrap justify-end gap-3">
                  <DeleteBookingsDialog booking={booking} onDone={refresh} />
                  <BookingsDialog booking={booking} onSaved={refresh} />
                </div>
                <BookingCard booking={booking} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </ResponsiveGenericToolbar>
  );
}
