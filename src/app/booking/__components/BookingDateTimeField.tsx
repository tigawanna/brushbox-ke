"use client";

import { useMemo, useState } from "react";
import { format, startOfDay } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  getSlotStartDatesForDay,
  parseDatetimeLocalInput,
  toDatetimeLocalInput,
} from "@/data/salon-hours";

interface BookingDateTimeFieldProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function BookingDateTimeField({ value, onChange, disabled }: BookingDateTimeFieldProps) {
  const [open, setOpen] = useState(false);

  const parsed = useMemo(() => {
    const d = parseDatetimeLocalInput(value);
    return Number.isNaN(d.getTime()) ? null : d;
  }, [value]);

  const selectedDay = useMemo(() => {
    if (parsed) return startOfDay(parsed);
    return startOfDay(new Date());
  }, [parsed]);

  const slots = useMemo(() => getSlotStartDatesForDay(selectedDay), [selectedDay]);

  const displayLabel = parsed
    ? format(parsed, "EEE, MMM d, yyyy 'at' h:mm a")
    : "Select date and time";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(
            "h-11 w-full justify-start border-primary/30 bg-base-200/80 font-sans text-left text-base-content hover:bg-base-200 hover:border-primary/50",
            !parsed && "text-base-content/50",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 shrink-0 text-primary" aria-hidden />
          <span className="truncate">{displayLabel}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[min(100vw-1rem,22rem)] border border-primary/20 bg-base-200/95 p-0 text-base-content shadow-2xl shadow-black/40 backdrop-blur-md sm:w-auto sm:max-w-[min(100vw-2rem,36rem)]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="flex flex-col gap-0 sm:flex-row sm:items-stretch">
          <div className="border-b border-primary/15 p-2 sm:border-b-0 sm:border-r sm:p-3">
            <Calendar
              mode="single"
              selected={parsed ? selectedDay : undefined}
              onSelect={(d) => {
                if (!d) return;
                const day = startOfDay(d);
                const nextSlots = getSlotStartDatesForDay(day);
                if (nextSlots.length === 0) return;
                onChange(toDatetimeLocalInput(nextSlots[0]));
              }}
              defaultMonth={selectedDay}
              disabled={[{ before: startOfDay(new Date()) }, (date) => getSlotStartDatesForDay(startOfDay(date)).length === 0]}
              className="min-w-0 bg-transparent [--cell-size:2.25rem]"
            />
          </div>
          <div className="flex w-full min-w-0 flex-col p-3 sm:w-[11.5rem] sm:shrink-0">
            <p className="mb-2 flex items-center gap-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-base-content/45">
              <Clock className="h-3.5 w-3.5 text-primary/70" aria-hidden />
              Time
            </p>
            <ScrollArea className="h-[min(220px,40vh)] pr-2">
              <div className="flex flex-col gap-1 pb-1">
                {slots.length === 0 ? (
                  <p className="font-sans text-xs text-base-content/55">No times left this day.</p>
                ) : (
                  slots.map((slot) => {
                    const iso = toDatetimeLocalInput(slot);
                    const isActive = parsed && parsed.getTime() === slot.getTime();
                    return (
                      <button
                        key={slot.getTime()}
                        type="button"
                        onClick={() => {
                          onChange(iso);
                          setOpen(false);
                        }}
                        className={cn(
                          "rounded-lg px-3 py-2 text-left font-sans text-sm transition-colors",
                          isActive
                            ? "bg-primary font-medium text-primary-foreground shadow-[0_2px_12px_-4px_rgba(212,175,55,0.5)]"
                            : "text-base-content/90 hover:bg-primary/10 hover:text-primary",
                        )}
                      >
                        {format(slot, "h:mm a")}
                      </button>
                    );
                  })
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
