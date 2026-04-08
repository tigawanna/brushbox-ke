import { addDays, addMinutes, isBefore, isSameDay, startOfDay } from "date-fns";

export const SALON_SLOT_MINUTES = 15 as const;

type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

type DayHours = { openMinutes: number; closeMinutes: number } | "closed";

export const SALON_HOURS_BY_WEEKDAY: Record<Weekday, DayHours> = {
  0: { openMinutes: 11 * 60, closeMinutes: 16 * 60 },
  1: { openMinutes: 9 * 60, closeMinutes: 20 * 60 },
  2: { openMinutes: 9 * 60, closeMinutes: 20 * 60 },
  3: { openMinutes: 9 * 60, closeMinutes: 20 * 60 },
  4: { openMinutes: 9 * 60, closeMinutes: 20 * 60 },
  5: { openMinutes: 9 * 60, closeMinutes: 20 * 60 },
  6: { openMinutes: 9 * 60, closeMinutes: 18 * 60 },
};

export const SALON_HOURS_DISPLAY_LINES: readonly string[] = [
  "Monday - Friday: 9:00 AM - 8:00 PM",
  "Saturday: 9:00 AM - 6:00 PM",
  "Sunday: 11:00 AM - 4:00 PM",
];

export function formatSalonHoursSummary(): string {
  return SALON_HOURS_DISPLAY_LINES.join(" · ");
}

export function getOpenCloseMinutes(weekday: number): { open: number; close: number } | null {
  const block = SALON_HOURS_BY_WEEKDAY[weekday as Weekday];
  if (block === "closed") return null;
  return { open: block.openMinutes, close: block.closeMinutes };
}

export function isSalonClosedOnDate(date: Date): boolean {
  return getOpenCloseMinutes(date.getDay()) === null;
}

export function getSlotStartDatesForDay(day: Date): Date[] {
  const range = getOpenCloseMinutes(day.getDay());
  if (!range) return [];
  const dayStart = startOfDay(day);
  const lastStartMinute = range.close - SALON_SLOT_MINUTES;
  if (lastStartMinute < range.open) return [];
  const slots: Date[] = [];
  for (let m = range.open; m <= lastStartMinute; m += SALON_SLOT_MINUTES) {
    slots.push(addMinutes(dayStart, m));
  }
  const now = new Date();
  if (isSameDay(day, now)) {
    return slots.filter((s) => s > now);
  }
  return slots;
}

export function getNextAvailableSlot(from: Date = new Date()): Date {
  let day = startOfDay(from);
  for (let i = 0; i < 56; i++) {
    const slots = getSlotStartDatesForDay(day);
    if (slots.length > 0) {
      return slots[0];
    }
    day = addDays(day, 1);
  }
  return from;
}

export function isBookingDateTimeAllowed(d: Date): boolean {
  if (Number.isNaN(d.getTime())) return false;
  if (isBefore(d, startOfDay(new Date()))) return false;
  const range = getOpenCloseMinutes(d.getDay());
  if (!range) return false;
  const mins = d.getHours() * 60 + d.getMinutes();
  const lastStart = range.close - SALON_SLOT_MINUTES;
  if (mins < range.open || mins > lastStart) return false;
  if ((mins - range.open) % SALON_SLOT_MINUTES !== 0) return false;
  if (isSameDay(d, new Date()) && d.getTime() <= Date.now()) return false;
  return true;
}

export function toDatetimeLocalInput(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function parseDatetimeLocalInput(s: string): Date {
  const d = new Date(s);
  return d;
}

export function datetimeLocalFromStoredBooking(stored: string): string {
  const normalized = stored.includes("T") ? stored : stored.replace(" ", "T");
  const d = new Date(normalized);
  if (Number.isNaN(d.getTime())) return toDatetimeLocalInput(getNextAvailableSlot());
  if (isBookingDateTimeAllowed(d)) return toDatetimeLocalInput(d);
  return toDatetimeLocalInput(getNextAvailableSlot(d));
}
