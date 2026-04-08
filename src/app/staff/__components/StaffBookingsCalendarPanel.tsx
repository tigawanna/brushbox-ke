"use client";

import { useEffect, useMemo, useState } from "react";
import { isSameDay } from "date-fns";
import type { LocalBookingRecord, LocalStaffWorkflowStatus } from "@/types/local-booking";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

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

interface StaffBookingsCalendarPanelProps {
  bookings: LocalBookingRecord[];
}

export function StaffBookingsCalendarPanel({ bookings }: StaffBookingsCalendarPanelProps) {
  const router = useRouter();
  const firstBookingDay = useMemo(() => {
    if (bookings.length === 0) return undefined;
    const sorted = [...bookings].sort(
      (a, b) => new Date(a.preferred_date).getTime() - new Date(b.preferred_date).getTime(),
    );
    return new Date(sorted[0].preferred_date);
  }, [bookings]);

  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (bookings.length === 0) {
      setSelectedDay(undefined);
      return;
    }
    setSelectedDay((prev) => {
      if (prev) return prev;
      return firstBookingDay;
    });
  }, [bookings, firstBookingDay]);

  const dayBookings = useMemo(() => {
    if (!selectedDay) return [];
    return [...bookings]
      .filter((b) => isSameDay(new Date(b.preferred_date), selectedDay))
      .sort(
        (a, b) => new Date(a.preferred_date).getTime() - new Date(b.preferred_date).getTime(),
      );
  }, [bookings, selectedDay]);

  const modifiers = useMemo(
    () => ({
      hasBooking: (date: Date) =>
        bookings.some((b) => isSameDay(new Date(b.preferred_date), date)),
    }),
    [bookings],
  );

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
      <div className="mx-auto w-full max-w-[min(100%,22rem)] rounded-2xl border border-primary/15 bg-base-200/50 p-3 shadow-inner backdrop-blur-sm lg:mx-0">
        <Calendar
          mode="single"
          selected={selectedDay}
          onSelect={setSelectedDay}
          defaultMonth={firstBookingDay ?? new Date()}
          modifiers={modifiers}
          modifiersClassNames={{
            hasBooking:
              "font-semibold text-primary [&_button]:font-semibold relative after:pointer-events-none after:absolute after:bottom-1 after:left-1/2 after:z-[1] after:h-1.5 after:w-1.5 after:-translate-x-1/2 after:rounded-full after:bg-primary after:content-['']",
          }}
          className="w-full min-w-0 font-sans text-base-content"
        />
      </div>

      <div className="min-h-[120px] flex-1 rounded-2xl border border-primary/15 bg-base-200/35 p-4 backdrop-blur-sm">
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-base-content/45">
          {selectedDay
            ? new Date(selectedDay).toLocaleDateString(undefined, {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            : "Pick a date"}
        </p>
        {selectedDay && dayBookings.length === 0 ? (
          <p className="mt-3 font-sans text-sm text-base-content/55">No appointments on this day.</p>
        ) : null}
        {dayBookings.length > 0 ? (
          <ul className="mt-4 flex flex-col gap-2">
            {dayBookings.map((b) => {
              const t = new Date(b.preferred_date).toLocaleTimeString(undefined, {
                hour: "numeric",
                minute: "2-digit",
              });
              return (
                <li key={b.id}>
                  <button
                    type="button"
                    onClick={() => router.push(`/staff/bookings/${b.id}`)}
                    className={cn(
                      "flex w-full flex-wrap items-center justify-between gap-2 rounded-xl border border-base-300/50 bg-base-100/30 px-3 py-2.5 text-left font-sans transition-colors hover:border-primary/25 hover:bg-base-100/45",
                    )}
                  >
                    <span className="font-medium capitalize text-primary">{b.preferred_name}</span>
                    <span className="text-xs tabular-nums text-base-content/70">{t}</span>
                    <Badge
                      variant="outline"
                      className={cn(
                        "ml-auto shrink-0 border px-2 py-0 text-[10px] capitalize",
                        workflowBadgeClass(b.staff_status),
                      )}
                    >
                      {workflowLabel(b.staff_status)}
                    </Badge>
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
