"use client";

import { ResponsiveGenericToolbar } from "@/components/nav/ResponsiveGenericToolbar";
import { useLocalBookings } from "@/hooks/common/use-local-bookings";
import { useCustomMutation } from "@/hooks/use-cutom-mutation";
import { makeHotToast } from "@/components/shared/toasters";
import { updateLocalBooking } from "@/services/bookings/bookings.idb";
import type { LocalBookingRecord, LocalStaffWorkflowStatus } from "@/types/local-booking";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Calendar,
  CalendarX2,
  ClipboardPen,
  GitBranch,
  Loader,
  Phone,
  Sparkles,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const staffStatuses: LocalStaffWorkflowStatus[] = ["new", "in_progress", "done"];

function workflowLabel(s: LocalStaffWorkflowStatus): string {
  if (s === "in_progress") return "In progress";
  if (s === "new") return "New";
  return "Done";
}

function workflowBadgeClass(s: LocalStaffWorkflowStatus): string {
  if (s === "done") return "border-success/40 bg-success/10 text-success";
  if (s === "in_progress") return "border-accent/50 bg-accent/15 text-accent-content";
  return "border-primary/40 bg-primary/10 text-primary";
}

function StaffBookingCard({
  row,
  onSaved,
  index,
}: {
  row: LocalBookingRecord;
  onSaved: () => void;
  index: number;
}) {
  const [notes, setNotes] = useState(row.staff_notes);
  const [staffStatus, setStaffStatus] = useState<LocalStaffWorkflowStatus>(row.staff_status);

  useEffect(() => {
    setNotes(row.staff_notes);
    setStaffStatus(row.staff_status);
  }, [row.staff_notes, row.staff_status]);

  const { isPending, mutate } = useCustomMutation({
    mutationFn: async ({
      variables,
    }: {
      variables: { id: string; staff_notes: string; staff_status: LocalStaffWorkflowStatus };
    }) => {
      return updateLocalBooking(variables.id, {
        staff_notes: variables.staff_notes,
        staff_status: variables.staff_status,
      });
    },
    onSuccess: () => {
      makeHotToast({ title: "Saved", description: "Staff fields updated.", variant: "success" });
      onSaved();
    },
    onError: (e) => {
      makeHotToast({
        title: "Save failed",
        description: e.message,
        variant: "error",
      });
    },
  });

  const formattedDate = new Date(row.preferred_date).toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card
        className={cn(
          "overflow-hidden border-primary/20 bg-base-200/35 shadow-[0_0_0_1px_rgba(212,175,55,0.08),0_24px_48px_-24px_rgba(0,0,0,0.6)]",
          "backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_0_0_1px_rgba(212,175,55,0.15),0_28px_56px_-20px_rgba(212,175,55,0.12)]",
        )}
      >
        <CardHeader className="gap-4 border-b border-primary/10 pb-5 pt-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/15 ring-1 ring-primary/25">
                <User className="h-5 w-5 text-primary" strokeWidth={1.75} />
              </div>
              <div>
                <h2 className="font-serif text-2xl font-semibold tracking-tight text-primary md:text-3xl">
                  {row.preferred_name}
                </h2>
                <p className="mt-1 font-sans text-xs uppercase tracking-[0.2em] text-base-content/45">
                  Booking
                </p>
              </div>
            </div>
            <Badge
              variant="outline"
              className={cn(
                "shrink-0 border px-3 py-1 font-sans text-xs font-medium capitalize",
                workflowBadgeClass(row.staff_status),
              )}
            >
              {workflowLabel(row.staff_status)}
            </Badge>
          </div>

          <div className="grid gap-3 font-sans sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-lg border border-base-300/60 bg-base-100/40 px-3 py-2.5">
              <Phone className="h-4 w-4 shrink-0 text-primary/80" strokeWidth={1.75} />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-base-content/45">Phone</p>
                <p className="text-sm font-medium text-base-content">{row.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-base-300/60 bg-base-100/40 px-3 py-2.5">
              <Calendar className="h-4 w-4 shrink-0 text-primary/80" strokeWidth={1.75} />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-base-content/45">
                  Appointment
                </p>
                <p className="text-sm font-medium text-base-content">{formattedDate}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="font-sans text-[10px] uppercase tracking-wider text-base-content/45">
              Services
            </span>
            {row.services.map((s) => (
              <Badge
                key={s}
                variant="outline"
                className="border-primary/30 bg-primary/5 font-sans text-xs font-normal capitalize text-primary"
              >
                <Sparkles className="mr-1 h-3 w-3 opacity-70" />
                {s}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="font-sans text-[10px] uppercase tracking-wider text-base-content/45">
              Customer status
            </span>
            <Badge
              variant="outline"
              className="border-base-content/20 font-sans text-xs capitalize text-base-content/90"
            >
              {row.status ? row.status : "Active"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pt-6">
          <div className="h-px w-full gold-gradient opacity-40" aria-hidden />
          <div className="space-y-2">
            <label
              htmlFor={`staff-notes-${row.id}`}
              className="flex items-center gap-2 font-sans text-xs font-medium text-base-content/80"
            >
              <ClipboardPen className="h-4 w-4 text-primary/90" strokeWidth={1.75} />
              Staff notes
            </label>
            <Textarea
              id={`staff-notes-${row.id}`}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Internal notes for this appointment…"
              className="resize-none border-primary/20 bg-base-100/50 font-sans text-sm leading-relaxed text-base-content placeholder:text-base-content/35 focus-visible:border-primary/45 focus-visible:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor={`workflow-${row.id}`}
              className="flex items-center gap-2 font-sans text-xs font-medium text-base-content/80"
            >
              <GitBranch className="h-4 w-4 text-primary/90" strokeWidth={1.75} />
              Workflow
            </label>
            <Select
              value={staffStatus}
              onValueChange={(v) => setStaffStatus(v as LocalStaffWorkflowStatus)}
            >
              <SelectTrigger
                id={`workflow-${row.id}`}
                className="w-full max-w-xs border-primary/25 bg-base-100/50 font-sans focus:ring-primary/25"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {staffStatuses.map((s) => (
                  <SelectItem key={s} value={s} className="font-sans capitalize">
                    {workflowLabel(s)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 border-t border-primary/10 bg-base-100/20 px-6 py-5 sm:flex-row sm:justify-end">
          <Button
            disabled={isPending}
            onClick={() =>
              mutate({
                variables: {
                  id: row.id,
                  staff_notes: notes,
                  staff_status: staffStatus,
                },
              })
            }
            className="w-full rounded-full bg-primary px-8 font-sans font-semibold text-primary-content shadow-[0_4px_24px_-4px_rgba(212,175,55,0.45)] transition hover:bg-primary/90 hover:shadow-[0_6px_28px_-4px_rgba(212,175,55,0.55)] sm:w-auto"
          >
            {isPending ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Saving
              </>
            ) : (
              "Save changes"
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

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
  const { bookings, loading, refresh } = useLocalBookings();

  const newCount = bookings.filter((b) => b.staff_status === "new").length;
  const inProgressCount = bookings.filter((b) => b.staff_status === "in_progress").length;

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
              <div className="mt-10 flex flex-col gap-8 md:mt-12 md:gap-10">
                {bookings.map((b, i) => (
                  <StaffBookingCard key={b.id} row={b} onSaved={refresh} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </ResponsiveGenericToolbar>
  );
}
