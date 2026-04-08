"use client";

import { ResponsiveGenericToolbar } from "@/components/nav/ResponsiveGenericToolbar";
import { useLocalBookings } from "@/hooks/common/use-local-bookings";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarTabIcon, CalendarX2, List } from "lucide-react";
import Link from "next/link";
import type { StaffBrowseTab } from "@/types/staff-dashboard";
import { StaffBookingsCalendarPanel } from "./__components/StaffBookingsCalendarPanel";
import { StaffBookingsList } from "./__components/StaffBookingsList";
import { useState } from "react";

function StaffStats({
  total,
  newCount,
  inProgress,
}: {
  total: number;
  newCount: number;
  inProgress: number;
}) {
  const items = [
    { label: "Total", value: total, accent: "text-primary" },
    { label: "New", value: newCount, accent: "text-primary" },
    { label: "In progress", value: inProgress, accent: "text-accent" },
  ];
  return (
    <div className="grid grid-cols-3 gap-3 font-sans sm:gap-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-primary/15 bg-base-200/50 px-4 py-4 text-center shadow-inner backdrop-blur-sm sm:px-5 sm:py-5"
        >
          <p className={`text-2xl font-semibold tabular-nums sm:text-3xl ${item.accent}`}>
            {item.value}
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-base-content/50">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}

export function StaffPageClient() {
  const { bookings, loading } = useLocalBookings();

  const newCount = bookings.filter((b) => b.staff_status === "new").length;
  const inProgressCount = bookings.filter((b) => b.staff_status === "in_progress").length;

  const [browseTab, setBrowseTab] = useState<StaffBrowseTab>("list");

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
              Operations
            </p>
            <h1 className="font-serif text-4xl font-semibold tracking-tight text-primary md:text-5xl">
              Staff dashboard
            </h1>
            <p className="mt-3 max-w-lg font-sans text-base leading-relaxed text-base-content/65">
              Review incoming requests, add internal notes, and move each visit through your
              workflow.
            </p>
            <p className="mt-3 font-sans text-xs text-warning/85 max-w-lg">
              Demo version: data stays in this browser only.
            </p>
          </div>

          {bookings.length === 0 ? (
            <Card className="border-primary/20 bg-base-200/40 shadow-[0_0_48px_-24px_rgba(0,0,0,0.8)] backdrop-blur-md">
              <CardContent className="flex flex-col items-center gap-5 px-6 py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/25 bg-primary/10">
                  <CalendarX2 className="h-8 w-8 text-primary/90" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="font-serif text-2xl text-primary">No bookings yet</h2>
                  <p className="mt-2 max-w-sm font-sans text-sm text-base-content/55">
                    When clients book from the site, they will appear here for your team.
                  </p>
                </div>
                <Button
                  asChild
                  className="rounded-full border border-primary/40 bg-primary/15 font-sans text-primary hover:bg-primary/25"
                >
                  <Link href="/booking">Go to bookings</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <StaffStats total={bookings.length} newCount={newCount} inProgress={inProgressCount} />

              <div className="mt-10 md:mt-12">
                <Tabs
                  value={browseTab}
                  onValueChange={(v) => setBrowseTab(v as StaffBrowseTab)}
                  className="gap-6"
                >
                  <TabsList className="h-auto w-full flex-wrap justify-start gap-1 rounded-xl border border-primary/15 bg-base-200/60 p-1.5">
                    <TabsTrigger
                      value="list"
                      className="gap-2 rounded-lg font-sans data-[state=active]:bg-primary/15 data-[state=active]:text-primary data-[state=active]:shadow-none"
                    >
                      <List className="h-4 w-4" aria-hidden />
                      List
                    </TabsTrigger>
                    <TabsTrigger
                      value="calendar"
                      className="gap-2 rounded-lg font-sans data-[state=active]:bg-primary/15 data-[state=active]:text-primary data-[state=active]:shadow-none"
                    >
                      <CalendarTabIcon className="h-4 w-4" aria-hidden />
                      Calendar
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="list" className="mt-0 outline-none">
                    <StaffBookingsList bookings={bookings} />
                  </TabsContent>

                  <TabsContent value="calendar" className="mt-0 outline-none">
                    <StaffBookingsCalendarPanel bookings={bookings} />
                  </TabsContent>
                </Tabs>
              </div>

              <p className="mt-8 font-sans text-sm text-base-content/55">
                Select a booking in the list or calendar to open its detail page.
              </p>
            </>
          )}
        </div>
      </div>
    </ResponsiveGenericToolbar>
  );
}
