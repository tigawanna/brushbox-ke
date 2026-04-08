"use client";

import { useEffect, useMemo, useState } from "react";
import { isSameDay } from "date-fns";
import type { LocalBookingRecord } from "@/types/local-booking";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { customerStatusBadgeClass, customerStatusLabel } from "@/lib/customer-booking-status";
import { BookingsDialog, DeleteBookingsDialog } from "./BookingsDialog";
import { Pencil, PenOff } from "lucide-react";

interface CustomerBookingsCalendarPanelProps {
  bookings: LocalBookingRecord[];
  onSaved: () => void;
}

export function CustomerBookingsCalendarPanel({
  bookings,
  onSaved,
}: CustomerBookingsCalendarPanelProps) {
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
                  <div
                    className={cn(
                      "flex w-full flex-wrap items-center gap-2 rounded-xl border border-base-300/50 bg-base-100/30 px-3 py-2.5 font-sans",
                    )}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium capitalize text-primary">{b.preferred_name}</span>
                        <span className="text-xs tabular-nums text-base-content/70">{t}</span>
                      </div>
                      <p className="mt-0.5 truncate text-xs text-base-content/55">
                        {b.services.join(", ")}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        "shrink-0 border px-2 py-0 text-[10px] capitalize",
                        customerStatusBadgeClass(b.status),
                      )}
                    >
                      {customerStatusLabel(b.status)}
                    </Badge>
                    <div className="ml-auto flex shrink-0 gap-1">
                      <BookingsDialog
                        booking={b}
                        onSaved={onSaved}
                        trigger={
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-primary hover:bg-primary/10"
                            aria-label="Update appointment"
                          >
                            <Pencil className="h-4 w-4" aria-hidden />
                          </Button>
                        }
                      />
                      <DeleteBookingsDialog
                        booking={b}
                        onDone={onSaved}
                        trigger={
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-warning hover:bg-warning/10"
                            aria-label="Reschedule or cancel appointment"
                          >
                            <PenOff className="h-4 w-4" aria-hidden />
                          </Button>
                        }
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
